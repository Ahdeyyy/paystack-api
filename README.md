# paystack-api

A wrapper for the Paystack API with types.

## Installation

### NPM

```bash
    npm install //TODO
```

### PNPM

```bash
    pnpm add //TODO
```

### YARN

```bash
    yarn add //TODO
```

```BUN
    bun add //TODO
```

## Usage

### Payment request

#### Create payment request

```typescript
import { Paystack } from "//TODO"

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

## ROADMAP

- [x] Add support for payment requests

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

- [ ] Add support for customers

  - [x] Create Customer
  - [x] List Customers
  - [x] Fetch Customer
  - [x] Update Customer
  - [x] Validate Customer
  - [x] Whitelist/Blacklist Customer
  - [x] Deactivate Authorization
  - [x] Tests

## Testing

To run the tests, clone the repository

```bash
    git clone //TODO
```

```bash
    bun test
```
