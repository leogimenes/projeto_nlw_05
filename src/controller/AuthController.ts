import { Request, Response } from "express";
import { SettingsService } from "../services/SettingsService";
import bcrypt from "bcryptjs";
import authConfig from "../config/auth";
import jwt from "jsonwebtoken";

class AuthController {
  async authenticate(request: Request, response: Response) {
    const settingsService = new SettingsService();

    const { username, password } = request.body;

    const settings = await settingsService.findByUsername(username);

    if (!settings) {
      return response.status(401).send({ message: "Invalid username" });
    }

    const isValidPassword = await bcrypt.compare(password, settings.password);

    if (!isValidPassword) {
      return response.status(401).send({ message: "Invalid password" });
    }

    const mid = jwt.sign({ id: settings.id }, authConfig.secret, {
      expiresIn: "1d",
    });

    const token = `Bearer ${mid}`;

    delete settings.password;
    return response.json({
      settings,
      token,
    });
  }
}

export { AuthController };
