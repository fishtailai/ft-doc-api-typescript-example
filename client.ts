import axios from "axios";
import fs from "fs";

const fishtailEndpoint = "https://api.fishtail.app/v1/";
const apiKey = process.env.FISHTAIL_API_KEY;

///////////////////////////////////////////////////////////////////////////////
// 1) create an API client that uses your API key
///////////////////////////////////////////////////////////////////////////////
const client = axios.create({
  baseURL: fishtailEndpoint,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + apiKey,
  },
});

///////////////////////////////////////////////////////////////////////////////
// 2) set up a webhook to receive events
// (you will only need to do this once)
///////////////////////////////////////////////////////////////////////////////

// GET / webhooks (on a brand new API key) returns an empty array
// because we haven't created any webhooks yet!
let { data: webhooks } = await client.get("/webhooks");
console.log(webhooks); // => []

// create a new webhook that listens for the "documents.digitized" event
// and sends a POST request to https://mheld.tunnelto.dev/incoming-webhook
// there's an example server that listens for this event in server.ts
//
// I use tunnelto.dev to expose my local server to the internet but you'll
// want to use your own server here :)
const { data: newWebhook } = await client.post("/webhooks", {
  webhook: {
    url: "https://mheld.tunnelto.dev/incoming-webhook",
    events: ["documents.digitized"],
  },
});
console.log(newWebhook); // => { id: "ABC", url: "https...}

// GET /webhooks now contains the webhook we just created
webhooks = (await client.get("/webhooks")).data;
console.log(webhooks); // => [{ id: "ABC", url: "https...}]

// you can DELETE a webhook by ID (as well as modify via PATCH)
// await client.delete(`/webhooks/${newWebhook.id}`);
// webhooks = (await client.get("/webhooks")).data;
// console.log(webhooks); // => []

///////////////////////////////////////////////////////////////////////////////
// 3) start sending over documents!
///////////////////////////////////////////////////////////////////////////////

// GET /documents (on a brand new API key) returns an empty array
// because we haven't created any documents yet!
let { data: documents } = await client.get("/documents");
console.log(documents); // => []

// read in file blob
const fileBlob = fs.createReadStream("../test-files/IMG_20230906_165753.jpg");

// note that we are using the postForm method here
// POST /documents takes a multipart/form-data request
// the postForm method will automatically set the correct headers
const { data: createdDocument } = await client.postForm("/documents", {
  // document[file] should also work
  document: {
    file: fileBlob,
  },
});
console.log(createdDocument); // => { id: "123", status: "pending"...}

// IMPORTANT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// the above POST request will trigger the webhook we created earlier once we
// finish reading/parsing the document

// GET /documents now returns the document we just created
documents = (await client.get("/documents")).data;
console.log(documents); // => [{ id: "123", status: "pending"...}]
// the status will change to "pending" to "processing" to "processed"/"failed"
// as the document moves through the processing pipeline

///////////////////////////////////////////////////////////////////////////////
// 4) webhok notification debugging
///////////////////////////////////////////////////////////////////////////////
// some time later we should get a webhook notification
// const { data: webhookNotifications } = await client.get(
//   "/webhook_notifications"
// );

// you can retry a webhook notification by ID
// await client.post(
//   `/webhook_notifications/${webhookNotifications[0].id}/retry_delivery`
// );
