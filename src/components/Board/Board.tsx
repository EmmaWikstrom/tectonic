import { useState } from "react"
import Cell from "../Cell/Cell"
import NumberPad from "../NumberPad/NumberPad"
import type { Puzzle } from "../../data/puzzle"
import "./Board.css"

type BoardProps = {
    puzzle: Puzzle
}

function Board({ puzzle }: BoardProps) {
    const [selectedCellId, setSelectedCellId] = useState<string | null>(null)
    const [userValues, setUserValues] = useState<Record<string, number>>({})
    const handleNumberSelect = (number: number) => {
        if (!selectedCellId) return

        setUserValues((currentValues) => ({
            ...currentValues,
            [selectedCellId]: number,
        }))
    }
    const handleErase = () => {
        if (!selectedCellId) return
      
        setUserValues((currentValues) => {
          const updatedValues = { ...currentValues }
      
          delete updatedValues[selectedCellId]
      
          return updatedValues
        })
      }
    const getCell = (row: number, col: number) => {
        return puzzle.cells.find(
            (cell) => cell.row === row && cell.col === col
        )
    }
    const regionSizes = puzzle.cells.reduce<Record<string, number>>(
        (sizes, cell) => {
            sizes[cell.regionId] = (sizes[cell.regionId] ?? 0) + 1
            return sizes
        },
        {}
    )

    const maxRegionSize = Math.max(...Object.values(regionSizes))

    const availableNumbers = Array.from(
        { length: maxRegionSize },
        (_, index) => index + 1
    )

    return (
        <div>
            <div
                className="board"
                style={{
                    gridTemplateColumns: `repeat(${puzzle.cols}, 3rem)`,
                }}
            >
                {puzzle.cells.map((cell) => {
                    const topNeighbor = getCell(cell.row - 1, cell.col)
                    const leftNeighbor = getCell(cell.row, cell.col - 1)

                    const hasTopBorder =
                        cell.row === 0 || topNeighbor?.regionId !== cell.regionId

                    const hasLeftBorder =
                        cell.col === 0 || leftNeighbor?.regionId !== cell.regionId

                    const hasRightBorder =
                        cell.col === puzzle.cols - 1

                    const hasBottomBorder =
                        cell.row === puzzle.rows - 1

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
                    )
                })}
            </div>
            <NumberPad
                numbers={availableNumbers}
                onNumberSelect={handleNumberSelect}
                onErase={handleErase}
                disabled={!selectedCellId}
            />
        </div>
    )
}

export default Board