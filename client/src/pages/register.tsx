import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    propertyType: "Land",
    location: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "registrations"), {
        ...formData,
        timestamp: Timestamp.now(),
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting registration:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-[#001b14] text-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#D4AF37] mb-6">Register Property</h2>

        {submitted ? (
          <div className="bg-green-700 p-6 rounded shadow text-center">
            <h3 className="text-xl font-bold mb-2">Success!</h3>
            <p>Your property has been registered. We'll follow up shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 bg-[#002818] p-6 rounded-lg shadow">
            <div>
              <label className="block mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-white text-black"
              />
            </div>

            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-white text-black"
              />
            </div>

            <div>
              <label className="block mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-white text-black"
              />
            </div>

            <div>
              <label className="block mb-2">Property Type</label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-white text-black"
              >
                <option>Land</option>
                <option>House</option>
                <option>Shop</option>
                <option>Warehouse</option>
                <option>River Access</option>
              </select>
            </div>

            <div>
              <label className="block mb-2">Location / GPS</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-white text-black"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#D4AF37] hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
