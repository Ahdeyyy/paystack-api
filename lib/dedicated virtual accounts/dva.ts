export class DedicatedVirtualAccounts {
    private endpoint: string = "https://api.paystack.co/dedicated_account";

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
}