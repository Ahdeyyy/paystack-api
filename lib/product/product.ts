import type { CreateProductData, CreateProductResponse, FetchProductResponse, ListProductQuery, ListProductResponse, UpdateProductData, UpdateProductResponse } from "./types";

export class Product {
  private secret_key: string;
  endpoint: string = "https://api.paystack.co/product";

  constructor(secret_key: string) {
    this.secret_key = secret_key;
  }
  private get_headers() {
    return {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + this.secret_key
    }
  }

  async create(data: CreateProductData): Promise<CreateProductResponse> {
    const headers = this.get_headers();
    const response = await fetch(this.endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      headers: headers,
    })
    const response_data = await response.json() as CreateProductResponse;

    return response_data;
  }
  async list(query: ListProductQuery = { perPage: 50, page: 1 }): Promise<ListProductResponse> {
    const headers = this.get_headers();
    const url = new URL(this.endpoint);
    const keys = Object.keys(query)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i] ?? ''
      const value = query[key]
      url.searchParams.set(key, value)
    }
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    })
    let response_data = await response.json() as ListProductResponse;
    if (response_data.status) {
      response_data.meta.page = Number(response_data.meta.page)
      response_data.meta.perPage = Number(response_data.meta.perPage)
      response_data.meta.total = Number(response_data.meta.total)
      response_data.meta.skipped = Number(response_data.meta.skipped)
      response_data.meta.pageCount = Number(response_data.meta.pageCount)
    }
    return response_data;
  }
  async fetch(id: number): Promise<FetchProductResponse> {
    const headers = this.get_headers()
    const url = `${this.endpoint}/${id}`
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    })
    const response_data = await response.json() as FetchProductResponse;
    return response_data
  }
  async update(id: number, data: UpdateProductData): Promise<UpdateProductResponse> {
    const headers = this.get_headers()
    const url = `${this.endpoint}/${id}`
    const response = await fetch(url, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(data)
    })
    const response_data = await response.json() as UpdateProductResponse
    return response_data
  }
}
