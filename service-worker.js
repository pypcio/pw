// // Handle the push event in the service worker
// self.addEventListener("push", function (event) {
//   console.log("Push event received:", event);

//   // Get the notification data
//   const data = event.data.json();
//   const title = data.title || "New Notification";
//   const options = {
//     body: data.body || "This is a new notification.",
//     icon: data.icon || "/images/icon.png",
//     badge: data.badge || "/images/badge.png",
//     data: data.url || "/",
//     actions: data.actions || [],
//   };

//   // Show the notification
//   event.waitUntil(self.registration.showNotification(title, options));
// });
self.addEventListener("push", (event) => {
  let notification = event.data.json();
  self.registration.showNotification(notification.title, notification.options);
});
