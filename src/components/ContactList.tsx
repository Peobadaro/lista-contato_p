import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store/store';
import { Contact } from '../store/contactsReducer';

const ListContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const ContactCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContactInfo = styled.div`
  flex-grow: 1;
`;

const ContactName = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #333;
`;

const ContactDetail = styled.p`
  margin: 0.25rem 0;
  color: #666;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button<{ variant?: 'delete' }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props => props.variant === 'delete' ? '#dc3545' : '#0066cc'};
  color: white;

  &:hover {
    background-color: ${props => props.variant === 'delete' ? '#c82333' : '#0052a3'};
  }
`;

interface ContactListProps {
  onEdit: (contact: Contact) => void;
}

const ContactList: React.FC<ContactListProps> = ({ onEdit }) => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();

  const handleDelete = (id: number) => {
    dispatch({ type: 'REMOVE_CONTACT', payload: id });
  };

  return (
    <ListContainer>
      {contacts.map(contact => (
        <ContactCard key={contact.id}>
          <ContactInfo>
            <ContactName>{contact.name}</ContactName>
            <ContactDetail>{contact.email}</ContactDetail>
            <ContactDetail>{contact.phone}</ContactDetail>
          </ContactInfo>
          <ButtonGroup>
            <Button onClick={() => onEdit(contact)}>Editar</Button>
            <Button variant="delete" onClick={() => handleDelete(contact.id)}>
              Excluir
            </Button>
          </ButtonGroup>
        </ContactCard>
      ))}
    </ListContainer>
  );
};

export default ContactList; 