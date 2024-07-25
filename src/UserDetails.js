// import './App.css';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UserDetails = () => {
//   const [users, setUsers] = useState([]);
//   const [editUser, setEditUser] = useState(null);
//   const [formData, setFormData] = useState({
//     fullName: '',
//     username: '',
//     mobileNumber: '',
//     email: '',
//     lastLoginTime: '',
//     lastLogoutTime: ''
//   });

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/users');
//       setUsers(response.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   const handleEdit = (user) => {
//     setEditUser(user);
//     setFormData({
//       fullName: user.fullName,
//       username: user.username,
//       mobileNumber: user.mobileNumber,
//       email: user.email,
//       lastLoginTime: user.lastLoginTime,
//       lastLogoutTime: user.lastLogoutTime
//     });
//   };

//   const handleSave = async () => {
//     try {
//       await axios.put(`http://localhost:5000/api/users/${editUser.id}`, formData);
//       fetchUsers(); // Refresh the list after saving
//       setEditUser(null); // Close the edit form
//     } catch (error) {
//       console.error('Error updating user:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/users/${id}`);
//       fetchUsers(); // Refresh the list after deletion
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   return (
//     <div className="user-details">
//       <h3>User and Admin Details</h3>
//       <table>
//         <thead>
//           <tr>
//             <th>Full Name</th>
//             <th>Username</th>
//             <th>Mobile Number</th>
//             <th>Email</th>
//             <th>Last Login Time</th>
//             <th>Last Logout Time</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>{user.fullName}</td>
//               <td>{user.username}</td>
//               <td>{user.mobileNumber}</td>
//               <td>{user.email}</td>
//               <td>{user.lastLoginTime}</td>
//               <td>{user.lastLogoutTime}</td>
//               <td>
//                 <button onClick={() => handleEdit(user)}>Edit</button>
//                 <button onClick={() => handleDelete(user.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {editUser && (
//         <div className="edit-form">
//           <h3>Edit User</h3>
//           <form onSubmit={(e) => e.preventDefault()}>
//             <label>
//               Full Name:
//               <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
//             </label>
//             <label>
//               Username:
//               <input type="text" name="username" value={formData.username} onChange={handleChange} />
//             </label>
//             <label>
//               Mobile Number:
//               <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} />
//             </label>
//             <label>
//               Email:
//               <input type="email" name="email" value={formData.email} onChange={handleChange} />
//             </label>
//             <label>
//               Last Login Time:
//               <input type="text" name="lastLoginTime" value={formData.lastLoginTime} onChange={handleChange} />
//             </label>
//             <label>
//               Last Logout Time:
//               <input type="text" name="lastLogoutTime" value={formData.lastLogoutTime} onChange={handleChange} />
//             </label>
//             <button onClick={handleSave}>Save</button>
//             <button onClick={() => setEditUser(null)}>Cancel</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserDetails;


import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    mobileNumber: '',
    email: '',
    lastLoginTime: '',
    lastLogoutTime: ''
  });

  const navigate = useNavigate(); // Get navigate function from React Router

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setFormData({
      fullName: user.fullName,
      username: user.username,
      mobileNumber: user.mobileNumber,
      email: user.email,
      lastLoginTime: user.lastLoginTime,
      lastLogoutTime: user.lastLogoutTime
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/users/${editUser.id}`, formData);
      fetchUsers(); // Refresh the list after saving
      setEditUser(null); // Close the edit form
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchUsers(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogout = () => {
    // Clear any stored user data, e.g., token, user info
    localStorage.removeItem('userToken');
    // Redirect to signup page
    navigate('/SignupForm');
  };

  return (
    <div className="user-details">
      <h3>User and Admin Details</h3>
      <button onClick={handleLogout}>Logout</button>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Username</th>
            <th>Mobile Number</th>
            <th>Email</th>
            <th>Last Login Time</th>
            <th>Last Logout Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.fullName}</td>
              <td>{user.username}</td>
              <td>{user.mobileNumber}</td>
              <td>{user.email}</td>
              <td>{user.lastLoginTime}</td>
              <td>{user.lastLogoutTime}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editUser && (
        <div className="edit-form">
          <h3>Edit User</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>
              Full Name:
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
            </label>
            <label>
              Username:
              <input type="text" name="username" value={formData.username} onChange={handleChange} />
            </label>
            <label>
              Mobile Number:
              <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} />
            </label>
            <label>
              Email:
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </label>
            <label>
              Last Login Time:
              <input type="text" name="lastLoginTime" value={formData.lastLoginTime} onChange={handleChange} />
            </label>
            <label>
              Last Logout Time:
              <input type="text" name="lastLogoutTime" value={formData.lastLogoutTime} onChange={handleChange} />
            </label>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEditUser(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
