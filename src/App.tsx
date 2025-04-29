import React, { useState } from 'react';
import styled from 'styled-components';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import { Contact } from './store/contactsReducer';

const AppContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background-color: #f5f5f7;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: var(--apple-dark);
  margin: 0;
  letter-spacing: -0.5px;
`;

const Subtitle = styled.p`
  font-size: 21px;
  color: #86868b;
  margin: 1rem 0 0;
  font-weight: 400;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const App: React.FC = () => {
  const [editingContact, setEditingContact] = useState<Contact | undefined>(undefined);

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContainer>
      <ContentWrapper>
        <Header className="fade-in">
          <Title>Lista de Contatos</Title>
          <Subtitle>Gerencie seus contatos de forma simples e elegante</Subtitle>
        </Header>
        
        <ContactForm 
          editingContact={editingContact} 
          onEditComplete={() => setEditingContact(undefined)} 
        />
        <ContactList onEdit={handleEdit} />
      </ContentWrapper>
    </AppContainer>
  );
};

export default App;
