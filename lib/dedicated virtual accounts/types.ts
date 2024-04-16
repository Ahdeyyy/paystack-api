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
}

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
