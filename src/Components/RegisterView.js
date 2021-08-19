import React from 'react';
import { sendData } from './requestsService';
import { globalData, updateGlobalData} from './backendUrl';
import "bootstrap/dist/css/bootstrap.css";
import './nav.css';


class RegLink extends React.Component {
    constructor(props){
      super(props);
    
      this.registerPerson = this.registerPerson.bind(this);
      this.Back = this.Back.bind(this);
    }

registerPerson(e){

    e.preventDefault();

    const name = document.getElementById('RegName').value;
    const email = document.getElementById('RegEmail').value;
    const title = document.getElementById('RegTitle').value;
    const student = {Name: name, Email: email, Title: title};

    sendData(student)
        .then(response => {
            if(Number.isInteger(response)){
                var a = globalData;
                a.push({Name: student.Name, id: JSON.stringify(response)});
                updateGlobalData(a);
                document.getElementById('RegName').value = '';
                document.getElementById('RegEmail').value = '';
                document.getElementById('RegTitle').value = '';
                alert("New data inserted");
            } else {alert(response)}
        })
        .catch(console.error());
}

Back(){
    this.props.history.push("/StudentList");
    //this.props.history.goBack(); // For some reason this line doesn't work properly so thats why i use push method
    //console.log(this.props);
}

render(){
    return (
        <form>
            <button className="btn btn-secondary" onClick={this.Back}>Go Back</button>
            <div className="form-group">
                <label htmlFor="Name">Name</label>
                <input type="text" className="form-control" id="RegName" placeholder="Enter Full Name" />
            </div>
            <div className="form-group">
                <label htmlFor="EmailInput">Email address</label>
                <input type="email" className="form-control" id="RegEmail" placeholder="Enter email" />
            </div>
            <div className="form-group">
                <label htmlFor="TitleArea">Title</label>
                <textarea className="form-control" id="RegTitle" rows="3" placeholder="Enter Title"></textarea>
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.registerPerson} >Submit</button>
            
        </form>
        );
    } 
}

export default RegLink;