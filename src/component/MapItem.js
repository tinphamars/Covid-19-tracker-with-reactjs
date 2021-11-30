const MapItem = ({ padding, item }) => (
	<div className="popup_div" style={{
		padding: padding,
	}}>
		<div className="popup_text" id={item.CountryCode}>
			<h5>{item.Country}</h5>
			<ul className="list-group">
				<li className="list-group-item d-flex justify-content-between align-items-center">
					TotalConfirmed
					<span className="badge text-danger badge-pill">{item.TotalConfirmed}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between align-items-center">
					TotalDeaths
					<span className="badge text-info badge-pill">{item.TotalDeaths}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between align-items-center">
					NewConfirmed
					<span className="badge text-danger badge-pill">{item.NewConfirmed}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between align-items-center">
					NewDeaths
					<span className="badge text-info badge-pill">{item.NewDeaths}</span>
				</li>
			</ul>
		</div>
	</div >
)

export default MapItem