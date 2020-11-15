const Constants = require("node-constants")(exports);

Constants(
  {
    // server related constants
    Server: {
      PORT: process.env.PORT || 3000
    },
  }
);
