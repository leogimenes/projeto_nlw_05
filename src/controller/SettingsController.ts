import { Request, Response } from "express";
import { SettingsService } from "../services/SettingsService";

class SettingsController {
  index(req: Request, res: Response) {
    return res.render("html/admin.html");
  }
  async create(req: Request, res: Response) {
    const { username, password, chat } = req.body;

    const settingsService = new SettingsService();

    try {
      const settings = await settingsService.create({
        username,
        password,
        chat,
      });

      return res.json(settings);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async findByUsername(request: Request, response: Response) {
    const { username } = request.params;

    const settingsService = new SettingsService();

    const settings = await settingsService.findByUsername(username);

    return response.json(settings);
  }

  async update(request: Request, response: Response) {
    const { username } = request.params;
    const { chat, socket_id } = request.body;

    const settingsService = new SettingsService();

    if (!socket_id) {
      await settingsService.updateChat(username, chat);
      return response.send({ message: "Chat settings updated" });
    } else {
      await settingsService.updateSocketID(username, socket_id);
      return response.send({ message: "Admin socket id updated" });
    }
  }
}

export { SettingsController };
