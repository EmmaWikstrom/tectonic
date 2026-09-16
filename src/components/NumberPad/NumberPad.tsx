import "./NumberPad.css"

type NumberPadProps = {
  numbers: number[]
  onNumberSelect: (number: number) => void
  onErase: () => void
  disabled: boolean
}

function NumberPad({
  numbers,
  onNumberSelect,
  onErase,
  disabled,
}: NumberPadProps) {
  return (
    <div className="number-pad">
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
  )
}

export default NumberPad