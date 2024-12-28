import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../router";
import searchRoutes from "../../searchRoutes";
import highlightText from "./highlightText";
import Modal from "./MobSearch"; 

// Import the Modal component

const MobSearchtwo = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm) {
      const searchResults = searchRoutes(routes.routes, searchTerm); // Access the routes array
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  const handleSuggestionClick = (path) => {
    navigate(path);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSearchTerm(""); // Optionally reset search term when closing the modal
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Search</button>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search routes"
          />
          {results.length > 0 ? (
            <ul>
              {results.map((result) => (
                <li
                  key={result.path}
                  onClick={() => handleSuggestionClick(result.path)}
                >
                  {highlightText(result.name, searchTerm)}:{" "}
                  {highlightText(result.path, searchTerm)}
                </li>
              ))}
            </ul>
          ) : (
            searchTerm && <p>No results found</p>
          )}
        </Modal>
      )}
    </div>
  );
};

export default MobSearchtwo;
