import asyncHandler from "express-async-handler";
import Student from "../models/student.js";
import Attendance from "../models/attendance.js";

const addStudent = asyncHandler(async (req, res) => {
  const {
    name,
    address,
    category,
    city,
    contact,
    fatherContact,
    image,
    roomNo,
    blockNo,
    status,
  } = req.body;

  const studentExist = await Student.findOne({ name: name });

  if (studentExist) {
    res.status(400);
    throw new Error("Student already exists");
  }

  const student = await Student.create({
    name,
    address,
    category,
    city,
    contact,
    fatherContact,
    image,
    roomNo,
    blockNo,
    status,
  });

  if (student) {
    res.status(201).json({
      _id: student._id,
      name: student.name,
      address: student.address,
      category: student.category,
      city: student.city,
      contact: student.contact,
      fatherContact: student.fatherContact,
      image: student.image,
      roomNo: student.roomNo,
      blockNo: student.blockNo,
      status: student.status,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Student data");
  }
});
const updateStudentProfile = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.body._id);

  if (student) {
    student.name = req.body.name || student.name;
    student.address = req.body.address || student.address;
    student.category = req.body.category || student.category;
    student.city = req.body.city || student.city;
    student.contact = req.body.contact || student.contact;
    student.fatherContact = req.body.fatherContact || student.fatherContact;
    student.image = req.body.image || student.image;
    student.roomNo = req.body.roomNo || student.roomNo;
    student.blockNo = req.body.blockNo || student.blockNo;
    student.status = req.body.status || student.status;
    const updatedStudent = await student.save();

    res.json({
      _id: updatedStudent._id,
      name: updatedStudent.name,
      address: updatedStudent.address,
      category: updatedStudent.category,
      city: updatedStudent.city,
      contact: updatedStudent.contact,
      fatherContact: updatedStudent.fatherContact,
      image: updatedStudent.image,
      roomNo: updatedStudent.roomNo,
      blockNo: updatedStudent.blockNo,
      status: updatedStudent.status,
    });
  } else {
    res.status(404);
    throw new Error("Student not found");
  }
});
const getAllStudents = asyncHandler(async (req, res) => {
  const pageSize = 15;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Student.countDocuments({ ...keyword });
  const students = await Student.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  if (students && students.length != 0) {
    res.json({ students, page, pages: Math.ceil(count / pageSize) });
  } else {
    res.status(404);
    throw new Error("No Students Found");
  }
});

const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (student) {
    await student.remove();
    res.json({ message: "Student removed" });
  } else {
    res.status(404);
    throw new Error("Student not found");
  }
});
const getStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (student) {
    res.json(student);
  } else {
    res.status(404);
    throw new Error("Students not found");
  }
});

const getStudentByRoomNo = asyncHandler(async (req, res) => {
  const attendance = await Attendance.findOne({
    date: Date().toString().substring(0, 15),
    roomNo: { $in: [req.params.roomId] },
  });
  const students = await Student.find({ roomNo: req.params.roomId });
  if (students) {
    attendance
      ? res.json({ students: students, attendance: attendance })
      : res.json({ students: students });
  } else {
    res.status(404);
    throw new Error("Students not found");
  }
});

export {
  addStudent,
  updateStudentProfile,
  getAllStudents,
  deleteStudent,
  getStudentById,
  getStudentByRoomNo,
};
