import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setQuestions, deleteQuestion } from "./reducer";
import * as client from "./client";

export default function QuestionPreview() {
  const { qzid: quizId } = useParams(); // Get the current quiz ID from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const questions = useSelector((state: any) => state.questionsReducer.questions);
  const quiz = useSelector((state: any) => state.quizzesReducer.quizzes.find((q: any) => q._id === quizId));

  const fetchQuestions = async () => {
    const fetchedQuestions = await client.findQuestionsForQuiz(quizId as string);
    dispatch(setQuestions(fetchedQuestions));
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  console.log("QuestionPreview", questions, quiz);

  const handleDeleteQuestion = async (questionId: string) => {
    await client.deleteQuestion(questionId);
    dispatch(deleteQuestion(questionId));
  };

  const handleEditQuestion = (questionId: string) => {
    navigate(`/Kanbas/Courses/${quiz.courseId}/Quizzes/${quizId}/Questions/${questionId}/Edit`);
  };

  const handleAddQuestion = () => {
    navigate(`/Kanbas/Courses/${quiz.courseId}/Quizzes/${quizId}/Questions/New`);
  };

  if (!questions) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-light p-4 rounded shadow-sm" style={{ maxWidth: '700px', margin: '0 auto' }}>
      <h2 className="text-center mb-4">{quiz.title}</h2>
      <h4>Questions</h4>
      <ul className="list-unstyled">
        {questions.map((question: any, index: number) => (
          <li key={question._id} className="d-flex align-items-center mb-2">
            <span className="me-2">{index + 1}.</span>
            <a href={`#/Kanbas/Courses/${quiz.courseId}/Quizzes/${quizId}/Questions/${question._id}`}
               style={{ textDecoration: 'none', color: 'inherit' }}
               className="flex-grow-1">
              {question.title}
            </a>
            <div className="d-flex ms-2">
              <button className="btn btn-secondary me-2" onClick={() => {alert("TODO: handleEditQuestion(question._id)")}}>Edit</button>
              <button className="btn btn-danger" onClick={() => {alert("TODO: handleDeleteQuestion(question._id)")}}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <button className="btn btn-primary mt-3" onClick={() => {alert("TODO: handleAddQuestion")}}>+ Add New Question</button>
    </div>
  );
}
