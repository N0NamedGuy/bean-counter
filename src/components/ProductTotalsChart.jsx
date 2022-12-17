import * as Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";
import { useEffect, useRef, useState } from "react";

const initialTotalsChartOptions = {
    title: {
        text: 'Colheita total'
    },
    chart: {
        type: 'pie',
        styledMode: true
    },
    plotOptions: {
        pie: {
            dataLabels: {
                enabled: true
            },
            showInLegend: true
        }
    },
    series: [{
        name: null,
        colorByPoint: true,
        data: [{}]
    }]
}

export const ProductTotalsChart = ({ productsWithTotals }) => {
    const chartComponent = useRef(null);
    const [totalsChartOptions, setTotalsChartOptions] = useState(initialTotalsChartOptions);

    useEffect(() => {
        const chart = chartComponent.current.chart;

        const series = (productsWithTotals || []).map((p) => {
            return {
                name: p.name,
                y: p.total
            };
        });

        setTotalsChartOptions((opts) => {
            const newOpts = {
                ...opts,
                series: [{
                    ...opts.series[0],
                    data: series
                }]
            };

            return newOpts;
        });

        chart.reflow();
    }, [productsWithTotals]);

    return <HighchartsReact
        ref={chartComponent}
        highcharts={Highcharts}
        options={totalsChartOptions} />;
}