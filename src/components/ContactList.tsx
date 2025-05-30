import React from 'react';
import styled from 'styled-components';
import ContactItem from './ContactItem';

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface ContactListProps {
  contacts: Contact[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ContactList: React.FC<ContactListProps> = ({
  contacts,
  onEdit,
  onDelete,
}) => {
  if (contacts.length === 0) {
    return <p>Nenhum contato cadastrado.</p>;
  }

  return (
    <List>
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          contact={contact}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </List>
  );
};

export default ContactList;
