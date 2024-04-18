# paystack-api

A wrapper for the Paystack API with types.

## Installation

### NPM

```bash
    npm install @ahdeyy/paystack
```

### PNPM

```bash
    pnpm add @ahdeyy/paystack
```

### YARN

```bash
    yarn add @ahdeyy/paystack
```

### BUN

```bash
    bun add @ahdeyy/paystack
```

## Usage

### Patterns

After using an API, check if the status of the call is true to work with the success response

```typescript
import { Paystack } from "@ahdeyy/paystack"

// create the paystack object

const paystack = new Paystack({ secret_key: secret })

const created_request = await paystack.payment_request.create({
  amount: 10000,
  description: "Payment for goods",
  due_date: "2022-12-31",
  customer: "customer id",
})

// Check the status of the response
if (created_request.status) {
  // Work with the response success data
} else {
  // Work with the response error data
}
```

### Payment request

#### Create payment request

```typescript
const paystack = new Paystack({
  secret_key: secret_key,
})

const created_request = await paystack.payment_request.create({
  amount: 10000,
  description: "Payment for goods",
  due_date: "2022-12-31",
  customer: "customer id",
})
```

#### Update payment request

```typescript
const updated_request = await paystack.payment_request.update({
  amount: 10000,
  description: "Payment for goods",
  due_date: "2022-12-31",
  customer: "customer id",
})
```

#### Fetch payment request

```typescript
const fetched_request = await paystack.payment_request.fetch("request id")
```

#### List payment requests

```typescript
const list = await paystack.payment_request.list(query)
```

#### Verify payment request

```typescript
const verified_request = await paystack.payment_request.verify("request id")
```

#### Send Notification

```typescript
const sent_notification = await paystack.payment_request.sendNotification(
  "request id"
)
```

#### Payment request total

```typescript
const total = await paystack.payment_request.total()
```

#### Finalize payment request

```typescript
const finalized_request = await paystack.payment_request.finalize("request id")
```

#### Archive payment request

```typescript
const archived_request = await paystack.payment_request.archive("request id")
```

### Customer

#### Create customer

```typescript
const customer = await paystack.customer.create({
  email: "test@mail.com",
  first_name: "john",
  last_name: "doe",
})
```

#### List customers

```typescript
const customer = await paystack.customer.list({ perPage: 10, page: 1 })
```

#### Fetch customer

```typescript
const customer = await paystack.customer.fetch(customers_email)
```

#### Validate customer

```typescript
const customer = await paystack.customer.validate(customer_code, {
  country,
  type,
  account_number,
  bvn,
  bank_code,
  first_name,
  last_name,
})
```

#### Update customer

```typescript
const customer = await paystack.customer.update(customer_code, { phone })
```

#### Whitelist/Blacklist customer

```typescript
const customer = await paystack.customer.whitelist_blacklist({
  customer: customer_code,
  risk_action: "deny",
})
```

#### Deactivate Authorization

```typescript
const customer = await paystack.customer.deactivate_authorization(
  Authorization_code
)
```

### Product

#### Create product

```typescript
const product = await paystack.product.create({
  name: "sakura",
  description: "cherry blossom",
  price: 10000,
  currency: "NGN",
})
```

#### List products

```typescript
const product = await paystack.product.list({ perPage: 10, page: 1 })
```

#### Fetch product

```typescript
const product = await paystack.product.fetch(product_id)
```

#### Update product

```typescript
const product = await paystack.product.update(product_id, { price: 69420 })
```

### Dedicated Virtual Accounts

#### Create DVA
```typescript
    const response = await paystack().dva.create({ customer: import.meta.env.CUSTOMER_CODE ?? '' })
```
#### Assign DVA
```typescript
    const response = await paystack().dva.assign({
        email: "janedoe@test.com",
        first_name: "Jane",
        middle_name: "Karen",
        last_name: "Doe",
        phone: "+2348100000000",
        preferred_bank: "test-bank",
        country: "NG"

    })
```
#### List DVA
```typescript
    const response = await paystack().dva.list({ active: true, currency: "NGN" });
```
#### Fetch DVA
```typescript
    const response = await paystack().dva.fetch("foo")
```
#### Requery DVA
```typescript
    const response = await paystack().dva.requery({ account_number: "98897", provider_slug: "wema-bank" });
```
#### Deactivate DVA
```typescript
    const response = await paystack().dva.deactivate("foo")
```
#### Split DVA
```typescript
    const response = await paystack().dva.split({ customer: "janey" })
```

#### Remove split DVA
```typescript
    const response = await paystack().dva.remove_split("bar")
```
#### Fetch bank providers
```typescript
    const response = await paystack().dva.fetch_bank_providers();
```

## ROADMAP

- [x] Requests

  - [x] Create payment request
  - [x] Update payment request
  - [x] Fetch payment request
  - [x] List payment requests
  - [x] Verify payment request
  - [x] Send Notification
  - [x] Payment request total
  - [x] Finalize payment request
  - [x] Archive payment request
  - [x] Tests

- [x] Customers

  - [x] Create Customer
  - [x] List Customers
  - [x] Fetch Customer
  - [x] Update Customer
  - [x] Validate Customer
  - [x] Whitelist/Blacklist Customer
  - [x] Deactivate Authorization
  - [x] Tests

- [x] Products

  - [x] Create Product
  - [x] List Products
  - [x] Fetch Product
  - [x] Update Product
  - [x] Tests

- [ ] Dedicated Virtual Accounts
  - [x] Create Dedicated Virtual Account
  - [x] Assign Dedicated Virtual Account
  - [x] List Dedicated Accounts
  - [x] Fetch Dedicated Account
  - [x] Requery Dedicated Account
  - [x] Deactivate Dedicated Account
  - [x] Split Dedicated Account Transaction
  - [x] Remove Split from Dedicated Account
  - [x] Fetch Bank Providers
  - [ ] Tests

- [ ] Transactions
- [ ] Transaction Splits
- [ ] Terminal
- [ ] Apple Pay
- [ ] Subaccounts
- [ ] Plans
- [ ] Subscriptions
- [ ] Payment Pages
- [ ] Settlements
- [ ] Transfer Recipients
- [ ] Transfers
- [ ] Transfers Control
- [ ] Bulk Charges
- [ ] Integration
- [ ] Charge
- [ ] Disputes
- [ ] Refunds
- [ ] Verification
- [ ] Miscellanous

## Testing

To run the tests, clone the repository

```bash
    git clone https://github.com/Ahdeyyy/paystack-api.git
```

```bash
    bun test
```
