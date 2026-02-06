import { useEffect, useState } from "react";
import HouseCard from "./HouseCard";
import NewCustomer from "./NewCustomer";
import NewHouse from "./NewHouse";

function CustomerTable() {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [customersLoaded, setCustomersLoaded] = useState(false);
    const [failed, setFailed] = useState(false);
    const [showNewCustomer, setShowNewCustomer] = useState(false);
    const [showNewHouse, setShowNewHouse] = useState(false);
    const [customerId, setCustomerId] = useState(-1);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [searchContent, setSearchContent] = useState("");
    const [searchType, setSearchType] = useState("Name");

    const customersPerPage = 6;

    const loadCustomers = async () => {
        try {
            const res = await fetch("https://backend-42686524573.europe-west1.run.app/api/v1/customers/", { //https://backend-42686524573.europe-west1.run.app/api/v1/customers/
                credentials: "include"
            });

            if (!res.ok || res == null)
                throw new Error(res.status);

            const data = await res.json();
            
            console.log(data);
            setCustomers(data);
            setFilteredCustomers(data);
            setCustomersLoaded(true);
            setPageCount(Math.ceil(data.length / 7))
        }
        catch (err) {
            console.log("Error: ", err);
            setFailed(true);
        }
    }

    const toggleCustomerId = async (id) => {
        if (customerId === id) {
            setCustomerId(-1);
        }
        else {
            setCustomerId(id);
        }
    }

    const search = () => {
        if (searchType === 'Name')
        {
            setFilteredCustomers(
                customers.filter(customer => {
                    return customer.name.toLowerCase().includes(searchContent.toLowerCase())
                })
            );
        }
        else if (searchType === 'Email')
        {
            setFilteredCustomers(
                customers.filter(customer => {
                    return customer.email.toLowerCase().includes(searchContent.toLowerCase())
                })
            );
        }
        else {
            setFilteredCustomers(
                customers.filter(customer => {
                    return customer.phone.includes(searchContent);
                })
            );
        }
    }

    const setSearchInput = (event) => {
        setSearchContent(event.target.value)
    }

    const setSelectInput = (event) => {
        setSearchType(event.target.value)
    }

    const changePage = (increment) => {
        let number = pageNumber + increment;
        if (number > 0 && number <= pageCount) {
            setPageNumber(number);
        }
    }

    // Load Customers
    useEffect(() => {
        loadCustomers();
    }, []);

    // Display table
    if (failed) {
        // return <h1>Database connection failed</h1>;
        return <a href="https://backend-42686524573.europe-west1.run.app/api/login/" className="login-button">
            <button className="primary">Login</button>
        </a>
    }
    else if (customersLoaded) {
        return (
            <>
                <NewCustomer show={showNewCustomer} close={() => setShowNewCustomer(false)} reloadCustomers={loadCustomers}></NewCustomer>
                <NewHouse show={showNewHouse} close={() => setShowNewHouse(false)} reloadCustomers={loadCustomers} customerId={customerId}></NewHouse>
                <div className="page-header">
                    <h1>Customer Search</h1>
                </div>
                
                <div className="customer-search">
                    <input type="search" placeholder="Search" onChange={setSearchInput}></input>
                    <select name="Sort" onChange={setSelectInput}>
                        <option value="Name">Name</option>
                        <option value="Email">Email</option>
                        <option value="Number">Number</option>
                    </select>
                    <button className="primary" onClick={search}>Search</button>
                    <button className="secondary" onClick={() => setShowNewCustomer(true)}>Add +</button>
                </div>
                <table className="customer-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Number</th>
                        </tr>
                    </thead>
                    <tbody> {
                        filteredCustomers.slice((pageNumber - 1) * customersPerPage, (pageNumber - 1) * customersPerPage + customersPerPage).map((customer) => (
                            <>
                                <tr key={customer.id} className="clickable" onClick={() => toggleCustomerId(customer.id)}>
                                    <td>{customer.created_at.substring(0, 10)}</td>
                                    <td>{customer.name}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.phone}</td>
                                </tr>
                                {customerId === customer.id && (
                                        <tr className="expanded">
                                            <td colSpan={4}>
                                                <div className="houses">
                                                    {customer.houses.map((house, index) => (
                                                            <HouseCard customerId={customer.id} houseId={house.id} address={house.address} description={house.description} imgCount={house.images.length} index={index + 1}></HouseCard>
                                                        ))
                                                    }
                                                    <div className="addhcContainer">
                                                        <div className="add-house-card" onClick={() => setShowNewHouse(true)}>
                                                            <p className="plus">+</p>
                                                        </div>
                                                    </div>
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
                <div className="page-nav">
                    <button className="icon" onClick={() => changePage(-1)}>◀</button>
                    <p>{pageNumber}</p>
                    <button className="icon" onClick={() => changePage(1)}>▶</button>
                </div>
            </>

        );
    }
    else {
        return (
            <div className="loading">
                <h1>Loading Customers...</h1>
            </div>
        );
    }
}

export default CustomerTable;