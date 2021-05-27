import React, { useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../url.js';
import 'bootstrap/dist/css/bootstrap.css';
import './nav.css';

function registerPerson(e) {
  e.preventDefault();
  const name = document.getElementById('RegName').value;
  const email = document.getElementById('RegEmail').value;
  const title = document.getElementById('RegTitle').value;
  const student = { Name: name, Email: email, Title: title };
  axios
    .post(baseURL, student)
    .then(function(response) {
      document.getElementById('RegName').value = '';
      document.getElementById('RegEmail').value = '';
      document.getElementById('RegTitle').value = '';
      console.log(response);
      alert('New data inserted');
    })
    .catch(function(error) {
      console.log(error);
    });
}
function RegLink() {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="Name">Name</label>
        <input
          type="text"
          className="form-control"
          id="RegName"
          placeholder="Enter Full Name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="EmailInput">Email address</label>
        <input
          type="email"
          className="form-control"
          id="RegEmail"
          placeholder="Enter email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="TitleArea">Title</label>
        <textarea
          className="form-control"
          id="RegTitle"
          rows="3"
          placeholder="Enter Title"
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={registerPerson}
      >
        Submit
      </button>
    </form>
  );
}

export default RegLink;
