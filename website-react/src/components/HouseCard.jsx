import {Link} from "react-router-dom"

function HouseCard({customerId, house, index}) {
    const MAX_HOUSE_IMAGES = 20;
    const imgNum = (house.id % MAX_HOUSE_IMAGES) + 1 
    const houseImg = `/house-images/house-${imgNum}.jpg`;

    const location = house.address.split(";");
    const address = location[0] + ", " + location[1] + " " + location[2] + " " + location[3];

    return (
        <Link to={"/report/" + customerId + "/" + house.id} className="house-card-link">
            <div className="house-card houseCardNew">
                {/*image header*/}
                <div className="hcMedia">
                    <img className="hcImg" src={houseImg} alt="House" />
                    <div className="hcOverlay" />

                    {/*number*/}
                    <div className="hcBadge">{index}</div>
                </div>

                {/* damage type */}
                <div className="hcBody">
                     <div className="hcTitle">{address}</div>

                    <div className="hcTypes">
                        {house.roof_Type && <span className="hcRoofType">Roof Type: {house.roof_Type}</span>}
                        {house.damage_types != null && house.damage_types.map((type) => (
                            <span className="hcType">{type}</span>
                        ))}
                    </div>

                    {/* stats */}
                    <div className="hcStats">
                        <div className="hcStat">
                            <div className="hcStatValue">
                                { house.severity >= 4 ? (
                                    <p>Critical</p>
                                ) : house.severity >= 2 ? (
                                    <p>Moderate</p>
                                ) : house.severity == 1 ? (
                                    <p>Minimal</p>
                                ) : house.severity == 0 ? (
                                    <p>None</p>
                                ) : (
                                    <p>?</p>
                                )}
                            </div>
                            <div className="hcStatLabel">Damage</div>
                        </div>

                        <div className="hcStat">
                            <div className="hcStatValue">{house.severity != null ? house.severity : "?"}/5</div>
                            <div className="hcStatLabel">Severity</div>
                        </div>

                        <div className="hcStat">
                            <div className="hcStatValue">{house.images.length}</div>
                            <div className="hcStatLabel">Photos</div>
                        </div>
                    </div>

                    {/* main point description */}
                    <div className="hcDescription">{house.description}</div>

                    {/* Bottom hint */}
                    <div className="hcReport">Click to view report →</div>
                </div>
            </div>
        </Link>
    );
}

export default HouseCard;