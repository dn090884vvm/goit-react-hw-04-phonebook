import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';

import { Filter } from './Filter/Filter';
import { GlobalStyle } from './GlobalStyle';
import { SectionWrapper } from './SectionWrapper/Sectionwrapper.styled';
import { Header1, Header2 } from './App.styled';
import { useState, useEffect } from 'react';

export default function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const deleteContact = contactListId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactListId)
    );
  };

  const addContact = (name, number) => {
    const isInContacts = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isInContacts) {
      alert(`${name} is already in contacts`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts([newContact, ...contacts]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <>
      <GlobalStyle />
      <SectionWrapper>
        <Header1>Phonebook</Header1>
        <ContactForm onSubmit={addContact} />
      </SectionWrapper>
      <SectionWrapper>
        <Header2>Contacts</Header2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          contacts={getFilteredContacts()}
          onDeleteContact={deleteContact}
        />
      </SectionWrapper>
    </>
  );
}

// export default App;
