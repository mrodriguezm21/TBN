const cors = require("cors");
const express = require("express");

const app = express();

require("./utils/auth/index")
const swaggerDocs = require("./swagger/swaggerDef");
const routerApi = require("./routes");
const config = require("./config");

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler
} = require("./middlewares/error.handler");


app.use(express.json());
app.use(cors());

routerApi(app);
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server is running on ${config.host}:${config.port}`);
  swaggerDocs(app, config.port);
});
