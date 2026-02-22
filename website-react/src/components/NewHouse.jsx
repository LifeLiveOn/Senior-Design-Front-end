import { useState } from "react";
import { BACKEND_URL } from "../constants";

function NewHouse({show, close, reloadCustomers, customerId}) {
    const [posting, setPosting] = useState(false);

    const postHouse = async (formData) => {
        try {
            setPosting(true);

            const res = await fetch(BACKEND_URL + "/api/v1/houses/", { //https://backend-42686524573.europe-west1.run.app/api/v1/houses/
                method: "POST",
                credentials: "include",
                body: formData
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

    const submitForm = async (event) => {
        event.preventDefault();

        try {
            setPosting(true);

            const res = await fetch("/house-images/house-1.jpg");

            if (!res.ok || res == null)
                throw new Error(res.status);

            const data = await res.blob();

            const formData = new FormData(event.target);
            formData.append("customer", customerId);
            formData.append("default_image", data, "default.jpg");
        
            postHouse(formData);
        }
        catch (err) {
            console.log("Error: ", err);
            alert(err);
        }
    }

    if (show) {
        return (
            <>
                <div className="modal-background"></div>
                <div className="modal">
                    <div className="header">
                        <h2>New House</h2>
                        <button className="close" onClick={close}>&times;</button>
                    </div>
                    <div className="body">
                        <form onSubmit={submitForm}>
                            <div className="input-container">
                                <h4>Location:</h4>
                                <input type="text" name="city" placeholder="City" required></input>
                                <input type="text" name="zip_code" placeholder="Zip" minLength={5} maxLength={9} required pattern="\d*"></input>
                                <input type="text" name="address" placeholder="Address" required></input>
                            </div>
                            <div className="input-container">
                                <h4>Roof Type:</h4>
                                <select name="roof_type" required>
                                    <option value={"Asphalt Shingles"}>Asphalt Shingles</option>
                                    <option value={"Slate Shingles"}>Slate Shingles</option>
                                    <option value={"Metal"}>Metal</option>
                                    <option value={"Wood"}>Wood</option>
                                    <option value={"Other"}>Other</option>
                                </select>
                            </div>
                            <div className="input-container">
                                <h4>Description:</h4>
                                <textarea name="description" rows={5} cols={40} required></textarea>
                            </div>
                            <div className="mdlButtonContainer">
                                { posting ? (
                                    <button disabled>Loading...</button>
                                ) : (
                                    <button className="primary">Submit</button>
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

export default NewHouse;