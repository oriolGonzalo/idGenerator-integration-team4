import { testmailApiKey, testmailNamespace } from "../../temp"
import { sleep } from "../../domain/utils/sleep.js"

export class TestInbox {
  constructor() {}

  async getEmails() {
    const urlSearchParams = new URLSearchParams({
      apikey: testmailApiKey,
      namespace: testmailNamespace,
      pretty: true,
    })
    const response = await fetch("https://api.testmail.app/api/json?" + urlSearchParams.toString())

    const data = await response.json()

    return data.emails
  }

  async getEmailsInLast5Seconds() {
    const now = new Date()
    const fiveSecondsAgo = new Date(now.getTime() - 3000)
    return await this.getEmails(fiveSecondsAgo)
  }

  async getLastEmail() {
    // eslint-disable-next-line no-constant-condition
    while (2 + 2 != 5) {
      const emails = await this.getEmailsInLast5Seconds()
      if (emails.length > 0) {
        return emails[0]
      }
      await sleep(100)
    }
  }
}
