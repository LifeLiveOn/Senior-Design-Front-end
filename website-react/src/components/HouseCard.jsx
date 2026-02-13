import {Link} from "react-router-dom"

function HouseCard({customerId, houseId, address, description, imgCount, index}) {
    const houseImg = "https://www.bhg.com/thmb/TD9qUnFen4PBLDuB2hn9yhGXPv8=/1866x0/filters:no_upscale():strip_icc()/white-house-a-frame-section-c0a4a3b3-e722202f114e4aeea4370af6dbb4312b.jpg";

    return (
        <Link to={"/report/" + customerId + "/" + houseId} className="site-title">
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
                            <div className="hcStatValue">4/5</div>
                            <div className="hcStatLabel">Severity</div>
                        </div>

                        <div className="hcStat">
                            <div className="hcStatValue">{imgCount}</div>
                            <div className="hcStatLabel">Photos</div>
                        </div>
                    </div>

                    {/* main point description */}
                    <div className="hcDescription">{description}</div>

                    {/* Bottom hint */}
                    <div className="hcReport">Click to view report →</div>
                </div>
            </div>
        </Link>
    );
}

export default HouseCard;