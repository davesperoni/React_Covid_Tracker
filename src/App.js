import React from 'react';

import { Cards, Chart, CountryPicker2 } from './components';
import styles from './App.module.css';
import { fetchData } from './api';
import coronaImage from './images/covidReact_logo.png';

class App extends React.Component {

    state = {
        data: {},
        country: '',
    }

    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({ data: fetchedData });
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        this.setState({ data: fetchedData, country: country });
    }

    render() {

        const { data, country } = this.state;

        return(
            <div>

                <span className={styles.container}>
                    <img className={styles.image} src={coronaImage} alt="COVID-19"/>
                    <Cards className={styles.cards} data={data}/>
                </span>

                <span className={styles.graphContainer}>
                    <CountryPicker2 handleCountryChange={this.handleCountryChange}/>
                    <Chart data={data} country={country}/>
                </span>
                <span className={styles.footerContainer}>
                    <ul>
                        <h4>Built with:</h4>
                        <li>React.js</li>
                        <li>React-Chart.js</li>
                        <li>Material-UI</li>
                        <li>AWS Amplify</li>
                        <li>Photoshop</li>
                    </ul>
                    <a href = "https://davidsperoni.com" className={styles.backButton}>Back to Portfolio</a>

                </span>
                            
            </div>
        )
    }
}

export default App;
