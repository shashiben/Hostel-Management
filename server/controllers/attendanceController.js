import asyncHandler from "express-async-handler";
import Attendance from "../models/attendance.js";

const getAttendanceByRoomNo = asyncHandler(async (req, res) => {
  const date = req.body.date || Date().toString().substring(0, 15);
  const attendance = await Attendance.findOne({
    roomNo: { $in: [req.body.roomNo] },
    date: date,
  });
  if (attendance) {
    res.json(attendance);
  } else {
    res.status(404);
    throw new Error(
      `You didn't take attendance today for room  No:${req.params.roomId}`
    );
  }
});

const getAttendance = asyncHandler(async (req, res) => {
  const date = req.body.date || Date().toString().substring(0, 15);
  const attendance = await Attendance.findOne({
    date: date,
  });
  if (attendance) {
    res.json(attendance);
  } else {
    res.status(404);
    throw new Error(`You didn't take attendance ${date}!!`);
  }
});

const enterAttendanceByRoomNo = asyncHandler(async (req, res) => {
  const date = req.body.date || Date().toString().substring(0, 15);
  const attendance = await Attendance.findOne({
    date: date,
  });
  if (attendance) {
    const dataTemp = attendance.data;
    const detailsTemp = attendance.details;
    for (const [key, value] of Object.entries(req.body.data)) {
      dataTemp.set(key, value);
    }
    for (const [key, value] of Object.entries(req.body.details)) {
      detailsTemp.set(key, value);
    }
    attendance.details = detailsTemp;
    attendance.data = dataTemp;

    const updatedAttendance = await attendance.save();
    res.json(updatedAttendance);
  } else {
    const newAttendance = await Attendance.create({
      roomNo: [req.body.roomNo],
      date: date,
      data: req.body.data,
      details: req.body.details,
    });
    res.json(newAttendance);
  }
});

const deleteAttendanceByDays = asyncHandler(async (req, res) => {
  const days = req.params.days;
  var date = new Date();
  var deletionDate = new Date(date.setDate(date.getDate() - days));
  await Attendance.deleteMany({
    createdAt: { $lt: deletionDate },
  });
  res.json({ message: `Deleted Attendance for before past ${days} days` });
});

export {
  getAttendanceByRoomNo,
  enterAttendanceByRoomNo,
  getAttendance,
  deleteAttendanceByDays,
};
