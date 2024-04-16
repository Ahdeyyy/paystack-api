import type { AssignDVAData, AssignDVAResponse, CreateDVAData, CreateDVAResponse } from "./types";

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

    private get_headers() {
        return {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.secret_key
        }
    }
}
