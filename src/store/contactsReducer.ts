interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface ContactsState {
  contacts: Contact[];
}

// Load contacts from localStorage or use empty array if none exists
const loadContacts = (): Contact[] => {
  const savedContacts = localStorage.getItem('contacts');
  return savedContacts ? JSON.parse(savedContacts) : [];
};

const initialState: ContactsState = {
  contacts: loadContacts()
};

type ContactAction = 
  | { type: 'ADD_CONTACT'; payload: Contact }
  | { type: 'REMOVE_CONTACT'; payload: number }
  | { type: 'EDIT_CONTACT'; payload: Contact };

// Helper function to save contacts to localStorage
const saveContacts = (contacts: Contact[]) => {
  localStorage.setItem('contacts', JSON.stringify(contacts));
};

export const contactsReducer = (state = initialState, action: ContactAction): ContactsState => {
  let newState: ContactsState;

  switch (action.type) {
    case 'ADD_CONTACT':
      newState = {
        ...state,
        contacts: [...state.contacts, action.payload]
      };
      saveContacts(newState.contacts);
      return newState;

    case 'REMOVE_CONTACT':
      newState = {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload)
      };
      saveContacts(newState.contacts);
      return newState;

    case 'EDIT_CONTACT':
      newState = {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        )
      };
      saveContacts(newState.contacts);
      return newState;

    default:
      return state;
  }
};

export type { Contact, ContactsState }; 