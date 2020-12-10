import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ( {data: { confirmed, deaths, recovered }, country} ) => {

    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
             setDailyData(await fetchDailyData());
        }

        console.log(dailyData);

        fetchAPI();
    }, []);

    const lineChart = (
        dailyData.length ? ( 
            <Line 
                data={{
                    labels: dailyData.map(( { date }) => new Date(date).toLocaleDateString()),
                    datasets: [{
                        data: dailyData.map((data) => data.confirmed),
                        label: "Infected",
                        borderColor: 'rgba(255, 189, 82, 0.335)',
                        fill: true
                    }, {
                        data: dailyData.map((data) => data.deaths),
                        label: "Deaths",
                        borderColor: 'rgba(167, 79, 86, 0.294)',
                        backgroundColor: 'rgba(167, 79, 86, 0.294)',
                        fill: true
                    },
                    {
                        data: dailyData.map((data) => data.recovered),
                        label: "Recovered",
                        borderColor: 'rgba(96, 161, 66, 0.377)',
                        backgroundColor: 'rgba(96, 161, 66, 0.377)',
                        fill: true
                    },
                
                ],
                }}
            /> ) : null
    );

    console.log(confirmed, recovered, deaths);

    const barChart = (
        confirmed ? (
                <Bar 
                    data={{
                        labels: ['Infected', 'Recovered', 'Deaths'],
                        datasets: [{
                            label: 'People',
                            backgroundColor: [
                                'rgba(255, 189, 82, 0.335)',
                                'rgba(96, 161, 66, 0.377)',
                                'rgba(167, 79, 86, 0.294)'
                            ],
                            data:[confirmed.value, recovered.value, deaths.value]
                        }]
                    }}
                    options={{
                        legend: { display: false },
                        title: { display: true, text:`Current state in ${country}`},
                    }}
                />
            ) : null
    );

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart;
