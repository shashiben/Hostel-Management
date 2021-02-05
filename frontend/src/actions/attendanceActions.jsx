import {
  ATTENDANCE_DATA_ENTER_FAIL,
  ATTENDANCE_DATA_ENTER_REQUEST,
  ATTENDANCE_DATA_ENTER_SUCCESS,
  ATTENDANCE_ANALYSIS_FAIL,
  ATTENDANCE_ANALYSIS_REQUEST,
  ATTENDANCE_ANALYSIS_SUCCESS,
  ATTENDANCE_DELETE_REQUEST,
  ATTENDANCE_DELETE_SUCCESS,
  ATTENDANCE_DELETE_FAIL,
} from "../constants/attendanceConstant";
import axios from "axios";

export const postAttendance = (attendance) => async (dispatch, getState) => {
  try {
    dispatch({ type: ATTENDANCE_DATA_ENTER_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/attendance/`, attendance, config);
    dispatch({
      type: ATTENDANCE_DATA_ENTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ATTENDANCE_DATA_ENTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAnalysisByDate = (date) => async (dispatch, getState) => {
  try {
    dispatch({ type: ATTENDANCE_ANALYSIS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `/attendance/getAnalysis`,
      { date: date },
      config
    );

    dispatch({
      type: ATTENDANCE_ANALYSIS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ATTENDANCE_ANALYSIS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteAttendanceByDate = (days) => async (dispatch, getState) => {
  try {
    dispatch({ type: ATTENDANCE_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(`/attendance/${days}`, config);

    dispatch({
      type: ATTENDANCE_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ATTENDANCE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
