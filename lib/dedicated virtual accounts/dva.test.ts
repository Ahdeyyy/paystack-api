import { test, mock, expect } from "bun:test"
import { Paystack } from "../paystack"

// I can't test this suite properly because I don't have access to a nuban enabled business 
// so this test would only check if the functions accurately pings the api endpoint with
// an expectation to fail

const paystack = mock(() => new Paystack(import.meta.env.PAYSTACK_SECRET_KEY ?? ""))

test("create DVA", async () => {
    let response = await paystack().dva.create({ customer: import.meta.env.CUSTOMER_CODE ?? '' })
    expect(response.status).toBe(false)
})

test("assign DVA", async () => {
    let response = await paystack().dva.assign({
        email: "janedoe@test.com",
        first_name: "Jane",
        middle_name: "Karen",
        last_name: "Doe",
        phone: "+2348100000000",
        preferred_bank: "test-bank",
        country: "NG"

    })
    expect(response.status).toBe(false)
})
test("list DVA", async () => {
    let response = await paystack().dva.list({ active: true, currency: "NGN" });
    expect(response.status).toBe(false);
    if (response.status) {
        expect(response.data).toBeInstanceOf(Array)
        expect(response.meta.perPage).toBe(10)
    }
});

test("fetch DVA", async () => {
    let response = await paystack().dva.fetch("foo")
    expect(response.status).toBe(false)
})
test("requery DVA", async () => {
    let response = await paystack().dva.requery({ account_number: "98897", provider_slug: "wema-bank" });
    expect(response.status).toBe(false);
    if (response.status) {
        expect(response.message).toBeInstanceOf(String)
    }
});

test("delete DVA", async () => {
    let response = await paystack().dva.deactivate("foo")
    expect(response.status).toBe(false)
})

test("split DVA", async () => {
    let response = await paystack().dva.split({ customer: "janey" })
    expect(response.status).toBe(false)
})

test("remove split DVA", async () => {
    let response = await paystack().dva.remove_split("bar")
    expect(response.status).toBe(false)

})
