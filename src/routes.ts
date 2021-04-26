import { Router } from "express";
import { MessagesController } from "./controller/MessagesController";
import { SettingsController } from "./controller/SettingsController";
import { UsersController } from "./controller/UsersController";
import { AuthController } from "./controller/AuthController";

const routes = Router();

const settingsController = new SettingsController();
const usersController = new UsersController();
const messagesController = new MessagesController();
const authController = new AuthController();

routes.post("/settings", settingsController.create);
routes.get("/settings/:username", settingsController.findByUsername);
routes.put("/settings/:username", settingsController.update);

routes.post("/users", usersController.create);

routes.post("/messages", messagesController.create);
routes.get("/messages/:id", messagesController.showByUser);

routes.post("/auth", authController.authenticate);

export { routes };
