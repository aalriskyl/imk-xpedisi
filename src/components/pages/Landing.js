import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/landing.css';

const Landing = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`https://ekspedisi.netlify.app/.netlify/functions/api/?resi=${trackingNumber}`);
      setTrackingData(response.data);
      setSuccessMessage('Lacak Resi Berhasil');
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching tracking information:', error);
      setErrorMessage('Error retrieving tracking information.');
      setSuccessMessage('');
    }
  };

  return (
    <>
      <nav className="navbar navbar-light bg-light static-top">
        <div className="container">
          <a className="navbar-brand" href="#!">
            XPedisi
          </a>
          <a className="btn btn-primary" href="/login">
            Admin Sign-in
          </a>
        </div>
      </nav>
      <div className="masthead">
        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-xl-6">
              <div className="text-center text-white">
                <h1 className="mb-5">Silahkan masukan nomor resi anda</h1>
                <form className="form-subscribe" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col">
                      <input
                        className="form-control form-control-lg"
                        id="nomor-resi"
                        type="text"
                        placeholder="Nomor Resi"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                      />
                    </div>
                    <div className="col-auto">
                      <button className="btn btn-primary btn-lg" type="submit">
                        Lacak
                      </button>
                    </div>
                  </div>

                  {successMessage && (
                    <div className="text-center mb-3 text-success">{successMessage}</div>
                  )}

                  {errorMessage && (
                    <div className="text-center text-danger mb-3">{errorMessage}</div>
                  )}
                </form>
                {trackingData && trackingData.data && (
  <div className="mt-4">
    <h2>Lacak Resi</h2>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID Petugas</th>
          <th>Nomor Resi</th>
          <th>Lokasi</th>
        </tr>
      </thead>
      <tbody>
        {trackingData.data.map((item) => (
          <tr key={item.id}>
            <td>{item.id_petugas}</td>
            <td>{item.no_resi}</td>
            <td>{item.lokasi}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
