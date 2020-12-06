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
        console.log(label.length);
        result.push(label);
      })
      .catch((err) => {
        console.log(err);
        console.log("Error evaluating sentence");
      });
    return result;
  };

  const indexInput = (str, markerList) => {
    var sentenceIndices = [];
    for (var i = 0; i < str.length; i++) {
      if (str[i] == ".") {
        sentenceIndices.push(i);
      }
    }
    var highlightSections = [];
    for (var i = 0; i < sentenceIndices.length; i++) {
      if (markerList[i][0] == 0 || markerList[i][0] == 1) {
        if (i == 0) {
          highlightSections.push([0, sentenceIndices[i]]);
        } else {
          highlightSections.push([
            sentenceIndices[i - 1] + 1,
            sentenceIndices[i],
          ]);
        }
      }
    }
    if (
      sentenceIndices[sentenceIndices.length - 1] < str.length - 1 &&
      markerList[markerList.length - 1] < 2
    ) {
      highlightSections.push([
        sentenceIndices[sentenceIndices.length - 1],
        str.length - 1,
      ]);
    }
    setHighlight(highlightSections);
  };

  const handleChange = async (event) => {
    setState(event.target.value);
    setCounter(counter + 1);

    if (counter >= 5) {
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

  const handleScan = (event) => {
    event.preventDefault();
    // Some API Call
    const parsedInput = state.split(".");
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
