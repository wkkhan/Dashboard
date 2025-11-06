export const paymentRecordChartOption = () => {
  const chartOptions = {
    chart: {
      width: '100%',
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: [1, 2, 3],
      curve: 'smooth',
      lineCap: 'round' as const,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: 'end' as const,
        columnWidth: '29%',
      },
    },
    colors: ['#4F1D8C', '#a2acc7', '#E1E3EA'],
    series: [
      {
        name: 'Payment Rejected',
        type: 'bar',
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 21],
      },
      {
        name: 'Payment Completed',
        type: 'line',
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 41],
      },
      {
        name: 'Awaiting Payment',
        type: 'bar',
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 56],
      },
    ],
    fill: {
      opacity: [0.85, 0.25, 1, 1],
      gradient: {
        inverseColors: false,
        shade: 'light',
        type: 'vertical',
        opacityFrom: 0.5,
        opacityTo: 0.1,
        stops: [0, 100, 100, 100],
      },
    },
    markers: {
      size: 0,
    },
    xaxis: {
      categories: ['JAN/23', 'FEB/23', 'MAR/23', 'APR/23', 'MAY/23', 'JUN/23', 'JUL/23', 'AUG/23', 'SEP/23', 'OCT/23', 'NOV/23', 'DEC/23'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          fontSize: '10px',
          colors: '#A0ACBB',
        },
      },
    },
    yaxis: {
      labels: {
        formatter: function (val: number) {
          return val + 'K';
        },
        offsetX: 0,
        offsetY: 0,
        style: {
          colors: '#A0ACBB',
        },
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
      padding: {
        left: 35,
        right: 28,
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return val + 'K';
        },
      },
      style: {
        fontSize: '12px',
        fontFamily: 'Inter',
      },
    },
    legend: {
      show: false,
      labels: {
        fontSize: '12px',
        colors: '#A0ACBB',
      },
      fontSize: '12px',
      fontFamily: 'Inter',
    },
  };
  return chartOptions;
};

