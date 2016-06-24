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
		startTime = moment(startTime).format("MM/DD/YY hh:mm:ss");
		
		// 2. Logs the name of the project
		projectInputName = $("#workName").val().trim();

		// Click events that occur when the end button is clicked
		$("#endButton").on("click", function() {
			
			// 3. Logs the time that the start button was clicked (used to calculate number of minutes)
			endTime = moment(endTime).format("MM/DD/YY hh:mm:ss");
			
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

		// // First Time (pushed back 1 year to make sure it comes before current time)
		// var firstTimeConverted = moment(firstTrainTime,"hh:mm").subtract(1, "years");

		// // Prettify the train start
		// var currentTime = moment();

		// // Difference between current time and train's first time
		// var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

		// // Time apart (remainder)
		// var tRemainder = diffTime % trainFrequency;

		// // Minutes until train
		// var tMinutesTillTrain = trainFrequency - tRemainder;

		// // Next Train
		// var nextTrain = moment().add(tMinutesTillTrain, "minutes");

		// Add each train's data into the table
		$("#projectTable > tbody").append("<tr><td>" + startTime + "</td><td>" + endTime + "</td><td>" + diffTime + "</td><td>" + projectInputName + "</td></tr>");
	});
});