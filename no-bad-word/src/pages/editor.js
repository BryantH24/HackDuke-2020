import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../styles/editor.css";

export default function Editor() {
  const [state, setState] = useState("");

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
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
