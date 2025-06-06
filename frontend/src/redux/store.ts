import { configureStore } from "@reduxjs/toolkit";
import { vacationsSlice } from "./vacationSlice";

const store = configureStore({
  reducer: {
    vacations: vacationsSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
