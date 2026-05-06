import { useEffect, useState } from "react"
import axios from "axios"

const API = "https://almarjan-backend-rt2o.onrender.com"

const Admin = ({ user }) => {
  const [bookings, setBookings] = useState([])
  const [prices, setPrices] = useState([])
  const [stats, setStats] = useState({
    visitorsCount: 0,
    usersCount: 0,
    bookingsCount: 0,
    completedBookings: 0,
    paidBookingsCount: 0,
    income: 0
  })

  const [priceForm, setPriceForm] = useState({
    area: "",
    propertyType: "",
    cleaningType: "Basic",
    price: ""
  })

  const token = localStorage.getItem("token")

  const getBookings = async () => {
    const res = await axios.get(`${API}/bookings/admin`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    setBookings(res.data)
  }

  const getPrices = async () => {
    const res = await axios.get(`${API}/prices/all`)
    setPrices(res.data)
  }

  const getStats = async () => {
    const res = await axios.get(`${API}/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    setStats(res.data)
  }

  const refreshAdmin = () => {
    getBookings()
    getPrices()
    getStats()
  }

  const updateStatus = async (id, status) => {
    await axios.put(
      `${API}/bookings/${id}/status`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    )

    refreshAdmin()
  }

  const markAsPaid = async (id) => {
    await axios.put(
      `${API}/bookings/${id}/payment`,
      { paymentStatus: "paid" },
      { headers: { Authorization: `Bearer ${token}` } }
    )

    refreshAdmin()
  }

  const markAsPending = async (id) => {
    await axios.put(
      `${API}/bookings/${id}/payment`,
      { paymentStatus: "pending" },
      { headers: { Authorization: `Bearer ${token}` } }
    )

    refreshAdmin()
  }

  const resetIncome = async () => {
    await axios.put(
      `${API}/bookings/reset-income/all`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    )

    refreshAdmin()
  }

  const deleteBooking = async (id) => {
    await axios.delete(`${API}/bookings/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    refreshAdmin()
  }

  const handlePriceChange = (e) => {
    setPriceForm({
      ...priceForm,
      [e.target.name]: e.target.value
    })
  }

  const addPrice = async (e) => {
    e.preventDefault()

    await axios.post(`${API}/prices`, priceForm, {
      headers: { Authorization: `Bearer ${token}` }
    })

    setPriceForm({
      area: "",
      propertyType: "",
      cleaningType: "Basic",
      price: ""
    })

    refreshAdmin()
  }

  const deletePrice = async (id) => {
    await axios.delete(`${API}/prices/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    refreshAdmin()
  }

  useEffect(() => {
    if (user?.role === "admin") {
      refreshAdmin()
    }
  }, [user])

  if (!user || user.role !== "admin") {
    return (
      <section className="section">
        <h2>Admin Only</h2>
        <p>You must login as admin.</p>
      </section>
    )
  }

  return (
    <section className="section">
      <h2>Admin Dashboard</h2>

      <div className="admin-section">
        <h3>Website Statistics</h3>

        <div className="admin-list">
          <div className="admin-card">
            <h3>{stats.visitorsCount}</h3>
            <p>Website Visits</p>
          </div>

          <div className="admin-card">
            <h3>{stats.usersCount}</h3>
            <p>Total Users</p>
          </div>

          <div className="admin-card">
            <h3>{stats.bookingsCount}</h3>
            <p>Total Bookings</p>
          </div>

          <div className="admin-card">
            <h3>{stats.completedBookings}</h3>
            <p>Completed Bookings</p>
          </div>

          <div className="admin-card">
            <h3>{stats.paidBookingsCount}</h3>
            <p>Paid Bookings</p>
          </div>

          <div className="admin-card">
            <h3>{stats.income} BHD</h3>
            <p>Total Income</p>

            <button onClick={resetIncome}>
              Reset Income
            </button>
          </div>
        </div>
      </div>

      <div className="admin-section">
        <h3>Add Basic Price</h3>

        <form className="form-box" onSubmit={addPrice}>
          <input
            name="area"
            placeholder="Area مثل Saar أو سار"
            value={priceForm.area}
            onChange={handlePriceChange}
            required
          />

          <select
            name="propertyType"
            value={priceForm.propertyType}
            onChange={handlePriceChange}
            required
          >
            <option value="">Choose Place</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Office">Office</option>
          </select>

          <input
            name="cleaningType"
            value="Basic"
            readOnly
          />

          <input
            name="price"
            type="number"
            placeholder="Price BHD"
            value={priceForm.price}
            onChange={handlePriceChange}
            required
          />

          <button>Add Price</button>
        </form>
      </div>

      <div className="admin-section">
        <h3>Prices List</h3>

        <div className="admin-list">
          {prices.map((item) => (
            <div className="admin-card" key={item._id}>
              <h3>{item.area}</h3>
              <p>Place: {item.propertyType}</p>
              <p>Cleaning: {item.cleaningType}</p>
              <p>Price: {item.price} BHD</p>

              <button onClick={() => deletePrice(item._id)}>
                Delete Price
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-section">
        <h3>Bookings</h3>

        <div className="admin-list">
          {bookings.map((booking) => (
            <div className="admin-card" key={booking._id}>
              <h3>{booking.customerName}</h3>

              <p>Phone: {booking.phone}</p>
              <p>Area: {booking.area}</p>
              <p>House Number: {booking.houseNumber || "No house number"}</p>

              <p>
                Location:{" "}
                {booking.locationLink ? (
                  <a href={booking.locationLink} target="_blank" rel="noreferrer">
                    Open Google Maps
                  </a>
                ) : (
                  "No location"
                )}
              </p>

              <p>Payment Method: {booking.paymentMethod || "Not selected"}</p>
              <p>Payment Status: {booking.paymentStatus || "pending"}</p>

              {booking.paymentStatus === "paid" ? (
                <button onClick={() => markAsPending(booking._id)}>
                  Mark as Pending
                </button>
              ) : (
                <button onClick={() => markAsPaid(booking._id)}>
                  Confirm Paid
                </button>
              )}

              <p>Place: {booking.propertyType}</p>
              <p>Cleaning: {booking.cleaningType}</p>
              <p>Date: {booking.date}</p>
              <p>Time: {booking.time}</p>
              <p>Price: {booking.price || 0} BHD</p>
              <p>Status: {booking.status}</p>
              <p>Booking ID: {booking._id}</p>

              <select
                value={booking.status}
                onChange={(e) => updateStatus(booking._id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <button onClick={() => deleteBooking(booking._id)}>
                Delete Booking
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Admin
