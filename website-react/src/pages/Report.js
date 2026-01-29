import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ModelSettings from "../components/ModelSettings";
import ImageModal from "../components/ImageModal";


function App() {
    const {customerId, houseId} = useParams();
    const [house, setHouse] = useState([]);
    const [failed, setFailed] = useState(false);
    const [houseLoaded, setHouseLoaded] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [imageSrc, setImageSrc] = useState("");
    
    // Load Customers
    useEffect(() => {
        const loadCustomers = async () => {
            try {
                const res = await fetch("https://backend-42686524573.europe-west1.run.app/api/v1/customers/" + customerId + "/", { //https://backend-42686524573.europe-west1.run.app/api/v1/customers/
                    credentials: "include"
                });

                if (!res.ok || res == null)
                    throw new Error(res.status);

                const data = await res.json();

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
        
        loadCustomers();
    }, []);

    const magnifyImage = (src) => {
        setImageSrc(src);
        setShowImage(true);
    }
    
    if (failed) {
        return <h1>Database connection failed</h1>;
    }
    else if (houseLoaded) {
        return (
            <>
                <ModelSettings show={showSettings} close={() => setShowSettings(false)}></ModelSettings>
                <ImageModal show={showImage} close={() => setShowImage(false)} imageSrc={imageSrc}></ImageModal>
                <h1>Report (House ID: {houseId})</h1>
                <button className="primary" onClick={() => setShowSettings(true)}>Settings</button>
                <h2>Images {house[0].images.length}</h2>
                <div className="house-images">
                    {
                        house[0].images.map((image) => (
                            <img width={200} height={200} src={image.image_url} onClick={() => magnifyImage(image.image_url)}></img>
                        ))
                    }
                </div>
            </>
        );
    }
    else {
        return <h1>Loading Report...</h1>;
    }
}

export default App;