import type {
    CreateCustomerData,
    CreateCustomerResponse,
    DeactivateAuthorizationResponse,
    FetchCustomerResponse,
    ListCustomerData,
    ListCustomerResponse,
    RiskAction,
    UpdateCustomerData,
    UpdateCustomerResponse,
    ValidateCustomerData,
    ValidateCustomerResponse,
    WhitelistBlacklistCustomerData,
    WhitelistBlacklistCustomerResponse
} from "./types";

export class Customer {
    private secret_key: string;
    private endpoint = "https://api.paystack.co/customer";

    constructor(secret_key: string) {
        this.secret_key = secret_key;
    }

    private get_headers() {
        return {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.secret_key
        }
    }

    /**
     * Create a customer on your integration
     * @param customer_data 
     * @returns 
     */
    async create(customer_data: CreateCustomerData) {
        const header = this.get_headers();
        const response = await fetch(this.endpoint, {
            method: "POST",
            headers: header,
            body: JSON.stringify(customer_data)

        })
        const response_data = await response.json() as CreateCustomerResponse;

        return response_data;
    }

    /**
     * List customers available on your integration.
     * @param query
     * @returns 
     */
    async list(query: ListCustomerData = { perPage: 50, page: 1 }): Promise<ListCustomerResponse> {
        const header = this.get_headers();
        const url = new URL(this.endpoint);

        const keys = Object.keys(query)
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i] ?? ''
            const value = query[key]
            url.searchParams.set(key, value)
        }

        const response = await fetch(url, {
            headers: header,
            method: "GET"
        })

        const response_data = await response.json() as ListCustomerResponse;


        if (response_data.status) {
            response_data.meta.perPage = Number(response_data.meta.perPage)
        }
        return response_data;
    }

    /**
     * Get details of a customer on your integration.
     * @param code customer's code or email address
     */
    async fetch(email_or_code: string): Promise<FetchCustomerResponse> {
        const header = this.get_headers();
        const url = new URL(this.endpoint + "/" + email_or_code);

        const response = await fetch(url, {
            headers: header,
            method: "GET"
        })

        const response_data = await response.json() as FetchCustomerResponse;
        return response_data;
    }

    /**
     * Update a customer's details on your integration
     */
    async update(code: string, data: UpdateCustomerData): Promise<UpdateCustomerResponse> {
        const header = this.get_headers();
        const url = new URL(this.endpoint + "/" + code);

        const response = await fetch(url, {
            headers: header,
            method: "PUT",
            body: JSON.stringify(data)
        })

        const response_data = await response.json() as UpdateCustomerResponse;
        return response_data;
    }

    /** Validate a customer's identity */
    async validate(code: string, data: ValidateCustomerData): Promise<ValidateCustomerResponse> {
        const headers = this.get_headers();
        const response = await fetch(`${this.endpoint}/${code}/identification`, {
            headers: headers,
            method: "POST",
            body: JSON.stringify(data)
        })

        const response_data = await response.json() as ValidateCustomerResponse;

        return response_data;
    }

    /**
     * Whitelist or blacklist a customer on your integration
     * note: you can only set risk_action to allow or deny when it's current value is default
     * i.e you can't set risk_action to deny when it's already set to allow
     * so you have to set it to default first before you can set it to allow or deny
     * @param data 
     * @returns 
     */
    async whitelist_blacklist(data: WhitelistBlacklistCustomerData): Promise<WhitelistBlacklistCustomerResponse> {
        const headers = this.get_headers();
        const response = await fetch(`${this.endpoint}/set_risk_action`, {
            headers: headers,
            method: "POST",
            body: JSON.stringify(data)
        })


        const response_data = await response.json() as WhitelistBlacklistCustomerResponse;

        return response_data;
    }

    async deactivate_authorization(authorization_code: string): Promise<DeactivateAuthorizationResponse> {
        const header = this.get_headers();

        const response = await fetch(this.endpoint + "/deactivate_authorization", {
            headers: header,
            method: "POST",
            body: JSON.stringify({ authorization_code: authorization_code })
        })

        const response_data = await response.json() as DeactivateAuthorizationResponse;

        return response_data;

    }

} 
