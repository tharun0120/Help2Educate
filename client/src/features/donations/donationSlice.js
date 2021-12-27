import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DonationClass from "../../app/Donations";

const initialState = {
  allDonations: [],
  donations: [],
  isFetching: false,
  isSuccess: false,
  isError: false,
  error: [],
};

const donation = new DonationClass();

const createDonation = createAsyncThunk(
  "/api/createDonation",
  (donations, thunkAPI) => {
    return new Promise(async (resolve, reject) => {
      await donation
        .createDonation(donations)
        .then((donations) => resolve(donations))
        .catch((error) => {
          reject(thunkAPI.rejectWithValue(error));
        });
    });
  }
);

const getUserDonations = createAsyncThunk(
  "/api/getUserDonations",
  (thunkAPI) => {
    return new Promise(async (resolve, reject) => {
      await donation
        .getUserDonations()
        .then((donations) => resolve(donations))
        .catch((error) => reject(error));
    });
  }
);

const getDonations = createAsyncThunk("/api/getDonations", (thunkAPI) => {
  return new Promise(async (resolve, reject) => {
    await donation
      .getDonations()
      .then((donations) => resolve(donations))
      .catch((error) => reject(error));
  });
});

const deleteDonation = createAsyncThunk(
  "/api/donations",
  (donations, thunkAPI) => {
    return new Promise(async (resolve, reject) => {
      await donation
        .deleteDonations(donations)
        .then((deletedDonation) => resolve(deletedDonation))
        .catch((error) => reject(thunkAPI.rejectWithValue(error)));
    });
  }
);

const updateDonation = createAsyncThunk(
  "/api/updateDonation",
  (id, thunkAPI) => {
    return new Promise(async (resolve, reject) => {
      await donation
        .updateDonation(id)
        .then((updatedDonations) => resolve(updatedDonations))
        .catch((error) => reject(thunkAPI.rejectWithValue(error)));
    });
  }
);

const donationSlice = createSlice({
  name: "donationState",
  initialState,
  reducers: {
    clearDonationState: (state) => {
      state.allDonations = [];
      state.donations = [];
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      state.error = [];
    },
  },
  extraReducers: {
    //createDonation
    [createDonation.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [createDonation.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.donations.push(payload);
      // const type = payload.item_type;
      // if (!state.donations.hasOwnProperty(type)) {
      //   state.donations[type] = [payload];
      // } else {
      //   state.donations[type].push(payload);
      // }
    },
    [createDonation.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = payload;
    },
    //getDonations
    [getDonations.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [getDonations.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.allDonations = payload;
    },
    [getDonations.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = payload;
    },
    //getUserDonations
    [getUserDonations.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [getUserDonations.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.donations = payload;
    },
    [getUserDonations.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = payload;
    },
    //deleteDonations
    [deleteDonation.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [deleteDonation.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      const date = payload.deadline.slice(0, 10);
      state.donations[date] = state.donations[date].filter((donation) => {
        return donation._id !== payload._id;
      });
      if (state.donations[date].length === 0) delete state.donations[date];
    },
    [deleteDonation.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = payload;
    },
    //updateDonation
    [updateDonation.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [updateDonation.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      // const date = payload.deadline.slice(0, 10);
      state.donations = state.donations.map((donation) => {
        if (donation._id === payload._id) return payload;
        else return donation;
      });
    },
    [updateDonation.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = payload;
    },
  },
});

export {
  createDonation,
  getUserDonations,
  getDonations,
  deleteDonation,
  updateDonation,
};

export const { clearDonationState } = donationSlice.actions;

export const selectDonations = (state) => state.donationState;

export default donationSlice.reducer;
