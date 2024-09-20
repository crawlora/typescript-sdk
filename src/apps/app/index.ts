import { Crawlora } from "../../main";
import { CreateAppType, UpdateAppType } from "./types";

export class Application extends Crawlora {
  constructor(apiKey?: string, baseUrl?: URL) {
    super(apiKey, baseUrl);
  }

  async get(page: number = 1, recordPerPage: number = 10, order: string = 'desc') {
    const { data } = await this.api().get(`/application`, {
      params: {
        page,
        recordPerPage,
        order
      }
    });
    return data;
  }

  async getById(id: string) {
    const { data } = await this.api().get(`/application/${id}`);
    return data;
  }

  async create(body: CreateAppType) {
    const { data } = await this.api().post(`/application`, body)
    return data;
  }

  async update(id: string, body: UpdateAppType) {
    const { data } = await this.api().put(`/application/${id}`, body)
    return data
  }

  async delete(id: string) {
    const { data } = await this.api().delete(`/application/${id}`)
    return data
  }

}
