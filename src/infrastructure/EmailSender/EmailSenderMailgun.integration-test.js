import { describe, expect, it } from "vitest"
import { EmailSenderMailgun } from "./EmailSenderMailgun"
import { User } from "../../domain/models/User"
import { superSecretEmail } from "../../temp"

describe("EmailSenderMailgun", () => {
    it.only("sends email to a user", async () => {
        const id = "00000000-0000-0000-0000-000000000000";
        const name = "John Doe";
        const age = 18;
        const password = "password";
        const email = superSecretEmail;
        const user = User.create(id, name, email, password, age);

        const result = await EmailSenderMailgun.sendWelcomeEmail(user);
    })
})