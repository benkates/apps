import "./App.css";
import { useState, useRef } from "react";
import useFitText from "use-fit-text";

import seedrandom from "seedrandom";

function App() {
  //set text state (create reactive variable)
  const [text, setText] = useState("");

  //set font width adjustment hook
  const { fontSize, ref } = useFitText({ maxFontSize: 800, minFontSize: 10 });

  //set the ref for the background
  const backgroundRef = useRef("");

  const onChange = function (e) {
    //on every keystroke, change the state value
    let text = e.target.value; //get current text value from input
    setText(text); //set state with above value

    let color = "#" + Math.floor(seedrandom(text)() * 16777215).toString(16); //use text to get a random number
    backgroundRef.current.style.backgroundColor = color; //set background color
  };

  const styleList = {
    fontSize, //apply dynamic font size
    whiteSpace: "pre", //TOGGLE: one line or not

    //set width/height
    width: "90%",
    height: 200,

    //overflow mechanics
    overflowWrap: "normal",
    overflow: "hidden",
    overflowX: "hidden",
    resize: "none",
    verticalAlign: "middle",
    alignSelf: "center",

    //text area styling
    textAlign: "center",
    backgroundColor: "inherit",
    border: 0,
    outline: 0,
    color: "inherit",
    fontFamily: "Source Sans Pro",
  };

  return (
    <>
      <div className="App" ref={backgroundRef}>
        <textarea
          onChange={(e) => onChange(e)} //every keystroke fires this function
          value={text} //state value
          ref={ref} //define the
          id="inputter"
          placeholder=""
          autoFocus
          spellCheck="false"
          style={styleList}
        />
      </div>
    </>
  );
}

export default App;
