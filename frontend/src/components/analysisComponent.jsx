import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import Loading from "./loader";
import Message from "./message";
import { CSVLink } from "react-csv";

const AnalysisComponent = () => {
  const attendanceAnalysis = useSelector((state) => state.attendanceAnalysis);
  const { loading, error, attendance } = attendanceAnalysis;
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  useEffect(() => {
    if (attendance) {
      setHeaders([
        { label: "Name", key: "name" },
        { label: "Contact", key: "contact" },
        { label: "Room No", key: "roomNo" },
        { label: "Status", key: "attendance" },
      ]);
      var csvMapList = [];
      Object.entries(attendance.details).map((student) => {
        var csvMap = {};
        csvMap["name"] = student[1].name;
        csvMap["contact"] = student[1].contact;
        csvMap["roomNo"] = student[1].roomNo;
        csvMap["attendance"] = attendance.data[student[0]];
        csvMapList.push(csvMap);
      });

      setData(csvMapList);
    }
  }, [attendance]);
  return (
    <>
      {error && <Message variant="danger">{error}</Message>}
      {loading ? (
        <Loading />
      ) : (
        <>
          {attendance && (
            <>
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Contact No</th>
                    <th>Room No</th>
                    <th>Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance &&
                    Object.entries(attendance.details).map((student) => {
                      return (
                        <tr key={student[0]}>
                          <th>{student[1].name}</th>
                          <td>{student[1].contact}</td>
                          <td>{student[1].roomNo}</td>
                          <td>{attendance.data[student[0]]}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
              <CSVLink
                data={data}
                headers={headers}
                filename={`attendance_${Date()
                  .toString()
                  .substring(0, 15)}.csv`}
                className="btn btn-primary"
              >
                Download
              </CSVLink>
            </>
          )}
        </>
      )}
    </>
  );
};

export default AnalysisComponent;
