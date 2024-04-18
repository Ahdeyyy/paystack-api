import { Customer } from "./customer/customer";
import { Product } from "./product/product";
import { PaymentRequest } from "./payment request/payment_request";
import { DedicatedVirtualAccounts } from "./dedicated virtual accounts/dva";

export class Paystack {
  private secret_key: string;
  private endpoint = "https://api.paystack.co";
  payment_request: PaymentRequest;
  customer: Customer;
  product: Product;
  /** Dedicated virtual accounts */
  dva: DedicatedVirtualAccounts;
  constructor(secret_key: string) {
    this.secret_key = secret_key;
    this.payment_request = new PaymentRequest(this.secret_key);
    this.customer = new Customer(this.secret_key);
    this.product = new Product(this.secret_key);
    this.dva = new DedicatedVirtualAccounts(this.secret_key);
  }
}
