import { useState } from "react";

function ModelSettings({show, closeSettings}) {
    if (show) {
        return (
            <>
                <div className="modalBackground"></div>
                <div className="modelSettings">
                <div className="header">
                    <h2>Model Settings</h2>
                    <button className="close" onClick={closeSettings}>&times;</button>
                </div>
                <div className="body">
                    <div className="inputContainer">
                        <h4>Infrence mode:</h4>
                        <input type="radio" name="infrence" id="normal" defaultChecked></input>
                        <label htmlFor="normal">Normal</label>
                        <input type="radio" name="infrence" id="tiled"></input>
                        <label htmlFor="tiled">Tiled</label>
                    </div>
                    <div className="inputContainer">
                        <h4>Tile size (for tiled mode only):</h4>
                        <select name="tileSize">
                            <option value="normal">Normal</option>
                            <option value="large">Large</option>
                            <option value="small">Small</option>
                        </select>
                    </div>
                    <div className="inputContainer">
                        <h4>Threshold:</h4>
                        <input type="range" min={0} max={100} defaultValue={80}></input>
                    </div>
                    <div className="buttonContainer">
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