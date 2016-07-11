var streakData = new Firebase("https://codetracker.firebaseio.com/");

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

		};
	});
};

$("#startButton").click(function() {
	startTimer();
	return false;
});

$("#endButton").click(function() {
	endTimer();
	return false;
});

// Button for adding Trains
$("#addTrainBtn").on("click", function(){

	// Grabs user input
	var trainName = $("#trainNameInput").val().trim();
	var trainDestination = $("#destinationInput").val().trim();
	var firstTrainTime = $("#firstTrainTimeInput").val().trim();
	var trainFrequency = $("#frequencyInput").val().trim();

	// Creates local "temporary" object for holding new train data
	var newTrain = {
		name:  trainName,
		destination: trainDestination,
		start: firstTrainTime,
		frequency: trainFrequency
	}

	// Uploads new train data to the database
	trainData.push(newTrain);

	// Clears all of the text-boxes after sending to database
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#firstTrainTimeInput").val("");
	$("#frequencyInput").val("");

	// Prevents moving to new page
	return false;
});

// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
trainData.on("child_added", function(childSnapshot, prevChildKey){

	// Store everything into a variable.
	var trainName = childSnapshot.val().name;
	var trainDestination = childSnapshot.val().destination;
	var firstTrainTime = childSnapshot.val().start;
	var trainFrequency = childSnapshot.val().frequency;

	// First Time (pushed back 1 year to make sure it comes before current time)
	var firstTimeConverted = moment(firstTrainTime,"hh:mm").subtract(1, "years");

	// Prettify the train start
	var currentTime = moment();

	// Difference between current time and train's first time
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

	// Time apart (remainder)
	var tRemainder = diffTime % trainFrequency;

	// Minutes until train
	var tMinutesTillTrain = trainFrequency - tRemainder;

	// Next Train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes");

	// Add each train's data into the table
	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});