import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Vacation from "../models/vacation/Vacation";
import User from "../models/user/User";

interface VacationsSlice {
  vacations: Vacation[];
  currentPage: number;
}
const initialState: VacationsSlice = {
  vacations: [],
  currentPage: 1,
};

export const vacationsSlice = createSlice({
  name: "vacations",
  initialState,
  reducers: {
    init: (state, action: PayloadAction<Vacation[]>) => {
      state.vacations = action.payload;
    },
    addVacation: (state, action: PayloadAction<Vacation>) => {
      action.payload.followers = [];
      state.vacations = [action.payload, ...state.vacations];
    },
    removeVacation: (state, action: PayloadAction<{ id: string }>) => {
      state.vacations = state.vacations.filter(
        (v) => v.id !== action.payload.id
      );
    },
    editVacation: (state, action: PayloadAction<Vacation>) => {
      const index = state.vacations.findIndex(
        (v) => v.id === action.payload.id
      );
      if (index > -1) {
        const vactionFollowers = state.vacations[index].followers;
        const vacationImage = state.vacations[index].imageUrl
        state.vacations[index] = action.payload;
        state.vacations[index].followers = [...vactionFollowers];
        if (state.vacations[index].imageUrl === undefined) {
          state.vacations[index].imageUrl = vacationImage
        }
      }
    },
    followVacation: (
      state,
      action: PayloadAction<{ vacationId: string; user: User }>
    ) => {
      const index = state.vacations.findIndex(
        (v) => v.id === action.payload.vacationId
      );
      if (index > -1) {
        const vacation = state.vacations[index];
        if (!vacation.followers) {
          vacation.followers = [];
        }
        if (!vacation.followers.some((f) => f.id === action.payload.user.id)) {
          vacation.followers.push(action.payload.user);
        }
      }
    },
    unfollowVacation: (
      state,
      action: PayloadAction<{ vacationId: string; user: User }>
    ) => {
      const index = state.vacations.findIndex(
        (v) => v.id === action.payload.vacationId
      );
      if (index > -1 && state.vacations[index].followers) {
        state.vacations[index].followers = state.vacations[
          index
        ].followers.filter((f) => f.id !== action.payload.user.id);
      }
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  init,
  addVacation,
  removeVacation,
  editVacation,
  followVacation,
  unfollowVacation,
  setCurrentPage,
} = vacationsSlice.actions;

export default vacationsSlice.reducer;
