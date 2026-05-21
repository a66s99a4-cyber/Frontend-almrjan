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
    income: 0,
    totalCost: 0,
    netProfit: 0
  })

  const [priceForm, setPriceForm] = useState({
    area: "",
    propertyType: "",
    cleaningType: "Basic",
    price: "",
    cost: ""
  })

  const [externalBooking, setExternalBooking] = useState({
    customerName: "",
    phone: "",
    area: "",
    propertyType: "",
    cleaningType: "Basic",
    date: "",
    price: "",
    cost: "",
    notes: ""
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

    try {
      await axios.post(`${API}/prices`, priceForm, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setPriceForm({
        area: "",
        propertyType: "",
        cleaningType: "Basic",
        price: "",
        cost: ""
      })

      refreshAdmin()
    } catch (error) {
      alert(error.response?.data?.message || "Error adding price")
    }
  }

  const deletePrice = async (id) => {
    await axios.delete(`${API}/prices/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    refreshAdmin()
  }

  const handleExternalBookingChange = (e) => {
    setExternalBooking({
      ...externalBooking,
      [e.target.name]: e.target.value
    })
  }

  const addExternalBooking = async (e) => {
    e.preventDefault()

    const price = Number(externalBooking.price || 0)
    const cost = Number(externalBooking.cost || 0)

    try {
      await axios.post(
        `${API}/bookings`,
        {
          ...externalBooking,
          price,
          cost,
          profit: price - cost,
          source: "external",
          paymentStatus: "paid",
          status: "completed"
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setExternalBooking({
        customerName: "",
        phone: "",
        area: "",
        propertyType: "",
        cleaningType: "Basic",
        date: "",
        price: "",
        cost: "",
        notes: ""
      })

      refreshAdmin()
    } catch (error) {
      alert(error.response?.data?.message || "Error adding external order")
    }
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
    <section className="section admin-page">
      <div className="admin-top">
        <div>
          <span>Al Marjan Cleaning Company</span>
          <h2>Admin Dashboard</h2>
        </div>
      </div>

      <div className="admin-section">
        <h3>Website Statistics</h3>

        <div className="admin-list">
          <div className="admin-card stat-card">
            <h3>{stats.visitorsCount}</h3>
            <p>Website Visits</p>
          </div>

          <div className="admin-card stat-card">
            <h3>{stats.bookingsCount}</h3>
            <p>Total Bookings</p>
          </div>

          <div className="admin-card stat-card">
            <h3>{stats.completedBookings}</h3>
            <p>Completed Bookings</p>
          </div>

          <div className="admin-card stat-card">
            <h3>{stats.income} BHD</h3>
            <p>Total Income</p>
          </div>

          <div className="admin-card stat-card danger-stat">
            <h3>{stats.totalCost} BHD</h3>
            <p>Total Cost</p>
          </div>

          <div className="admin-card stat-card profit-stat">
            <h3>{stats.netProfit} BHD</h3>
            <p>Net Profit</p>
            <button onClick={resetIncome}>Reset Income</button>
          </div>
        </div>
      </div>

      <div className="admin-two-columns">
        <div className="admin-section">
          <h3>Add Basic Price</h3>

          <form className="form-box admin-price-form" onSubmit={addPrice}>
            <input
              name="area"
              placeholder="Area مثل سار / الرفاع / المحرق"
              value={priceForm.area}
              onChange={handlePriceChange}
              required
            />

            <input
              name="propertyType"
              placeholder="نوع المكان مثال: شقة / بيت / فيلا / مجلس"
              value={priceForm.propertyType}
              onChange={handlePriceChange}
              required
            />

            <input name="cleaningType" value="Basic" readOnly />

            <input
              name="price"
              type="number"
              placeholder="السعر الذي يظهر للزبون BHD"
              value={priceForm.price}
              onChange={handlePriceChange}
              required
            />

            <input
              name="cost"
              type="number"
              placeholder="تكلفة الشركة BHD"
              value={priceForm.cost}
              onChange={handlePriceChange}
            />

            <button>Add Price</button>
          </form>
        </div>

        <div className="admin-section">
          <h3>Add External Order</h3>

          <form className="form-box admin-price-form" onSubmit={addExternalBooking}>
            <input
              name="customerName"
              placeholder="Customer Name"
              value={externalBooking.customerName}
              onChange={handleExternalBookingChange}
              required
            />

            <input
              name="phone"
              placeholder="Phone"
              value={externalBooking.phone}
              onChange={handleExternalBookingChange}
              required
            />

            <input
              name="area"
              placeholder="Area"
              value={externalBooking.area}
              onChange={handleExternalBookingChange}
            />

            <input
              name="propertyType"
              placeholder="Place Type"
              value={externalBooking.propertyType}
              onChange={handleExternalBookingChange}
            />

            <input name="cleaningType" value="Basic" readOnly />

            <input
              name="date"
              type="date"
              value={externalBooking.date}
              onChange={handleExternalBookingChange}
              required
            />

            <input
              name="price"
              type="number"
              placeholder="Income / Price BHD"
              value={externalBooking.price}
              onChange={handleExternalBookingChange}
              required
            />

            <input
              name="cost"
              type="number"
              placeholder="Company Cost BHD"
              value={externalBooking.cost}
              onChange={handleExternalBookingChange}
            />

            <textarea
              name="notes"
              placeholder="Notes"
              value={externalBooking.notes}
              onChange={handleExternalBookingChange}
            />

            <button>Add External Order</button>
          </form>
        </div>
      </div>

      <div className="admin-section">
        <h3>Prices List</h3>

        <div className="admin-list">
          {prices.map((item) => (
            <div className="admin-card" key={item._id}>
              <h3>{item.area}</h3>
              <p>Place: {item.propertyType}</p>
              <p>Cleaning: {item.cleaningType}</p>
              <p>Customer Price: {item.price} BHD</p>
              <p>Cost: {item.cost || 0} BHD</p>

              <button onClick={() => deletePrice(item._id)}>Delete Price</button>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-section">
        <h3>Bookings</h3>

        <div className="admin-list">
          {bookings.map((booking) => (
            <div className="admin-card booking-admin-card" key={booking._id}>
              <h3>{booking.customerName}</h3>

              <p>Phone: {booking.phone}</p>
              <p>Area: {booking.areaName || booking.area}</p>
              <p>Place: {booking.propertyType}</p>
              <p>Cleaning: {booking.cleaningType}</p>
              <p>House Number: {booking.houseNumber || "No house number"}</p>
              <p>Source: {booking.source === "external" ? "External Order" : "Website"}</p>

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

              <p>Date: {booking.date}</p>
              <p>Price: {booking.price || 0} BHD</p>
              <p>Cost: {booking.cost || 0} BHD</p>
              <p>Profit: {booking.profit || 0} BHD</p>
              <p>Payment Status: {booking.paymentStatus || "pending"}</p>
              <p>Status: {booking.status}</p>
              <p>Notes: {booking.notes || "No notes"}</p>

              {booking.paymentStatus === "paid" ? (
                <button onClick={() => markAsPending(booking._id)}>Mark as Pending</button>
              ) : (
                <button onClick={() => markAsPaid(booking._id)}>Confirm Paid</button>
              )}

              <select
                value={booking.status}
                onChange={(e) => updateStatus(booking._id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <button onClick={() => deleteBooking(booking._id)}>Delete Booking</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Admin
