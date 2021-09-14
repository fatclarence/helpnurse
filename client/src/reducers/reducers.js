import { FETCH_ALL, UPDATE, CREATE, DELETE } from "../constants/actionTypes";

export default function reducer(state = [], action) {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...state, action.payload];
    case UPDATE:
      return state.map((summary) => {
        const updated =
          summary._id === action.payload._id ? action.payload : summary;
        return updated;
      });
    case DELETE:
      return state.filter((post) => post._id !== action.payload);
    default:
      return state;
  }
}
