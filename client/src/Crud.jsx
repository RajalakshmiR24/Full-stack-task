import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Crud = () => {
  const navigate = useNavigate();
  const apiUrl = 'http://localhost:4600'; // Update this to your actual API URL
  const initialData = { username: '', email: '', password: '', confirmPassword: '' };
  const [formData, setFormData] = useState(initialData);
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    // Fetch all users
    axios.get(`${apiUrl}/users`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (id) {
      // Fetch user by ID for editing
      setIsLoading(true);
      axios.get(`${apiUrl}/users/${id}`)
        .then(response => {
          setFormData(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.log(error);
          setIsLoading(false);
        });
    } else {
      setFormData(initialData);
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (id) {
      // Update existing user
      axios.put(`${apiUrl}/users/${id}`, formData)
        .then(response => {
          setUsers(users.map(user => (user._id === id ? response.data : user)));
          alert("User updated successfully");
          navigate('/');
        })
        .catch(error => console.log(error));
    } else {
      // Create new user
      axios.post(`${apiUrl}/users`, formData)
        .then(response => {
          setUsers([...users, response.data]);
          alert("User registered successfully");
          navigate('/');
        })
        .catch(error => console.log(error));
    }
    
    setFormData(initialData);
  };

  const handleEditClick = (userId) => {
    navigate(`/edit/${userId}`);
  };

  const handleDeleteClick = (userId) => {
    axios.delete(`${apiUrl}/users/${userId}`)
      .then(() => {
        setUsers(users.filter(user => user._id !== userId));
        alert("User deleted successfully");
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to delete user");
      });
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="flex">
      <div className="w-1/2 p-6">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl mb-4">User Registration</h2>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Username"
            className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Password"
            className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm Password"
            className="mb-6 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {id ? 'Update' : 'Register'}
          </button>
        </form>
      </div>
      <div className="w-1/2 p-6">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl mb-4">User List</h2>
          <input
            type="text"
            placeholder="Search by username or email"
            value={searchInput}
            onChange={handleSearchInputChange}
            className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            filteredUsers.map((user) => (
              <div key={user._id} className="mb-4">
                <p className="mb-2"><strong>ID:</strong> {user._id}</p>
                <p className="mb-2"><strong>Username:</strong> {user.username}</p>
                <p className="mb-4"><strong>Email:</strong> {user.email}</p>
                <div>
                  <button
                    onClick={() => handleEditClick(user._id)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l focus:outline-none focus:shadow-outline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(user._id)}
                    className="bg-red-300 hover:bg-red-400 text-gray-800 font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Crud;
