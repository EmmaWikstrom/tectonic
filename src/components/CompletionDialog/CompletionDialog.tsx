import { useEffect, useRef } from "react";

type CompletionDialogProps = {
  result: "solved" | "incorrect" | null;
  onClose: () => void;
  onPlayAgain: () => void;
};

function CompletionDialog({
  result,
  onClose,
  onPlayAgain,
}: CompletionDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (result && !dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, [result]);

  if (!result) return null;

  return (
    <dialog ref={dialogRef} onClose={onClose}>
      {result === "solved" ? (
        <>
          <h2>Puzzle solved!</h2>
          <p>Well done!</p>

          <form method="dialog">
            <button type="submit" onClick={onPlayAgain}>
              Play again
            </button>
          </form>
        </>
      ) : (
        <>
          <h2>Not quite!</h2>
          <p>There is at least one incorrect value.</p>

          <form method="dialog">
            <button type="submit">Go back</button>
          </form>
        </>
      )}
    </dialog>
  );
}

export default CompletionDialog;
