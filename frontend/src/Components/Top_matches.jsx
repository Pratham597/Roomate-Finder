import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Matches = () => {
  const [matches, setMatches] = useState([]); // State to hold matches data
  const [filteredMatches, setFilteredMatches] = useState([]); // State for filtered matches
  const [selectedDepartment, setSelectedDepartment] = useState(""); // State for filter selection
  const navigate = useNavigate(); // Navigation hook for routing

  // Fetch data from the backend
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/matches"); // Replace with your backend endpoint
        const data = await response.json();
        setMatches(data);
        setFilteredMatches(data); // Initialize filtered matches with full data
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, []);

  // Handle filtering by department
  const handleFilterChange = (e) => {
    const department = e.target.value;
    setSelectedDepartment(department);

    if (department === "") {
      setFilteredMatches(matches); // Show all matches if no filter is selected
    } else {
      const filtered = matches.filter((match) => match.department === department);
      setFilteredMatches(filtered);
    }
  };

  // Navigate to the matched user's profile
  const handleProfileClick = (id) => {
    navigate(`/profile/${id}`); // Replace `/profile/${id}` with your actual profile route
  };

  return (
    <div className="flex h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <div className="flex-1 bg-white p-6 overflow-auto">
        <h1 className="text-3xl font-bold text-[#367896] mt-12 mb-3">Top Matches</h1>

        {/* Filter dropdown */}
        <div className="mb-6">
          <label
            htmlFor="department-filter"
            className="block text-lg font-medium text-[#7D5AA3]"
          >
          </label>
          <select
            id="department-filter"
            value={selectedDepartment}
            onChange={handleFilterChange}
            className="mt-2 block w-full rounded-md border-[#E9D7F6] bg-[#F5FEFF] shadow focus:ring-[#7D5AA3] focus:border-[#7D5AA3] text-[#367896] sm:text-md"
          >
            <option value="">All Departments</option>
            <option value="Computer Science and Engineering">Computer Science and Engineering</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
            <option value="Electronics and Communication Engineering">
              Electronics and Communication Engineering
            </option>
            <option value="Electrical Engineering">Electrical Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Chemical Engineering">Chemical Engineering</option>
            <option value="BSc Mathematics">BSc Mathematics</option>
            <option value="BSc Physics">BSc Physics</option>
            <option value="BSc Chemistry">BSc Chemistry</option>
            <option value="Humanities and Social Sciences">Humanities and Social Sciences</option>
            <option value="Management Studies">Management Studies</option>
          </select>
        </div>

        {/* Matches list */}
        <div className="space-y-6">
          {filteredMatches.length > 0 ? (
            filteredMatches.map((match, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 flex justify-between items-center transition-transform transform hover:scale-105"
              >
                <div>
                  <h2
                    className="text-xl font-semibold text-[#367896] cursor-pointer hover:underline"
                    onClick={() => handleProfileClick(match.id)} // Pass the matched user's ID
                  >
                    {match.name}
                  </h2>
                  <p className="text-sm text-gray-400">{match.department}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-[#B2BABE]">No matches found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Matches;
