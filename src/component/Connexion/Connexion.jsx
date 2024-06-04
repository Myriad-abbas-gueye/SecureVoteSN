import React, { useState } from 'react';
import './Connexion.css'; 
import { useNavigate , Link} from 'react-router-dom';
import OTPPopup from '../OTPPopup/OTPPopup'; // Ensure this component is correctly imported

const Connexion = () => {
    const [cni, setCni] = useState('');
    const [numero, setNumero] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpPopup, setShowOtpPopup] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const authResponse = await fetch('http://localhost:5000/authenticate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cni, numero })
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
            navigate('/accueil');
        } else {
            console.error('OTP verification failed');
        }
    };

    return (
        <div className="connexion-container">
            <h2>Authentification</h2>
            <form onSubmit={handleLogin} className="connexion-form">
              <div className="form-group">
                <label htmlFor="cni">CNI :</label>
                <input type="text" id="cni" value={cni} onChange={(e) => setCni(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="numero">Numero electeur:</label>
                <input type="text" id="numero" value={numero} onChange={(e) => setNumero(e.target.value)} required />
              </div>
              <button type="submit" className="btn-submit">S'authentifier</button>
              <div className="admin-login-link">
                <p>Connectez-vous en tant qu'administrateur :</p>
                <Link to="/admin/connexion">Connexion administrateur</Link>
              </div>
            </form>
            {showOtpPopup && (
                <OTPPopup onClose={() => setShowOtpPopup(false)} otp={otp} setOtp={setOtp} onSubmit={verifyOtp} />
            )}
        </div>
    );
};

export default Connexion;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import OTPPopup from '../OTPPopup/OTPPopup'; // Make sure this component is correctly imported

// const Connexion = () => {
//     const [cni, setCni] = useState('');
//     const [numero, setNumero] = useState('');
//     const [otp, setOtp] = useState('');
//     const [showOtpPopup, setShowOtpPopup] = useState(false);

//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         // Assuming /authenticate checks CNI and Numero and returns success if correct
//         const authResponse = await fetch('http://localhost:5000/authenticate', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ cni, numero })
//         });

//         const authData = await authResponse.json();
//         if (authResponse.ok) {
//             // Trigger OTP sending after successful authentication
//             const otpResponse = await fetch('http://localhost:5000/send_verification', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ phone: "+221781310278" }) // Dynamically assign the phone number
//             });
//             const otpData = await otpResponse.json();
//             if (otpResponse.ok) {
//                 setShowOtpPopup(true); // Show OTP input popup if OTP was sent successfully
//             } else {
//                 console.error('OTP sending failed:', otpData.error);
//             }
//         } else {
//             console.error('Authentication failed:', authData.message);
//         }
//     };

//     const verifyOtp = async () => {
//         // Verify the entered OTP
//         const verifyResponse = await fetch('http://localhost:5000/verify', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ phone: "+221781310278", code: otp })
//         });
//         const verifyData = await verifyResponse.json();
//         if (verifyResponse.ok) {
//             navigate('/accueil'); // Navigate to the home page upon successful OTP verification
//         } else {
//             console.error('OTP verification failed:', verifyData.message);
//         }
//     };

//     return (
//         <div className="connexion-container">
//             <h2>Authentification</h2>
//             <form onSubmit={handleLogin} className="connexion-form">
//                 <input type="text" id="cni" value={cni} onChange={(e) => setCni(e.target.value)} placeholder="CNI" required />
//                 <input type="text" id="numero" value={numero} onChange={(e) => setNumero(e.target.value)} placeholder="Numero electeur" required />
//                 <button type="submit">S'authentifier</button>
//             </form>
//             {showOtpPopup && (
//                 <OTPPopup onClose={() => setShowOtpPopup(false)}>
//                     <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" />
//                     <button onClick={verifyOtp}>Verify OTP</button>
//                 </OTPPopup>
//             )}
//         </div>
//     );
// };

// export default Connexion;
