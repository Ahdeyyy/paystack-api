import { PaymentRequest } from "./payment_request";
import { Customer } from "./customer";
import { Product } from "./product";

export class Paystack {
  private secret_key: string;
  private endpoint = "https://api.paystack.co";
  payment_request: PaymentRequest;
  customer: Customer;
  product: Product;
  constructor(secret_key: string) {
    this.secret_key = secret_key;
    this.payment_request = new PaymentRequest(this.secret_key);
    this.customer = new Customer(this.secret_key);
    this.product = new Product(this.secret_key);
  }

  get_endpoint(): string {
    return this.endpoint;
  }
}
