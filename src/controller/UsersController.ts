import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

class UsersController {
  async create(req: Request, res: Response) {
    const { email } = req.body;

    const usersRepository = getCustomRepository(UsersRepository);

    const users = usersRepository.create({
      email,
    });

    await usersRepository.save(users);

    return res.json(users);
  }
}

export { UsersController };
