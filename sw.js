self.addEventListener("push", function (e) {
  let options = {
    body: "This notification was generated from push!",
    icon: "./assets/react.svg",
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 2,
    },
    action: [
      { action: "explore", title: "Explore this new world" },
      { action: "close", title: "Close" },
    ],
  };
  e.waitUntil(self.registration.showNotification("Hello World!", options));
});
