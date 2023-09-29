import "dotenv/config"

export const config = {
  mailgun: {
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
    authUser: process.env.MAILGUN_AUTHUSER,
  },
  testInbox: {
    apikey: process.env.TESTMAIL_API_KEY,
    email: process.env.TESTMAIL_EMAIL_ADDRESS,
  },
  mongo: {
    user: "admin",
    password: process.env.MONGO_PASSWORD,
    address: "localhost",
    port: "27017",
  },
  postgreSQl: {
    user: "admin",
    host: "localhost",
    database: "my-project",
    password: process.env.POSTGRES_PASSWORD,
  },
}
