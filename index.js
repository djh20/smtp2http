import { SMTPServer } from "smtp-server";
import { simpleParser } from "mailparser";
import axios from "axios";
import "dotenv/config";

const SMTP_PORT = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 25;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

const server = new SMTPServer({
  authOptional: true,
  onData(stream, session, callback) {
    simpleParser(stream).then((mail) => {
      console.log(`Mail received: ${mail.subject}`);
      if (!WEBHOOK_URL) return;
      
      axios.post(WEBHOOK_URL, mail)
        .then(() => console.log(`Sent mail to ${WEBHOOK_URL}`))
        .catch((err) => console.log(err));
    });
    
    stream.on("end", callback);
  },
});

server.listen(SMTP_PORT, null, null, () => {
  console.log(`Listening on port ${SMTP_PORT}`)
});

server.on("error", (err) => console.log(err.message));

process.on("SIGTERM", () => process.exit());