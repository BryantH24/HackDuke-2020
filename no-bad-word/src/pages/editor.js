import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "../styles/editor.css";
import axios from "axios";

export default function Editor() {
  const [state, setState] = useState("");
  const [counter, setCounter] = useState(0);

  const handleChange = async (event) => {
    setState(event.target.value);
    setCounter(counter + 1);

    if (counter >= 5) {
      setCounter(0);
      const parsedSentences = state.split(".");
      const result = [];
      var example;
      for (example of parsedSentences) {
        console.log(example);
        await axios
          .post("https://hackdook-udtyuwqxja-ue.a.run.app/label", {
            text: example,
          })
          .then((res) => {
            result.push(res.data.label);
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
            console.log("Error evaluating sentence");
          });
      }
      console.log(result);
    }
  };

  const handleScan = (event) => {
    event.preventDefault();
    // Some API Call
    const parsedInput = state.split(".");
  };

  return (
    <Container fluid className="editor-container">
      <Container className="white-background-container">
        <Form className="text-area-container">
          <Form.Group controlId="text-input">
            <Form.Control
              as="textarea"
              placeholder="Start typing..."
              rows={20}
              className="input-box"
              value={state}
              onChange={handleChange}
            />
          </Form.Group>
          <Button
            className="scan-button"
            variant="primary"
            type="submit"
            onClick={handleScan}
          >
            SCAN
          </Button>
        </Form>
      </Container>
    </Container>
  );
}
