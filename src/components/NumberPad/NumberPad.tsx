import "./NumberPad.css"

type NumberPadProps = {
  numbers: number[]
  onNumberSelect: (number: number) => void
  disabled: boolean
}

function NumberPad({
  numbers,
  onNumberSelect,
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
    </div>
  )
}

export default NumberPad