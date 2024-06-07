import React, { useEffect, useState } from "react";
import axios from "axios";
const RegisteredUsers = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    let response = await axios.get("http://localhost:3000/registeredUsers");
    let data = await response.data;
    setUsers(data);
    console.log("data:", data);
  };
  const handleDelete = async () => {
    let response = await axios.delete(
      "http://localhost:3000/registeredUsers/:id"
    );
    console.log(response);
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <>
      <div className="container">
        <h2>Registered Users</h2>
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>
                  <img
                    src={`http://localhost:3000/uploads/${user.image}`}
                    alt={user.name}
                  />
                </td>
                <td>
                  <button onClick={handleDelete}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RegisteredUsers;
