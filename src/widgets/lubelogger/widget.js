import genericProxyHandler from "utils/proxy/handlers/generic";

const widget = {
  api: "{url}/api/{endpoint}?vehicleId={key}",
  proxyHandler: genericProxyHandler,

  mappings: {
    "vehicle/odometerrecords/latest": {
      endpoint: "vehicle/odometerrecords/latest",
    },
    "vehicle/gasrecords": {
      endpoint: "vehicle/gasrecords",
    },
    "vehicle/reminders": {
      endpoint: "vehicle/reminders",
    },
  },
};

export default widget;
