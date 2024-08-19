import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

export const createQuestion = async (quizId: string, question: any) => {
  const response = await axios.post(`${QUIZZES_API}/${quizId}/questions`, question);
  return response.data;
};

export const deleteQuestion = async (questionId: string) => {
  const response = await axios.delete(`${QUESTIONS_API}/${questionId}`);
  return response.data;
};

export const findQuestionsForQuiz = async (quizId: string) => {
  console.log("findQuestionsForQuiz calling api", `${QUIZZES_API}/${quizId}/questions`);
  const response = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
  return response.data;
};

export const findAllQuestions = async () => {
  const response = await axios.get(`${QUESTIONS_API}`);
  return response.data;
};

export const findQuestionsByPartialTitle = async (title: string) => {
  const response = await axios.get(`${QUESTIONS_API}`, {
    params: { title }
  });
  return response.data;
};

export const findQuestionById = async (questionId: string) => {
  const response = await axios.get(`${QUESTIONS_API}/${questionId}`);
  return response.data;
};

export const updateQuestion = async (question: any) => {
  const response = await axios.put(`${QUESTIONS_API}/${question._id}`, question);
  return response.data;
};
