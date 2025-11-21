import { useEffect, useState } from "react";

function CustomerTable() {
    const [customers, setCustomers] = useState([]);
    const [failed, setFailed] = useState(false);

    // Load Customers
    useEffect(() => {
        const loadCustomers = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/v1/customers/", {
                    credentials: "include"
                });

                if (!res.ok || res == null)
                    throw new Error(res.status);

                const data = await res.json();
                
                console.log(data);
                setCustomers(data);
            }
            catch (err) {
                console.log("Error: ", err);
                setFailed(true);
            }
        }

        loadCustomers();
    }, []);

    // Display table
    if (failed) {
        return <h1>Database connection failed</h1>;
    }
    else {
        return (
            <>
                <h1>Customer Search</h1>
                <div className="customer-search">
                    <input type="search" placeholder="Search"></input>
                    <select name="Sort">
                        <option value="Name">Name</option>
                        <option value="Number">Number</option>
                    </select>
                    <button>Search</button>
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
                        customers.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.created_at.substring(0, 10)}</td>
                                <td>{customer.name}</td>
                                <td>{customer.phone}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </>

        );
    }
}

export default CustomerTable;