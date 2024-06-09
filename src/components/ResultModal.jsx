export default function ResultModal({ result, targetTime }) {
  return (
    /* The HTML built-in element <dialog> already has backdrop to dim its background,
       but when using its property 'open' to force it open, the backdrop can't show up */

    <dialog className="result-modal" open>
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
}
