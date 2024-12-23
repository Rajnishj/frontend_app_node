import React, { useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    setData(null);

    try {
        const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:8000/feed",{
        method:"GET",
        // headers: {
        //     Authorization: `Bearer ${token}`, // Pass the token
        //   },//if you are setting token in local storage
          credentials: "include", //if you are directly storing cookies at the time of login in Browser
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Dashboard</h1>
        <p className="text-gray-600 mb-6">
          Click the button below to fetch user data.
        </p>
        <button
          onClick={fetchData}
          disabled={loading}
          className={`py-2 px-4 text-white rounded ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Fetching Data..." : "Fetch Data"}
        </button>
        {error && (
          <div className="mt-4 text-red-500">
            <p>Error: {error}</p>
          </div>
        )}
        {data && (
          <div className="mt-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Users:</h2>
            <ul className="space-y-3">
              {data.map((item) => (
                <li
                  key={item._id}
                  className="p-4 bg-gray-50 rounded border border-gray-200 shadow-sm"
                >
                  <p className="text-lg font-medium text-gray-800">
                    {`${item.firstName} ${item.lastName}`}
                  </p>
                  <p className="text-sm text-gray-600">{item.gender}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
