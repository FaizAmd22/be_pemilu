import { Request, Response } from "express";
import ArticlesService from "../services/ArticlesService";
import { createArticlesSchema, updateArticlesSchema } from "../utils/validator/ArticlesValidator";
import cloudinary from "../libs/cloudinary";

export default new (class ArticlesController {
  async create(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession.obj;
      if (loginSession.role !== "admin")
        return res.status(401).json({ message: "unauthorize" });

      const data = {
        title: req.body.title,
        description: req.body.description,
        user: loginSession.id,
        image: res.locals.filename,
      };

      const { error, value } = createArticlesSchema.validate(data);
      if (error) return res.status(400).json(error);

      cloudinary.upload();
      const cloudinaryRes = await cloudinary.destination(value.image);

      const obj = {
        ...value,
        image: cloudinaryRes.secure_url,
      };

      const response = await ArticlesService.create(obj);
      return res.status(201).json(response);
    } catch (error) {
      console.error("Error creating a Article:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
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
      const data = {
        title: req.body.title,
        description: req.body.description,
        image: res.locals.filename,
      };
      const { error, value } = updateArticlesSchema.validate(data);
      if (error) return res.status(400).json(error);

      const response = await ArticlesService.update(id, value);
      return res.status(201).json(response);
    } catch (error) {
      console.error("Error updating a Article:", error);
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

      const response = await ArticlesService.delete(id);
      return res.status(201).json(response);
    } catch (error) {
      console.error("Error deleting a Article:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const response = await ArticlesService.getAll();
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error getting all articles:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
  async getOne(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const response = await ArticlesService.getOne(id);
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error creating a Article:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
  async getAllArticlesCard(req: Request, res: Response) {
    try {
      const response = await ArticlesService.getAllArticlesCard();
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error getting all articles:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
  async getOneArticlesCard(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const response = await ArticlesService.getOneArticlesCard(id);
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error getting a Article:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
})();
