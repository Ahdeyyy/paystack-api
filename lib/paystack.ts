import { PaymentRequest } from "./payment_request";

export class Paystack {
    private secret_key: string;
    private endpoint = "https://api.paystack.co";
    payment_request: PaymentRequest;
    constructor(secret_key: string) {
        this.secret_key = secret_key;
        this.payment_request = new PaymentRequest(this.secret_key);
    }

    get_endpoint(): string {
        return this.endpoint
    }
}