import { forwardRef } from "react";

/************************************************************************************
 We use forwardRef to wrap the component function ResultModal(props, ref), hence
 the component function can have 'ref' as another argument in additon to 'props' which
 we destructured {result, targetTime} in the below case:
 **********************************************************************************/

const ResultModal = forwardRef(function ResultModal(
  { result, targetTime },
  ref
) {
  return (
    /********************************************************************************* 
    The HTML built-in element <dialog> already has backdrop to dim its background,
    but when using its property 'open' to force it open, the backdrop can't show up 

    <dialog className="result-modal" open> 
    
    **********************************************************************************/

    /********************************************************************************* 
    To solve the above issue, we have to programatically send a command to browser
    to show the backdrop of the <dialog> element. 
    In this situation, useRef() and forwardRef can help us:

      1. Created a 'ref' in <TimerChallenge> where the timer was controlled over there 
      2. Forward that 'ref' to <ResultModal> 
    **********************************************************************************/

    <dialog ref={ref} className="result-modal">
      <h2>You {result}</h2>
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with <strong>X seconds left.</strong>
      </p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ResultModal;
