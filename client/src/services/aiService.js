import API from './api.js';

const generateSummary = (data) => {
  return API.post("/ai/summary", data);
}

export default generateSummary;