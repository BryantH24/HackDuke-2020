import React from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import "../styles/homepage.css";
import heart from "../assets/heart.svg";
import logo from "../assets/logo.svg";

export default function Homepage() {
  return (
    <Container fluid className="homepage-container">
      <Container className="white-background-container">
        <Row className="top-row">
          <Col md="auto">
            <img src={logo} alt="logo" />
          </Col>
          <Col>
            <h1 className="spch-text">
              S<span className="inner-spch-text">PC</span>H
            </h1>
          </Col>
        </Row>
        <Row className="bottom-row">
          <Col className="text-col">
            <h6 className="be-change-text">BE A PART OF THE CHANGE</h6>
            <div className="fade-in">
              <h1>don't be racist &gt;:(</h1>
              <h5 className="small-top-text">
                Eliminate implicit biases from your messages,
              </h5>
              <h5 className="small-bottom-text">essays, posts, and more!</h5>
              <a href="/editor">
                <Button className="start-button" id="start-button">
                  GET STARTED
                </Button>
              </a>
            </div>
          </Col>
          <Col md="auto" className="image-col">
            <img className="heart-image" src={heart} alt="heart" />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
