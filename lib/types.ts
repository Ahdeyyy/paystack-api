export type PaystackData = object;

export type Currency = "NGN" | "USD"

export type TaxData = { name: "VAT", amount: number }

export type PaymentRequestStatus = "pending" | "draft" | "paid" | "denied"

export type RiskAction = "default" | "allow" | "deny"

export interface PaystackResponse {
    status: boolean;
    message: string;
    data: PaystackData;
}

export type LineItem = {
    name: string;
    amount: number;
    quantity?: number;
}
export type CustomerData = {
    id: number,
    first_name: string | null,
    last_name: string | null,
    email: string | null,
    customer_code: string,
    phone: string | null,
    metadata: {
        calling_code: string,
    },
    risk_action: RiskAction,
    international_format_phone: null
}

export type Notification = {
    sent_at: string;
    channel: string;
}

export type ListPaymentRequestData = {

    id: number,
    domain: string,
    amount: number,
    currency: Currency,
    /** ISO 8601 date representation */
    due_date: string | null,
    has_invoice: boolean,
    invoice_number: number,
    description: string,
    pdf_url: string | null,
    line_items: Array<LineItem>,
    tax: Array<TaxData>,
    request_code: string,
    status: PaymentRequestStatus,
    paid: boolean,
    paid_at: string | null,
    metadata: null,
    notifications: Array<Notification>,
    offline_reference: string,
    customer: CustomerData,
    created_at: string
}


export type PaymentRequestData = {

    /** Customer id or code */
    customer: number | string;

    /** Payment request amount. It should be used when line items and tax values aren't specified. */
    amount: number;

    /** A short description of the payment request */
    description?: string;

    /** 
     * Array of line items in the format [{"name":"item 1", "amount":2000, "quantity": 1}]
     * */
    line_items?: Array<LineItem>;

    // TODO: Add more tax names and probably extract it to a seperate type

    /** 
     * Array of taxes to be charged in the format 
     * @example[{"name":"VAT", "amount":2000}]
     * */
    tax?: Array<TaxData>;

    // TODO: Add more currency names and probably extract it to a seperate type

    /**
     * Specify the currency of the payment request. Defaults to NGN.
     * */
    currency?: Currency;

    /**
     * Indicate if request should be saved as draft. Defaults to false and overrides send_notification
     */
    draft?: boolean;

    /**
     * ISO 8601 representation of request due date
     */
    due_date?: string;

    /**
     * Indicates whether Paystack sends an email notification to customer. Defaults to true
     */
    send_notification?: boolean;

    /**
     * Set to true to create a draft payment request (adds an auto incrementing payment request number if none is provided)
     * even if there are no line_items or tax passed
     */
    has_invoice?: boolean;

    /**
     * Numeric value of the payment request. Payment Requests will start from 1 and auto increment from there. 
     * This field is to help override whatever value Paystack decides. 
     * Auto increment for subsequent payment requests continue from this point.
     */
    invoice_number?: number;

    /**
     * The split code of the transaction split. e.g. @example SPL_98WF13Eb3w
     */
    split_code?: string;

}

export type ListPaymentRequestQuery = {

    /** 
     * Specify how many records you want to retrieve per page. 
     * If not specify we use a default value of 50. 
     * */
    perPage?: number;

    /**
     * Specify the page you want to fetch payment requests from.
     *  If not specify we use a default value of 1.
    
     */
    page?: number;

    /** Filter by customer ID */
    customer?: string;

    /** Filter by payment request status */
    status?: PaymentRequestStatus;

    /** Filter by currency */
    currency?: Currency;

    /** Show archived payment requests */
    include_archive?: string;

    /**
     * A timestamp from which to start listing payment requests 
     * @example 2016-09-24T00:00:05.000Z, 2016-09-21 
     */
    from?: string;

    /** A timestamp at which to stop listing payment requests 
     * @example 2016-09-24T00:00:05.000Z, 2016-09-21 */
    to?: string;
}

export type UpdatePaymentRequestData = {

    /** Customer id or code */
    customer: string;

    /** Payment request amount. 
     * Only useful if line items and tax values are ignored. 
     * endpoint will throw a friendly warning if neither is available. 
     * */
    amount: number;

    /**
     * ISO 8601 representation of request due date
     */
    due_date?: string;

    /** A short description of the payment request */
    description?: string;

    /**
     * Array of line items int the format
     * @example [{"name":"item 1", "amount":2000}]
     */
    line_items?: Array<LineItem>;

    /**
     * Array of taxes to be charged in the format 
     * @example [{"name":"VAT", "amount":2000}]
     */
    tax?: Array<TaxData>;

    /**
     * Specify the currency of the payment request. Defaults to NGN.
     */
    currency?: Currency;

    /** 
     * Indicates whether Paystack sends an email notification to customer. 
     * Defaults to true 
     * */
    send_notification?: boolean;

    /** Indicate if request should be saved as draft. 
     * Defaults to false and overrides send_notification 
     * */
    draft?: boolean;

    /**
     * Numeric value of the payment request. Payment Requests will start from 1 and auto increment from there. 
     * This field is to help override whatever value Paystack decides.
     *  Auto increment for subsequent payment requests continue from this point.
     */
    invoice_number?: number;

    /**
     * The split code of the transaction split. e.g. @example SPL_98WF13Eb3w
     */
    split_code?: string;

}

export type PaystackResponseError = {
    status: false;
    meta: {
        nextStep: string
    };
    type: string;
    code: string;
}

export type CreatePaymentRequestResponse = {
    message: string;
} & ({
    status: true;
    data: Partial<PaymentRequestData> & {
        id: number;
        domain: string;
        request_code: string;
        status: PaymentRequestStatus;
        paid: false;
        metadata: null;
        notifications: Array<any>;
        offline_reference: string;
        created_at: string;
    }
} | PaystackResponseError)


export type ListPaymentRequestResponse = {

    message: string,

} & ({
    status: true;
    data: Array<ListPaymentRequestData>,
    meta: {
        total: number,
        skipped: number,
        perPage: number,
        page: number,
        pageCount: number
    }
} | PaystackResponseError)


export type FetchPaymentRequestResponse = {
    message: string;
} & (
        {
            status: true;
            data: {

                // TODO: add proper type
                transactions: Array<any>;
                domain: string;
                request_code: string;
                description: string;
                line_items: Array<LineItem>;
                tax: Array<TaxData>;
                amount: number;
                discount: number | null;
                currency: Currency;
                due_date: string;
                status: PaymentRequestStatus;
                paid: boolean;
                paid_at: string | null;
                // TODO: add its proper type
                metadata: null,
                has_invoice: boolean;
                invoice_number: number;
                offline_reference: string;
                pdf_url: string | null,
                notifications: Array<Notification>;
                archived: boolean;
                source: string;
                payment_method: string | null,
                note: string | null;
                amount_paid: number | null;
                id: number;
                integration: number;
                customer: {
                    transactions: Array<any>;
                    subscriptions: Array<any>;
                    authorizations: Array<any>;
                    first_name: string;
                    last_name: string;
                    email: string;
                    phone: string | null,
                    metadata: {
                        calling_code: string;
                    };
                    domain: string;
                    customer_code: string;
                    risk_action: RiskAction;
                    id: number
                    integration: number
                    createdAt: string;
                    updatedAt: string;
                },
                createdAt: string | null;
                updatedAt: string | null;
                pending_amount: number;
            }
        } | PaystackResponseError
    )

export type VeryifyPaymentRequestResponse = {
    message: string;

} & ({
    status: true;
    data: {
        id: number;
        domain: string;
        amount: number;
        currency: string;
        due_date: string;
        has_invoice: boolean;
        invoice_number: number;
        description: string;
        pdf_url: string | null;
        line_items: Array<LineItem>;
        tax: Array<TaxData>;
        request_code: string;
        status: PaymentRequestStatus;
        paid: boolean;
        paid_at: string | null;
        metadata: null;
        notifications: Array<Notification>;
        offline_reference: string;
        customer: {
            id: number;
            first_name: string | null;
            last_name: string | null;
            email: string | null;
            customer_code: string;
            phone: string | null;
            metadata: {
                calling_code: string;
            };
            risk_action: RiskAction;
            international_format_phone: null;
        };
        created_at: string;
        integration: {
            key: string;
            name: string;
            logo: string;
            allowed_currencies: Array<Currency>;
        };
        pending_amount: number;
    }
} | PaystackResponseError)

export type SendNotificationPaymentRequestResponse = {
    message: string;
} & ({
    status: true
} | PaystackResponseError)

export type TotalPaymentRequestResponse = { message: string; } & ({
    status: true;
    data: {
        pending: Array<{
            currency: Currency;
            amount: number;
        }>;
        successful: Array<{
            currency: Currency;
            amount: number;
        }>;
        total: Array<{
            currency: Currency;
            amount: number;
        }>;
    };
} | PaystackResponseError)

export type FinalizePaymentRequestResponse = { message: string; } & ({
    status: true;
    data: {
        id: number;
        domain: string;
        amount: number;
        currency: Currency;
        due_date: string;
        has_invoice: boolean;
        invoice_number: number;
        description: string;
        pdf_url: string | null;
        line_items: Array<LineItem>;
        tax: Array<TaxData>;
        request_code: string;
        status: string;
        paid: boolean;
        paid_at: string | null;
        metadata: null;
        notifications: Array<Notification>;
        offline_reference: string;
        customer: {
            id: number;
            first_name: string | null;
            last_name: string | null;
            email: string;
            customer_code: string;
            phone: string | null;
            metadata: {
                calling_code: string;
            };
            risk_action: RiskAction;
            international_format_phone: null;
        };
        created_at: string;
        pending_amount: number;
    };
} | PaystackResponseError)


export type UpdatePaymentRequestResponse = { message: string; } & ({
    status: true;
    data: {
        id: number;
        domain: string;
        amount: number;
        currency: Currency;
        due_date: string;
        has_invoice: boolean;
        invoice_number: number;
        description: string;
        pdf_url: string | null;
        line_items: Array<LineItem>;
        tax: Array<TaxData>;
        request_code: string;
        status: PaymentRequestStatus;
        paid: boolean;
        paid_at: string | null;
        metadata: null;
        notifications: Array<Notification>;
        offline_reference: string;
        customer: {
            id: number;
            first_name: string | null;
            last_name: string | null;
            email: string;
            customer_code: string;
            phone: string | null;
            metadata: {
                calling_code: string;
            };
            risk_action: RiskAction;
            international_format_phone: null;
        };
        created_at: string;
    };
} | PaystackResponseError)

export type ArchivePaymentRequestResponse = { message: string; } & ({
    status: true;
} | PaystackResponseError)

/**
 * The first_name, last_name and phone are optional parameters. However, when creating a customer that would be assigned 
 * a Dedicated Virtual Account and your business catgeory falls under Betting, Financial services, 
 * and General Service, then these parameters become compulsory.
 */
export type CreateCustomerData = {

    /** Customer's email address */
    email: string;

    /** Customer's first name */
    first_name?: string;

    /** Customer's last name */
    last_name?: string;

    /** Customer's phone number */
    phone?: string;

    /**
     *  A set of key/value pairs that you can attach to the customer. 
     * It can be used to store additional information in a structured format. 
     * */
    metadata?: Record<string, unknown>;

}

export type CreateCustomerResponse = { message: string } & (
    {
        status: true;
        data: {
            email: string;
            integration: number;
            domain: string;
            customer_code: string;
            id: number;
            identified: boolean;
            identifications: null;
            createdAt: string;
            updatedAt: string;
        }
    } | PaystackResponseError)

export type ListCustomerData = {

    /** 
     * Specify how many records you want to retrieve per page. 
     * If not specify we use a default value of 50. 
     * */
    perPage: number;

    /** 
     * Specify exactly what page you want to retrieve. 
     * If not specify we use a default value of 1. 
     * */
    page: number;

    /** 
     * A timestamp from which to start listing customers
     *  @example 2016-09-24T00:00:05.000Z, 2016-09-21 
     * */
    from?: string;

    /** 
     * A timestamp at which to stop listing customers 
     * @example 2016-09-24T00:00:05.000Z, 2016-09-21 
     * */
    to?: string;
}

export type Customer = {
    integration: number;
    first_name: string | null;
    last_name: string | null;
    email: string;
    phone: string | null;
    metadata: Record<string, unknown> | null;
    domain: string;
    customer_code: string;
    risk_action: RiskAction;
    id: number;
    createdAt: string;
    updatedAt: string;
}

export type Meta = {
    next: string;
    previous: string | null;
    perPage: number;
}

export type ListCustomerResponse = { message: string } & ({
    status: true;
    data: Customer[];
    meta: Meta;
} | PaystackResponseError)


type Authorization = {
    authorization_code: string;
    bin: string;
    last4: string;
    exp_month: string;
    exp_year: string;
    channel: string;
    card_type: string;
    bank: string;
    country_code: string;
    brand: string;
    reusable: boolean;
    signature: string;
    account_name: string | null;
}

type FetchResponseData = {
    transactions: any[];
    subscriptions: any[];
    authorizations: Authorization[];
    first_name: string | null;
    last_name: string | null;
    email: string;
    phone: string | null;
    metadata: Record<string, unknown> | null;
    domain: string;
    customer_code: string;
    risk_action: RiskAction;
    id: number;
    integration: number;
    createdAt: string;
    updatedAt: string;
    created_at: string;
    updated_at: string;
    total_transactions: number;
    total_transaction_value: any[];
    dedicated_account: any | null;
    identified: boolean;
    identifications: any | null;
}

export type FetchCustomerResponse = {
    message: string;
} & ({
    status: true;
    data: FetchResponseData;
} | PaystackResponseError)

export type UpdateCustomerData = {
    /** Customer's first name */
    first_name?: string;

    /** Customer's last name */
    last_name?: string;

    /** Customer's phone number */
    phone?: string;

    /**
     *  A set of key/value pairs that you can attach to the customer. 
     * It can be used to store additional information in a structured format. 
     * */
    metadata?: Record<string, unknown>;
}

export type UpdateCustomerResponse = { message: string } & ({
    status: true;
    data: {
        integration: number;
        first_name: string;
        last_name: string;
        email: string;
        phone: string | null;
        metadata: Record<string, unknown> | null;
        identified: boolean;
        identifications: any | null;
        domain: string;
        customer_code: string;
        id: number;
        transactions: any[];
        subscriptions: any[];
        authorizations: any[];
        createdAt: string;
        updatedAt: string;
    }
} | PaystackResponseError)

export type ValidateCustomerData = {

    /** Customer's first name */
    first_name: string;

    /** Customer's last name */
    last_name: string;

    /** 
     * Predefined types of identification. 
     * Only bank_account is supported at the moment 
     * */
    type: string;

    /** Customer's identification number */
    value?: string

    /** 2 letter country code of identification issuer */
    country: string;

    /** Customer's Bank Verification Number */
    bvn: string;

    /** 
     * You can get the list of Bank Codes by calling the List Banks endpoint.
     *  (required if type is bank_account) 
     * */
    bank_code: string;

    /**
     *  Customer's bank account number.
     *  (required if type is bank_account)
     * */
    account_number: string;

    /** customer's middle name */
    middle_name?: string;
}

export type ValidateCustomerResponse = {
    status: boolean;
    message: string;
}

export type WhitelistBlacklistCustomerData = {
    /** Customer's code, or email address */
    customer: string;

    /**
     * One of the possible risk actions 
     * [ default, allow, deny ]. allow to whitelist. deny to blacklist. 
     * Customers start with a default risk action.
     */
    risk_action: RiskAction;

}

export type WhitelistBlacklistCustomerResponse = {
    message: string;
} & ({
    status: true;
    data: {
        first_name: string | null;
        last_name: string | null;
        email: string;
        phone: string | null;
        metadata: Record<string, unknown>;
        domain: string;
        identified: boolean;
        identifications: any | null;
        customer_code: string;
        risk_action: RiskAction;
        id: number;
        integration: number;
        createdAt: string;
        updatedAt: string;
    }
}
    | PaystackResponseError)

export type DeactivateAuthorizationResponse = { message: string } & ({
    status: true;
} | PaystackResponseError)