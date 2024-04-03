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

### Creating an invoice

```typescript
import { Paystack } from "//TODO"

const paystack = new Paystack({
  secret_key: secret_key,
})

const invoice = await paystack.invoice.create({
  amount: 10000,
  description: "Payment for goods",
  due_date: "2022-12-31",
  customer: "CUS_1234567890",
})
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

## Testing

To run the tests, clone the repository

```bash
    git clone //TODO
```

```bash
    bun test
```
