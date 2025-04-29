import React, { useState } from 'react';
import styled from 'styled-components';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import { Contact } from './store/contactsReducer';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 2rem 0;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #333;
  margin: 0;
`;

const App: React.FC = () => {
  const [editingContact, setEditingContact] = useState<Contact | undefined>();

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
  };

  const handleSubmit = () => {
    setEditingContact(undefined);
  };

  return (
    <AppContainer>
      <Header>
        <Title>Lista de Contatos</Title>
      </Header>
      <ContactForm editingContact={editingContact} onSubmit={handleSubmit} />
      <ContactList onEdit={handleEdit} />
    </AppContainer>
  );
};

export default App;
