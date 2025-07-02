import axios from "axios";
import React, { useEffect, useState } from "react";
import EmployeeCard from "../components/EmployeeCard";
import { useNavigate } from "react-router-dom";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch all employees once on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    setError(null);
    
    axios
      .get("http://localhost:5000/api/employees", {
        headers: { Authorization: token },
      })
      .then((res) => {
        setEmployees(res.data);
        setFilteredEmployees(res.data);
      })
      .catch((err) => {
        console.error("Error fetching employees:", err);
        setError("Failed to load employees. Please try again.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  // Navigate to add employee form
  const handleAdd = () => navigate("/addEmployee");

  // Navigate to view/edit details
  const handleView = (emp) => navigate(`/employee/${emp._id}`);

  // Delete employee
  const handleDelete = (emp) => {
    if (!window.confirm(`Are you sure you want to delete ${emp.empName}?`)) return;

    const token = localStorage.getItem("token");
    setIsLoading(true);
    
    axios
      .delete(`http://localhost:5000/api/employees/${emp._id}`, {
        headers: { Authorization: token },
      })
      .then(() => {
        const updatedList = employees.filter((e) => e._id !== emp._id);
        setEmployees(updatedList);
        setFilteredEmployees(updatedList);
      })
      .catch((err) => {
        console.error("Error deleting employee:", err);
        setError("Failed to delete employee. Please try again.");
      })
      .finally(() => setIsLoading(false));
  };

  // Search by eID (exact match)
  const handleSearch = () => {
    if (search.trim() === "") {
      setFilteredEmployees(employees);
      return;
    }

    const emp = employees.find((e) => e.eID.toString() === search.trim());
    setFilteredEmployees(emp ? [emp] : []);
  };

  // Reset search
  const handleReset = () => {
    setSearch("");
    setFilteredEmployees(employees);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Employee Directory</h1>
        <p className="text-gray-600">Manage your organization's workforce</p>
      </div>

      {/* Search and Action Bar */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-grow">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by Employee ID"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Search
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Reset
            </button>
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center"
            >
              <svg className="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Loading and Error States */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Employee Cards Grid */}
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No employees found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search or add a new employee</p>
              <div className="mt-6">
                <button
                  onClick={handleAdd}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Employee
                </button>
              </div>
            </div>
          ) : (
            filteredEmployees.map((emp) => (
              <EmployeeCard
                key={emp._id}
                employee={emp}
                onView={() => handleView(emp)}
                onDelete={() => handleDelete(emp)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Employees;