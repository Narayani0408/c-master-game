import React from "react";
import VideoBackground from "./components/VideoBackground";

function App() {
  return (
    <>
      <VideoBackground />

      <div style={styles.container}>
        <h1 style={styles.title}>C Master Game</h1>
        <p style={styles.subtitle}>
          Master C Programming by solving challenges
        </p>

        <button style={styles.button}>Start Game</button>
      </div>
    </>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    textAlign: "center",
  },

  title: {
    fontSize: "60px",
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: "22px",
    margin: "15px 0",
  },

  button: {
    padding: "12px 30px",
    fontSize: "20px",
    borderRadius: "8px",
    border: "none",
    background: "#00c6ff",
    cursor: "pointer",
  },
};

export default App;