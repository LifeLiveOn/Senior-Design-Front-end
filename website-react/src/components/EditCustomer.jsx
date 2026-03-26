import { useState } from "react";
import { BACKEND_URL } from "../constants";
import LoadingSpinner from "./LoadingSpinner";

function EditCustomer({show, close, reloadCustomers, customer}) {
    const [posting, setPosting] = useState(false);

    const postCustomer = async (formData) => {
        try {
            setPosting(true);

            const res = await fetch(BACKEND_URL + "/api/v1/customers/" + customer.id + "/", {
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

        const formData = new FormData(event.target);
        formData.append("name", formData.get("first") + " " + formData.get("last"));
        formData.append("phone", "+" + formData.get("code") + formData.get("number"));
        
        postCustomer(formData);
    }

    if (show) {
        console.log(customer);
        const name = customer.name.split(" ");


        return (
            <>
                <div className="modal-background"></div>
                <div className="modal">
                    <div className="header">
                        <h2>Edit Customer</h2>
                        <button className="close" onClick={close}>&times;</button>
                    </div>
                    <div className="body">
                        <form onSubmit={submitForm}>
                            <div className="input-container">
                                <h4>Name:</h4>
                                <input type="text" name="first" placeholder="First" defaultValue={name[0]} required></input>
                                <input type="text" name="last" placeholder="Last" defaultValue={name[1]} required></input>
                            </div>
                            <div className="input-container">
                                <h4>Email:</h4>
                                <input type="email" name="email" placeholder="example.email@gmail.com" defaultValue={customer.email} required pattern=".+gmail.com"></input>
                            </div>
                            <div className="input-container">
                                <h4>Number:</h4>
                                {"+ "}
                                <input type="number" className="country-code" name="code" defaultValue={customer.phone.charAt(1)} placeholder="#" required min={1} max={249} maxLength={3}></input>
                                <input type="tel" className="phone" name="number" placeholder="##########" defaultValue={customer.phone.substring(2)} required maxLength={10} pattern="[0-9]{10}"></input>
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

export default EditCustomer;