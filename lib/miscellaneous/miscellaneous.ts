import type { ListBanksQuery, ListBanksResponse, ListCountryResponse } from "./types";

export class Miscellaneous {
    private secret_key: string;
    constructor(secret_key: string) {
        this.secret_key = secret_key;
    }

    /** Get a list of all supported banks and their properties */

    async list_banks(query: ListBanksQuery): Promise<ListBanksResponse> {
        const url = new URL("https://api.paystack.co/bank")
        const keys = Object.keys(query)

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            if (!key) continue
            const value = query[key]
            url.searchParams.set(key, value)
        }

        const response = await fetch(url, {
            headers: this.get_headers(),
            method: "GET"
        })
        const response_data = await response.json() as ListBanksResponse
        return response_data
    }

    /** Gets a list of countries that Paystack currently supports */
    async list_countries(): Promise<ListCountryResponse> {
        const url = "https://api.paystack.co/country"
        const response = await fetch(url, {
            headers: this.get_headers(),
            method: "GET"
        })
        const response_data = await response.json() as ListCountryResponse
        return response_data
    }

    private get_headers() {
        return {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.secret_key
        }
    }
}
