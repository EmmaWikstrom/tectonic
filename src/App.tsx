import Board from "./components/Board/Board";
import { puzzleOne } from "./data/puzzle";
import styles from "./App.module.scss";

function App() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h1 className={styles.title}>Tectonic</h1>

        <Board puzzle={puzzleOne} />
      </div>
    </main>
  );
}

export default App;
