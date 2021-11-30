import { useEffect, useState, useRef } from 'react';
import CountriesJson from './countries';
import './App.css';
import GoogleMap from 'google-map-react';
import Sidebar from './component/SidebarItem';
import MapItem from './component/MapItem'
import Tracker from './component/Tracker'

function App() {

	const [active, setActive] = useState('VN')
	const [popup, setPopup] = useState(false)
	const [countrySlug, setCountrySlug] = useState([])
	const [dataMap, setDataMap] = useState([])
	const [data, setData] = useState([])
	const [filterData, setFilterData] = useState([])
	const [activeBt, setActiveBt] = useState(1)
	const refs = useRef([])

	const [mapCenter, setMapCenter] = useState({
		center: {
			lat: 14.058324, lng: 108.277199
		},
		zoom: 3
	});

	// luon chay sau khi component mounted
	useEffect(() => {
		fetch(`https://api.covid19api.com/summary`)
			.then(res => res.json())
			.then(data => {
				setData(data.Countries)
			});
	}, [])

	useEffect(() => {
		fetch(`https://api.covid19api.com/country/${countrySlug}/status/confirmed/live`)
			.then(res => res.json())
			.then(res => {
				let cases = []
				let date = []
				let old = 0
				res.map(item => {
					cases.push(item.Cases - old)
					date.push(item.Date)
					old = item.Cases
				})

				setDataMap([cases, date, Math.max(...cases)])
				setFilterData([cases, date, Math.max(...cases)])
			});
	}, [countrySlug])

	const percent = (country) => {
		let a = 1
		switch (true) {
			case country < 50000:
				a = 3
				break;
			case country >= 50000 && country < 75000:
				a = 4
				break;
			case country >= 75000 && country < 100000:
				a = 5
				break;
			case country >= 100000 && country < 200000:
				a = 6
				break;
			case country >= 200000 && country < 300000:
				a = 7
				break;
			case country >= 300000 && country < 400000:
				a = 8
				break;
			case country >= 400000 && country < 500000:
				a = 9
				break;
			case country >= 500000 && country < 600000:
				a = 10
				break;
			case country >= 600000 && country < 700000:
				a = 11
				break;
			case country >= 700000 && country < 800000:
				a = 12
				break;
			case country >= 800000 && country < 900000:
				a = 13
				break;
			case country >= 900000 && country < 1000000:
				a = 14
				break;
			case country >= 1000000 && country < 12500000:
				a = 15
				break;
			case country >= 12500000 && country < 15000000:
				a = 16
				break;
			case country >= 15000000 && country < 17500000:
				a = 17
				break;
			case country >= 17500000 && country < 20000000:
				a = 19
				break;
			case country >= 2000000 && country < 30000000:
				a = 22
				break;
			case country >= 30000000 && country < 40000000:
				a = 25
				break;
			case country >= 40000000 && country < 50000000:
				a = 28
				break;
			case country >= 50000000 && country < 60000000:
				a = 31
				break;
			case country >= 60000000 && country < 70000000:
				a = 34
				break;
			case country >= 70000000 && country < 80000000:
				a = 37
				break;
			case country >= 80000000 && country < 90000000:
				a = 40
				break;
			default:
				break;
		}

		return a
	}

	const handleChildClick = (key, childProps) => {
		setMapCenter({
			center: {
				lat: Number(childProps.lat),
				lng: Number(childProps.lng)
			},
			zoom: 6
		})

		setActive(childProps.item.CountryCode)

		refs.current[childProps.item.CountryCode].scrollIntoView({
			behavior: 'instant',
			block: 'center'
		})
	}

	const handleCenter = (code) => {
		let country = CountriesJson.filter(obj => obj.code === code.CountryCode)

		setMapCenter({
			center: {
				lat: + country[0].lat,
				lng: + country[0].lng
			},
			zoom: 6
		})

		setActive(code.CountryCode)
		setPopup(true)
		setCountrySlug(code.Slug)

	}

	const onChildMouseEnter = (key, childProps) => {
		var popup = document.getElementById(childProps.item.CountryCode);
		popup.classList.toggle('show');
	}

	const onChildMouseLeave = (key, childProps) => {
		var popup = document.getElementById(childProps.item.CountryCode);
		popup.classList.remove('show');
	}

	const handleClose = () => {
		setPopup(false)
		setActiveBt(1)
	}

	const handleDays = (date) => {
		if (date === 1) {
			setDataMap(filterData)
		} else {
			let data1 = filterData[0].slice(Math.max(filterData[0].length - date, 1))
			let data2 = filterData[1].slice(Math.max(filterData[1].length - date, 1))
			setDataMap([data1, data2, Math.max(...data1)])
		}
		setActiveBt(date)
	}

	const sidebars = [];
	const mapItems = [];

	data.map((item) => {
		sidebars.push(
			<Sidebar key={item.CountryCode}
				item={item}
				active={active}
				inputRef={el => refs.current[item.CountryCode] = el}
				callSet={() => handleCenter(item)} />
		);

		mapItems.push(
			<MapItem
				key={item.CountryCode}
				lat={CountriesJson.filter(obj => obj.code === item.CountryCode).length === 1 && CountriesJson.filter(obj => obj.code === item.CountryCode)[0].lat}
				lng={CountriesJson.filter(obj => obj.code === item.CountryCode).length === 1 && CountriesJson.filter(obj => obj.code === item.CountryCode)[0].lng}
				padding={percent(item.TotalConfirmed)}
				item={item}
			/>
		)
	})

	return (
		<div className="main-css">
			<div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white side-bar">
				<a href="/" className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom text-danger">
					<span className="fs-5 fw-semibold">Covit-19 Tracker</span>
				</a>
				<div className="list-group list-group-flush border-bottom scrollarea">
					{sidebars}
				</div>
			</div>

			<div className="div-map">
				<div className="css-map">
					<GoogleMap
						bootstrapURLKeys={{ key: 'AIzaSyBAg58OATrf0C69i0m0aDPMhrNPIh3jwO8' }}
						center={mapCenter.center}
						zoom={mapCenter.zoom}
						onChildClick={handleChildClick}
						onChildMouseEnter={onChildMouseEnter}
						onChildMouseLeave={onChildMouseLeave}
					>
						{mapItems}
					</GoogleMap>
				</div>
			</div>

			{
				popup && <Tracker dataMap={dataMap}
					handleClose={handleClose}
					activeBt={activeBt}
					handleDays={handleDays} />
			}
		</div >
	);
}

export default App;
