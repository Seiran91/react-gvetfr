var _ = require('underscore');
const baseUrl = 'http://localhost/connection.php';
var globalData = '';

function updateGlobalData(val){
    console.log("update trigered");
    globalData = _.sortBy(val, "Name");
}

export { baseUrl, globalData, updateGlobalData};