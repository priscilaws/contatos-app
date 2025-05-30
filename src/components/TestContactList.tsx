import React from 'react';
import ContactList from './ContactList';

const fakeContacts = [
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
  {
    id: '3',
    name: 'Pedro Santos',
    email: 'pedro@email.com',
    phone: '1197777-7777',
  },
];

function TestContactList() {
  const handleEdit = (id: string) => {
    alert(`Editar contato com id: ${id}`);
  };

  const handleDelete = (id: string) => {
    alert(`Deletar contato com id: ${id}`);
  };

  return (
    <div>
      <h1>Lista de Contatos Fake</h1>
      <ContactList
        contacts={fakeContacts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default TestContactList;
