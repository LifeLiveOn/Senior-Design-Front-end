import { useEffect, useState } from "react";
import {Link} from "react-router-dom"

function HouseCard({id}) {
    return (
        <Link to={"/report/" + id} className="site-title">
            <div className="houseCard">
            {
                /*
                    Implement house card design here with fake test information.
                    (outside of these brackets)

                    On the website, when you click a customer in the customer table,
                    these cards will appear.

                    To change the style (css) open "index.css" and go to ".houseCard".
                    
                    If you want to change the layout of the cards (parent div) go
                    to index.css and change ".customer-table div.houses".
                */
            }
        </div>
        </Link>
    )
}

export default HouseCard;