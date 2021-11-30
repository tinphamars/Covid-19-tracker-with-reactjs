import { Bar } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    TimeSeriesScale, BarElement
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    TimeSeriesScale,
    BarElement
);

const Tracker = ({ activeBt, dataMap, handleDays, handleClose }) => {

    const options = {
        responsive: true,
        legend: {
            position: 'top',
        },
        scales: {
            y: {
                beginAtZero: true,
                max: dataMap[3],
                min: 0
            },
            x: {
                type: 'time',
            }
        },

        plugins: {
            title: {
                display: false,
                text: 'Chart.js Line Chart',
            },
        },
    };

    const data_demo = {
        labels :dataMap[1],
        datasets: [
            {
                label: 'Confirmed',
                data: dataMap[0],
                radius: 0,
                backgroundColor: 'red',
            },
        ],
    };
    return (
        <div id="exampleModalLive" className="modal fade show "
            aria-labelledby="exampleModalLiveLabel"
            style={{ display: 'block', paddingLeft: '17px', paddingRight: '17px', background: 'rgb(0 0 0 / 77%)', width: '100%' }}>
            <div className="modal-dialog-centered"
                style={{ width: '100%' }}
                role="document">
                <div className="modal-content">

                    <button type="button"
                        onClick={() => handleClose()}
                        style={{
                            position: 'absolute',
                            right: '0px',
                            top: '-39px',
                            borderRadius: '50%',
                        }}
                        className="btn btn-danger fw-bold text-white">
                        <span aria-hidden="true">×</span>
                    </button>

                    <div className="list-button-last-day">
                        <button type="button" disabled={activeBt === 30 ? true : false} onClick={() => handleDays(30)} className="btn btn-dark text-white">Last 30 days</button>
                        <button type="button" disabled={activeBt === 60 ? true : false} onClick={() => handleDays(60)} className="btn btn-dark text-white">Last 60 days</button>
                        <button type="button" disabled={activeBt === 1 ? true : false} onClick={() => handleDays(1)} className="btn btn-dark text-white">All time</button>
                    </div>

                    <div className="modal-body" style={{ maxHeight: '70vh' }}>
                        <Bar style={{ maxHeight: '55vh' }} options={options} data={data_demo} />
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Tracker