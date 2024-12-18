import FormData from "form-data";
import { Crawlora } from "../../main";
import { CreateAppType, UpdateAppType } from "./types";
import { createReadStream } from "fs";

export class Application extends Crawlora {
  constructor(apiKey?: string, baseUrl?: URL) {
    super(apiKey, baseUrl);
  }

  async get(
    page: number = 1,
    recordPerPage: number = 10,
    order: string = "desc"
  ) {
    try {
      const { data } = await this.api().get(`/application`, {
        params: { page, recordPerPage, order },
      });
      return data;
    } catch (error) {
      throw new Error(`Error fetching applications: ${(error as Error).message}`);
    }
  }

  async getById(id: string) {
    const { data } = await this.api().get(`/application/${id}`);
    return data;
  }

  async create(body: CreateAppType) {
    const form = new FormData();
    form.append("title", body.title);
    form.append("description", body.description);
    form.append("file", createReadStream(body.file_path));
    form.append("icon", createReadStream(body.icon));
    form.append("banner", createReadStream(body.banner));
    form.append("author", body.author);
    form.append("version", body.version);
    form.append("short_description", body.short_description)

    if (body.input && Array.isArray(body.input)) {
      body.input.forEach((input) => {
        const info = JSON.stringify(input);
        form.append("input", info);
      });
    } else {
      console.warn("Input is missing or not an array");
    }


    if (body.screenshots && Array.isArray(body.screenshots)) {
      body.screenshots.forEach((inp) => {
        form.append("screenshots", createReadStream(inp));
      });
    } else {
      console.warn("Screenshots are missing or not an array");
    }

    try {
      const { data } = await this.api().post(`/application`, form, {
        headers: { ...form.getHeaders() },
      });
      return data;
    } catch (error) {
      throw new Error(`Error creating application: ${(error as Error).message}`);
    }
  }

  async update(id: string, body: UpdateAppType) {
    const form = new FormData();

    if (body.title) {
      form.append("title", body.title);
    }

    if (body.description) {
      form.append("description", body.description);
    }

    if (body.short_description) {
      form.append("short_description", body.short_description);
    }

    if (body.file_path) {
      form.append("file", createReadStream(body.file_path));
    } else {
      console.warn("file_path is missing for update");
    }

    if (body.icon) {
      form.append("icon", createReadStream(body.icon));
    }

    if (body.banner) {
      form.append("banner", createReadStream(body.banner));
    }


    form.append("author", body.author);
    form.append("version", body.version);

    if (body.input && Array.isArray(body.input)) {
      body.input.forEach((input) => {
        const info = JSON.stringify(input);
        form.append("input", info);
      });
    }

    if (body.screenshots && Array.isArray(body.screenshots)) {
      body.screenshots.forEach((inp) => {
        form.append("screenshots", createReadStream(inp));
      });
    }

    try {
      const { data } = await this.api().put(`/application/${id}`, form, {
        headers: { ...form.getHeaders() },
      });
      return data;
    } catch (error) {
      throw new Error(`Error updating application: ${(error as Error).message}`);
    }
  }

  async delete(id: string) {
    try {
      const { data } = await this.api().delete(`/application/${id}`);
      return data;
    } catch (error) {
      throw new Error(`Error deleting application: ${(error as Error).message}`);
    }
  }
}
