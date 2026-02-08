import { useState } from "react";

function NewCustomer({show, close, reloadCustomers}) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [number, setNumber] = useState("");
    const [posting, setPosting] = useState(false);
    const [showRequired, setShowRequired] = useState(false);

    const postCustomer = async () => {
        let passedCheck = true;

        if (firstName === "") {
            passedCheck = false;
        }
        if (lastName === "") {
            passedCheck = false;
        }
        if (!customerEmail.includes("@")) {
            passedCheck = false;
        }
        if (number === "") {
            passedCheck = false;
        }

        if (passedCheck) {
            const cust = {
                name: firstName + " " + lastName,
                email: customerEmail,
                phone: number,
            }

            try {
                setPosting(true);

                const res = await fetch("https://backend-42686524573.europe-west1.run.app/api/v1/customers/", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(cust)
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

    const setFirstNameInput = (event) => {
        setFirstName(event.target.value)
    }
    const setLastNameInput = (event) => {
        setLastName(event.target.value)
    }
    const setEmailInput = (event) => {
        setCustomerEmail(event.target.value)
    }
    const setNumberInput = (event) => {
        setNumber(event.target.value)
    }

    const reset = () => {
        setFirstName("")
        setLastName("")
        setCustomerEmail("")
        setNumber("")
        setShowRequired(false);
    }

    if (show) {
        return (
            <>
                <div className="modal-background"></div>
                <div className="modal">
                    <div className="header">
                        <h2>New Customer</h2>
                        <button className="close" onClick={() => {close(); reset();}}>&times;</button>
                    </div>
                    <div className="body">
                        <div className="input-container">
                            <h4>Name:</h4>
                            <input type="text" placeholder="First" onChange={setFirstNameInput}></input>
                            <input type="text" placeholder="Last" onChange={setLastNameInput}></input>
                            {showRequired && (firstName === "" || lastName === "") && (<label className="star">Required</label>)}
                        </div>
                        <div className="input-container">
                            <h4>Email:</h4>
                            <input type="text" placeholder="example.email@gmail.com" onChange={setEmailInput}></input>
                            {showRequired && !customerEmail.includes("@") && (<label className="star">Include '@'</label>)}
                        </div>
                        <div className="input-container">
                            <h4>Number:</h4>
                            <input type="text" placeholder="123-456-7890" onChange={setNumberInput}></input>
                            {showRequired && number === "" && (<label className="star">Required</label>)}
                        </div>
                        <div className="mdlButtonContainer">
                            { posting ? (
                                <button disabled>Loading...</button>
                            ) : (
                                <button className="primary" onClick={() => postCustomer()}>Submit</button>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }
    

    return null;
}

export default NewCustomer;