import React from 'react';
import styled from 'styled-components';

const Item = styled.li`
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: #fafafa;
  border-radius: 8px;
  box-shadow: 0 0 4px #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Info = styled.p`
  margin: 0;
  flex: 1;
`;

const Button = styled.button`
  background: #8a95dd;
  border: none;
  padding: 0.3rem 0.6rem;
  margin-left: 0.5rem;
  border-radius: 6px;
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

interface ContactItemProps {
  contact: Contact;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ContactItem: React.FC<ContactItemProps> = ({
  contact,
  onEdit,
  onDelete,
}) => {
  return (
    <Item>
      <Info>
        {contact.name} - {contact.email} - {contact.phone}
      </Info>
      <div>
        <Button onClick={() => onEdit(contact.id)}>Editar</Button>
        <Button onClick={() => onDelete(contact.id)}>Remover</Button>
      </div>
    </Item>
  );
};

export default ContactItem;
