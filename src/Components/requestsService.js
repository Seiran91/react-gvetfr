import axios from 'axios';
import { baseUrl } from './backendUrl';
var _ = require('underscore');

// GET Request
async function getData(){
    return await axios.get(baseUrl)
        .then(
            res => {
            var sortedStudents = _.sortBy(res.data, "Name");
            //console.log(sortedStudents);
            return sortedStudents;
        })
        .catch( error => {
            console.log(error.error);
          });
}

async function getDetails(url){
    return await axios.get(baseUrl+url)
      .then(
        res => {
          return res.data;
      })
      .catch(error => {
      console.log(error);
    });
}

// POST Request

async function sendData(reg){
   return await axios.post(baseUrl, reg)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error.error);
            return error.error;
        });
}

// PUT Request

async function updateDetails(url, student){
    // Here will be the UPDATE function axios to update the student in db
    return await axios.put(baseUrl+url, student)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error.error);
      return error.error;
    });
    
  }

// DELETE Request

async function deleteData(url){
    return await axios.delete(baseUrl+url).then(res => {
        return res.data;
      })
      .catch(error=>{
        console.log(error.error);
      });
    }

export { getData, getDetails, sendData, updateDetails, deleteData }