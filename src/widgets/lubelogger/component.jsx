import Container from "components/services/widget/container";
import Block from "components/services/widget/block";
import useWidgetAPI from "utils/proxy/use-widget-api";

function parseDate(dateStr) {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day);
}
function getLastGasRecordString(gasRecordsData) {
  gasRecordsData.sort((a, b) => parseDate(b.date) - parseDate(a.date));
  return `${gasRecordsData[0].fuelConsumed}L - ${gasRecordsData[0].cost}€`;
}

function getImportantsRemindersLength(remindersData) {
  return remindersData.filter((reminder) => reminder.urgency !== "NotUrgent").length;
}
export default function Component({ service }) {
  const { widget } = service;

  const { data: odometerData, error: odometerError } = useWidgetAPI(widget, "vehicle/odometerrecords/latest");
  const { data: gasRecordsData, error: gasRecordsError } = useWidgetAPI(widget, "vehicle/gasrecords");
  const { data: remindersData, error: remindersError } = useWidgetAPI(widget, "vehicle/reminders");

  if (odometerError || gasRecordsError || remindersError) {
    const finalError = odometerError ?? gasRecordsError ?? remindersError;
    return <Container service={service} error={finalError} />;
  }
  if (!odometerData || !gasRecordsData || !remindersData) {
    return (
      <Container service={service}>
        <Block label="lubelogger.odometer" />
        <Block label="lubelogger.latestgas" />
        <Block label="lubelogger.reminders" />
      </Container>
    );
  }

  return (
    <Container service={service}>
      <Block label="lubelogger.odometer" value={`${odometerData} km`} />
      <Block label="lubelogger.latestgas" value={getLastGasRecordString(gasRecordsData)} />
      <Block label="lubelogger.reminders" value={getImportantsRemindersLength(remindersData)} />
    </Container>
  );
}
