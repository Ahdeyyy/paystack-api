import { test, mock, expect } from "bun:test"
import { Paystack } from "./paystack"


const paystack = mock(() => new Paystack(import.meta.env.PAYSTACK_SECRET_KEY ?? ""))
const customer = mock(async () => await paystack().customer.create({ email: "customer@mail.com" }))
const blacklist_customer = mock(async () => await paystack().customer.create({ email: "blacklist@me.co" }))

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


test.skip("validate customer", async () => {
    // Remove the .skip to run this test, and add it back after running the test
    let cust = (await customer())
    expect(cust.status).toBe(true)
    if (cust.status) {

        let response = await paystack().customer.validate(cust.data.customer_code, { country: "NG", type: "bank_account", account_number: "0123456789", bvn: "20012345677", bank_code: "007", first_name: "Asta", last_name: "Lavista" })
        expect(response.status).toBe(true)

    }
})
test("update customer", async () => {
    let cust = (await customer())
    expect(cust.status).toBe(true)
    if (cust.status) {
        let response = await paystack().customer.update(cust.data.customer_code, { phone: "08012345678" })

        expect(response.status).toBe(true)
        if (response.status) {
            expect(response.data.phone).toBe("08012345678")
        }
    }
})



test("blacklist customer", async () => {
    let cust = (await blacklist_customer())
    expect(cust.status).toBe(true)
    if (cust.status) {
        let response = await paystack().customer.whitelist_blacklist({ customer: cust.data.customer_code, risk_action: "deny" })
        expect(response.status).toBe(true)
        if (response.status) {
            expect(response.data.risk_action).toBe("deny")
        }
    }
})

test("set risk action to default customer", async () => {
    let cust = (await blacklist_customer())
    expect(cust.status).toBe(true)
    if (cust.status) {
        let response = await paystack().customer.whitelist_blacklist({ customer: cust.data.customer_code, risk_action: "default" })
        expect(response.status).toBe(true)
        if (response.status) {
            expect(response.data.risk_action).toBe("default")
        }
    }
})

test("blacklist customer", async () => {
    let cust = (await blacklist_customer())
    expect(cust.status).toBe(true)
    if (cust.status) {
        let response = await paystack().customer.whitelist_blacklist({ customer: cust.data.customer_code, risk_action: "deny" })
        expect(response.status).toBe(true)
        if (response.status) {
            expect(response.data.risk_action).toBe("deny")
        }
    }
})

test("deactivate authorization", async () => {
    let response = await paystack().customer.deactivate_authorization("AUTH_72btv547")
    expect(response.status).toBe(false)
})