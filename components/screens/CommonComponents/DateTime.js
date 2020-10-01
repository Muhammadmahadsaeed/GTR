var getDate = new Date();
var date = new Date().getDate(); //Current Date
var month = new Date().getMonth() + 1; //Current Month
var year = new Date().getFullYear(); //Current Year
var hours = getDate.getHours();
var minutes = getDate.getMinutes();
var ampm = hours >= 12 ? 'pm' : 'am';
hours = hours % 12;
hours = hours ? hours : 12; // the hour '0' should be '12'
minutes = minutes < 10 ? '0' + minutes : minutes;
var strTime = hours + ':' + minutes + ' ' + ampm;
const setCurrentDate = date + '/' + month + '/' + year;

export {strTime, setCurrentDate};
