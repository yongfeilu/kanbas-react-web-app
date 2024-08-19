import React from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

export default function QuestionDetail() {
    const { questionId } = useParams();

    const questions = useSelector((state: any) => state.questionsReducer.questions);
    const question = questions.find((q: any) => q._id === questionId);

    if (!question) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-light p-4 rounded shadow-sm" style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h4 className="mb-3">Quiz Instructions</h4>
            <div className="mb-3">
                <div className="d-flex justify-content-between">
                    <h5>Question 1</h5>
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
                <button className="btn btn-secondary">Previous</button>
                <button className="btn btn-secondary">Next</button>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3">
                <button className="btn btn-light">Keep Editing This Quiz</button>
                <div>
                    <span>Quiz saved at 8:19am</span>
                    <button className="btn btn-danger ms-3">Submit Quiz</button>
                </div>
            </div>
        </div>
    );
}
