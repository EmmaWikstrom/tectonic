import Board from "./components/Board/Board";
import { puzzleOne } from "./data/puzzle";

function App() {
  return (
    <main>
      <h1>Tectonic</h1>
      
      <Board puzzle={puzzleOne} />
    </main>
  )
}

export default App