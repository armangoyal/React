import React from "react";

class AddContact extends React.Component {
  state = {
    name: "",
    email: "",
  };

  newContactHandler = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.email === "") {
      alert("All field are mandatory!");
      return;
    }
    this.props.addContact(this.state);
    this.setState({name:"", email:""})
    this.props.history.push("/")
  };

  render() {
    return (
      <div className="ui main">
        <h2>Add Contact</h2>
        <form className="ui form" onSubmit={this.newContactHandler}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            ></input>
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            ></input>
          </div>
          <button className="ui button blue left">Add</button>
        </form>
      </div>
    );
  }
}

export default AddContact;
