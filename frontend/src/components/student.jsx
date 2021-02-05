import React from "react";
import { Card, Col, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
const Student = ({ stuentDetails: student }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/student/${student._id}`}>
        <Image src={student.image} rounded fluid />
      </Link>
      <Card.Body>
        <Link to={`/student/${student._id}`}>
          <Card.Title as="div">
            <strong>{student.name}</strong>
          </Card.Title>
        </Link>

        <Row>
          <Col>Room No: {student.roomNo}</Col>
        </Row>
        <Row>
          <Col>Stream: {student.category}</Col>
        </Row>
        <Card.Text>
          Contact:
          <a href={`tel:${student.contact}`}>{student.contact}</a>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Student;
