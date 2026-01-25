import { useEffect, useState } from "react";
import {Link} from "react-router-dom"

function HouseCard({customerId, houseId, address, description}) {

    return (
        <Link to={"/report/" + customerId + "/" + houseId} className="site-title">
        <div className="houseCard houseCardNew">
            {/*number + address */}
            <div className="hcTop">
                <div className="hcBadge">1</div>

                <div className="hcTitleWrap">
                    <div className="hcTitle">{address}</div>
                </div>
            </div>

            {/* damage type */}
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
                <div className="hcStatValue">0</div>
                <div className="hcStatLabel">Photos</div>
            </div>
            </div>

            {/* main point description */}
            <div className="hcDescription">{description}</div>

            {/* Bottom hint */}
            <div className="hcReport">Click to view report →</div>
        </div>
    </Link>
    )
}

export default HouseCard;