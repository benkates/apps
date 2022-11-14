import "./App.css";
import { useState } from "react";

//Click anywhere on the page, put circle on that position
//Buttons to undo/redo

//create Circle component
function Circle(props) {
  //init vars
  const { x, y, color, radius } = props;
  const left = x - radius / 2 + "px";
  const top = y - radius / 2 + "px";

  //create style object
  const circleStyle = {
    //circles get the same height/width
    height: radius + "px",
    width: radius + "px",

    //background color
    backgroundColor: color,

    //border needs color/style
    borderRadius: "50%",
    borderColor: "white",
    borderStyle: "solid",

    //positioning
    left: left,
    top: top,
    position: "absolute",
  };

  return <div style={circleStyle} className="circle"></div>;
}

function App() {
  //init array of coords
  const [coords, setCoords] = useState([]);
  const [savedCoords, setSavedCoords] = useState([]);

  //onclick fun
  function onClickFun(e) {
    //set random color
    const color = "#" + Math.floor(Math.random() * 16777215).toString(16);

    //set random size
    const radius = Math.floor(Math.random() * 50) + 10;

    //if not button click, update coords
    if (e.target.tagName !== "BUTTON") {
      setCoords([
        ...coords,
        { x: e.clientX, y: e.clientY, color: color, radius: radius },
      ]);
    }
  }

  //undo function (last element off)
  function undoFun() {
    //get last coordinate used
    const lastCoord = coords[coords.length - 1];
    //set new main coords state
    setCoords(coords.slice(0, -1));
    //set saved coords to include that one
    setSavedCoords([...savedCoords, lastCoord]);
  }

  //undo function (last element off)
  function redoFun() {
    //get last coordinate saved
    const lastCoord = savedCoords[savedCoords.length - 1];

    if (lastCoord !== undefined) {
      //remove last coordinate saved
      setSavedCoords(savedCoords.slice(0, -1));
      //update main coordinates with the new one
      setCoords([...coords, lastCoord]);
    }
  }

  return (
    // outer wrapper
    <div
      className="App"
      onClick={(e) => {
        onClickFun(e);
      }}
    >
      {/* undo button */}
      {coords.length > 0 && (
        <button style={{ margin: 5, position: "absolute" }} onClick={undoFun}>
          Undo
        </button>
      )}

      {/* redo button */}
      {savedCoords.length > 0 && (
        <button
          style={{ margin: 5, position: "absolute", left: 50 }}
          onClick={redoFun}
        >
          Redo
        </button>
      )}
      {coords.map((p) => {
        return <Circle key={p.x + p.y} {...p}></Circle>;
      })}
    </div>
  );
}

export default App;
