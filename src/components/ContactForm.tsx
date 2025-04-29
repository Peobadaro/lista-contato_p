import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Contact } from '../store/contactsReducer';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 600px;
  margin: 0 auto 3rem;
  padding: 2rem;
  background: var(--apple-gray);
  border-radius: 18px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: var(--apple-dark);
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #d2d2d7;
  border-radius: 12px;
  font-size: 17px;
  font-family: var(--apple-font);
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--apple-blue);
    box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.1);
  }

  &::placeholder {
    color: #86868b;
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  background-color: var(--apple-blue);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 17px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1rem;

  &:hover {
    background-color: var(--apple-blue-hover);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

interface ContactFormProps {
  editingContact?: Contact;
  onSubmit?: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ editingContact, onSubmit }) => {
  const [formData, setFormData] = useState<Omit<Contact, 'id'>>({
    name: editingContact?.name || '',
    email: editingContact?.email || '',
    phone: editingContact?.phone || ''
  });

  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingContact) {
      dispatch({
        type: 'EDIT_CONTACT',
        payload: { ...formData, id: editingContact.id }
      });
    } else {
      dispatch({
        type: 'ADD_CONTACT',
        payload: { ...formData, id: Date.now() }
      });
    }

    setFormData({ name: '', email: '', phone: '' });
    if (onSubmit) onSubmit();
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputGroup>
        <Label>Nome</Label>
        <Input
          type="text"
          placeholder="Digite o nome completo"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </InputGroup>
      <InputGroup>
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="Digite o email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </InputGroup>
      <InputGroup>
        <Label>Telefone</Label>
        <Input
          type="tel"
          placeholder="Digite o telefone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </InputGroup>
      <Button type="submit">
        {editingContact ? 'Atualizar Contato' : 'Adicionar Contato'}
      </Button>
    </FormContainer>
  );
};

export default ContactForm; 