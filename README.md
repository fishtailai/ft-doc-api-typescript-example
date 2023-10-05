This project consists of two files -- client.ts + server.ts

server.ts is an example development server to show how to ingest webhooks
client.ts is a fishtail client that shows a single webhook/document creation

`npm run server` spins up a local server that can handle an incoming webhook
`npm run client` connects to the fishtail api, creates a webhook + document

I highly recommend doing local development with tunnelto.dev to tunnel your
local server through the internet! ngrok or localtunnel also works
