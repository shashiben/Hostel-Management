import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./loader";
import Message from "./message";
import AttendanceTableComponent from "./attendanceTableComponent";

const AttendanceTable = ({ roomNo }) => {
  const dispatch = useDispatch();
  const [attendanceMap, setAttendanceMap] = useState({});

  const getStudentsByRoomNo = useSelector((state) => state.getStudentsByRoomNo);
  const { loading, error, students, attendance } = getStudentsByRoomNo;
  const attendanceDataEnter = useSelector((state) => state.attendanceDataEnter);
  const {
    loading: loadingAttendance,
    error: errorAttendance,
  } = attendanceDataEnter;
  useEffect(() => {
    if (students) {
      arrangeTable();
    }
  }, [dispatch, attendance, attendanceMap, students]);

  const arrangeTable = () => {
    if (attendance) {
      var tempMap = attendanceMap;
      students.map((student) => {
        if (attendance.data[student._id]) {
          tempMap[student._id] = attendance.data[student._id];
        } else {
          tempMap[student._id] = "Hostel";
        }
      });
      setAttendanceMap(attendanceMap);
    } else {
      students.map((student) => {
        var temp = attendanceMap;
        temp[student._id] = "Hostel";
        setAttendanceMap(temp);
      });
    }
    var temp = attendanceMap;
    setAttendanceMap(temp);
  };

  return (
    <>
      {error && <Message variant="danger">{error}</Message>}
      {loading || loadingAttendance ? (
        <Loading />
      ) : (
        <>
          {errorAttendance && (
            <Message variant="danger">{errorAttendance}</Message>
          )}
          {students && (
            <>
              <AttendanceTableComponent
                students={students}
                attendanceMap={attendanceMap}
                setAttendanceMap={setAttendanceMap}
                attendance={attendance}
                roomNo={roomNo}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default AttendanceTable;
