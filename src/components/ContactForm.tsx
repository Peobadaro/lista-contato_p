import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Contact } from '../store/contactsReducer';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #0052a3;
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
      <Input
        type="text"
        placeholder="Nome"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <Input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <Input
        type="tel"
        placeholder="Telefone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        required
      />
      <Button type="submit">
        {editingContact ? 'Atualizar Contato' : 'Adicionar Contato'}
      </Button>
    </FormContainer>
  );
};

export default ContactForm; 