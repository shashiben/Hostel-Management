import express from "express";
import {
  deleteAttendanceByDays,
  enterAttendanceByRoomNo,
  getAttendance,
  getAttendanceByRoomNo,
} from "../controllers/attendanceController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();
router.route("/:roomId").get(protect, getAttendanceByRoomNo);
router.route("/").post(protect, admin, enterAttendanceByRoomNo);
router.route("/:days").delete(protect, admin, deleteAttendanceByDays);
router.route("/getAnalysis").post(protect, getAttendance);

export default router;
