import React, { useEffect, useState } from "react";

/**
 * CustomersPage
 *
 * - Fetch customers from DRF
 * - Display list
 * - Popup modal to add new customer
 * - Redirects to backend login if unauthorized
 */
function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Form data
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  /** Load customers from backend */
  const fetchCustomers = () => {
    fetch("http://localhost:8000/customers/", {
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401) {
          window.location.href = "http://localhost:8000/login";
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setCustomers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch customers error:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  /** Create new customer */
  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();

    fetch("http://localhost:8000/customers/", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create customer");
        return res.json();
      })
      .then(() => {
        setForm({ name: "", email: "", phone: "" });
        setShowModal(false);
        fetchCustomers();
      })
      .catch((err) => console.error("Create customer error:", err));
  };

  return (
    <>
      <div className="container">
        <h2>Customers</h2>

        <button className="btn" onClick={() => setShowModal(true)}>
          + Add Customer
        </button>

        {loading ? (
          <p>Loading…</p>
        ) : customers.length === 0 ? (
          <p>No customers found.</p>
        ) : (
          <ul>
            {customers.map((c) => (
              <li key={c.id}>
                {c.name} {c.email && ` - ${c.email}`} {c.phone && `(${c.phone})`}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal OUTSIDE container */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add Customer</h3>

            <form onSubmit={handleCreate}>
              <label>Name*</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <label>Email</label>
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <label>Phone</label>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );

}

export default CustomersPage;
