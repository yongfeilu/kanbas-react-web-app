import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CiSearch } from "react-icons/ci";
import { GoCheckCircleFill } from "react-icons/go";
import { IoRocketOutline } from "react-icons/io5";
import * as client from "./clients";

import {
  setQuizzes,
  updateQuiz
} from "./reducer";
import QuizControls from "./QuizControl";

export default function QuizList() {
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { id: courseId } = useParams(); // Get the current course's ID from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const userRole = currentUser?.role;

  const fetchQuizzes = async () => {
    const quizzes = await client.findQuizzesForCourse(courseId as string);
    console.log("fetchQuizzes", quizzes);
    let filteredQuizzes = quizzes;

    // Check if the user role is "STUDENT" and filter out unpublished quizzes
    if (userRole === "STUDENT") {
        filteredQuizzes = quizzes.filter((quiz: any) => quiz.published);
    }
    dispatch(setQuizzes(filteredQuizzes));
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);


  console.log("QuizList is good here", courseId, userRole);

  const addQuiz = async () => {
    const newQuiz = await client.createQuiz(courseId as string, {
      title: "New Quiz",
      courseId: courseId as string,
      points: 0,
      questionList: []
    });
    console.log("added quiz", newQuiz);
    fetchQuizzes();
    navigate(`./${newQuiz._id}`);
  };

  const formatDate = (isoString: string) => {
      const date = new Date(isoString);

      // Format the date to "Sep 15"
      const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
      const formattedDate = date.toLocaleDateString(undefined, options);

      // Format the time to "23:59"
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');

      return `${formattedDate} at ${hours}:${minutes}`;
  };


  const togglePublishQuiz = async (quiz: any) => {
    const updatedQuiz = {
      ...quiz,
      published: !quiz.published, // Toggle the published status
    };
  
    await client.updateQuiz(updatedQuiz); // Update the quiz with the new published status
    dispatch(updateQuiz(updatedQuiz)); // Update the Redux store with the new quiz data
  };

  return (
    <div id="wd-quizzes">
      <div id="wd-quizzes-controls" className="d-flex align-items-center mb-3">
        <div className="input-group me-2 flex-grow-1">
          <span className="input-group-text"><CiSearch /></span>
          <input
            id="wd-search-quiz"
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            placeholder="Search for Quizzes"
          />
        </div>
        {userRole === "FACULTY" && (
          <div>
            <button id="wd-add-quiz" className="btn btn-danger" onClick={addQuiz}>+Quiz</button>
          </div>
        )}
      </div>

      {quizzes.length === 0 ? (
        <p>No quizzes available. Click the "+ Quiz" button to add a new quiz.</p>
      ) : (
        <ul id="wd-quiz-list" className="list-group rounded-0">
          {quizzes.map((quiz: any) => (
            <li key={quiz._id} className="wd-quiz-list-item list-group-item p-3 ps-1">
              <div style={{ display: 'flex', alignItems: 'center' }}>
               
                <IoRocketOutline className="me-3 fs-3" style={{ color: 'green' }} />
                
                <div style={{ flex: 1 }} className="me-2">
                  <a href={`#/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h4>{quiz.title}</h4>
                  </a>
                  <p>
                  <span className={
                       quiz.availableDate ? new Date(quiz.availableDate) > new Date() ? "text-warning" : 
                      (new Date(quiz.untilDate) < new Date() ? "text-danger" : "text-success") : ""
                    }>
                      {quiz.availableDate ? new Date(quiz.availableDate) > new Date() ? `Not available until ${new Date(quiz.availableDate).toLocaleString()} ` :
                      (new Date(quiz.untilDate) < new Date() ? "Closed " : "Available ") : "No available info "}
                  </span>
                    | <b>Due</b> {quiz.dueDate ? `${formatDate(quiz.dueDate)} ` : "No due date "} 
                    | {quiz.points} pts 
                    | {quiz.questionList.length} questions
                  </p>
                </div>
                
                {userRole === "FACULTY" && (
                  <>
                    <span className="me-2" onClick={() => togglePublishQuiz(quiz)}>
                      {quiz.published ? <GoCheckCircleFill className="text-success"/> : <GoCheckCircleFill  style={{ color: 'grey' }}/>}
                    </span>
                    
                    <QuizControls quiz={quiz} />
                   
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
