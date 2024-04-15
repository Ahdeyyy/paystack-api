export type PaystackData = object;

export type Currency = "NGN" | "USD"

export type TaxData = { name: "VAT", amount: number }

export type PaymentRequestStatus = "pending" | "draft" | "paid" | "denied"

export type RiskAction = "default" | "allow" | "deny"


export type PaystackResponseError = {
    status: false;
    meta: {
        nextStep: string
    };
    type: string;
    code: string;
}

export type LineItem = {
    name: string;
    amount: number;
    quantity?: number;
}

export type Notification = {
    sent_at: string;
    channel: string;
}
