import { createSelector } from "@reduxjs/toolkit";
import { selectNameFilter } from "../filters/selectors";

export const selectContacts = (state) => state.contacts.items || [];

export const selectIsLoading = (state) => state.contacts.loading;
export const selectIsError = (state) => state.contacts.error;
export const selectCurrentContact = (state) => state.contacts.currentContact;
export const selectContactDelete = (state) => state.contacts.contactDelete;
const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (items, name) => {
    if (!items) return [];
    const filteredItems = items.filter(
      (item) =>
        item &&
        item.name &&
        item.name.toLowerCase().includes(name.toLowerCase())
    );

    return filteredItems;
  }
);

export default selectFilteredContacts;
