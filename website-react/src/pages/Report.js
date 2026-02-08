import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ModelSettings from "../components/ModelSettings";
import Badge from "../components/Badge";
import ImageModal from "../components/ImageModal";
import ImageUploadModal from "../components/ImageUploadModal";


function App() {
    const {customerId, houseId} = useParams();
    const [customer, setCustomer] = useState([]);
    const [house, setHouse] = useState([]);
    const [failed, setFailed] = useState(false);
    const [houseLoaded, setHouseLoaded] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const [imageSrc, setImageSrc] = useState("");

    const windDamage = true;
    const hailDamage = false;

    const loadCustomers = async () => {
        try {
            const res = await fetch("https://backend-42686524573.europe-west1.run.app/api/v1/customers/" + customerId + "/", { //https://backend-42686524573.europe-west1.run.app/api/v1/customers/
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
        alert("Copied " + text);
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
        return (
            <>
                <ModelSettings show={showSettings} close={() => setShowSettings(false)} houseId={houseId} reloadCustomers={loadCustomers}></ModelSettings>
                <ImageModal show={showImage} close={() => setShowImage(false)} imageSrc={imageSrc}></ImageModal>
                <ImageUploadModal show={showUpload} close={() => setShowUpload(false)} reloadCustomers={loadCustomers} houseId={houseId}></ImageUploadModal>
                <div className="page-header">
                    <div className="container">
                        <h1>Report</h1>
                        <button className="secondary" onClick={() => setShowSettings(true)}>⚙ Settings</button>
                    </div>
                    <div className="house-info">
                        <div>
                            <label>Address: </label>
                            <p onClick={() => copyToClipboard(house[0].address)}>{house[0].address}</p>
                        </div>
                        <div>
                            <label>Roof Type: </label>
                            <p onClick={() => copyToClipboard("Asphalt")}>{"Asphalt"}</p>
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
                </div>
                <div className="subheader">
                    <h2>Damage Summary</h2>
                </div>
                <div className="summary">
                    <div className="content">
                        <div className="header">
                            <h3>Severity</h3>
                            <Badge name={"4/5"} color={"tomato"}></Badge>
                        </div>
                        <p>The roof has critical damage and needs immediate attention. </p>
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
                            <Badge name={"$4,000"} color={"mediumseagreen"}></Badge>
                        </div>
                        <p>This estimate has taken into account the total amount of damage along with the cost of asphalt shingles.</p>
                    </div>
                </div>
                <div className="subheader">
                    <h2>Images </h2>
                </div>
                <div className="house-images">
                    {
                        house[0].images.map((image) => (
                            <img width={200} height={200} src={image.predicted_url} onClick={() => magnifyImage(image.predicted_url)}></img>
                        ))
                    }
                </div>
                <br></br>
                <div>
                    <button className="secondary" onClick={() => setShowUpload(true)}>Upload</button>
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