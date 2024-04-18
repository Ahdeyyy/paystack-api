import type { AssignDVAData, AssignDVAResponse, CreateDVAData, CreateDVAResponse, DeactivateDVAResponse, FetchBankProvidersDVAResponse, FetchDVAResponse, ListDVAQuery, ListDVAResponse, RemoveSplitDVAResponse, RequeryDVAQuery, RequeryDVAResponse, SplitDVAData, SplitDVAResponse } from "./types";

export class DedicatedVirtualAccounts {
    private endpoint: string = "https://api.paystack.co/dedicated_account";

    private secret_key: string;
    constructor(secret_key: string) {
        this.secret_key = secret_key;
    }

    /**
     * Create a dedicated virtual account for an existing customer 
     * Bank Availability
     * We currently support Wema Bank and Titan Paystack
     * */
    async create(data: CreateDVAData): Promise<CreateDVAResponse> {
        const headers = this.get_headers();

        const response = await fetch(this.endpoint, {
            headers: headers,
            method: "POST",
            body: JSON.stringify(data)
        })

        const response_data = await response.json() as CreateDVAResponse

        return response_data
    }

    /** With this endpoint, you can create a customer, validate the customer, and assign a DVA to the customer.
     * Bank Availability 
     * We currently support Wema Bank and Titan Paystack. 
     * */
    async assign(data: AssignDVAData): Promise<AssignDVAResponse> {
        const headers = this.get_headers();

        const response = await fetch(this.endpoint + "/assign", {
            headers: headers,
            method: "POST",
            body: JSON.stringify(data)
        })

        const response_data = await response.json() as AssignDVAResponse;

        return response_data;
    }

    /** List dedicated virtual accounts available on your integration. */
    async list(query: ListDVAQuery): Promise<ListDVAResponse> {
        const keys = Object.keys(query)
        const url = new URL(this.endpoint)
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i] ?? ''
            const value = query[key]
            url.searchParams.set(key, value)
        }
        const response = await fetch(url, {
            headers: this.get_headers(),
            method: "GET",
        })

        const response_data = await response.json() as ListDVAResponse

        if (response_data.status) {
            response_data.meta.page = Number(response_data.meta.page)
            response_data.meta.total = Number(response_data.meta.total)
            response_data.meta.perPage = Number(response_data.meta.perPage)
            response_data.meta.skipped = Number(response_data.meta.skipped)
            response_data.meta.pageCount = Number(response_data.meta.pageCount)
        }

        return response_data
    }

    async fetch(dedicated_account_id: string): Promise<FetchDVAResponse> {
        const response = await fetch(`${this.endpoint}/${dedicated_account_id}`, {
            headers: this.get_headers(),
            method: "GET"
        })
        const response_data = await response.json() as FetchDVAResponse
        return response_data
    }

    async requery(query: RequeryDVAQuery): Promise<RequeryDVAResponse> {
        const keys = Object.keys(query)
        const url = new URL(this.endpoint)
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i] ?? ''
            if (key === "account_number") {

                const value = query[key]
                url.searchParams.set("requery", value)
                continue
            }
            const value = query[key]
            url.searchParams.set(key, value)
        }

        const response = await fetch(url, {
            headers: this.get_headers(),
            method: "GET"
        })

        const response_data = await response.json() as RequeryDVAResponse

        return response_data

    }

    async deactivate(dedicated_account_id: string): Promise<DeactivateDVAResponse> {
        const response = await fetch(`${this.endpoint}/${dedicated_account_id}`, {
            headers: this.get_headers(),
            method: "DELETE",

        })
        const response_data = await response.json() as DeactivateDVAResponse;
        return response_data
    }

    async split(data: SplitDVAData): Promise<SplitDVAResponse> {
        const response = await fetch(`${this.endpoint}/split`, {
            headers: this.get_headers(),
            method: "POST",
            body: JSON.stringify(data)
        })
        const response_data = await response.json() as SplitDVAResponse
        return response_data
    }


    /*
     * If you've previously set up split payment for transactions on a dedicated virtual account, 
     * you can remove it with this endpoint
     * @params account_number Dedicated virtual account number
     * */
    async remove_split(account_number: string): Promise<RemoveSplitDVAResponse> {

        const response = await fetch(`${this.endpoint}/split`, {
            headers: this.get_headers(),
            method: "DELETE",
            body: JSON.stringify({ account_number: account_number })
        })
        const response_data = await response.json() as RemoveSplitDVAResponse
        return response_data
    }

    async fetch_bank_providers(): Promise<FetchBankProvidersDVAResponse> {
        const response = await fetch(`${this.endpoint}/available_providers`, {
            headers: this.get_headers(),
            method: "GET",
        })
        const response_data = await response.json() as FetchBankProvidersDVAResponse
        return response_data
    }

    private get_headers() {
        return {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.secret_key
        }
    }
}
