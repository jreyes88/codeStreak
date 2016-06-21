$(document).ready(function() {
	var timeData = new Firebase("https://codetracker.firebaseio.com/");
	var startTime;
	var endTime;

	$("#startButton").on("click", function() {
		startTime = moment(startTime).format("MM/DD/YY hh:mm:ss");
		console.log(startTime);

		$("#endButton").on("click", function() {
			endTime = moment(endTime).format("MM/DD/YY hh:mm:ss");
			endDate = moment(endTime).format("MM/DD/YY");
			console.log(endTime);

			var newTimeInput = {
				codeDate: endDate,
				minutes: diffTime
			}

			var diffTime = moment(endTime).diff(moment(startTime), "minutes");
			console.log(diffTime);
			timeData.push(newTimeInput);
		});
		return false;
	});
});