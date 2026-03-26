import { useState } from "react";
import { BACKEND_URL } from "../constants";
import LoadingSpinner from "./LoadingSpinner";

function EditHouse({show, close, reloadCustomers, house}) {
    const [posting, setPosting] = useState(false);

    const postHouse = async (formData) => {
        try {
            setPosting(true);

            const res = await fetch(BACKEND_URL + "/api/v1/houses/" + house.id + "/", {
                method: "PATCH",
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
            formData.append("customer", house.customer);
            formData.append("default_image", data, "default.jpg");

            const address = formData.get("address") + ";" + formData.get("city") + ";" + formData.get("state") + ";" + formData.get("zip_code");
            formData.set("address", address);
        
            postHouse(formData);
        }
        catch (err) {
            console.log("Error: ", err);
            alert(err);
        }
    }

    if (show) {
        const location = house.address.split(";");

        return (
            <>
                <div className="modal-background"></div>
                <div className="modal">
                    <div className="header">
                        <h2>Edit House</h2>
                        <button className="close" onClick={close}>&times;</button>
                    </div>
                    <div className="body">
                        <form onSubmit={submitForm}>
                            <div className="input-container">
                                <h4>Location:</h4>
                                <select name="state" defaultValue={location[2]} required>
                                    <option value={"TX"}>TX</option>
                                </select>
                                <input type="text" name="city" placeholder="City" defaultValue={location[1]} required></input>
                                <input type="text" name="zip_code" placeholder="Zip" defaultValue={location[3]} minLength={5} maxLength={9} required pattern="\d*"></input>
                                <input type="text" name="address" placeholder="Address" defaultValue={location[0]} required></input>
                            </div>
                            <div className="input-container">
                                <h4>Roof Type:</h4>
                                <select name="roof_type" defaultValue={house.roof_type} required>
                                    <option value={"Asphalt Shingles"}>Asphalt Shingles</option>
                                    <option value={"Slate Shingles"}>Slate Shingles</option>
                                    <option value={"Metal"}>Metal</option>
                                    <option value={"Wood"}>Wood</option>
                                    <option value={"Other"}>Other</option>
                                </select>
                            </div>
                            <div className="input-container">
                                <h4>Description:</h4>
                                <textarea name="description" defaultValue={house.description} rows={5} cols={40} required></textarea>
                            </div>
                            <div className="mdlButtonContainer">
                                { posting ? (
                                    <LoadingSpinner text="Submitting"></LoadingSpinner>
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

export default EditHouse;