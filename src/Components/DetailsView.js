import React from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../url.js';
import * as EditView from './EditView.js';
import 'bootstrap/dist/css/bootstrap.css';

class DetailsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: []
    };

    this.renderEditDetails = this.renderEditDetails.bind(this);
    this.setNewDetails = this.setNewDetails.bind(this);
    this.Delete = this.Delete.bind(this);
    this.Cancel = this.Cancel.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id; // Get the id section on the requested url
    const requested_url = this.props.match.url; // StudentDetails/:id
    //console.log(this.props);
    // `http://localhost/connection.php/StudentDetails/${id}`
    axios
      .get(baseURL + requested_url)
      .then(res => {
        this.setState({ details: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setNewDetails(e) {
    e.preventDefault();
    const name = document.getElementById('Name').value;
    const email = document.getElementById('Email').value;
    const title = document.getElementById('Title').value;
    const student = { Name: name, Email: email, Title: title };
    /* Here will be the UPDATE function axios to update the student in db */
    const id = this.props.match.params.id;
    axios
      .put(baseURL + '/' + id, student)
      .then(res => {
        console.log(
          `Before:\nName: ${this.state.details.Name}\nEmail: ${
            this.state.details.Email
          }\nTitle: ${this.state.details.Title}`
        );
        this.setState({ details: { Name: name, Email: email, Title: title } });
        console.log(`After:\nName: ${name}\nEmail: ${email}\nTitle: ${title}`);
        console.log(res);
        this.Cancel(e);
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderEditDetails() {
    const element = (
      <form>
        <div className="form-group">
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            className="form-control"
            id="Name"
            placeholder="Enter Full Name"
            defaultValue={this.state.details.Name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="EmailInput">Email address</label>
          <input
            type="email"
            className="form-control"
            id="Email"
            placeholder="Enter email"
            defaultValue={this.state.details.Email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="TitleArea">Title</label>
          <textarea
            className="form-control"
            id="Title"
            rows="3"
            placeholder="Enter Title"
            defaultValue={this.state.details.Title}
          />
        </div>
        <button className="btn btn-primary" onClick={this.setNewDetails}>
          Submit
        </button>
        <button className="btn btn-primary" onClick={this.Cancel}>
          Cancel
        </button>
      </form>
    );

    ReactDOM.render(element, document.getElementById('details'));
  }

  Delete() {
    const id = this.props.match.params.id;
    axios
      .delete(baseURL +"/"+ id)
      .then(res => {
        console.log(res);
        this.props.history.push('/StudentList');
        console.log('The student deleted!');
      })
      .catch(error => {
        console.log(error);
      });
  }

  Cancel(e) {
    e.persist();

    const btnelement = (
      <div>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={this.renderEditDetails}
        >
          Ενημέρωση
        </button>
        <button type="button" className="btn btn-danger" onClick={this.Delete}>
          Διαγραφή
        </button>
      </div>
    );

    ReactDOM.unmountComponentAtNode(document.getElementById('details'));
    ReactDOM.render(btnelement, document.getElementById('details'));
  }

  render() {
    return (
      <div>
        <div className="App">
          <label htmlFor="Name">Name</label>
          <h1> {this.state.details.Name} </h1>

          <label htmlFor="Name">Email</label>
          <h3> {this.state.details.Email} </h3>

          <label htmlFor="Name">Title</label>
          <h3> {this.state.details.Title} </h3>
        </div>
        <div id="details">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={this.renderEditDetails}
          >
            Ενημέρωση
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.Delete}
          >
            Διαγραφή
          </button>
        </div>
      </div>
    );
  }
}

export default DetailsView;
