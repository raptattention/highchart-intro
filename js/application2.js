$(document).ready(function(){
	var chart = function(){
		this.graphData = [];
	};

  chart.prototype.graph = function(){
    var graphConfig = {
      title: {
        text: "Crime severity index and weighted clearance rates in Canada",
        x: -20
      },
      subtitle: {
        source: "Source: Statistics Canada"
      },
      xAxis: {
        title: "Date",
      },
      yAxis: {
        title: "Crime Severity Index"
      },
      series: [
        {
          name: "Canada",
          data: this.graphData.reverse()
        }
      ]
    };
    $('#chart').highcharts(graphConfig);
  };

	chart.prototype.getData = function(){
		$.ajax({
      context: this,
      type: 'GET',
      url: 'https://www.quandl.com/api/v1/datasets/CANSIM/252_0083_HAPPY_VALLEY_GOOSE_BAY_NEWFOUNDLAND_AND_LABRADOR_ROYAL_CANADIAN_MOUNTED_POLICE_RURAL.json?auth_token=E6kNzExHjay2DNP8pKvB',
      success: function(response){
        console.log(response);
        var items = response.data;
        for (i=0; i<items.length; i++){
          var item = items[i];
          this.graphData.push({
           x: new Date (item[0]),
           y: item[1]
          });
        }
        this.graph();
      }
    });
	};

  var sampleGraph = new chart();
  sampleGraph.getData();
});