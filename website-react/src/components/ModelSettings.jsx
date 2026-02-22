import { useState } from "react";
import { BACKEND_URL } from "../constants";

function ModelSettings({show, close, houseId, reloadCustomers}) {
    const DEFAULT_SLIDER_VALUE = 5;
    const [sliderValue, setSliderValue] = useState(DEFAULT_SLIDER_VALUE);
    const [posting, setPosting] = useState(false);

    const updateHouse = async (data) => {
        // Estimations ----------------------------------------------------------------
        const viewingAngle = 33.0;
        const imageWidth = 640.0;
        const distance = 16.0;
        const rooftype = "Asphalt Shingles";

        const footToPixel = (2 * distance * Math.tan(viewingAngle / 2)) / imageWidth;

        // Material cost
        let materialCostPerSqrFt = 1;
        let labourCostPerSqrFt = 1;
        if (rooftype === "Asphalt Shingles")
        {
            materialCostPerSqrFt = 1.1;
            labourCostPerSqrFt = 2.75;
        }
        else if (rooftype === "Metal")
        {
            materialCostPerSqrFt = 11;
            labourCostPerSqrFt = 6.00;
        }

        let area = 0;
        let damageTypes = [];
        for (const result of data.results)
        {
            // Gets total damage area
            for(const box of result.detections.boxes)
            {
                let width = (box[2] - box[0]) * footToPixel;
                let height = (box[3] - box[1]) * footToPixel;
                area += width * height;
            }

            // Gets damage types
            for (const label of result.detections.labels)
            {
                let type = "hail";
                if (label === 0)
                    type = "wind";
                
                if (!damageTypes.includes(type))
                    damageTypes.push(type);
            }
        }

        // Severity estimate
        let severity = 0;
        if (area > 800)
            severity = 5;
        else if (area > 600)
            severity = 4;
        else if (area > 400)
            severity = 3;
        else if (area > 200)
            severity = 2;
        else if (area > 0)
            severity = 1;

        // Cost estimate
        const roofCost = area * materialCostPerSqrFt;
        const labourCost = area * labourCostPerSqrFt;
        const totalCost = roofCost + labourCost;

        console.log("-Details-", "\nArea: \t\t\t" + area, "\nSeverity: \t\t" + severity, "\nDamage Types: \t" + damageTypes);
        console.log("-Cost-" + "\nRoof Cost: \t\t" + roofCost, "\nLabor Cost: \t" + labourCost, "\nTotal Cost: \t" + totalCost);
        
        //-----------------------------------------------------------------------------

        const formData = new FormData();
        formData.append("severity", severity);
        formData.append("damage_types", JSON.stringify(damageTypes));
        formData.append("price_estimate", totalCost.toFixed(2));

        try {
            const res = await fetch(BACKEND_URL + "/api/v1/houses/" + houseId + "/", {
                method: "PATCH",
                credentials: "include",
                body: formData
            });

            if (!res.ok || res == null)
                throw new Error(res.status);

            const data = await res.json();
            
            console.log(data);
        }
        catch (err) {
            console.log("Error: ", err);
            alert(err);
        }
    }
    
    const generateReport = async (formData) => {
        try {
            setPosting(true);

            const res = await fetch(BACKEND_URL + "/api/houses/" + houseId + "/run_prediction/", { //https://backend-42686524573.europe-west1.run.app/api/houses/" + houseId + "/run_prediction/
                method: "POST",
                credentials: "include",
                body: formData
            });

            if (!res.ok || res == null)
                throw new Error(res.status);

            const data = await res.json();
            
            console.log(data);
            updateHouse(data);

            setSliderValue(DEFAULT_SLIDER_VALUE);
            setPosting(false);
            reloadCustomers();
            close();
        }
        catch (err) {
            console.log("Error: ", err);
            alert(err);
            setPosting(false);
        }
    }

    const setSliderInput = (event) => {
        setSliderValue(event.target.value);
    }

    const submitForm = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        formData.append("threshold", formData.get("raw_threshold") / 10.0);
        
        generateReport(formData);
    }

    if (show) {
        return (
            <>
                <div className="modal-background"></div>
                <div className="modal">
                    <div className="header">
                        <h2>Model Settings</h2>
                        <button className="close" onClick={() => {close(); setSliderValue(DEFAULT_SLIDER_VALUE);}}>&times;</button>
                    </div>
                    <div className="body">
                        <form onSubmit={submitForm}>
                            <div className="input-container">
                                <h4>Inference mode:</h4>
                                <input type="radio" name="mode" id="normal" defaultChecked required></input>
                                <label htmlFor="normal">Normal</label>
                                <input type="radio" name="mode" id="tiled"></input>
                                <label htmlFor="tiled">Tiled</label>
                            </div>
                            <div className="input-container">
                                <h4>Tile size (for tiled mode only):</h4>
                                <select name="tile_size" required>
                                    <option value={560}>Large (560)</option>
                                    <option value={336}>Medium (336)</option>
                                    <option value={224}>Small (224)</option>
                                </select>
                            </div>
                            <div className="input-container">
                                <div className="inputHeader">
                                    <h4>Threshold: </h4>
                                    <p className="sliderValue">{(sliderValue * 10) + "%"}</p>
                                </div>
                                <input type="range" name="raw_threshold" id="threshold" onChange={setSliderInput} min={2} max={8} defaultValue={DEFAULT_SLIDER_VALUE} required></input>
                            </div>
                            <div className="mdlButtonContainer">
                                { posting ? (
                                    <button disabled>Generating...</button>
                                ) : (
                                    <button className="primary">Generate</button>
                                )}
                            </div>
                        </form>
                    </div>
                    
                </div>
            </>
        );
    }
    

    return null;
}

export default ModelSettings;