import { useState, useEffect } from "react";
import "./App.css";
import ContactsList from "./ContactList";
import ContactDetails from "./ContactDetails.js";
import Header from "./Header";
import AddContact from "./AddContact";
import { v4 as uuid } from "uuid";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DeletePage from "./DeletePage";
import api from "../api/contacts";
import UpdateContact from "./UpdateContact";

function App() {
  //const LOCAL_SESSION_STORAGE = "contacts";

  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedContacts, setsearchedContacts] = useState([]);

  const addContactHandler = async (contact) => {
    const request = {
      id: uuid(),
      ...contact,
    };
    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    
    const response = await api.put(`/contacts/${contact.id}`,contact)
    const {id}= response.data
    setContacts(contacts.map((contact)=>{
      return contact.id===id ? response.data : contact
    })

    )
  };

  const deleteContactHandlerApp = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContacts = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContacts);
  };

  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  useEffect(() => {
    // const retrieveContacts = JSON.parse(
    //   localStorage.getItem(LOCAL_SESSION_STORAGE)
    // );
    const getRetrievedContacts = async () => {
      const allRetrievedContacts = await retrieveContacts();
      if (allRetrievedContacts) {
        setContacts(allRetrievedContacts);
      }
    };
    getRetrievedContacts();
  }, []);

  const searchHandler = (term) =>{
    setSearchTerm(term)
    if(term!==""){
      const searchedContacts = contacts.filter((contact)=>{
        return Object.values(contact).join(" ").toLowerCase().includes(term.toLowerCase())
      })
      setsearchedContacts(searchedContacts)
    } 
    else{
      setsearchedContacts(contacts)
    }
    
  }

  // useEffect(() => {
  //   localStorage.setItem(LOCAL_SESSION_STORAGE, JSON.stringify(contacts));
  // }, [contacts]);

  return (
    <div className="ui container">
      <Router>
        <Header />

        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <ContactsList
                {...props}
                contacts={searchTerm.length>0?searchedContacts:contacts}
                deleteContactApp={deleteContactHandlerApp}
                onSubmit ={searchHandler}
                term={searchTerm}
              />
            )}
          ></Route>
          <Route
            path="/add"
            render={(props) => (
              <AddContact {...props} addContact={addContactHandler} />
            )}
          ></Route>
          <Route
            path="/contact/:id"
            render={(props) => <ContactDetails {...props} />}
          ></Route>
          <Route
            path="/delete"
            render={(props) => (
              <DeletePage
                {...props}
                deleteContactApp={deleteContactHandlerApp}
              />
            )}
          />
          <Route
            path="/update"
            render={(props) => (
              <UpdateContact {...props} onUpdate={updateContactHandler} />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
