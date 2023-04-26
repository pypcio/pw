const push = require("web-push");

let vapidKeys = {
  publicKey:
    "BAxlMZZzox2QO5gfZJ6ScvGqUvRcZIB7_h14tHqZ0lyEuDWh1DzPGV7bLV-ILtyGoFgMEBCi6TgiQoDFoIHaww4",
  privateKey: "yQe0VoLOh5LPIEVCiO9f7hc5K0n_upXervpa2YpRyxQ",
};
push.setVapidDetails(
  "mailto:test@test.co.pl",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
let sub = {};
push.sendNotification(sub, "test message");
