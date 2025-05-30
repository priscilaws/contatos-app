import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface ContactsState {
  list: Contact[];
}

const initialState: ContactsState = {
  list: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Omit<Contact, 'id'>>) => {
      const id = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      state.list.push({ ...action.payload, id });
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const index = state.list.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) state.list[index] = action.payload;
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((c) => c.id !== action.payload);
    },
  },
});

export const { addContact, updateContact, deleteContact } =
  contactsSlice.actions;

export default contactsSlice.reducer;
