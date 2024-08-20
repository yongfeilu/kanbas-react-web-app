import React, { useEffect, useState} from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setQuestions, deleteQuestion } from "./reducer";
import * as client from "./client";
import { CiCircleQuestion } from "react-icons/ci";
import QuestionDetail from "./QuestionDetail";
import QuestionEditor from "./QuestionEditor";

export default function QuestionPreview() {
  const { id:courseId, qzid: quizId, qid } = useParams(); // Get the current quiz ID from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isEditor = location.pathname.includes('Editor');

  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const userRole = currentUser?.role;
  
  const questions = useSelector((state: any) => state.questionsReducer.questions);
  const quiz = useSelector((state: any) => state.quizzesReducer.quizzes.find((q: any) => q._id === quizId));

  const fetchQuestions = async () => {
    const fetchedQuestions = await client.findQuestionsForQuiz(quizId as string);
    dispatch(setQuestions(fetchedQuestions));
  };

  useEffect(() => {
    fetchQuestions();
  }, [quizId, dispatch]);

  console.log("QuestionPreview", quizId, qid);

  const [clickedQuestionId, setClickedQuestionId] = useState<string | null>(null);

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
        <h2 className="mb-4"><b>{quiz.title}</b></h2>
        {qid && (
            <>
                <h4 className="mb-3"><b>Quiz Instructions</b></h4>
                <hr/>
                {isEditor ? <QuestionEditor /> : <QuestionDetail />}
                <hr/>
            </>
        )}
        <h4>Questions</h4>
        <ul className="list-unstyled">
            {questions.map((question: any, index: number) => (
                <li key={question._id} className="d-flex align-items-center mb-2">
                    
                    {isEditor ? 

                        <a href={`#/Kanbas/Courses/${quiz.courseId}/Quizzes/${quizId}/Questions/${question._id}/Editor`}
                            style={{
                                textDecoration: 'none',
                                color: qid === question._id ? 'red' : '#b97474',
                            }} className="flex-grow-1">
                            <span className="me-2"> <CiCircleQuestion className="me-1" size={20}/>{`Question ${index + 1}`}</span>
                        </a>
                        :
                        <a href={`#/Kanbas/Courses/${quiz.courseId}/Quizzes/${quizId}/Questions/${question._id}`}
                            style={{
                                textDecoration: 'none',
                                color: qid === question._id ? 'red' : '#b97474',
                            }}
                            className="flex-grow-1">
                            <span className="me-2"> <CiCircleQuestion className="me-1" size={20}/>{`Question ${index + 1}`}</span>
                        </a>
                    }
                    
                </li>
            ))}
        </ul>
        <div className="d-flex justify-content-between align-items-center mt-3">
            {userRole === "FACULTY" && (
                <button className="btn btn-light me-2" onClick={()=> {
                    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Editor`);
                }}>Keep Editing This Quiz</button>
            )}
            <div>
                <span>Quiz saved at 8:19am</span>
                <button className="btn btn-danger ms-3">Submit Quiz</button>
            </div>
        </div>
      {/* <button className="btn btn-primary mt-3" onClick={() => {alert("TODO: handleAddQuestion")}}>+ Add New Question</button> */}
    </div>
  );
}