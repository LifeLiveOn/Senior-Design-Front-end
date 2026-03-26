import { useState } from "react";
import { generateReport, updateHouseReport } from "../utils";
import { BACKEND_URL } from "../constants";
import LoadingSpinner from "./LoadingSpinner";

function ImageUploadModal({show, close, reloadCustomers, houseId}) {
    const [images, setImages] = useState([]);
    const [posting, setPosting] = useState(false);
    const [showRequired, setShowRequired] = useState(false);
    const [status, setStatus] = useState("Uploading");

    const postCustomer = async () => {
        let passedCheck = false;

        if (images.length > 0) {
            passedCheck = true;

            for (const image of images) {
                if (image.type !== "image/jpeg") {
                    passedCheck = false;
                    break;
                }
            }
        }

        if (passedCheck) {
            try {
                for (const image of images) {
                    const formData = new FormData();
                    formData.append("house", houseId);
                    formData.append("file", image);

                    setPosting(true);

                    const res = await fetch(BACKEND_URL + "/api/v1/house-images/", { //https://backend-42686524573.europe-west1.run.app/api/v1/house-images/
                        method: "POST",
                        credentials: "include",
                        body: formData
                    });

                    if (!res.ok || res == null)
                        throw new Error(res.status);

                    const data = await res.json();
                    
                    console.log(data);
                }

                const modelFormData = new FormData();
                modelFormData.append("mode", "normal");
                modelFormData.append("tile_size", 560);
                modelFormData.append("threshold", 0.5);

                const houseData = await generateReport(modelFormData, houseId);
                setStatus("Getting estimate");
                await updateHouseReport(houseData, houseId);

                setPosting(false);
                setStatus("Uploading")
                reloadCustomers();
                close();
            }
            catch (err) {
                console.log("Error: ", err);
                alert(err);
                setPosting(false);
                setStatus("Uploading")
            }
        }
        else {
            setShowRequired(true);
        }
    }

    const setImagesInput = (event) => {
        let files = Array.from(event.target.files)

        setImages(files)
    }

    const reset = () => {
        setImages([])
        setShowRequired(false);
    }

    if (show) {
        return (
            <>
                <div className="modal-background"></div>
                <div className="modal">
                    <div className="header">
                        <h2>Upload</h2>
                        <button className="close" onClick={() => {close(); reset();}}>&times;</button>
                    </div>
                    <div className="body">
                        <div className="mdlButtonContainer">
                            <input type="file" onChange={setImagesInput} multiple></input>
                            { posting ? (
                                <LoadingSpinner text={status}></LoadingSpinner>
                            ) : (
                                <button className="primary" onClick={() => postCustomer()}>Submit</button>
                            )}
                        </div>
                        <div className="upload-images">
                        {
                            images.map((image) => (
                            <img width={200} height={200} src={URL.createObjectURL(image)}></img>
                            ))
                        }
                        </div>
                    </div>
                </div>
            </>
        );
    }
    

    return null;
}

export default ImageUploadModal;