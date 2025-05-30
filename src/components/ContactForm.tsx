import React, { useState } from 'react';
import styled from 'styled-components';
import ContactList from './ContactList';

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

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

function ContactForm() {
  // Lista fake inicial para teste
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@email.com',
      phone: '1199999-9999',
    },
    {
      id: '2',
      name: 'Maria Souza',
      email: 'maria@email.com',
      phone: '1198888-8888',
    },
  ]);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.phone) return;

    if (selectedId) {
      setContacts((prev) =>
        prev.map((contact) =>
          contact.id === selectedId ? { ...contact, ...form } : contact,
        ),
      );
    } else {
      const newContact = { id: Date.now().toString(), ...form };
      setContacts((prev) => [...prev, newContact]);
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
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
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

      <ContactList
        contacts={contacts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Container>
  );
}

export default ContactForm;
