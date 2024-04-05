import { test, mock, expect } from "bun:test"
import { Paystack } from "./paystack"


const paystack = mock(() => new Paystack(import.meta.env.PAYSTACK_SECRET_KEY ?? ""))
const customer = mock(async () => await paystack().customer.create({ email: "customer@mail.com" }))

test("create customer", async () => {
    let response = await paystack().customer.create({ email: "test@mail.com", first_name: "john", last_name: "doe" });
    expect(response.status).toBe(true);
    if (response.status) {
        expect(response.data.email).toBe("test@mail.com")
    }

})

test("list customers", async () => {
    let response = await paystack().customer.list({ perPage: 10, page: 1 });
    expect(response.status).toBe(true);
    if (response.status) {
        expect(response.data).toBeInstanceOf(Array)
    }
});

test("fetch customer", async () => {
    let cust = (await customer())
    expect(cust.status).toBe(true)
    if (cust.status) {
        let response = await paystack().customer.fetch(cust.data.email)
        expect(response.status).toBe(true)
        if (response.status) {
            expect(response.data.email).toBe(cust.data.email)
            expect(response.data.id).toBe(cust.data.id)
        }

        response = await paystack().customer.fetch(cust.data.customer_code)
        expect(response.status).toBe(true)
        if (response.status) {
            expect(response.data.email).toBe(cust.data.email)
            expect(response.data.id).toBe(cust.data.id)
        }

    }

})

test("update customer", async () => {
    let cust = (await customer())
    expect(cust.status).toBe(true)
    if (cust.status) {
        let response = await paystack().customer.update(cust.data.customer_code, { first_name: "updated" })
        expect(response.status).toBe(true)
        if (response.status) {
            expect(response.data.first_name).toBe("updated")
        }
    }
})