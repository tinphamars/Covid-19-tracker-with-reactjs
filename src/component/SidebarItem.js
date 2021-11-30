const Sidebar = ({ item, active, callSet, inputRef}) => {
    return (
        <a key={item.CountryCode}
            onClick={() => callSet(item)}
            ref={inputRef}
            className={(item.CountryCode === active ? "active" : "") + " list-group-item list-group-item-action py-3 lh-tight"}>
            <div className="d-flex w-100 align-items-center justify-content-between">
                <strong className="fw-normal">{item.Country}</strong>
                <small className="fst-italic" >{item.TotalConfirmed}</small>
            </div>
        </a>
    )
}

export default Sidebar