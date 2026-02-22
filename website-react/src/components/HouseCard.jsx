import {Link} from "react-router-dom"

function HouseCard({customerId, house, index}) {
    const MAX_HOUSE_IMAGES = 20;
    const imgNum = (house.id % MAX_HOUSE_IMAGES) + 1 
    const houseImg = `/house-images/house-${imgNum}.jpg`;

    return (
        <Link to={"/report/" + customerId + "/" + house.id} className="site-title">
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
                     <div className="hcTitle">{house.address}</div>

                    <div className="hcTypes">
                        {house.roof_Type && <span className="hcRoofType">Roof Type: {house.roof_Type}</span>}
                        <span className="hcType">Hail</span>
                        <span className="hcType">Wind</span>
                    </div>

                    {/* stats */}
                    <div className="hcStats">
                        <div className="hcStat">
                            <div className="hcStatValue">Moderate</div>
                            <div className="hcStatLabel">Damage</div>
                        </div>

                        <div className="hcStat">
                            <div className="hcStatValue">{house.severity}/5</div>
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