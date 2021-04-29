import express, { request } from "express";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import "./database";
import { routes } from "./routes";
import path from "path";

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/pages/client", (req, res) => {
  return res.render("html/client.html");
});

// app.get("/pages/admin", (req, res) => {
//   return res.render("html/admin.html");
// });

app.get("/", (req, res) => {
  return res.render("html/login.html");
});

const http = createServer(app); // Criando protocolo http
const io = new Server(http); // Criando protocolo ws

io.on("connection", (socket: Socket) => {
  console.log("Se conectou", socket.id);
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

export { http, io };
