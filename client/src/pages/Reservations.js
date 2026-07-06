import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function Reservations() {
  const [reservations, setReservations] = useState([]);

  const token = localStorage.getItem("token");

  

  const fetchReservations = async () => {
    try {
      const res = await API.get("/reservations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReservations(res.data);
    } catch (error) {
      toast.error("Failed to load reservations");
    }
  };
  useEffect(() => {
    fetchReservations();
  }, []);

  const cancelReservation = async (id) => {
    try {
      await API.delete(`/reservations/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Reservation cancelled");

      fetchReservations();
    } catch (error) {
      toast.error("Failed to cancel reservation");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📚 My Reserved Books</h2>

      {reservations.length === 0 ? (
        <h5>No books reserved.</h5>
      ) : (
        <div className="row">
          {reservations.map((item) => (
            <div className="col-md-4 mb-4" key={item._id}>
              <div className="card h-100 shadow">

                <img
                  src={
                    item.book?.image ||
                    "https://via.placeholder.com/250x300"
                  }
                  alt={item.book?.title}
                  className="card-img-top"
                  style={{
                    height: "300px",
                    objectFit: "cover",
                  }}
                />

                <div className="card-body">
                  <h5>{item.book?.title}</h5>

                  <p>
                    <strong>Author:</strong> {item.book?.author}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="badge bg-warning text-dark">
                      {item.status}
                    </span>
                  </p>

                  <button
                    className="btn btn-danger w-100"
                    onClick={() => cancelReservation(item._id)}
                  >
                    Cancel Reservation
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Reservations;