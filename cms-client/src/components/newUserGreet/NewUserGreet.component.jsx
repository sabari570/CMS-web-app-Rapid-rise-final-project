import React from "react";
import "./newUserGreet.styles.scss";
import { useNavigate } from "react-router-dom";

const NewUserGreet = () => {
  const navigate = useNavigate();
  return (
    <div className="new-user-greet">
      <div className="new-user-greet-wrapper">
        <h2 className="new-user-greet-title">Welcome to ConnectEZ👋</h2>
        <p className="new-user-greet-subtitle">
          It looks like you don't have any contacts yet. Let's get started by
          adding your first contact to manage your network efficiently.
        </p>
        <button
          onClick={(e) => navigate("/create-contact")}
          className="new-user-greet-btn"
        >
          Create Your First Contact
        </button>
      </div>
    </div>
  );
};

export default NewUserGreet;
