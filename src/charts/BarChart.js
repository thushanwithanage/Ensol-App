import CanvasJSReact from './canvasjs.react';
import React from 'react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function BarChart( { story, bug, task, epic, sub } ) {

    const options = {
        title: {
          text: ""
        },
        width:320,
        dataPointWidth: 40,
        axisX:{
          gridThickness: 0,
          tickLength: 0,
          lineThickness: 0
        },
		    axisY:{
            minimum: 0,
            interval: 1,
            gridThickness: 0,
            tickLength: 0,
            lineThickness:0,
            labelFormatter: function(e) {
               return "";
            }
        },
        data: [{				
                  color: "#4267B2",
                  type: "column",
                  dataPoints: [
                      { label: "Epic", y: epic  },
                      { label: "Story",  y: story  },
                      { label: "Bug", y: bug  },
                      { label: "Task",  y: task  },
                      { label: "Sub-task",  y: sub  }
                  ]
         }]
     }

     return (
        <div>
          <CanvasJSChart options = {options}
              /* onRef = {ref => this.chart = ref} */
          />
        </div>
      );
}

export default BarChart;