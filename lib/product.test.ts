
import { test, mock, expect } from "bun:test"
import { Paystack } from "./paystack"


const paystack = mock(() => new Paystack(import.meta.env.PAYSTACK_SECRET_KEY ?? ""))
// const customer = mock(async () => await paystack().customer.create({ email: "customer@mail.com" }))
// const blacklist_customer = mock(async () => await paystack().customer.create({ email: "blacklist@me.co" }))

test("create product", async () => {
    let response = await paystack().product.create({ name: "sakura", description: "cherry blossom", price: 10000, currency: "NGN" })
    expect(response.status).toBe(true)
    if (response.status) {
        expect(response.data.name).toBe("sakura")
        expect(response.data.description).toBe("cherry blossom")
    }

})

test("list products", async () => {
    let response = await paystack().product.list({ perPage: 10, page: 1 })
    expect(response.status).toBe(true);
    if (response.status) {
        expect(response.data).toBeInstanceOf(Array)
        expect(response.meta.perPage).toBe(10)
    }
})
