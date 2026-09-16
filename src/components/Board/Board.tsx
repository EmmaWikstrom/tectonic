import { useEffect, useState } from "react";
import Cell from "../Cell/Cell";
import NumberPad from "../NumberPad/NumberPad";
import type { Puzzle } from "../../data/puzzle";
import "./Board.css";

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

  const handleCheckCell = () => {
    if (!selectedCellId) return;

    const selectedCell = puzzle.cells.find(
      (cell) => cell.id === selectedCellId,
    );

    if (!selectedCell) return;

    const userValue = userValues[selectedCellId];

    if (userValue === undefined) return;

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

  const availableNumbers = Array.from(
    { length: maxRegionSize },
    (_, index) => index + 1,
  );

  return (
    <div>
      <div
        className="board"
        style={{
          gridTemplateColumns: `repeat(${puzzle.cols}, 3rem)`,
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
      <button
        type="button"
        onClick={handleCheckCell}
        disabled={!selectedCellId || userValues[selectedCellId] === undefined}
      >
        Check cell
      </button>

      {checkedCellId === selectedCellId && isCheckedCellCorrect !== null && (
        <p role="status">{isCheckedCellCorrect ? "Correct!" : "Incorrect."}</p>
      )}

      <button
        type="button"
        onClick={handleCheckBoard}
        disabled={Object.keys(userValues).length === 0}
      >
        Check board
      </button>

      {boardCheckResult !== null && (
        <p role="status">
          {boardCheckResult === "correct"
            ? "No mistakes found so far."
            : "There is at least one incorrect value."}
        </p>
      )}
    </div>
  );
}

export default Board;
