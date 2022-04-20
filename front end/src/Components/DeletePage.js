import { Link } from "react-router-dom";

const DeletePage = (props) => {
  return (
    <div className="ui main">
      <Link to="/">
        <div className="field">Are you sure?</div>
        <button className="ui right floated blue button" onClick={() => props.deleteContactApp(props.location.state.id)}>
          yes
        </button>
      </Link>
      <Link to="/">
        <button className="ui left floated blue button">No</button>
      </Link>
    </div>
  );
};

export default DeletePage;
