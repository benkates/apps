import "./App.css";
import { useEffect, useState } from "react";
import generateColorObj from "./generateColorObj";
import formatTime from "./utils";
import useTimer from "./Timer";
//TODO: clean up naming now that color is nic
//TODO: auto-generate image list (1-8)+.jpg

function Card(props) {
  return (
    <div className="card" data-id={props.index} onClick={props.onClick}></div>
  );
}

function App() {
  const [cards, setCards] = useState(generateColorObj());
  const { timer, handleStartTimer, handleStopTimer } = useTimer();

  //init the timer
  useEffect(() => {
    handleStartTimer();
  }, [1]);

  function handleCardClick(e) {
    //get selected id
    const num = Number(e.target.getAttribute("data-id"));

    //create copy of state, set clicked card to true, set state
    let newCards = [...cards];
    newCards[num].clicked = true;
    setCards(newCards);

    //set the card color
    e.target.style.backgroundImage = `url('./images/${newCards[num].color}')`;

    //if it's a match, immediately change to "matched"
    let matchingColor = newCards[num].color;

    //get all matching elements with that color
    let match = [];
    newCards.forEach((e) => {
      if (e.color === matchingColor) {
        match.push(e);
      }
    });

    //if both elements are clicked, change
    if (match[0].clicked === match[1].clicked) {
      let i = [match[0].index, match[1].index];
      i.forEach((f) => {
        let temp = document.querySelectorAll(`[data-id='${f}']`);

        temp.forEach((g) => {
          // g.style.backgroundImage = null;
          // g.classList.add("matched");
          newCards[f].matched = true;
          setCards(newCards);
        });
      });
    }

    //if it's not a match, wait 5 seconds, change "clicked"
    setTimeout(() => {
      if (!cards[num].matched) {
        newCards[num].clicked = false;
        e.target.style.backgroundImage = null;
        setCards(newCards);
      }
    }, 1500);

    //if all values are matched, stop the timer and visually indicate on cards
    const vals = cards.map((e) => {
      return e.matched;
    });
    if (vals.every((val) => val)) {
      handleStopTimer();
      document.querySelectorAll(".card").forEach((x) => {
        x.classList.add("matched");
        x.style.backgroundImage = null;
      });
    }
  }

  return (
    <div className="App">
      {/* iterate through cards to render Card compoenents */}
      {cards.map((e) => {
        return (
          <Card key={e.index} index={e.index} onClick={handleCardClick}></Card>
        );
      })}
      <div className="timer-container">
        <div className="timer">{formatTime(timer)}</div>
      </div>
    </div>
  );
}

export default App;
