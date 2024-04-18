import type { Currency, PaystackResponseError } from "../types";


export type CreateProductData = {
    /** Name of product */
    name: string;

    /** A description for this product */
    description: string;

    /** Price should be in the subunit of the supported currency */
    price: number;

    /**
     * Currency in which price is set
     */
    currency: Currency;

    /**
     * Set to true if the product has unlimited stock. Leave as false if the product has limited stock
     */

    unlimited?: boolean;

    /**
     * Number of products in stock.Use if unlimited is false
     */
    quantity?: number;
}


export type CreateProductResponseData = {
    name: string;
    description: string;
    currency: Currency;
    price: number;
    quantity: number;
    is_shippable: boolean;
    unlimited: boolean;
    integration: number;
    domain: string;
    metadata: {
        background_color: string;
    };
    slug: string;
    product_code: string;
    quantity_sold: number;
    type: string;
    shipping_fields: ShippingFields;
    active: boolean;
    in_stock: boolean;
    minimum_orderable: number;
    maximum_orderable: number | null;
    low_stock_alert: boolean;
    id: number;
    createdAt: string;
    updatedAt: string;
}

export type CreateProductResponse = { message: string } & ({
    status: true;
    data: CreateProductResponseData;
} | PaystackResponseError)

export type ListProductQuery = {

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

    [key: string]: any;
}


export type File = {
    key: string;
    type: string;
    path: string;
    original_filename: string;
}

export type ShippingFee = {
    region: string;
    fee: number;
    currency: Currency;
}

export type ShippingFields = {
    delivery_note: string;
    shipping_fees?: ShippingFee[];
}

interface ProductData {
    id: number;
    name: string;
    description: string;
    product_code: string;
    slug: string;
    currency: Currency;
    price: number;
    quantity: number;
    quantity_sold: number;
    active: boolean;
    domain: string;
    type: string;
    in_stock: boolean;
    unlimited: boolean;
    metadata: {
        background_color: string;
    };
    files: File[];
    success_message: string | null;
    redirect_url: string | null;
    split_code: string | null;
    notification_emails: string | null;
    minimum_orderable: number;
    maximum_orderable: number | null;
    createdAt: string;
    updatedAt: string;
    digital_assets: any[];
    variant_options: any[];
    is_shippable: boolean;
    shipping_fields: ShippingFields;
    integration: number;
    low_stock_alert: number;
}

export type ListProductResponse = { message: string; } & ({
    status: true;
    data: ProductData[];
    meta: {
        total: number;
        skipped: number;
        perPage: number;
        page: number;
        pageCount: number;
    }
} | PaystackResponseError)

export type FetchProductResponse = { message: string; } & ({
    status: true;
    data: {
        digital_assets: any[];
        integration: number;
        name: string;
        description: string;
        product_code: string;
        price: number;
        currency: Currency;
        quantity: number;
        quantity_sold: number | null;
        type: string;
        files: any | null;
        file_path: any | null;
        is_shippable: boolean;
        shipping_fields: ShippingFields;
        unlimited: boolean;
        domain: string;
        active: boolean;
        features: any | null;
        in_stock: boolean;
        metadata: {
            background_color: string;
        };
        slug: string;
        success_message: string | null;
        redirect_url: string | null;
        split_code: string | null;
        notification_emails: string | null;
        minimum_orderable: number;
        maximum_orderable: number | null;
        low_stock_alert: boolean;
        stock_threshold: any | null;
        expires_in: any | null;
        id: number;
        createdAt: string;
        updatedAt: string;
    }
} | PaystackResponseError)

export type UpdateProductData = {
    /** Name of product */
    name?: string;

    /** A description for this product */
    description?: string;

    /** Price should be in the subunit of the supported currency */
    price?: number;

    /**
     * Currency in which price is set
     */
    currency?: Currency;

    /**
     * Set to true if the product has unlimited stock. Leave as false if the product has limited stock
     */

    unlimited?: boolean;

    /**
     * Number of products in stock.Use if unlimited is false
     */
    quantity?: number;
}
export type UpdateProductResponse = CreateProductResponse;
