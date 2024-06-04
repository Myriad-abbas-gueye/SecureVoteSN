import React, { useState } from 'react';
import './Connexion.css'; 
import { useNavigate , Link} from 'react-router-dom';
import OTPPopup from '../../OTPPopup/OTPPopup'; // Import your OTP Popup component


const Connexion = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showOtpPopup, setShowOtpPopup] = useState(false);
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        const authResponse = await fetch('http://localhost:5000/authenticate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (authResponse.ok) {
            const otpResponse = await fetch('http://localhost:5000/send_verification', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: "+221705983196" })
            });
            if (otpResponse.ok) {
                setShowOtpPopup(true);
            } else {
                console.error('OTP sending failed');
            }
        } else {
            console.error('Authentication failed');
        }
};

const verifyOtp = async () => {
    const verifyResponse = await fetch('http://localhost:5000/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: "+221705983196", code: otp })
    });
    if (verifyResponse.ok) {
        navigate('/admin');
    } else {
        console.error('OTP verification failed');
    }
};

  return (
    <div className="connexion-container">
      <h2>Authentification Administrateur</h2>
      <form onSubmit={handleLogin} className="connexion-form">
        <div className="form-group">
          <label htmlFor="username">Login :</label>
          <input type="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password :</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {/* <Link to={'/admin'}>        <button type="submit" className="btn-submit">S'authentifier</button>

        </Link> */}
        <button type="submit" className="btn-submit">S'authentifier</button>
        <Link to="/">Retour</Link>
      </form>
      {showOtpPopup && (
                <OTPPopup onClose={() => setShowOtpPopup(false)} otp={otp} setOtp={setOtp} onSubmit={verifyOtp} />
            )}
    </div>
  );
}

export default Connexion;
