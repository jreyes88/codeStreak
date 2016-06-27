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
		$("#projectTable > tbody").append("<tr><td>" + startTime + "</td><td>" + endTime + "</td><td>" + diffTime + "</td><td>" + projectInputName + "</td></tr>");
	});

	// context for chart
	var ctx = $("#myChart");
	var myLineChart = new Chart(ctx, {
	    type: 'line',
	    data: data,
	    options: {
	        scales: {
	            xAxes: [{
	                display: false
	            }]
	        }
	    }
	});

	var data = {
	    labels: ["January", "February", "March", "April", "May", "June", "July"],
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
	            data: [65, 59, 80, 81, 56, 55, 40],
	        }
	    ]
	};

});