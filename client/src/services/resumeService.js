import API from './api.js';

export const createResume = (data) => {
  return API.post("/resumes", data);
}

export const getResumes = () => {
  return API.get("/resumes");
}

export const getResumeById = (id) => {
  return API.get(`/resumes/${id}`);
}

export const updateResume = (id, data) => {
  return API.put(`/resumes/${id}`, data);
}

export const deleteResume = (id) => {
  return API.delete(`/resumes/${id}`);
}