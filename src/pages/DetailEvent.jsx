import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { BsCalendar2Date } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import CommunityNavbar from "../components/CommunityNavbar";
import { Footer } from "../components/Footer";
import HeadEvent from "../components/HeadEvent";
import { TopNav } from "../components/TopNav";
import "../styles/DetailEvent.css";

const DetailEvent = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [detailEvent, setDetailEvent] = useState({});
  const [payments, setPayments] = useState("");
  const location = useLocation();

  const getDetailEvent = () => {
    axios
      .get(`https://tugas.website/event/${location.state.id}`, {
        headers: {
          Authorization: "Bearer " + Cookies.get("token"),
        },
      })
      .then((res) => {
        setDetailEvent(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const joinEvent = () => {
    axios
      .post(
        `https://tugas.website/join/event/${location.state.id}`,
        {
          payment_type: payments,
        },
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("token"),
          },
        }
      )
      .then((res) => {
        setModalShow(false);
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    getDetailEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <TopNav />
      <HeadEvent detailEvent={detailEvent} />
      <hr></hr>
      <Container className="conde vh-100">
        <CommunityNavbar />
        <Row className="mt-3">
          <Col lg={{ span: 9, offset: 0 }}>
            <h4>Detail Event</h4>
            <h5>Time Event</h5>
            <p className="pde1 mb-3">
              <BsCalendar2Date className="me-2" />
              {detailEvent.date_event}
            </p>

            <h6>Event Organizer</h6>
            <p className="pde2">{detailEvent.penyelenggara}</p>
            <h6>Description</h6>
            <p className="pde3">{detailEvent.descriptions}</p>
          </Col>
          <Col>
            <ListGroup>
              <ListGroup.Item>
                Total Participants : <span>{detailEvent.partisipasi}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Price : <span>Rp.{detailEvent.price}</span>
              </ListGroup.Item>
            </ListGroup>
            <Button className="mt-3" onClick={() => setModalShow(true)}>
              Join Event
            </Button>
          </Col>
        </Row>
      </Container>
      <Footer />

      <Modal show={modalShow} size="lg" aria-labelledby="contained-modal-title-vcenter" centered onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Payment Method</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formBasicRadio" onChange={(e) => setPayments(e.target.value)}>
            <Form.Check label="GOPAY" name="group1" type="radio" value="GOPAY" />
            <Form.Check label="BCA Virtual Account" name="group1" type="radio" value="BCA Virtual Account" />
            <Form.Check label="Mandiri Virtual Account" name="group1" type="radio" value="MANDIRI Virtual Account" />
          </Form.Group>
        </Modal.Body>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">Review Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>
            Total Item : <span>1</span>
          </h6>
          <h6>
            Total Price : <span>Rp. {detailEvent.price}</span>
          </h6>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={joinEvent}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DetailEvent;
