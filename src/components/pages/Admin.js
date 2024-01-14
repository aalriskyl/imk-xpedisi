import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Admin = () => {
  const [newItem, setNewItem] = useState({ no_resi: '', lokasi: '' });
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
  
      if (!token) {
        console.error('Authorization token not found');
        return;
      }
      await axios.post('https://ekspedisi.netlify.app/.netlify/functions/api/add', newItem, {
        headers: {
          Authorization: `${token}`,
        },
      }).then((res)=>{console.log(res);})
      .catch((err)=>{console.log(err)})

      setNewItem({ no_resi: '', lokasi: '' });
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin');
  };

  return (
    <div className="container mt-4">
      <h2>Add New Item</h2>
      <div className="row">
        <div className="col">
          <input
            type="text"
            placeholder="Nomor Resi"
            value={newItem.no_resi}
            onChange={(e) => setNewItem({ ...newItem, no_resi: e.target.value })}
            className="form-control"
          />
        </div>
        <div className="col">
          <input
            type="text"
            placeholder="Lokasi"
            value={newItem.lokasi}
            onChange={(e) => setNewItem({ ...newItem, lokasi: e.target.value })}
            className="form-control"
          />
        </div>
        <div className="col-auto">
          <button className="btn btn-primary" onClick={handleSave}>
            Add
          </button>
        </div>
      </div>
      <Link to="/" className="btn btn-danger mt-3" onClick={handleLogout}>
        Logout
      </Link>
    </div>
  );
};

export default Admin;
