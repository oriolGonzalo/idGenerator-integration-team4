import { describe, it, expect } from "vitest"
import { EmailSenderMailgun } from "./EmailSenderMailgun"
import { User } from "../../domain/models/User"
import { UserEmail } from "../../domain/models/UserEmail"
import { config } from "../Shared/config"
import { TestInbox } from "./TestInbox"

const testInbox = new TestInbox()
const id = "00000000-0000-0000-0000-000000000000"
const name = "John Doe"
const age = 18
const password = "password"
const email = config.testInbox.email
const user = User.create(id, name, email, password, age)

describe("EmailSenderMailgun", () => {
  it("sends email to a user", async () => {
    const esm = new EmailSenderMailgun()
    await esm.sendWelcomeEmail(user)
    const lastEmail = await testInbox.getLastEmail()

    expect(lastEmail.text).toMatch("Testing some Meowgun pawsomeness!")
  })

  it("throws an error if email is invalid", async () => {
    const esm = new EmailSenderMailgun()

    const invalidEmail = "@"

    const id = "00000000-0000-0000-0000-000000000000"
    const name = "John Doe"
    const email = invalidEmail
    const age = 18
    const password = "password"
    const user = User.create(id, name, email, password, age)

    const result = esm.sendWelcomeEmail(user)

    expect(result).rejects.toThrow("to parameter is not a valid address. please check documentation")
  })

  it("throws an error if credentials are invalid", async () => {
    const emailSender = new EmailSenderMailgun({
      apiKey: "invalid",
    })

    const id = "00000000-0000-0000-0000-000000000000"
    const name = "John Doe"
    const email = config.testInbox.email
    const age = 18
    const password = "password"
    const user = User.create(id, name, email, password, age)

    const result = emailSender.sendWelcomeEmail(user)

    expect(result).rejects.toThrow("Invalid API key")
  })
})
