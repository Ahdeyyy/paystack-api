import type { PaystackResponseError, RiskAction } from "../types"
export type {
    RiskAction
}

export type Meta = {
    next: string;
    previous: string | null;
    perPage: number;
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
    international_format_phone: unknown
}

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

export type CreateCustomerResponse = { message: string } & ({
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

export type FetchCustomerResponse = { message: string; } & ({
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

export type WhitelistBlacklistCustomerResponse = { message: string; } & ({
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
} | PaystackResponseError)

export type DeactivateAuthorizationResponse = { message: string } & ({
    status: true;
} | PaystackResponseError)