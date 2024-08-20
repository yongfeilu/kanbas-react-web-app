import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";


export default function QuestionDetail() {

    const { id: courseId, qzid: quizId, qid: questionId } = useParams();
    const questions = useSelector((state: any) => state.questionsReducer.questions);

    const questionIndex = questions.findIndex((q: any) => q._id === questionId);

    const question = questions[questionIndex];

    const prevQuestionId = questionIndex > 0 ? questions[questionIndex - 1]._id : null;
    const nextQuestionId = questionIndex < questions.length - 1 ? questions[questionIndex + 1]._id : null;
    

    const navigate = useNavigate();

    if (!question) {
        return <div>Loading...</div>;
    }
    return (
        <div className="bg-light p-4 rounded shadow-sm" style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div className="mb-3">
                <div className="d-flex justify-content-between">
                    <h5>Question {` ${questionIndex + 1}`}</h5>
                    <span>{question.points} pts</span>
                </div>
                <div className="border p-3 mb-3 bg-white rounded">
                    <p>{question.question}</p>
                    <form>
                        {question.type === "TrueOrFalse" && (
                            <>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="trueFalse"
                                        id="trueOption"
                                    />
                                    <label className="form-check-label" htmlFor="trueOption">
                                        True
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="trueFalse"
                                        id="falseOption"
                                    />
                                    <label className="form-check-label" htmlFor="falseOption">
                                        False
                                    </label>
                                </div>
                            </>
                        )}
                        {question.type === "MultiChoice" && (
                            <>
                                {question.options.map((option: string, index: number) => (
                                    <div className="form-check" key={index}>
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="multiChoice"
                                            id={`option${index}`}
                                        />
                                        <label className="form-check-label" htmlFor={`option${index}`}>
                                            {option}
                                        </label>
                                    </div>
                                ))}
                            </>
                        )}
                        {question.type === "FillInBlank" && (
                            <input type="text" className="form-control" placeholder="Your answer" />
                        )}
                    </form>
                </div>
            </div>
            <div className="d-flex justify-content-between">
                {prevQuestionId && (
                    <button className="btn btn-secondary" 
                        onClick={() => {navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Questions/${prevQuestionId}`)}}>
                            Previous
                    </button>
                )}
                {nextQuestionId && (
                    <button className="btn btn-secondary" 
                        onClick={() => {navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Questions/${nextQuestionId}`)}}>
                            Next
                    </button>
                )}
            </div>
        </div>
    );
}
