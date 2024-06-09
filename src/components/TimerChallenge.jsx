import { useState, useRef } from "react";

import ResultModal from "./ResultModal";

/*  The sharedTimer variable is shared among all instances of the TimerChalleng component
    Every time new component instance was created, the shareTimer pointer will point to 
    new timer created by setTimeOut() of that component instance.
    This will lead to strange behavior when we want to independently clearTimer of each component instance */
// let sharedTimer;

// TO SOLVE THE ABOVE ISSUE, WE USE useRef() INSTEAD OF A REGULAR VARIABLE LIKE shareTimer

export default function TimerChallenge({ title, targetTime }) {
  // The below eachTimer object is conpoent-instance specific.
  /* NOTE: The ref eachTimer object, unlike normal variable, 
     will not be reset when component function re-executes. 
     React store the ref */
  const eachTimer = useRef();

  // Creating another 'ref' for showing modal (dimmer background) of the <dialog> element in <ResultModal>
  const dialog = useRef();

  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  function handleStart() {
    //sharedTimer = setTimerExpired(true);
    eachTimer.current = setTimeout(() => {
      setTimerExpired(true);

      // Using the built-in showModal() method of the <dialog> to show its built-in modal (dimmer backdrop)
      //dialog.current.showModal();
      dialog.current.open();
    }, targetTime * 1000);

    setTimerStarted(true);
  }

  function handleStop() {
    // clearTimeout(sharedTimer);
    clearTimeout(eachTimer.current);
  }
  return (
    <>
      {/* Forwarding 'ref' to the forwardRef() in the <ResultModal> component */}
      <ResultModal ref={dialog} targetTime={targetTime} result="lost" />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second {targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerStarted ? "active" : ""}>
          {timerStarted ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
