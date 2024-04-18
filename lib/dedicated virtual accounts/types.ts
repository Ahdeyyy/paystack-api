import type { Currency, PaystackResponseError, RiskAction } from '../types.ts';

export type CreateDVAData = {
    /**
     * Customer ID or code
     * */
    customer: string;

    /**
     * The bank slug for preferred bank. 
     * To get a list of available banks, use the List Banks endpoint, 
     * passing pay_with_bank_transfer=true query parameter
     * */
    preferred_bank?: string;

    /**
     * Subaccount code of the account you want to split the transaction with
     */
    subaccount?: string;

    /**
     * Split code consisting of the lists of accounts you want to split the transaction with
     */
    split_code?: string;

    /** Customer's first name */
    first_name?: string;

    /** Customer's last name */
    last_name?: string;

    /** Customer's phone number */
    phone?: string;
}


type Bank = {
    name: string;
    id: number;
    slug: string;
}

type Assignment = {
    integration: number;
    assignee_id: number;
    assignee_type: string;
    expired: boolean;
    account_type: string;
    assigned_at: string;
}

type Customer = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    customer_code: string;
    phone: string;
    risk_action: RiskAction;
    international_format_phone: string | null;
};

type CreateDVAResponseData = {
    bank: Bank;
    account_name: string;
    account_number: string;
    assigned: boolean;
    currency: Currency;
    metadata: any | null;
    active: boolean;
    id: number;
    created_at: string;
    updated_at: string;
    assignment: Assignment;
    customer: Customer;
}

export type CreateDVAResponse = { message: string; } & ({
    status: true;
    data: CreateDVAResponseData;
} | PaystackResponseError)


export type AssignDVAData = {
    /** Customer's email */
    email: string;

    /** Customer's first_name */
    first_name: string;

    /** Customer's last_name */
    last_name: string;

    /** Customer's phone number */
    phone: string;

    /** The bank slug for preferred bank. 
     * To get a list of available banks, use the List Banks endpoint, 
     * passing pay_with_bank_transfer=true query parameter
    * */
    preferred_bank: string;

    /** Currently accepts NG only */
    country: string;

    /** Customer's account number */
    account_number?: string;

    /** Customer's Bank Verification Number */
    bvn?: string;

    /** Customer's bank code */
    bank_code?: string;

    /** Subaccount code of the account you want to split the transaction with */
    subaccount?: string;

    /** Split code consisting of the lists of accounts you want to split the transaction with */
    split_code?: string;

    /** Customer's middle name */
    middle_name: string;
}

export type AssignDVAResponse = { message: string; } & ({
    status: true
} | PaystackResponseError)


export type ListDVAQuery = {
    /** Status of the dedicated virtual account */
    active: boolean;

    /** The currency of the dedicated virtual account. Only NGN is currently allowed */
    currency: Currency;

    /** The bank's slug in lowercase, without spaces e.g. wema-bank */
    provider_slug?: string;

    /** he bank's ID e.g. 035 */
    bank_id?: string;

    /** The customer's ID */
    customer?: string;
}



type SplitConfig = {
    subaccount: string;
};

type ManagedAccount = {
    customer: Customer;
    bank: Bank;
    id: number;
    account_name: string;
    account_number: string;
    created_at: string;
    updated_at: string;
    currency: Currency;
    split_config: SplitConfig;
    active: boolean;
    assigned: boolean;
};

type Meta = {
    total: number;
    skipped: number;
    perPage: number;
    page: number;
    pageCount: number;
};

export type ListDVAResponse = { message: string } & ({
    status: true;
    data: Array<ManagedAccount>;
    meta: Meta;
} | PaystackResponseError)

type Provider = {
    id: number;
    provider_slug: string;
    bank_id: number;
    bank_name: string;
};


type DedicatedAccount = {
    id: number;
    account_name: string;
    account_number: string;
    created_at: string;
    updated_at: string;
    currency: Currency;
    active: boolean;
    assigned: boolean;
    provider: Provider;
    assignment: Assignment;
};

type FetchResponseData = {
    transactions: any[];
    subscriptions: any[];
    authorizations: any[];
    first_name: string | null;
    last_name: string | null;
    email: string;
    phone: string | null;
    metadata: any | null;
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
    dedicated_account: DedicatedAccount;
};

export type FetchDVAResponse = { message: string } & ({
    status: true;
    data: FetchResponseData
} | PaystackResponseError)
