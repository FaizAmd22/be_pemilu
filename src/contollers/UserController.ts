import { Request, Response } from "express";
import UserService from "../services/UserService";
import { updateUserSchema } from "../utils/validator/AuthValidator";

export default new (class UserController {
  async update(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession.obj;
      if (loginSession.role !== "admin")
        return res.status(401).json({ message: "unauthorize" });

      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({
          message: "Invalid ID provided",
          error: "Invalid input for type number",
        });
      }
      const data = req.body;
      const { error, value } = updateUserSchema.validate(data);
      if (error) return res.status(400).json(error);

      const response = await UserService.update(id, value);
      return res.status(201).json(response);
    } catch (error) {
      console.error("Error updating a User:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }

  async updateCurrent(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession.obj;
      const data = req.body;
      const { error, value } = updateUserSchema.validate(data);
      if (error) return res.status(400).json(error);

      const response = await UserService.update(loginSession.id, value);
      return res.status(201).json(response);
    } catch (error) {
      console.error("Error updating a User:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession.obj;
      if (loginSession.role !== "admin")
        return res.status(401).json({ message: "unauthorize" });

      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({
          message: "Invalid ID provided",
          error: "Invalid input for type number",
        });
      }

      const response = await UserService.delete(id);
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error deleting a user", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession.obj;
      if (loginSession.role !== "admin")
        return res.status(401).json({ message: "unauthorize" });

      const response = await UserService.getAll();
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error getting all User:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession.obj;
      if (loginSession.role !== "admin")
        return res.status(401).json({ message: "unauthorize" });

      const id = parseInt(req.params.id, 10);
      const response = await UserService.getOne(id);
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error getting a user:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }

  async getCurrent(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession.obj;

      const response = await UserService.getOne(loginSession.id);
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error getting a user:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
})();
