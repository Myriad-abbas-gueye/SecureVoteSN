import React from 'react';
import './OTPPopup.css'; 

const OTPPopup = ({ onClose, otp, setOtp, onSubmit }) => {
    const handleOtpSubmit = (e) => {
        e.preventDefault();
        onSubmit(); // This will trigger the verifyOtp function passed as onSubmit
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <h2>Enter OTP</h2>
                <form onSubmit={handleOtpSubmit}>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                    <div className="popup-buttons">
                        <button type="submit">Submit</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OTPPopup;