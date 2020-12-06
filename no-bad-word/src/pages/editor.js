import React, { useState } from "react";
import { Container, Col, Button, Row } from "react-bootstrap";
import "../styles/editor.css";
import axios from "axios";
import { HighlightWithinTextarea } from "react-highlight-within-textarea";

export default function Editor() {
  const [state, setState] = useState("");
  const [counter, setCounter] = useState(0);
  const [highlight, setHighlight] = useState([]);

  const evaluateSentence = async (str) => {
    var result = [];
    await axios
      .post("https://hackdook-udtyuwqxja-ue.a.run.app/label", {
        text: str,
      })
      .then((res) => {
        const label = res.data.label;
        result.push(label);
      })
      .catch((err) => {
        console.log(err);
        console.log("Error evaluating sentence");
      });
    return result;
  };

  const indexInput = (str, markerList) => {
    const parsedSentences = str.split(".");
    var result = [];
    for (var i = 0; i < parsedSentences.length; i++) {
      if (markerList[i] == 1) {
        result.push({ highlight: parsedSentences[i], className: "yellow" });
      } else if (markerList[i] == 0) {
        result.push({ highlight: parsedSentences[i], className: "red" });
      }
    }
    setHighlight(result);
  };

  const handleChange = async (event) => {
    setState(event.target.value);
    setCounter(counter + 1);

    if (counter >= 0) {
      setCounter(0);
      const parsedSentences = state.split(".");
      const result = [];
      var example;
      for (example of parsedSentences) {
        result.push(await evaluateSentence(example));
      }
      indexInput(state, result);
      console.log(parsedSentences);
      console.log(result);
      console.log(highlight);
    }
  };

  return (
    <Container fluid className="editor-container">
      <Container className="background-container">
        <HighlightWithinTextarea
          value={state}
          highlight={highlight}
          onChange={handleChange}
          className="input-box"
        ></HighlightWithinTextarea>
      </Container>
    </Container>
  );
}
