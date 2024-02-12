import { Request, Response } from "express";
import PartaiService from "../services/PartaiService";
import {
  createPartaiSchema,
  updatePartaiSchema,
} from "../utils/validator/PartaiValidator";
import cloudinary from "../libs/cloudinary";

export default new (class PartaiController {
  async create(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession.obj;
      if (loginSession.role !== "admin")
        return res.status(401).json({ message: "unauthorize" });

      const data = {
        name: req.body.name,
        partyLeader: req.body.partyLeader,
        visionMission: req.body.visionMission,
        address: req.body.address,
        paslon: req.body.paslonId,
        image: res.locals.filename,
      };
      const { error, value } = createPartaiSchema.validate(data);
      if (error) return res.status(400).json(error);

      cloudinary.upload();
      const cloudinaryRes = await cloudinary.destination(value.image);
      const obj = {
        ...value,
        image: cloudinaryRes.secure_url,
      };

      const response = await PartaiService.create(obj);
      return res.status(201).json(response);
    } catch (error) {
      console.error("Error creating a Partai:", error);
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
        name: req.body.name,
        partyLeader: req.body.partyLeader,
        visionMission: req.body.visionMission,
        address: req.body.address,
        paslon: req.body.paslonId,
        image: res.locals.filename,
      };
      const { error, value } = updatePartaiSchema.validate(data);
      if (error) return res.status(400).json(error);

      const response = await PartaiService.update(id, value);
      return res.status(201).json(response);
    } catch (error) {
      console.error("Error updating a Partai:", error);
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

      const response = await PartaiService.delete(id);
      return res.status(201).json(response);
    } catch (error) {
      console.error("Error deleting a Partai:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const response = await PartaiService.getAll();
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error getting all Partai:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
  async getOne(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const response = await PartaiService.getOne(id);
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error getting a Partai:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
})();
