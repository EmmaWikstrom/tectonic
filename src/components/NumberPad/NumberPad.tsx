import styles from "./NumberPad.module.scss";

type NumberPadProps = {
  numbers: number[];
  onNumberSelect: (number: number) => void;
  onErase: () => void;
  disabled: boolean;
};

function NumberPad({
  numbers,
  onNumberSelect,
  onErase,
  disabled,
}: NumberPadProps) {
  return (
    <div
      className={styles.numberPad}
      style={{
        gridTemplateColumns: `repeat(${numbers.length}, minmax(0, 1fr))`,
      }}
    >
      {numbers.map((number) => (
        <button
          key={number}
          type="button"
          onClick={() => onNumberSelect(number)}
          disabled={disabled}
          aria-label={`Enter ${number}`}
        >
          {number}
        </button>
      ))}
      <button
        type="button"
        onClick={onErase}
        disabled={disabled}
        aria-label="Erase value"
      >
        Erase
      </button>
    </div>
  );
}

export default NumberPad;
