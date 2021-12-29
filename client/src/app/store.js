import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import donationReducer from "../features/donations/donationSlice";

export default configureStore({
  reducer: {
    userState: userReducer,
    donationState: donationReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
