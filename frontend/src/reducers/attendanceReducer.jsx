import {
  ATTENDANCE_DATA_ENTER_FAIL,
  ATTENDANCE_DATA_ENTER_REQUEST,
  ATTENDANCE_DATA_ENTER_RESET,
  ATTENDANCE_DATA_ENTER_SUCCESS,
  ATTENDANCE_ANALYSIS_FAIL,
  ATTENDANCE_ANALYSIS_REQUEST,
  ATTENDANCE_ANALYSIS_RESET,
  ATTENDANCE_ANALYSIS_SUCCESS,
  ATTENDANCE_DELETE_REQUEST,
  ATTENDANCE_DELETE_SUCCESS,
  ATTENDANCE_DELETE_FAIL,
} from "../constants/attendanceConstant";

export const attendanceDataEnterReducer = (state = {}, action) => {
  switch (action.type) {
    case ATTENDANCE_DATA_ENTER_REQUEST:
      return { ...state, loading: true };
    case ATTENDANCE_DATA_ENTER_SUCCESS:
      return {
        loading: false,
        attendance: action.payload,
      };
    case ATTENDANCE_DATA_ENTER_FAIL:
      return { loading: false, error: action.payload };
    case ATTENDANCE_DATA_ENTER_RESET:
      return {};

    default:
      return state;
  }
};

export const attendanceAnalysisReducer = (state = {}, action) => {
  switch (action.type) {
    case ATTENDANCE_ANALYSIS_REQUEST:
      return { loading: true };
    case ATTENDANCE_ANALYSIS_SUCCESS:
      return {
        loading: false,
        attendance: action.payload,
      };
    case ATTENDANCE_ANALYSIS_FAIL:
      return { loading: false, error: action.payload };
    case ATTENDANCE_ANALYSIS_RESET:
      return {};

    default:
      return state;
  }
};

export const deleteAttendanceReducer = (state = {}, action) => {
  switch (action.type) {
    case ATTENDANCE_DELETE_REQUEST:
      return { loading: true };
    case ATTENDANCE_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ATTENDANCE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case ATTENDANCE_ANALYSIS_RESET:
      return {};

    default:
      return state;
  }
};
