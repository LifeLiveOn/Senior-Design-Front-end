import { useState } from "react";

function NewHouse({show, close, reloadCustomers, customerId}) {
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [posting, setPosting] = useState(false);
    const [showRequired, setShowRequired] = useState(false);

    const postHouse = async () => {
        let passedCheck = true;

        if (address === "") {
            passedCheck = false;
        }
        if (description === "") {
            passedCheck = false;
        }

        if (passedCheck) {
            const house = {
                customer: customerId,
                address: address,
                description: description
            }

            try {
                setPosting(true);

                const res = await fetch("https://backend-42686524573.europe-west1.run.app/api/v1/houses/", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(house)
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
        else {
            setShowRequired(true);
        }
    }

    const setAddressInput = (event) => {
        setAddress(event.target.value)
    }
    const setDesctiptionInput = (event) => {
        setDescription(event.target.value)
    }

    const reset = () => {
        setAddress("")
        setDescription("")
        setShowRequired(false);
    }

    if (show) {
        return (
            <>
                <div className="modal-background"></div>
                <div className="modal">
                    <div className="header">
                        <h2>New House</h2>
                        <button className="close" onClick={() => {close(); reset();}}>&times;</button>
                    </div>
                    <div className="body">
                        <div className="input-container">
                            <h4>Address:</h4>
                            <input type="text" placeholder="1234 Example Trl" onChange={setAddressInput}></input>
                            {showRequired && address === "" && (<label className="star">Required</label>)}
                        </div>
                        <div className="input-container">
                            <h4>Roof Type:</h4>
                            <select name="roofType">
                                <option value={"asphalt"}>Asphalt</option>
                                <option value={"slate"}>Slate</option>
                                <option value={"metal"}>Metal</option>
                                <option value={"wood"}>Wood</option>
                            </select>
                        </div>
                        <div className="input-container">
                            <h4>Description:</h4>
                            <textarea rows={5} cols={40} onChange={setDesctiptionInput}></textarea>
                            {showRequired && address === "" && (<label className="star">Required</label>)}
                        </div>
                    </div>
                    <div className="mdlButtonContainer">
                        { posting ? (
                            <button disabled>Loading...</button>
                        ) : (
                            <button className="primary" onClick={() => postHouse()}>Submit</button>
                        )}
                    </div>
                </div>
            </>
        );
    }
    

    return null;
}

export default NewHouse;