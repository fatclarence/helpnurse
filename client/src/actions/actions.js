import * as api from "../api/api";
import { FETCH_ALL, UPDATE, CREATE, DELETE } from "../constants/actionTypes";

/** ACTION CREATORS */

// Fetch all discharge summaries
export const getSummaries = () => async (dispatch) => {
  try {
    const { data } = await api.fetchSummaries();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

// Create a discharge summary
export const createSummary = (post) => async (dispatch) => {
  try {
    const { data } = await api.createSummary(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

// Update discharge summary
export const updateSummary = (id, summary) => async (dispatch) => {
  try {
    const { data } = await api.updateSummary(id, summary);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

// delete discharge summary
export const deletePost = (id) => async (dispatch) => {
  try {
    await await api.deleteSummary(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
