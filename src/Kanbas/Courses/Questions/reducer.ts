import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    addQuestion: (state, { payload: question }) => {
      const newQuestion: any = {
        _id: new Date().getTime().toString(),
        quizId: question.quizId,
        title: question.title,
        type: question.type,
        points: question.points || 0,
        question: question.question,
        correctAnswers: question.correctAnswers || [],
        options: question.options || [],
      };
      state.questions = [...state.questions, newQuestion] as any;
    },
    deleteQuestion: (state, { payload: questionId }) => {
      state.questions = state.questions.filter(
        (q: any) => q._id !== questionId
      );
    },
    updateQuestion: (state, { payload: question }) => {
      state.questions = state.questions.map((q: any) =>
        q._id === question._id ? question : q
      ) as any;
    },
  },
});

export const { setQuestions, addQuestion, deleteQuestion, updateQuestion } = questionsSlice.actions;
export default questionsSlice.reducer;
