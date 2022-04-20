import user from "../Images/user.png";
import { Link } from "react-router-dom";

const ContactsCard = (props) => {
  const { id, name, email } = props.contact;
  return (
    <div className="item">
      <img className="ui avatar image" src={user} alt="user" />

      <div className="content">
        <Link
          to={{ pathname: `/contact/${id}`, state: { contact: props.contact } }}
        >
          <div className="header">{name}</div>
          <div>{email}</div>
        </Link>
      </div>
      <Link to={{ pathname: "/update", state: { contact: props.contact } }}>
        <i
          className="edit alternate outline icon"
          style={{ color: "blue", marginTop: "7px", marginLeft: "7px" }}
        ></i>
      </Link>
      <Link to={{ pathname: "/delete", state: { id: id } }}>
        <i
          className="trash alternate outline icon"
          style={{ color: "red", marginTop: "7px" }}
          // onClick={() => props.deleteContact(id)}
        ></i>
      </Link>
    </div>
  );
};

export default ContactsCard;
