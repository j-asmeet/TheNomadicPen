import { Pie } from "react-chartjs-2";
import {chart as chartjs} from 'chart.js/auto';
import '../../styles/Statistics.css';

function PieCharts({pieChartData})
{ const options = {
    responsive: false,
    maintainAspectRatio: false
  };
    return (<div className="pieChart">
    <Pie data={pieChartData}  />
</div>)
}

export default PieCharts;