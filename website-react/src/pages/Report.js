import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ModelSettings from "../components/ModelSettings";
import Badge from "../components/Badge";
import ImageModal from "../components/ImageModal";
import ImageUploadModal from "../components/ImageUploadModal";
import EditHouse from "../components/EditHouse";
import { BACKEND_URL } from "../constants";


function App() {
    const {customerId, houseId} = useParams();
    const [customer, setCustomer] = useState([]);
    const [house, setHouse] = useState([]);
    const [failed, setFailed] = useState(false);
    const [houseLoaded, setHouseLoaded] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showOriginalImg, setShowOriginalImg] = useState(false);
    const [imageSrc, setImageSrc] = useState("");

    const loadCustomers = async () => {
        try {
            const res = await fetch(BACKEND_URL + "/api/v1/customers/" + customerId + "/", { //https://backend-42686524573.europe-west1.run.app/api/v1/customers/
                credentials: "include"
            });

            if (!res.ok || res == null)
                throw new Error(res.status);

            const data = await res.json();

            setCustomer(data);

            const houses = data.houses;

            console.log(data);
            setHouse(houses.filter((h) => h.id.toString() === houseId));
            setHouseLoaded(true);
        }
        catch (err) {
            console.log("Error: ", err);
            setFailed(true);
        }
    }

    const magnifyImage = (src) => {
        setImageSrc(src);
        setShowImage(true);
    }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        // alert("Copied " + text);
    }

    // Load Customers
    useEffect(() => {
        loadCustomers();
    }, []);
    
    // Report
    if (failed) {
        return <h1>Database connection failed</h1>;
    }
    else if (houseLoaded) {
        const location = house[0].address.split(";");
        const address = location[0] + ", " + location[1] + " " + location[2] + " " + location[3];

        let windDamage = null;
        let hailDamage = null;
        if (house[0].damage_types !== null)
        {
            windDamage = house[0].damage_types.includes("wind");
            hailDamage = house[0].damage_types.includes("hail");
        }

        return (
            <>
                <ModelSettings show={showSettings} close={() => setShowSettings(false)} houseId={houseId} reloadCustomers={loadCustomers}></ModelSettings>
                <ImageModal show={showImage} close={() => setShowImage(false)} imageSrc={imageSrc}></ImageModal>
                <ImageUploadModal show={showUpload} close={() => setShowUpload(false)} reloadCustomers={loadCustomers} houseId={houseId}></ImageUploadModal>
                <EditHouse show={showEdit} close={() => setShowEdit(false)} reloadCustomers={loadCustomers} house={house[0]}></EditHouse>
                <div className="breadcrumb">
                    <div className="breadcrumb-inner">
                        <Link to="/customers">Customers </Link>
                        <span>&gt;</span>
                        <span> Report</span>
                    </div>
                </div>
                <div className="page-header">
                    <div className="container">
                        <h1>Report</h1>
                        {/* <button className="gear" onClick={() => setShowSettings(true)}>☰</button> */}
                    </div>
                    <div className="house-info">
                        <div>
                            <label>Address: </label>
                            <p onClick={() => copyToClipboard(address)}>{address}</p>
                        </div>
                        <div>
                            <label>Roof Type: </label>
                            <p onClick={() => copyToClipboard(house[0].roof_type)}>{house[0].roof_type}</p>
                        </div>
                        <div>
                            <label>Customer: </label>
                            <p onClick={() => copyToClipboard(customer.name)}>{customer.name}</p>
                        </div>
                        <div>
                            <label>Email: </label>
                            <p onClick={() => copyToClipboard(customer.email)}>{customer.email}</p>
                        </div>
                        <div>
                            <label>Number: </label>
                            <p onClick={() => copyToClipboard(customer.phone)}>{customer.phone}</p>
                        </div>
                    </div>
                    <div className="button-container-house">
                        <button className="secondary-subtle" onClick={() => setShowSettings(true)}>Model settings & report generation</button>
                        <button className="secondary-subtle" onClick={() => setShowEdit(true)}>Edit house details</button>
                    </div>
                </div>
                <div className="subheader">
                    <h2>Damage Summary</h2>
                </div>
                <div className="summary">
                    <div className="content">
                        <div className="header">
                            <h3>Severity</h3>
                            <Badge name={house[0].severity + "/5"} color={"tomato"}></Badge>
                        </div>
                        
                        { house[0].severity >= 4 ? (
                            <p>The roof has critical damage and needs immediate attention. </p>
                        ) : house[0].severity >= 2 ? (
                            <p>
                                The roof has substantial damage needs repairs.
                            </p>
                        ) : (
                            <p>
                                The roof has minimal damage, but any amount of damage leaves the roof vulnerable.
                            </p>
                        )}
                    </div>
                    <div className="content">
                        <div className="header">
                            <h3>Type</h3>
                            { windDamage && (
                                <Badge name={"Wind"} color={"lightslategray"}></Badge>
                            )}
                            { hailDamage && (
                                <Badge name={"Hail"} color={"skyblue"}></Badge>
                            )}
                        </div>
                        { (windDamage && hailDamage) ? (
                            <>
                                <p>
                                    Wind can remove shingles and loosen connected ones.
                                    High winds can cause granule loss and leave shingles more susceptible to the elements.
                                    This may lead to accelerated ageing and degredation.
                                </p>
                                <p>
                                    Hail can leave dents, cracks, holes, and loose shingles, leading to poor water flow and leaks.
                                    If left unchecked, this can cause water damage and mold to form.
                                </p>
                            </>
                        ) : windDamage ? (
                            <p>
                                Wind can remove shingles and loosen connected ones.
                                High winds can cause granule loss and leave shingles more susceptible to the elements.
                                This may lead to accelerated ageing and degredation.
                            </p>
                        ) : hailDamage ? (
                            <p>
                                Hail can leave dents, cracks, holes, and loose shingles, leading to poor water flow and leaks.
                                If left unchecked, this can cause water damage and mold to form.
                            </p>
                        ) : (
                            <p>
                                Could not be classified.
                            </p>
                        )}
                    </div>
                    <div className="content">
                        <div className="header">
                            <h3>Estimate</h3>
                            <Badge name={"$" + house[0].price_estimate} color={"mediumseagreen"}></Badge>
                        </div>
                        <p>This estimate has taken into account the total amount of damage along with the cost of asphalt shingles.</p>
                    </div>
                </div>
                <div className="subheader">
                    <div className="toggle-eye">
                        <h2>Images</h2>
                        <i
                            className={showOriginalImg ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}
                            onClick={() => setShowOriginalImg(!showOriginalImg)}
                            title={showOriginalImg ? "Show Boxes" : "Hide Boxes"}
                        />
                    </div>
                </div>
                <div>
                    
                </div>
                <div className="house-images">
                    {
                        house[0].images.map((image) => {return showOriginalImg ? (
                            <img width={200} height={200} src={image.image_url} onClick={() => magnifyImage(image.image_url)}></img>
                        ) :  (
                            <img width={200} height={200} src={image.predicted_url != null ? image.predicted_url : image.image_url} onClick={() => magnifyImage(image.predicted_url)}></img>
                        )})
                    }
                </div>
                <br></br>
                <div className="button-container">
                    <button className="primary" onClick={() => setShowUpload(true)}>Upload</button>
                </div>
            </>
        );
    }
    else {
        return (
            <div className="loading">
                <h1>Loading Report...</h1>
            </div>
        );
    }
}

export default App;