import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuiz } from './reducer';
import * as client from "./clients";

export default function QuizEditor() {
  const { id: courseId, qzid: quizId } = useParams(); // Get both course ID and quiz ID from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes); // Get quizzes from the state
  const quiz = quizzes.find((qz: any) => qz._id === quizId); // Find the specific quiz

  console.log("QuizEditor", courseId, quizId, quizzes);
  console.log("quiz", quiz);

  const formatDate = (isoString: string) => {
    if (!isoString) {
      return "";
    }
    const date = new Date(isoString);
    return date.toISOString().split('T')[0];
  };


  const [activeTab, setActiveTab] = useState('Details'); // State for active tab
  const [title, setTitle] = useState(quiz ? quiz.title : '');
  const [description, setDescription] = useState(quiz ? quiz.description : '');
  const [points, setPoints] = useState(quiz ? quiz.points : 0);
  const [quizType, setQuizType] = useState(quiz ? quiz.quizType : 'Graded Quiz');
  const [assignmentGroup, setAssignmentGroup] = useState(quiz ? quiz.assignmentGroup : 'Quizzes');
  const [shuffleAnswers, setShuffleAnswers] = useState(quiz ? quiz.shuffleAnswers : true);
  const [timeLimit, setTimeLimit] = useState(quiz ? quiz.timeLimit : 0);
  const [multipleAttempts, setMultipleAttempts] = useState(quiz ? quiz.multipleAttempts : false);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(quiz ? quiz.showCorrectAnswers : 'Immediately');
  const [accessCode, setAccessCode] = useState(quiz ? quiz.accessCode : '');
  const [oneQuestionAtATime, setOneQuestionAtATime] = useState(quiz ? quiz.oneQuestionAtATime : true);
  const [webcamRequired, setWebcamRequired] = useState(quiz ? quiz.webcamRequired : false);
  const [lockQuestionsAfterAnswering, setLockQuestionsAfterAnswering] = useState(quiz ? quiz.lockQuestionsAfterAnswering : false);
  const [dueDate, setDueDate] = useState(quiz ? formatDate(quiz.dueDate) : '');
  const [availableDate, setavailableDate] = useState(quiz ? formatDate(quiz.availableDate) : '');
  const [untilDate, setUntilDate] = useState(quiz ? formatDate(quiz.untilDate): '');
  const [assignTo, setAssignTo] = useState(quiz ? quiz.assignedTo : '');

  const handleSave = async () => {
    const updatedQuiz = {
      ...quiz,
      title,
      description,
      points,
      quizType,
      assignmentGroup,
      shuffleAnswers,
      timeLimit,
      multipleAttempts,
      showCorrectAnswers,
      accessCode,
      oneQuestionAtATime,
      webcamRequired,
      lockQuestionsAfterAnswering,
      dueDate,
      availableDate,
      untilDate,
    };
    await client.updateQuiz(updatedQuiz);
    dispatch(updateQuiz(updatedQuiz));
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`);
  };

  const handleSaveAndPublish = async () => {
    const updatedQuiz = {
      ...quiz,
      title,
      description,
      points,
      quizType,
      assignmentGroup,
      shuffleAnswers,
      timeLimit,
      multipleAttempts,
      showCorrectAnswers,
      accessCode,
      oneQuestionAtATime,
      webcamRequired,
      lockQuestionsAfterAnswering,
      dueDate,
      availableDate,
      untilDate,
      published: true, // Update the published field to true
    };
  
    await client.updateQuiz(updatedQuiz); // Save the updated quiz with published = true
    dispatch(updateQuiz(updatedQuiz)); // Update the Redux state
    navigate(`/Kanbas/Courses/${courseId}/Quizzes`); // Navigate back to the Quizzes list
  };
  

  const handleAddQuestion = () => {
    // Your logic to add a new question goes here.
    console.log("New question added");
  };

  return (
    <div id="wd-quiz-editor">
      <div className="mb-3">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className={`nav-link ${activeTab === 'Details' ? 'active' : ''}`} onClick={() => setActiveTab('Details')}>Details</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${activeTab === 'Questions' ? 'active' : ''}`} onClick={() => setActiveTab('Questions')}>Questions</a>
          </li>
        </ul>
      </div>

      {activeTab === 'Details' && (
        <div>
            <div className="mb-3">
                <label htmlFor="wd-title" className="form-label">Title</label>
                <input type="text" className="form-control" id="wd-title" value={title}
                onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="wd-description" className="form-label">Quiz Instructions:</label>
                <textarea className="form-control" id="wd-description" cols={30} rows={10} value={description}
                onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>

            <div className="mb-3">
                <label htmlFor="wd-quiz-type" className="form-label">Quiz Type</label>
                <select className="form-select" id="wd-quiz-type" value={quizType}
                onChange={(e) => setQuizType(e.target.value)}>
                <option value="Graded Quiz">Graded Quiz</option>
                <option value="Practice Quiz">Practice Quiz</option>
                <option value="Graded Survey">Graded Survey</option>
                <option value="Ungraded Survey">Ungraded Survey</option>
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="wd-points" className="form-label">Points</label>
                <input type="text" className="form-control" id="wd-title" value={points}
                onChange={(e) => setPoints(e.target.value)} />
            </div>

            <div className="row align-items-start">
   
                <div className="col-auto pe-0">
                    <label htmlFor="wd-assignment-group" className="form-label me-2">Assignment Group</label>
                </div>
                <div className="col" style={{
                    border: '1px solid lightgrey',    // Solid border with a specific color
                    padding: '10px',             // Padding around the content within the div
                    borderRadius: '10px'         // Rounded corners for the border
                }}>
                    <select className="form-select" id="wd-assignment-group" value={assignmentGroup}
                    onChange={(e) => setAssignmentGroup(e.target.value)}>
                        <option value="Quizzes">Quizzes</option>
                        <option value="Exams">Exams</option>
                        <option value="Assignments">Assignments</option>
                        <option value="Project">Project</option>
                    </select>
                    <div className="mt-3">
                        <label className="form-label">Options</label>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="wd-shuffle-answers"
                            checked={shuffleAnswers}
                            onChange={(e) => setShuffleAnswers(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="wd-shuffle-answers" >Shuffle Answers</label>
                    </div>
                   
                    <div className="d-flex align-items-center">
                        <div className="form-check me-2">
                            <input
                            className="form-check-input"
                            type="checkbox"
                            id="wd-time-limit"
                            checked={!!timeLimit} // Checks if a time limit is set
                            onChange={(e) => setTimeLimit(e.target.checked ? 20 : 0)} // If checked, default to 20 minutes, otherwise set to 0
                            />
                            <label className="form-check-label" htmlFor="wd-time-limit">
                            Time Limit
                            </label>
                        </div>

                        <input
                            type="number"
                            className="form-control ms-2"
                            id="wd-time-minutes"
                            value={timeLimit}
                            onChange={(e) => setTimeLimit(parseInt(e.target.value, 10))}
                            min="1" // Set a minimum value for the time limit
                            style={{ width: "60px" }} // Width to match the design
                            disabled={!timeLimit} // Disable input if no time limit is set
                        />

                        <label className="ms-2 mb-0" htmlFor="wd-time-minutes">
                            Minutes
                        </label>
                    </div>

                   
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="wd-multiple-attempts"
                            checked={multipleAttempts}
                            onChange={(e) => setMultipleAttempts(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="wd-multiple-attempts">
                            Allow Multiple Attempts
                        </label>
                    </div>
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="wd-show-correct-answers" className="form-label">Show Correct Answers</label>
                <input type="text" className="form-control" id="wd-show-correct-answers" value={showCorrectAnswers}
                onChange={(e) => setShowCorrectAnswers(e.target.value)} />
            </div>

            <div className="mb-3">
                <label htmlFor="wd-access-code" className="form-label">Access Code</label>
                <input type="text" className="form-control" id="wd-access-code" value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)} />
            </div>

            <div className="form-check mt-3">
              <label className="form-check-label" htmlFor="wd-one-question-at-a-time">
                One Question at a Time
              </label>
              <input
                className="form-check-input"
                type="checkbox"
                id="wd-one-question-at-a-time"
                checked={oneQuestionAtATime}
                onChange={(e) => setOneQuestionAtATime(e.target.checked)}
              />
            </div>
            <div className="form-check mt-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="wd-webcam-required"
                checked={webcamRequired}
                onChange={(e) => setWebcamRequired(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="wd-webcam-required">
                Webcam Required
              </label>
            </div>

            <div className="form-check mt-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="wd-lock-questions-after-answering"
                  checked={lockQuestionsAfterAnswering}
                  onChange={(e) => setLockQuestionsAfterAnswering(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="wd-lock-questions-after-answering">
                  Lock Questions After Answering
                </label>
            </div>

        </div>
        <br/>

          <div className="row">
                <div className="col-auto text-end pe-2 align-self-start"> {/* Align label to the right */}
                    <label htmlFor="wd-assign" className="form-label">Assign</label>
                </div>
            <div className="col" style={{
                border: '1px solid lightgrey',    // Solid border with a specific color
                padding: '10px',             // Padding around the content within the div
                borderRadius: '10px'         // Rounded corners for the border
            }}>
                <label htmlFor="wd-assign-to" className="form-label">Assign to</label>
                <input type="text" id="wd-assign-to" className="form-control" value={assignTo}
                    onChange={(e) => setAssignTo(e.target.value)} />
                <div className="mt-3">
                <label htmlFor="wd-due-date" className="form-label">Due</label>
                <input type="date" id="wd-due-date" className="form-control" value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)} />
                </div>
                <div className="mt-3 d-flex justify-content-start">
                <div>
                    <label htmlFor="wd-available-from" className="form-label">Available from</label>
                    <input type="date" id="wd-available-from" className="form-control" value={availableDate}
                        onChange={(e) => setavailableDate(e.target.value)} />
                </div>
                <div className="ms-5"> {/* Margin to space out the 'Until' input */}
                    <label htmlFor="wd-available-until" className="form-label">Until</label>
                    <input type="date" id="wd-available-until" className="form-control" value={untilDate}
                        onChange={(e) => setUntilDate(e.target.value)} />
                </div>
                </div>
            </div>
            </div>

          {/* Add more fields like Quiz Type, Points, Assignment Group, etc., following the same pattern */}
        </div>
      )}

      {activeTab === 'Questions' && (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50px' }}>
            <button className="btn btn-light border border-dark" onClick={() => handleAddQuestion()}>
                + New Question
            </button>
        </div>
      )}

      <hr />
      <div className="row">
        <div className="col text-end">
          <Link to={`/Kanbas/Courses/${courseId}/Quizzes`} className="btn btn-secondary me-2">
            Cancel
          </Link>
          <button onClick={handleSave} className="btn btn-danger me-2">
            Save
          </button>
          <button onClick={handleSaveAndPublish} className="btn btn-success">
            Save and Publish
          </button>
        </div>
      </div>
    </div>
  );
}
