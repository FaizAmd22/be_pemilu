import { Repository } from "typeorm";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import "dotenv/config";

export default new (class AuthService {
  private readonly AuthRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async register(data: any): Promise<object | string> {
    try {
      const usernameCheck = await this.AuthRepository.exist({
        where: { username: data.username },
      });
      if (usernameCheck) return { message: `Username already used` };

      const hashPass = await bcrypt.hash(data.password, 10);

      const obj = await this.AuthRepository.create({
        ...data,
        password: hashPass,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const response = await this.AuthRepository.save(obj);

      return {
        message: "success creating a User",
        data: response,
      };
    } catch (error) {
      return "message: something error while creating User";
    }
  }
  async login(data: any): Promise<object | string> {
    try {
      const idCheck = await this.AuthRepository.findOneBy({
        username: data.username,
      });
      if (!idCheck) return { message: "Username did not exist" };

      const comparePassword = bcrypt.compare(data.password, idCheck.password);
      if (!comparePassword) return "password is wrong!";

      const obj = this.AuthRepository.create({
        id: idCheck.id,
        name: idCheck.name,
        address: idCheck.address,
        gender: idCheck.gender,
        username: idCheck.username,
        role: idCheck.role,
      });

      const token = jwt.sign({ obj }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      return {
        message: `Login is suscess`,
        name: idCheck.name,
        role: idCheck.role,
        token,
      };
    } catch (error) {
      return "message: something error while logging in";
    }
  }
})();
