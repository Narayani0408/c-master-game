import { useState } from "react";
import Level1 from "./components/Level1";

function App() {
  const [screen, setScreen] = useState("home");

  return (
    <div style={styles.container}>
      
      {screen === "home" && (
        <div style={styles.home}>
          <h1 style={styles.title}>C Master Game</h1>
          <p>Master C Programming by solving challenges</p>

          <div style={styles.levelContainer}>
            <button style={styles.levelBtn} onClick={() => setScreen("level1")}>
              Level 1
            </button>

            <button style={styles.levelBtn} disabled>
              Level 2 🔒
            </button>

            <button style={styles.levelBtn} disabled>
              Level 3 🔒
            </button>
          </div>
        </div>
      )}

      {screen === "level1" && (
        <Level1 goHome={() => setScreen("home")} />
      )}

    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
    color: "white",
    textAlign: "center"
  },

  home: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },

  title: {
    fontSize: "50px"
  },

  levelContainer: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    marginTop: "20px"
  },

  levelBtn: {
    padding: "15px 30px",
    fontSize: "18px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    background: "#00c6ff",
    color: "white"
  }
};

export default App;