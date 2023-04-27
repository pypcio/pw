const express = require("express");
const webpush = require("web-push");
const bodyparser = require("body-parser");

const port = 8080;
const vapidDetails = {
  publicKey:
    "BAxlMZZzox2QO5gfZJ6ScvGqUvRcZIB7_h14tHqZ0lyEuDWh1DzPGV7bLV-ILtyGoFgMEBCi6TgiQoDFoIHaww4",
  privateKey: "yQe0VoLOh5LPIEVCiO9f7hc5K0n_upXervpa2YpRyxQ",
  subject: "Aronek",
};

const subscriptions = [];

function sendNotifications(subscriptions) {
  const notification = JSON.stringify({
    title: "Hello, Notifications!",
    options: {
      body: `ID: ${Math.floor(Math.random() * 100)}`,
    },
  });
  const options = {
    TTL: 10000,
    vapidDetails: vapidDetails,
  };
  subscriptions.forEach((subscription) => {
    const endpoint = subscription.endpoint;
    const id = endpoint.substr(endpoint.length - 8, endpoint.length);
    webpush
      .sendNotification(subscription, notification, options)
      .then((result) => {
        console.log(`Endpoint ID: ${id}`);
        console.log(`Result: ${result.statusCode}`);
      })
      .catch((error) => {
        console.log(`Endpoint ID: ${id}`);
        console.log(`Error: ${error} `);
      });
  });
}

const app = express();
app.use(bodyparser.json());
app.use(express.static("public"));

app.post("/add-subscription", (request, response) => {
  console.log(`Subscribing ${request.body.endpoint}`);
  subscriptions.push(request.body);
  response.sendStatus(200);
});

app.post("/remove-subscription", (request, response) => {
  console.log(`Unsubscribing ${request.body.endpoint}`);
  const index = subscriptions.findIndex(
    (subscription) => subscription.endpoint === request.body.endpoint
  );
  if (index !== -1) {
    subscriptions.splice(index, 1);
  }
  response.sendStatus(200);
});

app.post("/notify-me", (request, response) => {
  console.log(`Notifying ${request.body.endpoint}`);
  const subscription = subscriptions.find(
    (subscription) => subscription.endpoint === request.body.endpoint
  );
  if (subscription) {
    sendNotifications([subscription]);
    response.sendStatus(200);
  } else {
    response.sendStatus(404);
  }
});

app.post("/notify-all", (request, response) => {
  console.log("Notifying all subscribers");
  if (subscriptions.length > 0) {
    sendNotifications(subscriptions);
    response.sendStatus(200);
  } else {
    response.sendStatus(409);
  }
});

app.get("/", (request, response) => {
  response.sendFile(__dirname + "index.html");
});

const listener = app.listen(port, () => {
  console.log(`Listening on port ${listener.address().port}`);
});
