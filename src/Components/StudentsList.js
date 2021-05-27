import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
var _ = require('underscore');


class StudentList extends React.Component{
    state = {
      students: []
    }
  
    componentDidMount(){
      axios.get('http://localhost/connection.php')
      .then(
        res => {
          var sortedStudents = _.sortBy(res.data, "Name");
          //console.log(sortedStudents);
          this.setState({students: sortedStudents});
      });
    }
  
    render(){
      return (
        <ul className="list-group">
            { this.state.students.map( list =>
                <li key={list.id} className="list-group-item list-group-item-action">
                  <Link to={`StudentDetails/${list.id}`}>
                    <span >
                      {list.Name}
                    </span>
                  </Link>
                </li>
            ) }
        </ul>
      );
    }
  }
  export default StudentList;