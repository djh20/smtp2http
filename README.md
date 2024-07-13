# smtp2http
A Node.js application that functions as an SMTP server and forwards received emails to a specified HTTP webhook.

Useful for applications that only support email notifications, such as OpenMediaVault.

## Usage
### Running with Docker
Clone the repository:

```sh
git clone https://github.com/djh20/smtp2http.git
cd smtp2http
```

Build the Docker image:

```
docker build -t smtp2http .
```

Run the Docker container:

```
docker run -d -p 25:25 -e WEBHOOK_URL=https://yourwebhook.url/endpoint smtp2http
```

To test the setup, you can use an email client or a tool like telnet to send an email to the SMTP server.
