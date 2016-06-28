$(document).ready(function() {
	// Link to Firebase
	var timeData = new Firebase("https://codetracker.firebaseio.com/");
	
	// Empty variables to start out
	var startTime;
	var endTime;
	var endDate;
	var projectInputName;

	// Click events that occur when the start button is clicked
	$("#startButton").on("click", function() {

		// 1. Logs the time that start button was clicked
		startTime = moment(startTime).format("MM/DD/YY HH:mm:ss");
		
		// 2. Logs the name of the project
		projectInputName = $("#workName").val().trim();

		// Click events that occur when the end button is clicked
		$("#endButton").on("click", function() {
			
			// 3. Logs the time that the start button was clicked (used to calculate number of minutes)
			endTime = moment(endTime).format("MM/DD/YY HH:mm:ss");
			
			// 4. Logs the date that the project was worked on (used to track the actual streak)
			endDate = moment(endDate).format("MM/DD/YY");

			// 5. Calculates the time difference
			var diffTime = moment(endTime).diff(moment(startTime), "minutes");		

			// 6. Pushes the 
			var newTimeInput = {
				startTable: startTime,
				endTable: endTime,
				codeDate: endDate,
				minutes: diffTime,
				projectName: projectInputName
			}
			timeData.push(newTimeInput);
			return false;
		});
		return false;
	});

	// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
	timeData.on("child_added", function(childSnapshot, prevChildKey){

		// Store everything into a variable.
		var startTime = childSnapshot.val().startTable;
		var endTime = childSnapshot.val().endTable;
		var diffTime = childSnapshot.val().minutes;
		var projectInputName = childSnapshot.val().projectName;

		// Add each train's data into the table
		$("#projectTable > tbody").prepend("<tr><td>" + startTime + "</td><td>" + endTime + "</td><td>" + diffTime + "</td><td>" + projectInputName + "</td></tr>");
	});

	$(function () {

		var data = {
			labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
			datasets: [
				{
					label: "The First Dataset",
					fillColor: "rgba(153,0,76,0.2)", // magenta
					strokeColor: "rgba(153,0,76,1)", // magenta
					pointColor: "rgba(153,0,76,1)", // magenta
					pointStrokeColor: "fff", // white
					pointHighlightFill: "fff", // white
					pointHighlightStroke: "rgba(153,0,76,1)", // magenta
					data: [100, 34, 21, 56, 23, 90, 40]
				},
				{
					label: "The Second Dataset",
					fillColor: "rgba(76,0,153,0.2)",
					strokeColor: "rgba(76,0,153,1)",
					pointColor: "rgba(76,0,153,1)",
					pointStrokeColor: "fff", // white
					pointHighlightFill: "fff", // white
					pointHighlightStroke: "rgba(76,0,152,1)",
					data: [28, 48, 40, 19, 86, 27, 90]
				}
			]
		};
		var option = {};

		var ctx = document.getElementById("myChart").getContext('2d');
		var myLineChart = new Chart(ctx).Line(data, option);


	})

});