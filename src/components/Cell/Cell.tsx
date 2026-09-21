import type { Cell as CellData } from "../../data/puzzle";
import styles from "./Cell.module.scss";

type CellProps = {
  cell: CellData;
  value?: number;
  isSelected: boolean;
  onSelect: () => void;
  hasTopBorder: boolean;
  hasLeftBorder: boolean;
  hasRightBorder: boolean;
  hasBottomBorder: boolean;
};

function Cell({
  cell,
  value,
  isSelected,
  onSelect,
  hasTopBorder,
  hasLeftBorder,
  hasRightBorder,
  hasBottomBorder,
}: CellProps) {
  const classNames = [
    styles.cell,
    cell.isGiven && styles.given,
    isSelected && styles.selected,
    hasTopBorder && styles.regionTop,
    hasLeftBorder && styles.regionLeft,
    hasRightBorder && styles.regionRight,
    hasBottomBorder && styles.regionBottom,
  ]
    .filter(Boolean)
    .join(" ");

  if (cell.isGiven) {
    return <div className={classNames}>{cell.solution}</div>;
  }

  return (
    <button
      type="button"
      className={classNames}
      onClick={onSelect}
      aria-label={`Row ${cell.row + 1}, column ${cell.col + 1}, empty cell. Select to enter a number.`}
    >
      {value ?? ""}
    </button>
  );
}

export default Cell;
