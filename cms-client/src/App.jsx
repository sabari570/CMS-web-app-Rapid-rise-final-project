import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const SERVER_URL = "http://localhost:8000/api";
  const [error, setError] = useState();
  const signInWithGoogleHandler = (e) => {
    window.open(`${SERVER_URL}/auth/google`, "_self");
  };

  useEffect(() => {
    const fetchSessionMessage = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/auth/fetch-session`, {
          withCredentials: true,
        });
        console.log("Response message: ", response.data);
        if (response.data.message !== null) {
          setError(response.data.message);
        }
      } catch (error) {
        console.log("Error while fetching session message: ", error);
      }
    };
    fetchSessionMessage();
  }, []);

  return (
    <div className="app">
      <button onClick={signInWithGoogleHandler}>Click me</button>
      {error && <p>Error message: {error}</p>}
    </div>
  );
};

export default App;
