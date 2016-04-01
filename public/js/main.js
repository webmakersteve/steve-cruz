(function () {
	'use strict';

	google.charts.load('current', {'packages':['corechart']});
	google.charts.setOnLoadCallback(initDraw);

	var query = window.location.search;
	var keyPairs = query.substr(1, query.length).split('&');
	var q = {};
	keyPairs.forEach(function(v) {
		v = v.split('=');
		var key = v[0];
		q[key] = v[1];
	});

	var dates = [];
	var queries = [];

	function drawChart() {
		console.log(dates);

		var rows = [
			['Day', q.query1, q.query2]
		];

		var query1, query2;

		if (queries[0].query == q.query1) {
			query1 = queries[0];
			query2 = queries[1];
		} else {
			query1 = queries[1];
			query2 = queries[2];
		}

		for (var dateIndex in dates) {
			// Get the two days
			var date = dates[dateIndex];


			console.log('logging date');
			console.log(date);
			console.log(query1.days[date]);

			var q1d = query1.days[date] || {};
			var q2d = query2.days[date] || {};

			rows.push([
				date, q1d.sentimentAverage || null, q2d.sentimentAverage || null
			]);

		}

		console.log(rows);

		var data = google.visualization.arrayToDataTable(rows);

		var options = {
      title: 'Comparison between ' + q.query1 + ' and ' + q.query2,
      curveType: 'function',
      legend: { position: 'bottom' }
    };

		var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

		chart.draw(data, options);

	}

	function initDraw() {

		if (!q.query1 || !q.query2) {
			alert('Please enter a query in the form above');
			return;
		}

		var queriesComplete = 0;

		var processJSON = function(json) {

			for (var day in json.days) {
				if (dates.indexOf(day) < 0) dates.push(day);
			}

			queries.push(json);
			queriesComplete++;

			if (queriesComplete == 2) {
				// push the dates up
				drawChart();
			}
		};

		jQuery.getJSON('/sentiment/' + q.query1 + '?count=' + q.numTweets, processJSON);
		jQuery.getJSON('/sentiment/' + q.query2 + '?count=' + q.numTweets, processJSON);

	}

}());
