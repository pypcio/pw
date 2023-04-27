const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Use bodyParser middleware to parse JSON
app.use(bodyParser.json());

// Configure webpush with your VAPID keys
const vapidPublicKey =
  "BAxlMZZzox2QO5gfZJ6ScvGqUvRcZIB7_h14tHqZ0lyEuDWh1DzPGV7bLV-ILtyGoFgMEBCi6TgiQoDFoIHaww4";
const vapidPrivateKey = "yQe0VoLOh5LPIEVCiO9f7hc5K0n_upXervpa2YpRyxQ";
webpush.setVapidDetails(
  "mailto:your-email@example.com",
  vapidPublicKey,
  vapidPrivateKey
);

// Handle POST requests to /subscribe
app.post("/subscribe", (req, res) => {
  // Get the subscription object from the request body
  const subscription = req.body.endpoint;

  // Save the subscription to a database
  // You can use any database you prefer, like MongoDB or Redis
  // Here's an example using an in-memory array:
  const subscriptions = [];
  subscriptions.push(subscription);

  // Send a 201 Created response to the client
  res.status(201).json({ message: "Subscription saved." });
});

// Handle POST requests to /notify
app.post("/notify", (req, res) => {
  // Get the notification data from the request body
  const data = req.body;

  // Create the notification payload
  const payload = JSON.stringify({
    title: data.title || "New Notification",
    body: data.body || "This is a new notification.",
    icon: data.icon || "/images/icon.png",
    badge: data.badge || "/images/badge.png",
    url: data.url || "/",
    actions: data.actions || [],
  });

  // Send the notification to all subscribed clients
  const subscriptions = [];
  // Replace this with your own logic to get the subscriptions from the database
  // Here's an example using the in-memory array:
  subscriptions.forEach((subscription) => {
    webpush
      .sendNotification(subscription, payload)
      .catch((error) => console.error("Error sending notification:", error));
  });

  // Send a 200 OK response to the client
  res.status(200).json({ message: "Notification sent." });
});

// Start the server
app.listen(port, () => {
  console.log("Server started at http://localhost:", port);
});
