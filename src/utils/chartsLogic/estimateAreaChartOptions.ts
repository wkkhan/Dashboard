export const estimateAreaChartOptions = () => {
  const chartOptions = {
    chart: {
      type: 'area' as const,
      height: 100,
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'solid',
      opacity: 0.4,
    },
    stroke: {
      curve: 'smooth' as const,
      width: 3,
    },
    yaxis: {
      min: 0,
      max: 30,
    },
    tooltip: {
      theme: 'dark' as const,
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {},
      },
      marker: {
        show: false,
      },
    },
  };
  return chartOptions;
};

