import express from "express";
import path from "path";
import router from "./api-routes";

const {APP_PORT} = process.env;
const app = express();
console.log(process.env);

app.use(express.static(path.resolve(__dirname, "../../bin/client")));

app.listen(APP_PORT, () =>
    console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);

app.use("/api", router);
