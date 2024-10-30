import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Title {
  id: number;
  subject: string;
  details: string;
}

interface TitleState {
  titles: Title[];
  snackbarOpen: boolean;
  snackbarMessage: string;
}

const initialState: TitleState = {
  titles: [
    { id: 1, subject: "Title 1", details: "Description of Title 1" },
    { id: 2, subject: "Title 2", details: "Description of Title 2" },
  ],
  snackbarOpen: false,
  snackbarMessage: "",
};

const titleSlice = createSlice({
  name: "titles",
  initialState,
  reducers: {
    addTitle: (state, action: PayloadAction<Title>) => {
      // Check if the title already exists by ID
      const isExistingTitle = state.titles.findIndex(
        (title) => title.id === action.payload.id
      );
      if (isExistingTitle >= 0) {
        return; // Exit if title with this ID already exists
      }

      const newTitle = {
        ...action.payload,
        id: action.payload.id || state.titles.length + 1, // Assign ID if not provided
      };

      state.titles.push(newTitle);
      state.snackbarOpen = true;
      state.snackbarMessage = "Title added successfully!";
    },

    deleteTitle: (state, action: PayloadAction<number>) => {
      state.titles = state.titles.filter(
        (title) => title.id !== action.payload
      );
      state.snackbarOpen = true;
      state.snackbarMessage = "Title deleted successfully";
    },

    closeSnackbar: (state) => {
      state.snackbarOpen = false;
      state.snackbarMessage = "";
    },
  },
});

export const { addTitle, deleteTitle, closeSnackbar } = titleSlice.actions;
export default titleSlice.reducer;
