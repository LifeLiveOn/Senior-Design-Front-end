import { useState } from "react";
import { generateReport, updateHouseReport } from "../utils";
import { BACKEND_URL } from "../constants";
import LoadingSpinner from "./LoadingSpinner";

function ModelSettings({show, close, houseId, reloadCustomers}) {
    const DEFAULT_SLIDER_VALUE = 5;
    const [sliderValue, setSliderValue] = useState(DEFAULT_SLIDER_VALUE);
    const [posting, setPosting] = useState(false);
    const [status, setStatus] = useState("Generating");

    const setSliderInput = (event) => {
        setSliderValue(event.target.value);
    }

    const submitForm = async (event) => {
        event.preventDefault();
        setPosting(true);

        const modelFormData = new FormData(event.target);
        modelFormData.append("threshold", modelFormData.get("raw_threshold") / 10.0);
        
        const houseData = await generateReport(modelFormData, houseId);
        setStatus("Getting estimate")
        await updateHouseReport(houseData, houseId);

        setSliderValue(DEFAULT_SLIDER_VALUE);
        setPosting(false);
        setStatus("Generating");
        reloadCustomers();
        close();
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
                                <input type="radio" name="mode" value="normal" defaultChecked></input>
                                <label htmlFor="normal">Normal</label>
                                <input type="radio" name="mode" value="tiled"></input>
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
                                    <LoadingSpinner text={status}></LoadingSpinner>
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