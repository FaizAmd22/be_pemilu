import { Repository } from "typeorm";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";

export default new (class UserService {
  private readonly UserRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async update(id: number, data: any): Promise<object | string> {
    try {
      const response = await this.UserRepository.update(id, data);
      return {
        message: "success updating a User",
        data: response,
      };
    } catch (error) {
      return "message: something error while updating a User";
    }
  }
  async delete(id: number): Promise<object | string> {
    try {
      await this.UserRepository.delete(id);

      return {
        message: "success deleting a User",
      };
    } catch (error) {
      return "message: something error while deleting a User";
    }
  }
  async getAll(): Promise<object | string> {
    try {
      const response = await this.UserRepository.find();

      return {
        message: "success getting all Peserta pemilu",
        data: response,
      };
    } catch (error) {
      return "message: something error while getting all User";
    }
  }
  async getOne(id: number): Promise<object | string> {
    try {
      const response = await this.UserRepository.findOne({
        where: { id },
      });

      return {
        message: "success getting a User",
        data: response,
      };
    } catch (error) {
      return "message: something error while getting a Peserta Pemilu";
    }
  }
})();
