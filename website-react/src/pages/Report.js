import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ModelSettings from "../components/ModelSettings";


function App() {
    const {customerId, houseId} = useParams();
    const [house, setHouse] = useState([]);
    const [failed, setFailed] = useState(false);
    const [houseLoaded, setHouseLoaded] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    
    // Load Customers
    useEffect(() => {
        const loadCustomers = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/v1/customers/" + customerId + "/", { //https://backend-42686524573.europe-west1.run.app/api/v1/customers/
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
    
    if (failed) {
        return <h1>Database connection failed</h1>;
    }
    else if (houseLoaded) {
        return (
            <>
                <h1>Report (House ID: {houseId})</h1>
                <ModelSettings show={showSettings} closeSettings={() => setShowSettings(false)}></ModelSettings>
                <button onClick={() => setShowSettings(true)}>Settings</button>
            </>
        );
    }
    else {
        return <h1>Loading Report...</h1>;
    }
}

export default App;