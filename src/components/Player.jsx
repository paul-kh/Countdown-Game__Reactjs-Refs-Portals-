import { useState, useRef } from "react";

export default function Player() {
  const [enteredPlayerName, setEnteredPlayerName] = useState("unknown entity");
  const playerName = useRef(); // useRef() returns a JS object

  function handleClick() {
    // The object (playerName) created by useRef(), with its special 'current' property,
    // can access any native properties and methods of the referred/linked/connected HTML elements,
    // in this case, the <input> element
    setEnteredPlayerName(playerName.current.value);
  }

  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? "unknown entity"}</h2>
      <p>
        {/* useRef() can refer/connect/link any HTML element with a special prop "ref" */}
        <input ref={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
