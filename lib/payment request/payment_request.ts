import type {
    CreatePaymentRequestResponse,
    PaymentRequestData,
    ListPaymentRequestResponse,
    ListPaymentRequestQuery,
    FetchPaymentRequestResponse,
    VeryifyPaymentRequestResponse,
    SendNotificationPaymentRequestResponse,
    TotalPaymentRequestResponse,
    FinalizePaymentRequestResponse,
    ArchivePaymentRequestResponse
} from "./types";

/**
Paystack API - Payment request
*/
export class PaymentRequest {
    private endpoint: string = "https://api.paystack.co/paymentrequest";

    private secret_key: string;
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
     * Creates a new payment request
     * @param data
     * @returns
     */
    async create(data: PaymentRequestData): Promise<CreatePaymentRequestResponse> {
        const default_data: PaymentRequestData = {
            draft: false,
            send_notification: true,
            ...data,

        }


        const headers = this.get_headers()

        // TODO: check if the fetch was successful and respond accordingly
        const json_resp = await fetch(this.endpoint, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(default_data),
        })

        const resp = await json_resp.json();

        let response: CreatePaymentRequestResponse = resp as CreatePaymentRequestResponse;

        return response

    }

    /**
     * Gets a list of payment requests
     * @param query 
     * @returns 
     */
    async list(query: ListPaymentRequestQuery = {}): Promise<ListPaymentRequestResponse> {
        const headers = this.get_headers()
        const url = new URL(this.endpoint)


        const keys = Object.keys(query)
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i] ?? ''
            const value = query[key]
            url.searchParams.set(key, value)
        }

        const json_resp = await fetch(url, {
            method: "GET",
            headers: headers
        })

        const response = await json_resp.json();
        const response_data: ListPaymentRequestResponse = response as ListPaymentRequestResponse;


        if (response_data.status) {
            response_data.meta.page = Number(response_data.meta.page)
            response_data.meta.perPage = Number(response_data.meta.perPage)
            response_data.meta.total = Number(response_data.meta.total)
            response_data.meta.skipped = Number(response_data.meta.skipped)
            response_data.meta.pageCount = Number(response_data.meta.pageCount)
        }
        return response_data;
    }

    async fetch(id: string): Promise<FetchPaymentRequestResponse> {
        const headers = this.get_headers()
        const url = new URL(this.endpoint + "/" + id)

        const json_resp = await fetch(url, {
            method: "GET",
            headers: headers
        })

        const resp = await json_resp.json() as FetchPaymentRequestResponse;

        return resp;

    }

    async verify(code: string): Promise<VeryifyPaymentRequestResponse> {
        const header = this.get_headers();

        const resp = await fetch(`${this.endpoint}/verify/${code}`, {
            method: "GET",
            headers: header,
        })

        const response = await resp.json() as VeryifyPaymentRequestResponse;

        return response as VeryifyPaymentRequestResponse;

    }

    async send_notification(code: string): Promise<SendNotificationPaymentRequestResponse> {
        const headers = this.get_headers()
        const url = new URL(this.endpoint + "/notify/" + code)

        const json_resp = await fetch(url, {
            method: "POST",
            headers: headers
        })
        const resp = await json_resp.json();
        const response = resp as SendNotificationPaymentRequestResponse
        return response;

    }

    async total(): Promise<TotalPaymentRequestResponse> {
        const header = this.get_headers();

        const resp = await fetch(`${this.endpoint}/totals`, {
            method: "GET",
            headers: header,
        })

        const response = await resp.json() as TotalPaymentRequestResponse;

        return response
    }

    /**
     * 
     * @param code Payment Request code
     * @param send_notification Indicates whether Paystack sends an email notification to customer. Defaults to true
     * @returns 
     */
    async finalize(code: string, send_notification: boolean = true): Promise<FinalizePaymentRequestResponse> {
        const headers = this.get_headers()
        const url = new URL(this.endpoint + "/finalize/" + code)

        const json_resp = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ send_notification: send_notification })
        })
        const resp = await json_resp.json();
        const response = resp as FinalizePaymentRequestResponse
        return response;
    }

    async update(code: string, data: PaymentRequestData): Promise<CreatePaymentRequestResponse> {
        const headers = this.get_headers()
        const url = new URL(this.endpoint + "/" + code)

        const json_resp = await fetch(url, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(data)
        })
        const resp = await json_resp.json();
        const response = resp as CreatePaymentRequestResponse
        return response;
    }

    async archive(code: string): Promise<ArchivePaymentRequestResponse> {
        const headers = this.get_headers()
        const url = new URL(this.endpoint + "/archive/" + code)

        const json_resp = await fetch(url, {
            method: "POST",
            headers: headers
        })
        const resp = await json_resp.json();
        const response = resp as ArchivePaymentRequestResponse
        return response;
    }


}
