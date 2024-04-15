
import { test, mock, expect } from "bun:test"
import { Paystack } from "./paystack"


const paystack = mock(() => new Paystack(import.meta.env.PAYSTACK_SECRET_KEY ?? ""))
const product = mock(async () => await paystack().product.create({
    name: "mithril", description: "a rare and mythical item", price: 9999999999, currency: "NGN"
})
)
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

test("fetch a product", async () => {
    const pro = await product()
    expect(pro.status).toBe(true)
    if (pro.status) {
        let response = await paystack().product.fetch(pro.data.id)
        expect(response.status).toBe(true)
        if (response.status) {
            expect(response.data.id).toBe(pro.data.id)
            expect(response.data.name).toBe(pro.data.name)
            expect(response.data.description).toBe(pro.data.description)
        }
    }
})

test("update a product", async () => {
    const pro = await product()
    expect(pro.status).toBe(true)
    if (pro.status) {
        const response = await paystack().product.update(pro.data.id, { price: 69420 })
        expect(response.status).toBe(true)
        if (response.status) {
            expect(response.data.price).toBe(69420)
        }
    }
})
