import React from 'react';
import "bootstrap/dist/css/bootstrap.css";

function EditView(props){
    const data = [];
    console.log(props);
        const element = 
    <form>
      <div className="form-group">
          <label htmlFor="Name">Name</label>
          <input type="text" className="form-control" id="Name" placeholder="Enter Full Name" defaultValue={data.Name} />
      </div>
      <div className="form-group">
          <label htmlFor="EmailInput">Email address</label>
          <input type="email" className="form-control" id="Email" placeholder="Enter email" defaultValue={data.Email} />
      </div>
      <div className="form-group">
          <label htmlFor="TitleArea">Title</label>
          <textarea className="form-control" id="Title" rows="3" placeholder="Enter Title" defaultValue={data.Title} ></textarea>
      </div>
      <button className="btn btn-primary" >Submit</button>
    </form>;
}

export default EditView;