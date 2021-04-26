import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettingsCreate {
  username: string;
  password: string;
  socket_id?: string;
  chat: boolean;
}

class SettingsService {
  private settingsRepository: Repository<Setting>;

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository);
  }
  async create({ username, password, chat }: ISettingsCreate) {
    const userAlreadyExists = await this.settingsRepository.findOne({
      username,
    });

    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }

    const settings = this.settingsRepository.create({
      username,
      password,
      chat,
    });

    await this.settingsRepository.save(settings);

    return settings;
  }

  async findByUsername(username: string) {
    const settings = await this.settingsRepository.findOne({
      username,
    });
    return settings;
  }

  async updateChat(username: string, chat: boolean) {
    await this.settingsRepository
      .createQueryBuilder()
      .update(Setting)
      .set({ chat })
      .where("username = :username", {
        username,
      })
      .execute();
  }
  async updateSocketID(username: string, socket_id: string) {
    await this.settingsRepository
      .createQueryBuilder()
      .update(Setting)
      .set({ socket_id })
      .where("username = :username", {
        username,
      })
      .execute();
  }
}

export { SettingsService };
