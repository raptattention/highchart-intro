'use strict';

$(document).ready(function(){
	var HighCharts = function(){
    this.graphData = [];
	};

	HighCharts.prototype.makeAjaxRequest = function(){
		$.ajax({
      context: this,
			type: 'GET',
			url: 'https://www.quandl.com/api/v1/datasets/CANSIM/252_0083_HAPPY_VALLEY_GOOSE_BAY_NEWFOUNDLAND_AND_LABRADOR_ROYAL_CANADIAN_MOUNTED_POLICE_RURAL.json',
			success: function(response){
				var items = response.data;
        var item;
        for (var i=0; i < items.length; i++){
          item = items[i];
          this.graphData.push({
            x: new Date (item[0]),
            y: item[1]
          });
        }

        console.log(this.graphData);
        this.graph();
			}
		});
	};

  HighCharts.prototype.graph = function(){
    var highchartConfig = {
      title: {
        text: "Average retail gas prices"
      },
      subtitle: {
        text: "Bureau of Transportation Statistics (Multimodal)"
      },
      xAxis: {
        text: 'datetime'
      },
      series: [
        {
          name: "US",
          data: this.graphData.reverse()
        }
      ]
    };

    $('#chart').highcharts(highchartConfig);
  } 

  var chart =new HighCharts();
  chart.makeAjaxRequest();
});