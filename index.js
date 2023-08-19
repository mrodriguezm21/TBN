const cors = require("cors");
require("./utils/auth/index")

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler
} = require("./middlewares/error.handler");

const express = require("express");
const routerApi = require("./routes");

const app = express();
const config = require("./config");

app.use(express.json());
app.use(cors());

routerApi(app);
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server is running on ${config.host}:${config.port}`);
});
