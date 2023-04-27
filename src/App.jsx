import React, { useState } from "react";
// import logo from "./assets/react.svg";
import "./App.css";
function App() {
  // Check if the browser supports the Push API

  // Convert the public key from base64 to Uint8Array
  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  // Send the subscription to the server
  function sendSubscriptionToServer(subscription) {
    // const endpoint = subscription.endpoint;
    // const key = subscription.keys.auth;
    // const token = subscription.keys.p256dh;
    // Make an AJAX request to your server to save the subscription
    // You can use any HTTP library you prefer, like Axios or jQuery
    // Here's an example using fetch:
    fetch("/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscription),
    })
      .then(function (response) {
        if (response.ok) {
          console.log("Subscription saved on the server.");
        } else {
          console.error("Subscription could not be saved on the server.");
        }
      })
      .catch(function (error) {
        console.error("Error saving subscription on the server:", error);
      });
  }

  async function subscribe() {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      console.log("Push API is supported by this browser.");

      // Register the service worker and get the push subscription
      navigator.serviceWorker
        .register("service-worker.js", { scope: "/" })
        .then(function (registration) {
          console.log("Service worker registered successfully.");

          // Ask the user for permission to show notifications
          return registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
              "BAxlMZZzox2QO5gfZJ6ScvGqUvRcZIB7_h14tHqZ0lyEuDWh1DzPGV7bLV-ILtyGoFgMEBCi6TgiQoDFoIHaww4"
            ),
          });
        })
        .then(function (subscription) {
          console.log("Push subscription successful:", subscription);

          // Send the subscription to the server
          sendSubscriptionToServer(subscription);
        })
        .catch(function (error) {
          console.error("Service worker registration failed:", error);
        });
    } else {
      console.warn("Push API is not supported by this browser.");
    }
  }
  return (
    <div className="App">
      <h1>Chcesz jakies powiadomienie?</h1>
      <div>Siema siema co tam slychac</div>
      {/* <form onSubmit={handleSubmit}>
        <input value={name} onChange={handleEvent} placeholder="Podaj imie" />
        <button type="submit">Push notification</button>
      </form> */}
      <button onClick={subscribe}>Subscribe</button>
    </div>
  );
}
export default App;
