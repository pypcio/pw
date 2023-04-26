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
let sub = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/fgUgy9SyAFc:APA91bHjdn6dgvK_Zsasegl5lc-F4ZRdm31CYR_MXCneBktCHVbtb1iW4HUoxwGXlvnsZOFMH3_PPGIdWcnNYrA4Fr8ieqba-6_UX02hMS6t1xdED_X8QewBc7qLPzHhFjQbToJcVAxM",
  expirationTime: null,
  keys: {
    p256dh:
      "BLdab7kKsWzdpxnE4ioMy77cgQCGcOM5Mz0RZAjN1LsTeZT4ytBEalmniAYmS0sv2Hn-_LROQC2H8Vf1UdAqi1k",
    auth: "-ExBh-GvLu8_j2NtAqyKWw",
  },
};
push.sendNotification(sub, "test message");
