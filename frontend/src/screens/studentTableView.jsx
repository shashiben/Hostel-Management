import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/message";
import Loader from "../components/loader";
import Paginate from "../components/paginate";
import { listStudents } from "../actions/studentActions";
import { Link } from "react-router-dom";

const StudentsTableView = ({ keyword, pageNumber }) => {
  const dispatch = useDispatch();

  const studentsList = useSelector((state) => state.studentsList);
  const { loading, error, students, page, pages } = studentsList;
  useEffect(() => {
    if (!students) {
      dispatch(listStudents(keyword, pageNumber));
    }
  }, [dispatch, keyword, pageNumber]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Stream</th>
                <th>NAME</th>
                <th>STATUS</th>
                <th>CONTACT</th>
                <th>ROOM NO</th>
                <th>CITY</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.category}</td>
                  <td>
                    <Link to={`/student/${student._id}`}>{student.name}</Link>
                  </td>
                  <td>
                    <span
                      style={{
                        color:
                          student.status === "Outside"
                            ? "red"
                            : student.status === "Home"
                            ? "blue"
                            : "black",
                      }}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td>
                    <a href={`tel:${student.contact}`}>{student.contact}</a>
                  </td>
                  <td>{student.roomNo}</td>
                  <td>{student.city}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default StudentsTableView;
