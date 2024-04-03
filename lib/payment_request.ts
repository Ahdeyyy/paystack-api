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
        // if (!resp.status) {
        //     return response
        // }
        // response = this.convert_to_invoice_create_response(resp as CreatePaymentRequestResponse);
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

        let query_string = "?";

        // FIXME: find a better way to handle the queries

        // for (const key in Object.keys(query)) {
        //     const value = query[key];
        //     url.searchParams.set(key,value )
        // }

        if (query.perPage) url.searchParams.set('perPage', query.perPage.toString())
        if (query.page) url.searchParams.set('page', query.page.toString())
        if (query.customer) url.searchParams.set('customer', query.customer)
        if (query.status) url.searchParams.set('status', query.status)
        if (query.currency) url.searchParams.set('currency', query.currency)
        if (query.include_archive) url.searchParams.set('include_archive', query.include_archive)
        if (query.from) url.searchParams.set('from', query.from)
        if (query.to) url.searchParams.set('to', query.to)


        const json_resp = await fetch(url, {
            method: "GET",
            headers: headers
        })

        const resp = await json_resp.json();
        const response: ListPaymentRequestResponse = resp as ListPaymentRequestResponse;

        // if (!response.status) {

        //     return response;
        // }

        // convert the string numbers to actual numbers
        // response.meta.page = Number(response.meta.page)
        // response.meta.pageCount = Number(response.meta.pageCount)
        // response.meta.perPage = Number(response.meta.perPage)
        // response.meta.skipped = Number(response.meta.skipped)
        // response.meta.total = Number(response.meta.total)

        // for (let i = 0; i < response.data.length; i++) {
        //     response.data[i].id = Number(response.data[i].id)
        //     response.data[i].amount = Number(response.data[i].amount)
        //     response.data[i].invoice_number = Number(response.data[i].invoice_number)
        //     for (let j = 0; j < response.data[i].line_items.length; j++) {
        //         response.data[i].line_items[j].amount = Number(response.data[i].line_items[j].amount)
        //         if (response.data[i].line_items[j].quantity) {
        //             response.data[i].line_items[j].quantity = Number(response.data[i].line_items[j].quantity)
        //         }
        //     }

        //     for (let j = 0; j < response.data[i].tax.length; j++) {
        //         response.data[i].tax[j].amount = Number(response.data[i].tax[j].amount)
        //     }
        // }

        return response;
    }

    async fetch(id: string): Promise<FetchPaymentRequestResponse> {
        const headers = this.get_headers()
        const url = new URL(this.endpoint + "/" + id)

        const json_resp = await fetch(url, {
            method: "GET",
            headers: headers
        })

        const resp = await json_resp.json() as FetchPaymentRequestResponse;

        // if (!resp.status) {
        //     return resp;
        // }

        // convert the string to actual numbers
        // resp.data.amount = Number(resp.data.amount);
        // resp.data.amount_paid = Number(resp.data.amount_paid);
        // resp.data.discount = Number(resp.data.discount);
        // resp.data.id = Number(resp.data.id);
        // resp.data.integration = Number(resp.data.id)
        // resp.data.pending_amount = Number(resp.data.pending_amount)
        // for (let j = 0; j < resp.data.line_items.length; j++) {
        //     resp.data.line_items[j].amount = Number(resp.data.line_items[j].amount)
        //     if (resp.data.line_items[j].quantity) {
        //         resp.data.line_items[j].quantity = Number(resp.data.line_items[j].quantity)
        //     }
        // }

        // for (let j = 0; j < resp.data.tax.length; j++) {
        //     resp.data.tax[j].amount = Number(resp.data.tax[j].amount)
        // }
        return resp;

    }

    async verify(code: string): Promise<VeryifyPaymentRequestResponse> {
        const header = this.get_headers();

        const resp = await fetch(`${this.endpoint}/verify/${code}`, {
            method: "GET",
            headers: header,
        })

        const response = await resp.json() as VeryifyPaymentRequestResponse;

        if (!response.status) {
            return response;
        }

        // response.data.amount = Number(response.data.amount);
        // response.data.id = Number(response.data.id);
        // response.data.invoice_number = Number(response.data.invoice_number);
        // response.data.pending_amount = Number(response.data.pending_amount);


        // for (let j = 0; j < response.data.line_items.length; j++) {
        //     response.data.line_items[j].amount = Number(response.data.line_items[j].amount)
        //     if (response.data.line_items[j].quantity) {
        //         response.data.line_items[j].quantity = Number(response.data.line_items[j].quantity)
        //     }
        // }

        // for (let j = 0; j < response.data.tax.length; j++) {
        //     response.data.tax[j].amount = Number(response.data.tax[j].amount)
        // }
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

        // if (!response.status) {
        //     return response;
        // }

        // converting to numbers
        // for (let i = 0; i < response.data.pending.length; i++) {
        //     response.data.pending[i].amount = Number(response.data.pending[i].amount)
        // }

        // for (let i = 0; i < response.data.successful.length; i++) {
        //     response.data.successful[i].amount = Number(response.data.successful[i].amount)
        // }

        // for (let i = 0; i < response.data.total.length; i++) {
        //     response.data.total[i].amount = Number(response.data.total[i].amount)
        // }

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

    private convert_to_invoice_create_response(data: CreatePaymentRequestResponse): CreatePaymentRequestResponse {
        if (data.status === true) {
            data.data.id = Number(data.data.id);
            data.data.amount = Number(data.data.amount);
        }
        return data;
    }


}