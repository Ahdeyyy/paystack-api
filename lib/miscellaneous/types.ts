import type { Currency, PaystackResponseError } from "../types";

export type ListBanksQuery = {
    /** The country from which to obtain the list of supported banks. e.g country=ghana or country=nigeria */
    country: string;
    /** Flag to enable cursor pagination on the endpoint */
    use_cursor: boolean;

    /** The number of objects to return per page. Defaults to 50, and limited to 100 records per page. */
    perPage: number;


    /** A flag to filter for banks a customer can pay directly from */
    pay_with_bank?: boolean;

    /** A flag to filter the banks that are supported for account 
     * verification in South Africa.
     * You need to combine this with either the currency or country filter. 
     * */
    enabled_for_verification?: boolean;

    /** A cursor that indicates your place in the list. It can be used to fetch the next page of the list */
    next?: string;

    /** A cursor that indicates your place in the list.
     * It should be used to fetch the previous page of the list after an intial next request 
     * */
    previous?: string;

    /** The gateway type of the bank. It can be one of these: [emandate, digitalbankmandate] */
    gateway?: string;

    /** Type of financial channel. 
     * For Ghanaian channels, please use either mobile_money for mobile money channels OR ghipps for bank channels 
     * */
    type?: string;

    /** One of the supported currency */
    currency?: Currency;

    [key: string]: any;
}

type BankData = {
    name: string;
    slug: string;
    code: string;
    longcode: string;
    // TODO: unknown type
    gateway: any | null;
    pay_with_bank: boolean;
    active: boolean;
    is_deleted: boolean;
    country: string;
    currency: string;
    type: string;
    id: number;
    createdAt: string;
    updatedAt: string;
};

type Meta = {
    next: string | null;
    previous: string | null;
    perPage: number;
};

export type ListBanksResponse = { message: string } & ({
    status: true;
    data: BankData[];
    meta: Meta;
} | PaystackResponseError)
