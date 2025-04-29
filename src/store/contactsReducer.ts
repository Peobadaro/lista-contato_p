interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface ContactsState {
  contacts: Contact[];
}

const initialState: ContactsState = {
  contacts: []
};

type ContactAction = 
  | { type: 'ADD_CONTACT'; payload: Contact }
  | { type: 'REMOVE_CONTACT'; payload: number }
  | { type: 'EDIT_CONTACT'; payload: Contact };

export const contactsReducer = (state = initialState, action: ContactAction): ContactsState => {
  switch (action.type) {
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      };
    case 'REMOVE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload)
      };
    case 'EDIT_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        )
      };
    default:
      return state;
  }
};

export type { Contact, ContactsState }; 