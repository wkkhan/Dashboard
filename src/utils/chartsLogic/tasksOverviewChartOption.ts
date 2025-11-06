export const tasksOverviewChartOption = () => {
  const chartOptions = {
    chart: {
      type: 'area' as const,
      height: 100,
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      width: 2,
      curve: 'smooth' as const,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.2,
        opacityTo: 0.75,
        stops: [0, 90, 100],
      },
    },
    grid: {
      show: false,
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ['SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAR'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return val + ' Tasks';
        },
      },
      style: {
        fontSize: '12px',
        colors: '#A0ACBB',
        fontFamily: 'Inter',
      },
    },
  };

  return chartOptions;
};

