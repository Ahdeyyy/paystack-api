import { Paystack } from "../paystack";
import { test, mock, expect } from "bun:test"


const paystack = mock(() => new Paystack(import.meta.env.PAYSTACK_SECRET_KEY ?? ""))

test("list banks", async () => {
    const response = await paystack().miscellaneous.list_banks({ country: "nigeria", use_cursor: true, perPage: 40 })
    expect(response.status).toBe(true)

    if (response.status) {
        expect(response.data).toBeInstanceOf(Array)
        expect(response.meta.perPage).toBe(40)
    }
})

test("list countries", async () => {
    const response = await paystack().miscellaneous.list_countries()
    expect(response.status).toBe(true)

    if (response.status) {
        expect(response.data).toBeInstanceOf(Array)
    }
})
