import { test, mock, expect } from "bun:test"
import { Paystack } from "../paystack"


const paystack = mock(() => new Paystack(import.meta.env.PAYSTACK_SECRET_KEY ?? ""))
const request_item = mock(() => paystack().payment_request.create({ amount: 1000, customer: import.meta.env.CUSTOMER_CODE ?? "", send_notification: false }))
const draft_request_item = mock(() => paystack().payment_request.create({ amount: 1000, customer: import.meta.env.CUSTOMER_CODE ?? "", draft: true }))

test(
    "create payment request", async () => {
        let response = await paystack().payment_request.create({ amount: 1000, customer: import.meta.env.CUSTOMER_CODE ?? "", send_notification: false })
        expect(response.status).toBe(true)
    })

test(
    "list payment request", async () => {
        let response = await paystack().payment_request.list({ perPage: 10 })
        expect(response.status).toBe(true)
        if (response.status) {
            expect(response.meta.perPage).toBe(10)
        }
    })

test(
    "fetch payment request", async () => {
        const item = await request_item()
        if (!item.status) throw new Error("failed to create payment request")
        let response = await paystack().payment_request.fetch(item.data.request_code)
        expect(response.status).toBe(true)
    })

test(
    "verify payment request", async () => {
        const item = await request_item()
        if (!item.status) throw new Error("failed to create payment request")
        let response = await paystack().payment_request.verify(item.data.request_code)
        expect(response.status).toBe(true)
    })

test(
    "send notification for payment request", async () => {
        const item = await request_item()
        if (!item.status) throw new Error("failed to create payment request")
        let response = await paystack().payment_request.send_notification(item.data.request_code)
        expect(response.status).toBe(true)
    })

test(
    "finalize payment request", async () => {
        const item = await draft_request_item()
        if (!item.status) throw new Error("failed to create payment request")
        let response = await paystack().payment_request.finalize(item.data.request_code, false)
        expect(response.status).toBe(true)
    })

test(
    "update payment request", async () => {
        const item = await request_item()
        if (!item.status) throw new Error("failed to create payment request")
        let response = await paystack().payment_request.update(item.data.request_code, { amount: 2000, customer: import.meta.env.CUSTOMER_CODE ?? "" })
        expect(response.status).toBe(true)
        if (response.status) expect(response.data.amount).toBe(2000)
    })

test(
    "payment request total", async () => {
        let response = await paystack().payment_request.total()
        expect(response.status).toBe(true)
    })

test(
    "archive payment request", async () => {
        const item = await request_item()
        if (!item.status) throw new Error("failed to create payment request")
        let response = await paystack().payment_request.archive(item.data.request_code)
        expect(response.status).toBe(true)
    })
