import { createSlice, createSelector, isAnyOf } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact,
  deleteContact,
  editContactThunk,
} from "./operations.js";

import { selectFilter } from "../filters/slice";
import { selectContacts } from "./selectors";

import { logoutThunk } from "../auth/operations.js";

const initialState = {
  items: [],
  loading: false,
  error: null,
  currentContact: null,
  contactDelete: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setCurrentContact: (state, action) => {
      state.currentContact = action.payload;
      state.error = null;
    },
    setContactDelete: (state, action) => {
      state.contactDelete = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
        state.contactDelete = null;
      })
      .addCase(editContactThunk.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item.id === state.currentContact.id ? { ...action.payload } : item
        );
        state.currentContact = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.items = [];
      })
      .addMatcher(
        (action) => action.type.endsWith("pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("fulfilled"),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});
// .addMatcher(
//         isAnyOf(
//           fetchContacts.pending,
//           addContact.pending,
//           deleteContact.pending,
//           editContact.pending
//         ),
//         (state, _) => {
//           state.loading = true;
//         }
//       )
//       .addMatcher(
//         isAnyOf(
//           fetchContacts.fulfilled,
//           addContact.fulfilled,
//           deleteContact.fulfilled,
//           editContact.fulfilled
//         ),
//         (state, _) => {
//           state.loading = false;
//           state.error = null;
//         }
//       )
//       .addMatcher(
//         isAnyOf(
//           fetchContacts.rejected,
//           addContact.rejected,
//           deleteContact.rejected,
//           editContact.rejected
//         ),
//         (state, action) => {
//           state.loading = false;
//           state.error = action.payload;
//         }
//       );
//   },
// });
const selectContacts = (state) => state.contacts.items;
const selectFilter = (state) => state.filters.name;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.number.includes(filter)
    );
  }
);

export const selectIsLoading = (state) => state.contacts.loading;
export const selectIsError = (state) => state.contacts.error;

export const contactsReducer = contactsSlice.reducer;
export const { setCurrentContact, setContactDelete } = slice.actions;
