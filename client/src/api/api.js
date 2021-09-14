import axios from "axios";

// api is in-charge of connecting frontend to backend

// URL to backend route
const url = "http://localhost:5000/internal";

export const fetchSummaries = () => axios.get(url);
export const createSummary = (newSummary) => axios.post(url, newSummary);
export const updateSummary = (id, updatedSummary) =>
  axios.patch(`${url}/${id}`, updatedSummary);
export const deleteSummary = (id) => axios.delete(`${url}/${id}`);
