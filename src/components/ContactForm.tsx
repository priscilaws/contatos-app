import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  addContact,
  updateContact,
  deleteContact,
} from '../store/contactsSlice';

const Container = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 1rem;
  background: #fdfdfd;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Button = styled.button`
  background: #8a95dd;
  border: none;
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: rgb(75, 89, 179);
  }
`;

function ContactForm() {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector((state) => state.contacts.list);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (selectedId) {
      dispatch(updateContact({ id: selectedId, ...form }));
    } else {
      dispatch(addContact(form));
    }
    resetForm();
  };

  const handleEdit = (id: string) => {
    const contact = contacts.find((c) => c.id === id);
    if (contact) {
      setForm({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
      });
      setSelectedId(id);
    }
  };

  const handleDelete = (id: string) => {
    dispatch(deleteContact(id));
    if (selectedId === id) resetForm();
  };

  const resetForm = () => {
    setForm({ name: '', email: '', phone: '' });
    setSelectedId(null);
  };

  return (
    <Container>
      <h2>{selectedId ? 'Editar Contato' : 'Adicionar Contato'}</h2>
      <Input
        name="name"
        placeholder="Nome completo"
        value={form.name}
        onChange={handleChange}
      />
      <Input
        name="email"
        placeholder="E-mail"
        value={form.email}
        onChange={handleChange}
      />
      <Input
        name="phone"
        placeholder="Telefone"
        value={form.phone}
        onChange={handleChange}
      />
      <div>
        <Button onClick={handleSubmit}>
          {selectedId ? 'Salvar' : 'Adicionar'}
        </Button>
        {selectedId && <Button onClick={resetForm}>Cancelar</Button>}
      </div>
      <hr />
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <p>
              {contact.name} - {contact.email} - {contact.phone}
            </p>
            <Button onClick={() => handleEdit(contact.id)}>Editar</Button>
            <Button onClick={() => handleDelete(contact.id)}>Remover</Button>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default ContactForm;
