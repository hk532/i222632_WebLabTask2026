import { useState } from "react";
import "./App.css";

function App() {
  const [reactColor, setReactColor] = useState("lightblue");

  const handleHtmlDomChange = () => {
    const input = document.getElementById("htmlColorInput");
    const box = document.getElementById("htmlColorBox");
    if (input.value.trim()) {
      box.style.backgroundColor = input.value.trim();
      input.value = "";
    }
  };

  const handleReactDomChange = () => {
    const input = document.getElementById("reactColorInput");
    if (input.value.trim()) {
      setReactColor(input.value.trim());
      input.value = "";
    }
  };

  return (
    <>
      <h1>Interactive Color Changer</h1>

      <div className="section">
        <h2>Part 1: HTML DOM Manipulation</h2>
        <div
          id="htmlColorBox"
          className="color-box"
          style={{ backgroundColor: "lightgray" }}
        ></div>
        <div className="input-row">
          <input
            id="htmlColorInput"
            type="text"
            placeholder="Enter color (e.g., red, #ff0000)"
          />
          <button onClick={handleHtmlDomChange}>Change Color (HTML DOM)</button>
        </div>
      </div>

      <div className="section">
        <h2>Part 2: React DOM Manipulation</h2>
        <div
          className="color-box"
          style={{ backgroundColor: reactColor }}
        ></div>
        <div className="input-row">
          <input
            id="reactColorInput"
            type="text"
            placeholder="Enter color (e.g., blue, #0000ff)"
          />
          <button onClick={handleReactDomChange}>
            Change Color (React DOM)
          </button>
        </div>
      </div>

      <div className="section comparison">
        <h3>Comparison</h3>
        <p>
          <strong>HTML DOM Approach:</strong> Directly manipulates the DOM
          element (imperative).
        </p>
        <p>
          <strong>React DOM Approach:</strong> Updates the virtual DOM and React
          handles the actual DOM update (declarative).
        </p>

        <table>
          <thead>
            <tr>
              <th>Aspect</th>
              <th>HTML DOM Approach</th>
              <th>React DOM Approach</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>How does it update the UI?</td>
              <td>
                Directly changes the element's style property using
                document.getElementById
              </td>
              <td>
                Updates state via useState, React re-renders the component with
                new JSX
              </td>
            </tr>
            <tr>
              <td>Does it touch the DOM directly?</td>
              <td>Yes, modifies the real DOM element directly</td>
              <td>
                No, React updates the virtual DOM first, then syncs with the
                real DOM
              </td>
            </tr>
            <tr>
              <td>What happens on re-render?</td>
              <td>
                Changes persist in DOM but are not tracked by React — can be
                lost on re-render
              </td>
              <td>
                State is preserved across re-renders, React reconciles and
                updates efficiently
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
