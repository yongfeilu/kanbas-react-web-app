import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteQuestion, updateQuestion } from './reducer';
import * as client from './client';

export default function QuestionEditor() {
  const { id: courseId, qzid: quizId, qid: questionId } = useParams(); // Get both quiz ID and question ID from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const questions = useSelector((state: any) => state.questionsReducer.questions);
  const question = questions.find((q: any) => q._id === questionId);


  console.log("QuestionEditor", questionId, question);

  const [title, setTitle] = useState(question ? question.title : '');
  const [type, setType] = useState(question ? question.type : 'MultiChoice');
  const [points, setPoints] = useState(question ? question.points : 0);
  const [questionText, setQuestionText] = useState(question ? question.question : '');
  const [correctAnswers, setCorrectAnswers] = useState(question ? question.correctAnswers : []);
  const [options, setOptions] = useState(question ? question.options : []);

  useEffect(() => {
    if (question) {
      setTitle(question.title);
      setType(question.type);
      setPoints(question.points);
      setQuestionText(question.question);
      setCorrectAnswers(question.correctAnswers);
      setOptions(question.options);
    }
  }, [question]); // This effect will run every time the question object changes


  const handDeleteQuestion = async() => {
    try {
        await client.deleteQuestion(questionId as string); // Delete the question using the client API
        dispatch(deleteQuestion(questionId));
        // Navigate the user back to the list of questions after deletion
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Questions`);
    } catch (error) {
        console.error("Error deleting the question:", error);
    }
  }

  const handleSave = async () => {
    const updatedQuestion = {
      ...question,
      title,
      type,
      points,
      question: questionText,
      correctAnswers,
      options,
    };
    await client.updateQuestion(updatedQuestion);
    dispatch(updateQuestion(updatedQuestion));
    navigate(`/Kanbas/Courses/${quizId}/Quizzes/${quizId}/Questions/${questionId}`);
  };

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleDeleteOption = (index: number) => {
    const newOptions = options.filter((_: string, i: number) => i !== index);
    setOptions(newOptions);
  };

  return (
    <div className="container">
      <div className="mb-4">
        <h3>Edit Question</h3>
      </div>

      <div className="mb-3">
        <label htmlFor="question-title" className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          id="question-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="question-type" className="form-label">Question Type</label>
        <select
          className="form-select"
          id="question-type"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            if (e.target.value === "TrueOrFalse") {
                setOptions(["True", "False"]);
                setCorrectAnswers([]); // Optionally clear correct answers
            } else if (e.target.value === "FillInBlank") {
                setOptions([]);
                setCorrectAnswers([]); // Optionally clear correct answers
            }
          }}
        >
          <option value="TrueOrFalse">True/False</option>
          <option value="MultiChoice">Multiple Choice</option>
          <option value="FillInBlank">Fill in the Blank</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="question-points" className="form-label">Points</label>
        <input
          type="number"
          className="form-control"
          id="question-points"
          value={points}
          onChange={(e) => setPoints(parseInt(e.target.value, 10))}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="question-text" className="form-label">Question</label>
        <textarea
          className="form-control"
          id="question-text"
          rows={5}
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        ></textarea>
      </div>

      <div className="mb-3">
       
        { type === 'MultiChoice' && (
            <>
                <label className="form-label">Options</label>
                {options.map((option: string, index: number) => (
                    <div key={index} className="d-flex align-items-center mb-2">
                        <input
                            type="text"
                            className="form-control me-2"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                        />
                        <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteOption(index)} >
                            Delete
                        </button>
                    </div>
                ))}
               
                <button className="btn btn-primary" onClick={handleAddOption}>
                    + Add Option
                </button>
                
                <div className="mt-3">
                    <label className="form-label">Correct Answer</label>
                    <select
                        className="form-select"
                        value={correctAnswers[0] || ''}
                        onChange={(e) => setCorrectAnswers([e.target.value])} >
                            {options.map((option: string, index: number) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                    </select>
                </div>
             </>
      )}

        { type === 'TrueOrFalse' && (
            <>
                <label className="form-label">Options</label>
                {options.map((option: string, index: number) => (
                    <div key={index} className="d-flex align-items-center mb-2">
                        <input
                            type="text"
                            className="form-control me-2"
                            value={option}
                            disabled
                        />
                    </div>
                ))}
                <div className="mt-3">
                    <label className="form-label">Correct Answer</label>
                    <select
                        className="form-select"
                        value={correctAnswers[0] || ''}
                        onChange={(e) => setCorrectAnswers([e.target.value])} >
                            {options.map((option: string, index: number) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                    </select>
                </div>
             </>
        )}

        { type === 'FillInBlank' && (
            <>
                <label className="form-label">Correct Answer(s)</label>
                {correctAnswers.map((answer: string, index: number) => (
                    <div key={index} className="d-flex align-items-center mb-2">
                        <input
                            type="text"
                            className="form-control me-2"
                            value={answer}
                            onChange={(e) => {
                                const newAnswers = [...correctAnswers];
                                newAnswers[index] = e.target.value;
                                setCorrectAnswers(newAnswers);
                            }}
                        />
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                const newAnswers = correctAnswers.filter((_: string, i: number) => i !== index);
                                setCorrectAnswers(newAnswers);
                            }}>
                            Delete
                        </button>
                    </div>
                ))}
                <button
                    className="btn btn-primary"
                    onClick={() => setCorrectAnswers([...correctAnswers, ""])}
                >
                    + Add Another Answer
                </button>
            </>
        )}



      </div>

      <div className="d-flex justify-content-end mt-4">
        <button
          className="btn btn-danger me-2"
          onClick={handDeleteQuestion}
        > Delete 
        </button>
        
        <button
          className="btn btn-secondary me-2"
          onClick={() => navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Questions/${questionId}`)}
        >
          Cancel
        </button>
        <button
          className="btn btn-success"
          onClick={handleSave}
        >
          Update Question
        </button>
      </div>
    </div>
  );
}
