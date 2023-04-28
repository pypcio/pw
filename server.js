// const express = require("express");
const webpush = require("web-push");
// const bodyParser = require("body-parser");

// const app = express();

// // Use bodyParser middleware to parse JSON
// app.use(bodyParser.json());

// Configure webpush with your VAPID keys
const vapidKeys = {
  publicKey:
    "BAxlMZZzox2QO5gfZJ6ScvGqUvRcZIB7_h14tHqZ0lyEuDWh1DzPGV7bLV-ILtyGoFgMEBCi6TgiQoDFoIHaww4",
  privateKey: "yQe0VoLOh5LPIEVCiO9f7hc5K0n_upXervpa2YpRyxQ",
};

webpush.setVapidDetails(
  "mailto:your-email@example.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
let sub = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/dtTXMzHibOA:APA91bF9K-FmcDSXwR2r7itoMI-Zmdt8JTWNFnkrjMcB5cHn45io_yP36xn1cvbj4QQ7kVMSYMB99fdAVcuRCnS3T_qLp91ie5_GiDGdX5QRACu2j4wxq2vJ8gImwah9WiLxLPG3UXqL",
  expirationTime: null,
  keys: {
    p256dh:
      "BGLAjTnKvwbiH3RxRTGrNhQiDHjyeavuvvUNnKjuQj-pBM_75IVjgk6BFY3zKI9DmiY8UXyaWh5C0MpSZS7qiI4",
    auth: "xaTwvAPDc6wG7beohCSUOw",
  },
};
webpush.sendNotification(sub, "test message");
