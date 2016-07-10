// Empty variables to start out
var startTime;
var endTime;
var endDate;
var projectInputName;
var workedTimes = [];
var workedDates = [];



// Click events that occur when the start button is clicked

function startTimer() {

	// 1. Logs the time that start button was clicked
	startTime = moment(startTime).format("YYYY-MM-DD HH:mm:ss");
	console.log("Start Time: " + startTime);
	
	// 2. Logs the name of the project
	projectInputName = $("#workName").val().trim();
	console.log("Project Name: " + projectInputName);

	return(startTime);
};


// Click events that occur when the end button is clicked
function endTimer(startTime) {
			
	// 3. Logs the time that the start button was clicked (used to calculate number of minutes)
	endTime = moment(endTime).format("YYYY-MM-DD HH:mm:ss");
	console.log("End Time: " + endTime);
	
	// 4. Logs the date that the project was worked on (used to track the actual streak)
	endDate = moment(endDate).format("YYYY-MM-DD");
	console.log("End Date: " + endDate);

	// 5. Calculates the time difference
	var diffTime = moment(startTime).diff(moment(endTime), "minutes");
	console.log("Time Difference: " + diffTime);

	// 7. Pushes the diffTime into the workedTimes array
	workedTimes.push(diffTime);
	console.log("Worked Times Array: " + workedTimes);

	workedDates.push(endDate.toString());
	console.log("Worked Dates Array: " + workedDates);

	// 7. Clears all of the text-boxes after sending to database
	$("#workName").val("");

	// 8 I hope this populates the chart
	populateChart(workedDates, workedTimes)
};

function populateChart(populateChartDateArray, populateChartTimeArray) {
	var ctx = document.getElementById("myChart");
		var myChart = new Chart(ctx , {
		    type: "line",
		    data: {
		    	labels: populateChartDateArray,
				datasets: [
					{
						label: "My First dataset",
			            fill: false,
			            lineTension: 0.1,
			            backgroundColor: "rgba(75,192,192,0.4)",
			            borderColor: "rgba(75,192,192,1)",
			            borderCapStyle: 'butt',
			            borderDash: [],
			            borderDashOffset: 0.0,
			            borderJoinStyle: 'miter',
			            pointBorderColor: "rgba(75,192,192,1)",
			            pointBackgroundColor: "#fff",
			            pointBorderWidth: 1,
			            pointHoverRadius: 5,
			            pointHoverBackgroundColor: "rgba(75,192,192,1)",
			            pointHoverBorderColor: "rgba(220,220,220,1)",
			            pointHoverBorderWidth: 2,
			            pointRadius: 1,
			            pointHitRadius: 10,
			            data: populateChartTimeArray
					},
				]
			},
			options: {

			}
	    })
}

$("#startButton").click(function() {
	startTimer();
	return false;
});

$("#endButton").click(function() {
	endTimer();
	return false;
});

// $(function () {
// 	console.log(workedDates);
// 	console.log(workedTimes);
	
// 	var ctx = document.getElementById("myChart");
// 	var myChart = new Chart(ctx , {
// 	    type: "line",
// 	    data: {
// 	    	labels: workedDates,
// 			datasets: [
// 				{
// 					label: "My First dataset",
// 		            fill: false,
// 		            lineTension: 0.1,
// 		            backgroundColor: "rgba(75,192,192,0.4)",
// 		            borderColor: "rgba(75,192,192,1)",
// 		            borderCapStyle: 'butt',
// 		            borderDash: [],
// 		            borderDashOffset: 0.0,
// 		            borderJoinStyle: 'miter',
// 		            pointBorderColor: "rgba(75,192,192,1)",
// 		            pointBackgroundColor: "#fff",
// 		            pointBorderWidth: 1,
// 		            pointHoverRadius: 5,
// 		            pointHoverBackgroundColor: "rgba(75,192,192,1)",
// 		            pointHoverBorderColor: "rgba(220,220,220,1)",
// 		            pointHoverBorderWidth: 2,
// 		            pointRadius: 1,
// 		            pointHitRadius: 10,
// 		            data: workedTimes
// 				},
// 			]
// 		},
// 		options: {

// 		}
//     })
// });