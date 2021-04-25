// import the data from data.js
var tableData = data;

//Create references to the html elements in "index.html" using d3
//This is how data from "data.js" will appear from the dashboard 
var tbody = d3.select("tbody");

//The following code will build the table on the dashboard 

//It is a requirement to have each of the columns listed in the variable below 
columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"];

var ufo_data = (addData) => {
    addData.forEach(sighting => {
        var row = tbody.append("tr");
        columns.forEach(column => row.append("td").text(sighting[column]))
    });
};

//Add the data to the dashboard
ufo_data(tableData)

//Create an event listener to fulfil the filter by date requirement for this activity 

//Find the filter button in the html and select it using d3
filterButton = d3.select("#filter-btn");

//Set up the event listener 
filterButton.on("click", () =>{
    //Prevent default stops the browser from automatically displaying the default display listed for the 
    //event listner
    d3.event.preventDefault();
    //Find and select the element in the HTML that can allow for event listening
    var filterElem = d3.select("#datetime");
    //Obtain the value entered into the filter element
    var filterVal = filterElem.property("value");
    //Filter the data for the specified date in the datetime column
    var filterData = tableData.filter(data => data.datetime === filterVal)
    //clear the original data so that the filtered data can be observed
    tbody.html("");

    //Populate the table with filtered data only using an "if" statement
    if(filterData.length !==0){
        ufo_data(filterData);
    }

    else{
        tbody.append("tr").append("td").text("Date is not available in the datafame")
    }
});