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

  const [remainingTime, setRemainingTime] = useState(targetTime * 1000);

  const timerIsActive = remainingTime > 0 && remainingTime < targetTime * 1000;

  // Clearing interval automatically if it timed out
  if (remainingTime <= 0) {
    clearInterval(eachTimer.current);
    dialog.current.open();
  }

  // Reset timer once the Form is submitted by click the "Close" button in <ResultModal>
  function handleReset() {
    setRemainingTime(targetTime * 1000);
  }

  function handleStart() {
    //sharedTimer = setTimerExpired(true);
    eachTimer.current = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 10);
    }, 10);
  }

  // Clearing interval automatically when the Stop button is clicked
  function handleStop() {
    // clearTimeout(sharedTimer);
    clearInterval(eachTimer.current);
    dialog.current.open();
  }
  return (
    <>
      {/* Forwarding 'ref' to the forwardRef() in the <ResultModal> component */}
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={remainingTime}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second {targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : ""}>
          {timerIsActive ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
