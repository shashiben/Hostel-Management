import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Student from "../components/student";
import Loading from "../components/loader.jsx";
import Message from "../components/message.jsx";
import { listStudents } from "../actions/studentActions";
import Paginate from "../components/paginate";
import {
  Row,
  Col,
  ButtonGroup,
  ToggleButton,
  Container,
} from "react-bootstrap";
import StudentsTableView from "./studentTableView";

const HomeView = ({ match, history }) => {
  const [isGrid, setIsGrid] = useState(true);
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;
  const userLogin = useSelector((state) => state.userLogin);
  const { loading: userLoading, userInfo } = userLogin;

  const dispatch = useDispatch();

  const studentsList = useSelector((state) => state.studentsList);
  const { loading, error, students, page, pages } = studentsList;

  useEffect(() => {
    if (!userLoading && !userInfo) {
      history.push("/login");
    }
    dispatch(listStudents(keyword, pageNumber));
  }, [keyword, pageNumber]);

  return (
    <>
      <>
        <Container>
          <Row className="justify-content-md-center">
            <Col xs lg="2"></Col>
            <Col md="auto">
              <ButtonGroup toggle>
                {["Grid", "Table"].map((type) => (
                  <ToggleButton
                    key={type}
                    type="radio"
                    variant="secondary"
                    name="radio"
                    value={type}
                    checked={(isGrid ? "Grid" : "Table") === type}
                    onChange={(e) =>
                      setIsGrid(e.target.value === "Grid" ? true : false)
                    }
                  >
                    {type === "Grid" ? <> Grid</> : <> Table </>}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </Col>
            <Col xs lg="2"></Col>
          </Row>
        </Container>
      </>

      <h1>Students</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : isGrid ? (
        <>
          <Row>
            {students.map((student) => (
              <Col key={student._id} sm={12} md={6} lg={4} xl={3}>
                <Student stuentDetails={student} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      ) : (
        <>
          <StudentsTableView keyword={keyword} pageNumber={pageNumber} />
        </>
      )}
    </>
  );
};

export default HomeView;
