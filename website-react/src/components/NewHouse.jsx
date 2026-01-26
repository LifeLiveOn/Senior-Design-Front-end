import { useState } from "react";

function NewHouse({show, close, reloadCustomers, customerId}) {
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [posting, setPosting] = useState(false);

    const postHouse = async () => {
        let passedCheck = true;
        let alertMessage = "Please fill these fields:";

        if (address === "") {
            passedCheck = false;
            alertMessage += "\n- Address";
        }
        if (description === "") {
            passedCheck = false;
            alertMessage += "\n- Description";
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
            alert(alertMessage);
        }
    }

    const setAddressInput = (event) => {
        setAddress(event.target.value)
    }
    const setDesctiptionInput = (event) => {
        setDescription(event.target.value)
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
                    <div className="input-container">
                        <h4>Address:</h4>
                        <input type="text" placeholder="1234 Example Trl" onChange={setAddressInput}></input>
                    </div>
                    <div className="input-container">
                        <h4>Description:</h4>
                        <textarea rows={5} cols={40} onChange={setDesctiptionInput}></textarea>
                    </div>
                </div>
                <div className="mdlButtonContainer">
                    { posting && (
                        <button disabled>Loading...</button>
                    )}
                    { !posting && (
                        <button onClick={() => postHouse()}>Create</button>
                    )}
                </div>
            </div>
            </>
        );
    }
    

    return null;
}

export default NewHouse;