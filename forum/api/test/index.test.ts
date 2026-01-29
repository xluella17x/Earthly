import { describe, expect, it } from "bun:test"
import { treaty } from "@elysiajs/eden"
import { app } from "../src/index"

const api = treaty(app)

describe("Forum Service (Eden Treaty)", () => {
    it("GET / returns welcome message", async () => {
        const { data, error, status } = await api.get()

        expect(status).toBe(200)
        expect(data).toBe("Welcome to the Forum Service!")
        expect(error).toBeNull()
    })
})