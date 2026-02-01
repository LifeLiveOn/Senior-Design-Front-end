import { useState } from "react";

function ModelSettings({show, close, houseId, reloadCustomers}) {
    const [infrenceMode, setInfrenceMode] = useState("normal");
    const [tileSize, setTileSize] = useState(560);
    const [threshold, setThreshold] = useState(40);
    const [posting, setPosting] = useState(false);

    const generateReport = async () => {
        const settings = {
            mode: infrenceMode,
            threshold: threshold / 100,
            tile_size: tileSize,
        }

        try {
            setPosting(true);

            const res = await fetch("https://backend-42686524573.europe-west1.run.app/api/houses/" + houseId + "/run_prediction/", {
                method: "POST",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(settings)
            });

            if (!res.ok || res == null)
                throw new Error(res.status);

            const data = await res.json();
            
            console.log(data);
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

    const setModeValue = (tiled) => {
        setInfrenceMode(tiled ? "tiled" : "normal");
    }
    const setTileSizeValue = (event) => {
        setTileSize(event.target.value);
    }
    const changeThresholdValue = (event) => {
        setThreshold(event.target.value);
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
                        <div className="input-container">
                            <h4>Infrence mode:</h4>
                            <input type="radio" name="infrence" id="normal" defaultChecked onChange={() => setModeValue(false)}></input>
                            <label htmlFor="normal">Normal</label>
                            <input type="radio" name="infrence" id="tiled"  onChange={() => setModeValue(true)}></input>
                            <label htmlFor="tiled">Tiled</label>
                        </div>
                        <div className="input-container">
                            <h4>Tile size (for tiled mode only):</h4>
                            <select name="tileSize" onChange={setTileSizeValue}>
                                <option value={560}>Large (560)</option>
                                <option value={336}>Medium (336)</option>
                                <option value={224}>Small (224)</option>
                            </select>
                        </div>
                        <div className="input-container">
                            <div className="inputHeader">
                                <h4>Threshold: </h4>
                                <p className="sliderValue">{threshold + "%"}</p>
                            </div>
                            <input type="range" min={0} max={100} defaultValue={40} onInput={changeThresholdValue}/>
                        </div>
                        <div className="mdlButtonContainer">
                            { posting ? (
                                <button disabled>Generating...</button>
                            ) : (
                                <button className="primary" onClick={generateReport}>Generate</button>
                            )}
                        </div>
                    </div>
                    
                </div>
            </>
        );
    }
    

    return null;
}

export default ModelSettings;