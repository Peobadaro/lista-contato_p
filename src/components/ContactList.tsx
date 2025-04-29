import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store/store';
import { Contact } from '../store/contactsReducer';

const ListContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const ContactCard = styled.div`
  background-color: #fff;
  border-radius: 18px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ContactInfo = styled.div`
  flex-grow: 1;
`;

const ContactName = styled.h3`
  color: var(--apple-dark);
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
`;

const ContactDetail = styled.p`
  color: #86868b;
  font-size: 15px;
  margin: 0.25rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const Button = styled.button<{ variant?: 'delete' }>`
  padding: 8px 16px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.2s ease;
  background-color: ${props => 
    props.variant === 'delete' 
      ? '#ff3b30' 
      : 'var(--apple-blue)'};
  color: white;

  &:hover {
    transform: translateY(-1px);
    background-color: ${props => 
      props.variant === 'delete' 
        ? '#ff2d55' 
        : 'var(--apple-blue-hover)'};
  }

  &:active {
    transform: translateY(0);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #86868b;
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

  if (contacts.length === 0) {
    return (
      <EmptyState>
        <h3>Nenhum contato encontrado</h3>
        <p>Adicione um novo contato usando o formulário acima.</p>
      </EmptyState>
    );
  }

  return (
    <ListContainer>
      {contacts.map(contact => (
        <ContactCard key={contact.id} className="fade-in">
          <ContactInfo>
            <ContactName>{contact.name}</ContactName>
            <ContactDetail>
              <span>📧</span> {contact.email}
            </ContactDetail>
            <ContactDetail>
              <span>📱</span> {contact.phone}
            </ContactDetail>
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