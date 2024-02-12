import { v2 as cloudinary } from "cloudinary";

export default new (class CloudinaryConfig {
  upload() {
    cloudinary.config({
      cloud_name: "di4pwtbcq",
      api_key: "296684154575945",
      api_secret: "AKxitUz1Y9AY6pn9BdhWkXZYvKw",
    });
  }

  async destination(image: string): Promise<any> {
    try {
      return await cloudinary.uploader.upload(`src/uploads/${image}`);
    } catch (error) {
      throw error;
    }
  }
})();
