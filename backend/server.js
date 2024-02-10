import express from "express";
import { configDotenv } from "dotenv";
import colors from "colors";
import routerUser from "./routes/user.routes.js";
import { notFound, errorHandler } from "./middlewares/error.middleware.js";
import DB_Connect from "./config/db.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";

configDotenv();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/users", routerUser);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => res.send("server is ready"));
}

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    DB_Connect();
    app.listen(PORT, () =>
      console.log(`Server Started on PORT: ${PORT}`.bgGreen.bold)
    );
  } catch (error) {
    console.error(
      `Connection to Server Failed Error: ${error.message}`.bgRed.bold
    );
  }
};

start();
