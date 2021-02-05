import {
  STUDENT_LIST_REQUEST,
  STUDENT_LIST_SUCCESS,
  STUDENT_LIST_ERROR,
  STUDENT_ADD_ERROR,
  STUDENT_ADD_REQUEST,
  STUDENT_ADD_SUCCESS,
  STUDENT_UPDATE_ERROR,
  STUDENT_UPDATE_REQUEST,
  STUDENT_UPDATE_SUCCESS,
  STUDENT_UPDATE_RESET,
  STUDENT_DELETE_ERROR,
  STUDENT_DELETE_REQUEST,
  STUDENT_DELETE_SUCCESS,
  STUDENT_DELETE_RESET,
  STUDENT_DETAILS_REQUEST,
  STUDENT_DETAILS_SUCCESS,
  STUDENT_DETAILS_ERROR,
  STUDENT_ROOM_NO_REQUEST,
  STUDENT_ROOM_NO_SUCCESS,
  STUDENT_ROOM_NO_ERROR,
  STUDENT_ROOM_NO_RESET,
} from "../constants/studentConstant";

export const studentListReducer = (state = { students: [] }, action) => {
  switch (action.type) {
    case STUDENT_LIST_REQUEST:
      return { ...state, loading: true };
    case STUDENT_LIST_SUCCESS:
      return {
        loading: false,
        students: action.payload.students,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case STUDENT_LIST_ERROR:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const studentAddReducer = (state = { students: {} }, action) => {
  switch (action.type) {
    case STUDENT_ADD_REQUEST:
      return { ...state, loading: true };
    case STUDENT_ADD_SUCCESS:
      return { loading: false, success: true };
    case STUDENT_ADD_ERROR:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const studentDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case STUDENT_DETAILS_SUCCESS:
      return { loading: false, student: action.payload };
    case STUDENT_DETAILS_ERROR:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const studentUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_UPDATE_REQUEST:
      return { ...state, loading: true };
    case STUDENT_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case STUDENT_UPDATE_ERROR:
      return { loading: false, error: action.payload };
    case STUDENT_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};

export const studentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_DELETE_REQUEST:
      return { ...state, loading: true };
    case STUDENT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case STUDENT_DELETE_ERROR:
      return { loading: false, error: action.payload };
    case STUDENT_DELETE_RESET:
      return {};

    default:
      return state;
  }
};
export const getStudentsByRoomNoReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_ROOM_NO_REQUEST:
      return { ...state, loading: true };
    case STUDENT_ROOM_NO_SUCCESS:
      return {
        loading: false,
        students: action.payload.students,
        attendance: action.payload.attendance,
      };
    case STUDENT_ROOM_NO_ERROR:
      return { loading: false, error: action.payload };
    case STUDENT_ROOM_NO_RESET:
      return {};

    default:
      return state;
  }
};
