import React, { useState } from "react";
// import logo from "./assets/react.svg";
import "./App.css";
function App() {
  const [name, setName] = useState("");
  addEventListener("load", async () => {
    let sw = await navigator.serviceWorker.register("../sw.js");
    console.log(sw);
  });
  async function subscribe() {
    let sw = await navigator.serviceWorker.ready;
    let push = await sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey:
        "BAxlMZZzox2QO5gfZJ6ScvGqUvRcZIB7_h14tHqZ0lyEuDWh1DzPGV7bLV-ILtyGoFgMEBCi6TgiQoDFoIHaww4",
    });
    console.log(JSON.stringify(push));
  }

  function handleSubmit(e) {
    console.log(name);
    e.preventDefault();
    if (name === "") {
      console.log("siema");
    } else {
      console.log("Nie siema");
    }
  }
  function handleEvent(e) {
    const temp = e.target.value;
    // console.log(temp);
    setName(temp);
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
