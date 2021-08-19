import React from 'react';
import ReactDOM from 'react-dom';
import { globalData, updateGlobalData } from './backendUrl';
import { deleteData, getDetails, updateDetails } from './requestsService';
import "bootstrap/dist/css/bootstrap.css";


class DetailsView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      details: []
    }
    this.renderEditDetails = this.renderEditDetails.bind(this);
    this.setNewDetails = this.setNewDetails.bind(this);
    this.Delete = this.Delete.bind(this);
    this.Cancel = this.Cancel.bind(this);
    this.Back = this.Back.bind(this);
  }

  componentDidMount(){

    const url = this.props.match.url;
    getDetails(url).then(
        res => {
          this.setState({details: res});
      })
      .catch(error => {
      console.log(error);
    });
    
  }

  setNewDetails(e){
    const url = this.props.match.url;
    const id = this.props.match.params.id;
    e.preventDefault();

    const name = document.getElementById('Name').value;
    const email = document.getElementById('Email').value;
    const title = document.getElementById('Title').value;
    const student = {Name: name, Email: email, Title: title};

    /* Here is the request to UPDATE function axios to update the student in db */
    updateDetails(url, student)
    .then(res => {
      console.log(`Before:\nName: ${this.state.details.Name}\nEmail: ${this.state.details.Email}\nTitle: ${this.state.details.Title}`);
      this.setState({details: {Name: name, Email: email, Title: title} });
      console.log(`After:\nName: ${name}\nEmail: ${email}\nTitle: ${title}`);
      const index = globalData.findIndex(function(data, i){
        return data.id === id
      });
      var a = globalData;
      console.log(index);
      a[index].Name = this.state.details.Name;
      const temp = Object.assign(globalData, a);
      updateGlobalData(temp);
      this.Cancel(e);
    })
    .catch(error => {
      console.log(error);
    });
    
  }

  renderEditDetails(){
    const element = 
    
    <form>
      <div className="form-group">
          <label htmlFor="Name">Name</label>
          <input type="text" className="form-control" id="Name" placeholder="Enter Full Name" defaultValue={this.state.details.Name} />
      </div>
      <div className="form-group">
          <label htmlFor="EmailInput">Email address</label>
          <input type="email" className="form-control" id="Email" placeholder="Enter email" defaultValue={this.state.details.Email} />
      </div>
      <div className="form-group">
          <label htmlFor="TitleArea">Title</label>
          <textarea className="form-control" id="Title" rows="3" placeholder="Enter Title" defaultValue={this.state.details.Title} ></textarea>
      </div>
      <button className="btn btn-primary" onClick={this.setNewDetails}>Submit</button>
      <button className="btn btn-primary" onClick={this.Cancel}>Cancel</button>
    </form>;

    ReactDOM.render(element, document.getElementById('details'));
  }
  
  Delete(){
    const url = this.props.match.url;
    const id = this.props.match.params.id;
    deleteData(url)
      .then(res => {
        console.log(res);
        const index = globalData.findIndex(function(data, i){
          return data.id === id
        });
        var a = globalData;
        a.splice(index, 1);                         // Remove deleted person from the list
        const temp = Object.assign(globalData, a);  // Assign the changes in the list
        updateGlobalData(temp);                     // Update global variable for the new list

        this.props.history.push('/StudentList');
        console.log('The student deleted!');
      })
      .catch(error=>{
        console.log(error);
      });
  }

  Cancel(e){
    //e.persist();

    const btnelement =
      <div>
        <button type="button" className="btn btn-secondary" onClick={this.renderEditDetails}>Ενημέρωση</button>
        <button type="button" className="btn btn-danger" onClick={this.Delete}>Διαγραφή</button>
      </div>;
    
    ReactDOM.unmountComponentAtNode(document.getElementById('details'));
    ReactDOM.render(btnelement, document.getElementById('details'));
  }

  Back(){
    this.props.history.goBack();
  }

  render(){
    return (
      <div>
        <button className="btn btn-secondary" onClick={this.Back}>Go Back</button>
      <div className="App">
        <label htmlFor="Name">Name</label>
        <h1> {this.state.details.Name} </h1>

        <label htmlFor="Name">Email</label>
        <h3> {this.state.details.Email} </h3>

        <label htmlFor="Name">Title</label>
        <h3> {this.state.details.Title} </h3>
      </div>
      <div id="details">
        <button type="button" className="btn btn-secondary" onClick={this.renderEditDetails}>Ενημέρωση</button>
        <button type="button" className="btn btn-danger" onClick={this.Delete}>Διαγραφή</button>
      </div>
      </div>
      )
    }
}

export default DetailsView;