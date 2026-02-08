import { useState } from "react";

function ImageUploadModal({show, close, reloadCustomers, houseId}) {
    const [images, setImages] = useState([]);
    const [posting, setPosting] = useState(false);
    const [showRequired, setShowRequired] = useState(false);

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
                    const img = {
                        house: houseId,
                        file: image
                    }

                    setPosting(true);

                    const res = await fetch("https://backend-42686524573.europe-west1.run.app/api/v1/house-images/", {
                        method: "POST",
                        credentials: "include",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(img)
                    });

                    if (!res.ok || res == null)
                        throw new Error(res.status);

                    const data = await res.json();
                    
                    console.log(data);
                }

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
                                <button disabled>Loading...</button>
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