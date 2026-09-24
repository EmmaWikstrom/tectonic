import { useEffect, useRef, useState } from "react";

import Cell from "../Cell/Cell";
import NumberPad from "../NumberPad/NumberPad";
import CompletionDialog from "../CompletionDialog/CompletionDialog";

import type { Puzzle } from "../../data/puzzle";

import styles from "./Board.module.scss";

type BoardProps = {
  puzzle: Puzzle;
};

function Board({ puzzle }: BoardProps) {
  const [selectedCellId, setSelectedCellId] = useState<string | null>(null);

  const [userValues, setUserValues] = useState<Record<string, number>>({});

  const [checkedCellId, setCheckedCellId] = useState<string | null>(null);

  const [isCheckedCellCorrect, setIsCheckedCellCorrect] = useState<
    boolean | null
  >(null);

  const [boardCheckResult, setBoardCheckResult] = useState<
    "correct" | "incorrect" | null
  >(null);

  const [completionResult, setCompletionResult] = useState<
    "solved" | "incorrect" | null
  >(null);

  const wasBoardFilled = useRef(false);

  const editableCells = puzzle.cells.filter((cell) => !cell.isGiven);

  const isBoardFilled = editableCells.every(
    (cell) => userValues[cell.id] !== undefined,
  );

  const isBoardCorrect =
    isBoardFilled &&
    editableCells.every((cell) => userValues[cell.id] === cell.solution);

  useEffect(() => {
    if (!wasBoardFilled.current && isBoardFilled) {
      setCompletionResult(isBoardCorrect ? "solved" : "incorrect");
    }

    wasBoardFilled.current = isBoardFilled;
  }, [isBoardFilled, isBoardCorrect]);

  const handleNumberSelect = (number: number) => {
    if (!selectedCellId) return;

    setUserValues((currentValues) => ({
      ...currentValues,
      [selectedCellId]: number,
    }));

    setCheckedCellId(null);
    setIsCheckedCellCorrect(null);
    setBoardCheckResult(null);
  };

  const handleErase = () => {
    if (!selectedCellId) return;

    setUserValues((currentValues) => {
      const updatedValues = { ...currentValues };

      delete updatedValues[selectedCellId];

      return updatedValues;
    });

    setCheckedCellId(null);
    setIsCheckedCellCorrect(null);
    setBoardCheckResult(null);
  };

  const handlePlayAgain = () => {
    setUserValues({});
    setSelectedCellId(null);

    setCheckedCellId(null);
    setIsCheckedCellCorrect(null);
    setBoardCheckResult(null);

    setCompletionResult(null);
    wasBoardFilled.current = false;
  };

  const handleCompletionClose = () => {
    const wasIncorrect = completionResult === "incorrect";

    setCompletionResult(null);

    if (wasIncorrect) {
      wasBoardFilled.current = false;
    }
  };

  const handleCheckCell = () => {
    if (!selectedCellId) return;

    const selectedCell = puzzle.cells.find(
      (cell) => cell.id === selectedCellId,
    );

    if (!selectedCell) return;

    const userValue = userValues[selectedCellId];

    if (userValue === undefined) return;

    setBoardCheckResult(null);

    setCheckedCellId(selectedCellId);
    setIsCheckedCellCorrect(userValue === selectedCell.solution);
  };

  const handleCheckBoard = () => {
    const filledCells = Object.entries(userValues);

    if (filledCells.length === 0) return;

    const allCorrect = filledCells.every(([cellId, userValue]) => {
      const cell = puzzle.cells.find((cell) => cell.id === cellId);

      return cell?.solution === userValue;
    });

    setCheckedCellId(null);
    setIsCheckedCellCorrect(null);

    setBoardCheckResult(allCorrect ? "correct" : "incorrect");
  };

  const getCell = (row: number, col: number) => {
    return puzzle.cells.find((cell) => cell.row === row && cell.col === col);
  };

  const regionSizes = puzzle.cells.reduce<Record<string, number>>(
    (sizes, cell) => {
      sizes[cell.regionId] = (sizes[cell.regionId] ?? 0) + 1;

      return sizes;
    },
    {},
  );

  const maxRegionSize = Math.max(...Object.values(regionSizes));

  const availableNumbers = Array.from(
    { length: maxRegionSize },
    (_, index) => index + 1,
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedCellId) return;

      if (event.key === "Backspace" || event.key === "Delete") {
        handleErase();
        return;
      }

      const number = Number(event.key);

      if (number >= 1 && number <= maxRegionSize) {
        handleNumberSelect(number);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCellId, maxRegionSize]);

  return (
    <div className={styles.game}>
      <div
        className={styles.board}
        style={{
          gridTemplateColumns: `repeat(${puzzle.cols}, 1fr)`,
          gridTemplateRows: `repeat(${puzzle.rows}, 1fr)`,
        }}
      >
        {puzzle.cells.map((cell) => {
          const topNeighbor = getCell(cell.row - 1, cell.col);
          const leftNeighbor = getCell(cell.row, cell.col - 1);

          const hasTopBorder =
            cell.row === 0 || topNeighbor?.regionId !== cell.regionId;

          const hasLeftBorder =
            cell.col === 0 || leftNeighbor?.regionId !== cell.regionId;

          const hasRightBorder = cell.col === puzzle.cols - 1;
          const hasBottomBorder = cell.row === puzzle.rows - 1;

          return (
            <Cell
              key={cell.id}
              cell={cell}
              value={userValues[cell.id]}
              isSelected={selectedCellId === cell.id}
              onSelect={() => setSelectedCellId(cell.id)}
              hasTopBorder={hasTopBorder}
              hasLeftBorder={hasLeftBorder}
              hasRightBorder={hasRightBorder}
              hasBottomBorder={hasBottomBorder}
            />
          );
        })}
      </div>

      <NumberPad
        numbers={availableNumbers}
        onNumberSelect={handleNumberSelect}
        onErase={handleErase}
        disabled={!selectedCellId}
      />

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.actionButton}
          onClick={handleCheckCell}
          disabled={!selectedCellId || userValues[selectedCellId] === undefined}
        >
          Check cell
        </button>

        <button
          type="button"
          className={styles.actionButton}
          onClick={handleCheckBoard}
          disabled={Object.keys(userValues).length === 0}
        >
          Check board
        </button>
      </div>

      <div className={styles.statusArea}>
        {checkedCellId === selectedCellId && isCheckedCellCorrect !== null && (
          <p className={styles.statusMessage} role="status">
            {isCheckedCellCorrect ? "Correct!" : "Incorrect."}
          </p>
        )}

        {boardCheckResult !== null && (
          <p className={styles.statusMessage} role="status">
            {boardCheckResult === "correct"
              ? "No mistakes found so far."
              : "There is at least one incorrect value."}
          </p>
        )}
      </div>

      <CompletionDialog
        result={completionResult}
        onClose={handleCompletionClose}
        onPlayAgain={handlePlayAgain}
      />
    </div>
  );
}

export default Board;
