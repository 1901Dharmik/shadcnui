import React from 'react'
import { useState, useEffect } from "react";

const NewPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://sheetdb.io/api/v1/4rpbvpfmzp5q5')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
     
     {
      data.map((users)=>(
        <div key={users.id} className="">
          {users.firstName}
        </div>
      ))
     }
    </div>
  )
}

export default NewPage
