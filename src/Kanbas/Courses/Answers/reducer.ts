import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  answers: [],
};

const answersSlice = createSlice({
  name: "answers",
  initialState,
  reducers: {
    setAnswers: (state, action) => {
      state.answers = action.payload;
    },
    addAnswer: (state, { payload: answer }) => {
      const newAnswer: any = {
        _id: new Date().getTime().toString(),
        userId: answer.userId,
        questionId: answer.questionId,
        quizId: answer.quizId,
        answer: answer.answer,
        date: answer.date || new Date().toISOString(),
        score: answer.score || 0,
      };
      state.answers = [...state.answers, newAnswer] as any;
    },
    deleteAnswer: (state, { payload: answerId }) => {
      state.answers = state.answers.filter(
        (a: any) => a._id !== answerId
      );
    },
    updateAnswer: (state, { payload: answer }) => {
      state.answers = state.answers.map((a: any) =>
        a._id === answer._id ? answer : a
      ) as any;
    },
  },
});

export const { setAnswers, addAnswer, deleteAnswer, updateAnswer } = answersSlice.actions;
export default answersSlice.reducer;
