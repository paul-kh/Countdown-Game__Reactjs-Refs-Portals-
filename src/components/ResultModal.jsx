import { forwardRef, useImperativeHandle, useRef } from "react";

/************************************************************************************
 We use forwardRef to wrap the component function ResultModal(props, ref), hence
 the component function can have 'ref' as another argument in additon to 'props' which
 we destructured {result, targetTime} in the below case:
 **********************************************************************************/

const ResultModal = forwardRef(function ResultModal(
  { remainingTime, targetTime, onReset },
  ref
) {
  // Detaching <dialog> element object in this component from the one referred from outside:
  const dialog = useRef();

  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  /********************************************************************************************* 
    UseImperativeHandle() below is for defining properties and methods that should be accessible 
    from outside of the <ResultModal> component.
    Notes: 
         - userImperativeHandle() is meant to use with forwardRef();
         - userImperativeHandle() needs 2 arguments: ref, and fuction that return an object
           which groups all properties and methods that should be exposed from the compoment.
    ***********************************************************************************************/
  useImperativeHandle(ref, () => {
    return {
      // The open() method below, not ShowModal() anymore, is to expose to outside of the this component
      open() {
        dialog.current.showModal();
      },
    };
  });

  return (
    /********************************************************************************* 
    The HTML built-in element <dialog> already has backdrop to dim its background,
    but when using its property 'open' to force it open, the backdrop can't show up 

    <dialog className="result-modal" open> 
    
    **********************************************************************************/

    /********************************************************************************* =
    To solve the above issue, we have to programatically send a command to browser
    to show the backdrop of the <dialog> element. 
    In this situation, useRef() and forwardRef can help us:

      1. Created a 'ref' in <TimerChallenge> where the timer was controlled over there 
      2. Forward that 'ref' to <ResultModal> 
    **********************************************************************************/

    // The 'ref' property below is assigned with local 'ref' which is detached from the forwarded 'ref'
    // from outside
    <dialog ref={dialog} className="result-modal">
      {userLost && <h2>You lost</h2>}
      {!userLost && <h2>Your score: {score} </h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with
        <strong>
          {" "}
          {formattedRemainingTime} second{formattedRemainingTime > 1 ? "s" : ""}
          left.
        </strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ResultModal;
