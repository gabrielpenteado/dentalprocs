import { useEffect, useState } from "react";

import Chart from 'react-apexcharts';
import { api } from "../lib/axios";

type ChartTitle = {
  title: string;
}

type ChartTotal = {
  total: number;
}

export function PieChart() {
  const [procsTitle, setProcsTitle] = useState<string[]>([]);
  const [procsTotal, setProcsTotal] = useState<number[]>([]);

  async function generateChartValues() {
    try {
      const response = await api.get('chart');

      const titles = response.data.map((proc: ChartTitle) => {
        return proc.title;
      });
      setProcsTitle(titles);

      const totals = response.data.map((proc: ChartTotal) => {
        return proc.total;
      });
      setProcsTotal(totals);
    } catch (error) {
      console.log(error);
    }
  }

  // console.log(procsTitle);
  // console.log(procsTotal);

  const options = {
    series: procsTotal,
    labels: procsTitle,
    tooltip: {
      style: {
        fontSize: '14px',
      },
      y: {
        formatter: function () {
          return '';
        },
        title: {
          formatter: function (seriesName: string) {
            return seriesName;
          }
        }
      }
    },
    legend: {
      fontSize: '14px',
      labels: {
        colors: '#ffff'
      }
    },
    dataLabels: {
      style: {
        fontSize: '14px'
      }
    }
  };

  useEffect(() => {
    generateChartValues();
  }, [])

  return (
    <div>
      <Chart
        series={procsTotal}
        options={options}
        type="donut"
        width="100%"
        height={480}
      />
    </div>
  )

}