import { useEffect, useState } from "react";
import HouseCard from "../components/HouseCard";

function CustomerTable() {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [houses, setHouses] = useState([]);
    const [customersLoaded, setCustomersLoaded] = useState(false);
    const [housesLoaded, setHousesLoaded] = useState(false);
    const [failed, setFailed] = useState(false);
    const [customerId, setCustomerId] = useState(-1);
    const [searchContent, setSearchContent] = useState("");
    const [searchType, setSearchType] = useState("Name");
    
    // Load Customers
    useEffect(() => {
        const loadCustomers = async () => {
            try {
                const res = await fetch(`http://localhost:8000/api/v1/customers/`, { //https://backend-42686524573.europe-west1.run.app/api/v1/customers/
                    credentials: "include"
                });

                if (!res.ok || res == null)
                    throw new Error(res.status);

                const data = await res.json();
                
                console.log(data);
                setCustomers(data);
                setFilteredCustomers(data);
                setCustomersLoaded(true);
            }
            catch (err) {
                console.log("Error: ", err);
                setFailed(true);
            }
        }

        loadCustomers();
    }, []);

    // Load Houses
    useEffect(() => {
        const loadHouses = async () => {
            try {
                const res = await fetch(`http://localhost:8000/api/v1/houses/`, { //https://backend-42686524573.europe-west1.run.app/api/v1/customers/
                    credentials: "include"
                });

                if (!res.ok || res == null)
                    throw new Error(res.status);

                const data = await res.json();
                
                console.log(data);
                setHouses(data);
                setHousesLoaded(true);
            }
            catch (err) {
                console.log("Error: ", err);
                setFailed(true);
            }
        }

        if (customerId >= 0) {
            loadHouses();
        }
    }, [customerId]);

    // Toggle Customer ID
    const toggleCustomerId = async (id) => {
        setHousesLoaded(false);

        if (customerId === id) {
            setCustomerId(-1);
        }
        else {
            setCustomerId(id);
        }
    }

    // Search
    const search = () => {
        setFilteredCustomers(
            customers.filter(customer => {
                return customer.name.toLowerCase().includes(searchContent.toLowerCase())
            })
        );
    }

    const setSearchInput = (event) => {
        setSearchContent(event.target.value)
    }

    const setSelectInput = (event) => {
        setSearchType(event.target.value)
    }

    // Display table
    if (failed) {
        return <h1>Database connection failed</h1>;
    }
    else if (customersLoaded) {
        return (
            <>
                <h1>Customer Search</h1>
                <div className="customer-search">
                    <input type="search" placeholder="Search" onChange={setSearchInput}></input>
                    <select name="Sort" onChange={setSelectInput}>
                        <option value="Name">Name</option>
                        <option value="Number">Number</option>
                    </select>
                    <button onClick={search}>Search</button>
                </div>
                <table className="customer-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Number</th>
                        </tr>
                    </thead>
                    <tbody> {
                        filteredCustomers.map((customer) => (
                            <>
                                <tr key={customer.id} className="clickable" onClick={() => toggleCustomerId(customer.id)}>
                                    <td>{customer.created_at.substring(0, 10)}</td>
                                    <td>{customer.name}</td>
                                    <td>{customer.phone}</td>
                                </tr>
                                {customerId === customer.id && (
                                        <tr className="expanded">
                                            <td colSpan={3}>
                                                <div className="houses">
                                                    {housesLoaded && houses.map((house) => (
                                                            <HouseCard id={house.id}></HouseCard>
                                                        ))
                                                    }
                                                    {!housesLoaded &&
                                                        <p>Loading...</p>
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                            </>
                            
                        ))
                    }
                    </tbody>
                </table>
            </>

        );
    }
    else {
        return <h1>Loading...</h1>;
    }
}

export default CustomerTable;