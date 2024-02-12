import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import {
  createAdminSchema,
  createUserSchema,
  loginSchema,
} from "../utils/validator/AuthValidator";

export default new (class AuthController {
  async registerUser(req: Request, res: Response) {
    try {
      const data = req.body;
      const { error, value } = createUserSchema.validate(data);
      if (error) return res.status(400).json(error);

      const response = await AuthService.register(value);
      return res.status(201).json(response);
    } catch (error) {
      console.error("Error creating a user", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }

  async registerAdmin(req: Request, res: Response) {
    try {
      const data = req.body;
      const { error, value } = createAdminSchema.validate(data);
      if (error) return res.status(400).json(error);

      const obj = {
        ...value,
        role: "admin",
      };
      const response = await AuthService.register(obj);
      return res.status(201).json(response);
    } catch (error) {
      console.error("Error creating a user", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const data = req.body;
      const { error, value } = loginSchema.validate(data);
      if (error) return res.status(400).json(error);

      const response = await AuthService.login(value);
      return res.status(201).json(response);
    } catch (error) {
      console.error("Error logging in", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
})();
