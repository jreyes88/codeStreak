var startTime;
var endTime;

$("#startButton").on("click", function() {
	startTime = moment(startTime).format("MM/DD/YY hh:mm:ss");
	console.log(startTime);
});

$("#endButton").on("click", function() {
	endTime = moment(endTime).format("MM/DD/YY hh:mm:ss");
	console.log(endTime);
});