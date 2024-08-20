import React from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";

export default function QuizDetails() {

    
    const { qzid } = useParams();
    const navigate = useNavigate();
   
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
    const userRole = currentUser?.role;

    const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes); // Get assignments from the state
    const quiz = quizzes.find((qz : any) => qz._id === qzid); // Find the specific assignment

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


    console.log("QuizDetails", quiz);
    
    if (!quiz) {
        return <div>Loading...</div>;
    }
    
    return (
        <div className="bg-white p-4 rounded shadow-sm" style={{ maxWidth: '600px', margin: '0 auto' }}>
          
            {userRole === "FACULTY" && (
                <div className="d-flex justify-content-center align-items-center mb-3">
                    <button className="btn btn-danger me-2" onClick={() => {
                      navigate(`./Questions`)
                    }}>
                      Start the Quiz
                    </button>
                    <button className="btn btn-light me-2 border" onClick={() => {
                      navigate(`./Questions`)
                    }} >Preview</button>
                    <button className="btn btn-light border" onClick={()=>{
                        navigate(`./Editor`); 
                    }} >Edit</button>
                </div>
            )}
            {userRole === "STUDENT" && (
                <div className="d-flex justify-content-center align-items-center mb-3">
                    <button className="btn btn-danger me-2" onClick={() => {
                      navigate(`./Questions`)
                    }}>
                      Start the Quiz
                    </button>
                </div>
            )}
          <hr/>
          <h2 className="text-center mb-4">{quiz.title}</h2>
          <div className="text-center">
            <div className="mb-2"><strong>Quiz Type:</strong> {quiz.quizType}</div>
            <div className="mb-2"><strong>Points:</strong> {quiz.points}</div>
            <div className="mb-2"><strong>Assignment Group:</strong> {quiz.assignmentGroup}</div>
            <div className="mb-2"><strong>Shuffle Answers:</strong> {quiz.shuffleAnswers ? "Yes" : "No"}</div>
            <div className="mb-2"><strong>Time Limit:</strong> {quiz.timeLimit} Minutes</div>
            <div className="mb-2"><strong>Multiple Attempts:</strong> {quiz.multipleAttempts ? "Yes" : "No"}</div>
            {quiz.multipleAttempts && (
              <div className="mb-2"><strong>How Many Attempts:</strong> {quiz.howManyAttempts}</div>
            )}
            <div className="mb-2"><strong>View Responses:</strong> {quiz.viewResponses}</div>
            <div className="mb-2"><strong>Show Correct Answers:</strong> {quiz.showCorrectAnswers}</div>
            {quiz.accessCode && <div className="mb-2"><strong>Access Code:</strong> {quiz.accessCode}</div>}
            <div className="mb-2"><strong>One Question at a Time:</strong> {quiz.oneQuestionAtATime ? "Yes" : "No"}</div>
            <div className="mb-2"><strong>Require Respondus LockDown Browser:</strong> {quiz.requireLockDownBrowser ? "Yes" : "No"}</div>
            <div className="mb-2"><strong>Required to View Quiz Results:</strong> {quiz.requiredToViewQuizResults ? "Yes" : "No"}</div>
            <div className="mb-2"><strong>Webcam Required:</strong> {quiz.webcamRequired ? "Yes" : "No"}</div>
            <div className="mb-2"><strong>Lock Questions After Answering:</strong> {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</div>
            <hr />
            <div className="mb-2"><strong>For:</strong> {quiz.assignedTo}</div>
            <div className="mb-2"><strong>Due:</strong> {formatDate(quiz.dueDate)}</div>
            <div className="mb-2"><strong>Available from:</strong> {formatDate(quiz.availableDate)}</div>
            <div className="mb-2"><strong>Until:</strong> {formatDate(quiz.untilDate)}</div>
          </div>
        </div>
      );
    
}
