import { useState } from "react";
import { BACKEND_URL } from "../constants";

function ModelSettings({show, close, houseId, reloadCustomers}) {
    const [sliderValue, setSliderValue] = useState(40);
    const [posting, setPosting] = useState(false);
    
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
            setSliderValue(40);
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
        formData.append("threshold", formData.get("raw_threshold") / 100.0);
        
        generateReport(formData);
    }

    if (show) {
        return (
            <>
                <div className="modal-background"></div>
                <div className="modal">
                    <div className="header">
                        <h2>Model Settings</h2>
                        <button className="close" onClick={close}>&times;</button>
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
                                    <p className="sliderValue">{sliderValue + "%"}</p>
                                </div>
                                <input type="range" name="raw_threshold" id="threshold" onChange={setSliderInput} min={1} max={99} defaultValue={40} required></input>
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