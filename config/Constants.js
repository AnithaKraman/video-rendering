const Constants = require("node-constants")(exports);

Constants(
  {
    // server related constants
    Server: {
      PORT: 3000
    },

    //recaptcha server key
    Recaptcha:{
      SERVER_KEY:'6LfYX8QZAAAAAFOp_VwVFAVHmXXKesAWucXnmrDy'
    },

    //Email constants
    Email: {
      EMAIL_SECRET: 'asdf1093KMnzxcvnkljvasdu09123nlasdasdf',
      USER: 'codepannu.assignments@gmail.com',
      PASS: '#Cut3andCod3',
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
      MS_PORT: 3306,
      MS_HOST: "localhost",
      MS_USER: "root",
      MS_PASS: "test",
      MS_DB_SCHEMA: "codepannu",
      multipleStatements: true
    }
  }
);
