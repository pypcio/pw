import React, { useState } from "react";
import addNotification from "react-push-notification";
import { Notifications } from "react-push-notification";
import logo from "./assets/react.svg";
import "./App.css";
function App() {
  const [name, setName] = useState("");

  function warningNotification() {
    addNotification({
      title: "Warning",
      subtitle: "Please fill it",
      message: "You have to enter name",
      theme: "red",
      icon: logo,
      closeButton: "X",
    });
  }
  function sucessNotification() {
    addNotification({
      title: "Success",
      subtitle: "You have successfully submitted",
      message: "Welcome to GeeksforGeeks",
      theme: "darkblue",
      closeButton: "X",
      icon: logo,
      native: true,
      onClick: () =>
        (window.location = "https://blog.agney.dev/one-signal-on-gatsby/"),
      // backgroundTop: "green",
      // backgroundBottom: "yellowgreen",
    });
  }
  function handleSubmit(e) {
    console.log(name);
    e.preventDefault();
    if (name === "") {
      warningNotification();
    } else {
      sucessNotification();
    }
  }
  function handleEvent(e) {
    const temp = e.target.value;
    // console.log(temp);
    setName(temp);
  }
  return (
    <div className="App">
      <Notifications />
      <h1>Chcesz jakies powiadomienie?</h1>
      <div>Siema siema co tam slychac</div>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={handleEvent} placeholder="Podaj imie" />
        <button type="submit">Push notification</button>
      </form>
    </div>
  );
}
export default App;
