import React, { useState } from 'react';
import {Bar} from 'react-chartjs-2';
import {chart as chartjs} from 'chart.js/auto';

function Barcharts({UserBarGraphs, chartId})
{
    const options = {
        responsive: false,
        maintainAspectRatio: false
      };
    return (<div className='barCharts'>
        <Bar data={UserBarGraphs} id={chartId}/>
    </div>)
}

export default Barcharts;