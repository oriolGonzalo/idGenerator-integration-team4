import { EmailSender } from "../../domain/services/EmailSender";
import { apiKey, superSecretEmail } from "../../temp";

export class EmailSenderMailgun extends EmailSender {
    static async sendWelcomeEmail(user) {
        const mailgunUser = "api";

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic " + btoa(mailgunUser + ":" + apiKey));

        var formdata = new FormData();
        formdata.append("from", "Excited User <mailgun@sandboxaaadf81e097c4215bc6a704230a2bf71.mailgun.org>");
        formdata.append("to", superSecretEmail);
        formdata.append("subject", "Hello");
        formdata.append("text", "Testing some Mailgun awesomeness!");

        const fetchResult = await fetch("https://api.mailgun.net/v3/sandboxaaadf81e097c4215bc6a704230a2bf71.mailgun.org/messages", {
            method: 'POST',
            headers: myHeaders,
            body: formdata
        });
        const result = await fetchResult.json();
    }
}