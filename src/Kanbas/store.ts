import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import accountReducer from "./Account/reducer";
import quizzesReducer from "./Courses/Quizzes/reducer"
import questionsReducer from "./Courses/Questions/reducer"

const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentsReducer,
    accountReducer,
    quizzesReducer,
    questionsReducer,
  },
});

export default store;