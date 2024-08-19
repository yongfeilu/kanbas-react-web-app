import React from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import { GoCheckCircleFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as client from "./clients";
import { deleteQuiz, updateQuiz } from "./reducer";

export default function QuizControl({ quiz }:{ quiz: any }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEdit = () => {
    navigate(`./${quiz._id}/`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to remove this quiz?");
    if (confirmDelete) {
      await client.deleteQuiz(quiz._id);
      dispatch(deleteQuiz(quiz._id));
    }
  };

  const togglePublishQuiz = async () => {
    const updatedQuiz = {
      ...quiz,
      published: !quiz.published, // Toggle the published status
    };

    await client.updateQuiz(updatedQuiz); // Update the quiz with the new published status
    dispatch(updateQuiz(updatedQuiz)); // Update the Redux store with the new quiz data
  };

  return (
    <>
      <div className="dropdown d-inline">
        <IoEllipsisVertical
          className="fs-4"
          style={{ cursor: 'pointer' }}
          data-bs-toggle="dropdown"
          aria-expanded="false"
        />
        <ul className="dropdown-menu dropdown-menu-end">
          <li>
            <a className="dropdown-item" onClick={handleEdit}>
              Edit
            </a>
          </li>
          <li>
            <a className="dropdown-item" onClick={handleDelete}>
              Delete
            </a>
          </li>
          <li>
            <a className="dropdown-item" onClick={togglePublishQuiz}>
              {quiz.published ? "Unpublish" : "Publish"}
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
