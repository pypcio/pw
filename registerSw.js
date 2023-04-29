// Handle the push event in the service worker
const webpush = require("web-push");
self.addEventListener("push", function (event) {
  console.log("Push event received:", event);

  // Get the notification data
  const data = event.data.json();
  const title = data.title || "New Notification";
  const options = {
    body: data.body || "This is a new notification.",
    icon: data.icon || "/images/icon.png",
    badge: data.badge || "/images/badge.png",
    data: data.url || "/",
    actions: data.actions || [],
  };
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

  // Show the notification
  event.waitUntil(self.registration.showNotification(title, options));
});
