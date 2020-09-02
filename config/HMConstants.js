const hmc = require("node-constants")(exports);

hmc(
  {
    // server related constants
    Server: {
      PORT: 3000
    },

    // response related constants
    Response: {
      CODE_SUCCESS: 200,
      DESC_SUCCESS: "Request served successfully",
      CODE_BAD_REQUEST: 400,
      DESC_BAD_REQUEST: "Bad Request",
      CODE_AUTHN_FAIL: 401,
      DESC_AUTHN_FAIL: "Authentication Failed",
      CODE_INTRNL_SERV_ERR: 500,
      DESC_INTRNL_SERV_ERR: "Internal Server Error"
    },

    // mysql database related
    Sql: {
      MS_PORT: 3001,
      MS_HOST: "localhost",
      MS_USER: "root",
      MS_PASS: "test",
      MS_DB_SCHEMA: "codepannu",
      multipleStatements: true
    }
  }
);