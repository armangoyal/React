import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";
import {useRef} from 'react'

const ContactsList = (props) => {
  const deleteContactHandler = (id) => {
    props.deleteContactApp(id);
  };
  const renderContactsList = props.contacts.map((contact) => {
    return (
      <ContactCard
        key={contact.id}
        contact={contact}
        deleteContact={deleteContactHandler}
      ></ContactCard>
    );
  });

  const term = useRef("")

  const submitHandler = () =>{
    props.onSubmit(term.current.value)

  }
  return (
    <div className="main"> 
    
       <h2>
        Contact list
        <Link to="/add">
          <button className="ui right floated blue button">Add Contact</button>
        </Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input">
          <input ref={term} type ="text" value={props.term} placeholder="Search Contacts" className="prompt" onChange={submitHandler}/>
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">{renderContactsList.length>0?renderContactsList:"No Contacts"}</div>
    </div>
  );
};

export default ContactsList;
