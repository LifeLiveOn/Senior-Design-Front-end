import { useState } from "react";

function ModelSettings({show, close}) {
    const [threshold, setThreshold] = useState(80);

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
                        <input type="radio" name="infrence" id="normal" defaultChecked></input>
                        <label htmlFor="normal">Normal</label>
                        <input type="radio" name="infrence" id="tiled"></input>
                        <label htmlFor="tiled">Tiled</label>
                    </div>
                    <div className="input-container">
                        <h4>Tile size (for tiled mode only):</h4>
                        <select name="tileSize">
                            <option value="normal">Normal</option>
                            <option value="large">Large</option>
                            <option value="small">Small</option>
                        </select>
                    </div>
                    <div className="input-container">
                        <div className="inputHeader">
                            <h4>Threshold: </h4>
                            <p className="sliderValue">{threshold + "%"}</p>
                        </div>
                        <input type="range" min={0} max={100} defaultValue={80} onInput={changeThresholdValue}/>
                    </div>
                    <div className="mdlButtonContainer">
                        <button>Generate</button>
                    </div>
                </div>
                
            </div>
            </>
        );
    }
    

    return null;
}

export default ModelSettings;