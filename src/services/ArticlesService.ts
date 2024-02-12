import { Repository } from "typeorm";
import { Articles } from "../entity/Articles";
import { AppDataSource } from "../data-source";
import cloudinary from "../libs/cloudinary";

export default new (class ArticlesService {
  private readonly ArticlesRepository: Repository<Articles> =
    AppDataSource.getRepository(Articles);

  async create(data: any): Promise<object | string> {
    try {
      const response = await this.ArticlesRepository.save({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return {
        message: "success creating a new Articles",
        data: response,
      };
    } catch (error) {
      return "message: something error while creating a new Articles";
    }
  }
  async update(id: number, data: any): Promise<object | string> {
    try {
      if (data.image) {
        cloudinary.upload();
        const cloudinaryRes = await cloudinary.destination(data.image);

        const obj = {
          ...data,
          image: cloudinaryRes.secure_url,
        };

        const response = await this.ArticlesRepository.update(id, obj);
        return {
          message: "success updating a Paslon",
          data: response,
        };
      }
      const response = await this.ArticlesRepository.update(id, data);
      return {
        message: "success updating a Articles",
        data: response,
      };
    } catch (error) {
      return "message: something error while updating a Articles";
    }
  }
  async delete(id: number): Promise<object | string> {
    try {
      const response = await this.ArticlesRepository.delete(id);

      return {
        message: "success deleting a Articles",
      };
    } catch (error) {
      return "message: something error while deleting a Articles";
    }
  }
  async getAll(): Promise<object | string> {
    try {
      const articles = await this.ArticlesRepository.find({
        relations: {
          user: true,
        },
        select: {
          user: {
            name: true,
          },
        },
      });
      const viewArticles = articles.map((item) => {
        return {
          id: item.id,
          title: item.title,
          description: item.description,
          image: item.image,
          author: item.user.name,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
      });
      return {
        message: "success getting all Articles",
        data: viewArticles,
      };
    } catch (error) {
      return "message: something error while getting all Articles";
    }
  }
  async getOne(id: number): Promise<object | string> {
    try {
      const articles = await this.ArticlesRepository.find({
        where: { id },
        relations: {
          user: true,
        },
        select: {
          user: {
            name: true,
          },
        },
      });

      const viewArticles = articles.map((item) => {
        return {
          id: item.id,
          title: item.title,
          description: item.description,
          image: item.image,
          author: item.user.name,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
      });
      return {
        message: "success getting a Article",
        data: viewArticles,
      };
    } catch (error) {
      return "message: something error while getting a Articles";
    }
  }
  async getAllArticlesCard(): Promise<object | string> {
    try {
      const articles = await this.ArticlesRepository.find({
        relations: {
          user: true,
        },
        select: {
          id: true,
          title: true,
          image: true,
          createdAt: true,
          updatedAt: true,
          user: {
            name: true,
          },
        },
      });

      const viewArticles = articles.map((item) => {
        return {
          id: item.id,
          title: item.title,
          image: item.image,
          author: item.user.name,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
      });
      return {
        message: "success getting all Articles Cards",
        data: viewArticles,
      };
    } catch (error) {
      return "message: something error while getting Cards Articles";
    }
  }
  async getOneArticlesCard(id: number): Promise<object | string> {
    try {
      const articles = await this.ArticlesRepository.find({
        where: { id },
        relations: {
          user: true,
        },
        select: {
          id: true,
          title: true,
          image: true,
          createdAt: true,
          updatedAt: true,
          user: {
            name: true,
          },
        },
      });

      const viewArticles = articles.map((item) => {
        return {
          id: item.id,
          title: item.title,
          image: item.image,
          author: item.user.name,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
      });
      return {
        message: "success getting a Articles card",
        data: viewArticles,
      };
    } catch (error) {
      return "message: something error while getting Cards Articles";
    }
  }
})();
