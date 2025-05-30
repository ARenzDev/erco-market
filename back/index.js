import dotenv from "dotenv";
dotenv.config();
import "./db.js";
import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/auth.routes.js";
import offerRoutes from "./routes/offer.routes.js";
import setupExpiration from "./utils/expiration.js";

const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
app.set("io", io);
setupExpiration(io);

app.use("/api/auth", authRoutes);
app.use("/api/offers", offerRoutes);

io.on("connection", (socket) => {
  console.log("Usuario conectado:", socket.id);

  socket.on("disconnect", () => {
    console.log("Usuario desconectado:", socket.id);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () =>
  console.log(`Backend corriendo en http://localhost:${PORT}`)
);
