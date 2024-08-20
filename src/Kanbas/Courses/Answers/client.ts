import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ANSWERS_API = `${REMOTE_SERVER}/api/answers`;

// Create a new answer
export const createAnswer = async (answer: any) => {
  const response = await axios.post(ANSWERS_API, answer);
  return response.data;
};

// Find all answers
export const findAllAnswers = async () => {
  const response = await axios.get(ANSWERS_API);
  return response.data;
};

// Find answers by user ID and quiz ID
export const findAnswersByUserAndQuiz = async (userId: string, quizId: string) => {
  const response = await axios.get(`${ANSWERS_API}/users/${userId}/quizzes/${quizId}`);
  return response.data;
};

// Update an answer by ID
export const updateAnswer = async (answerId: string, answer: any) => {
  const response = await axios.put(`${ANSWERS_API}/${answerId}`, answer);
  return response.data;
};

// Delete an answer by ID
export const deleteAnswer = async (answerId: string) => {
  const response = await axios.delete(`${ANSWERS_API}/${answerId}`);
  return response.data;
};
