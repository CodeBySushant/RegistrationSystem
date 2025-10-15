import React from 'react';
import './Login.css';

const Login = () => {
    return (
        <div className="login-container">
            <div className="login-box">
                {/* Header Section */}
                <div className="header">
                    <img src="/Assets/govlogo.png" alt="Logo" className="logo" />
                    <div className="title-text">
                        <h2 className="title">नागार्जुन नगरपालिका</h2>
                        <p className="subtitle">नगर कार्यपालिकाको कार्यालय, काठमाडौं</p>
                    </div>
                </div>

                {/* Form */}
                <form>
                    <input
                        type="text"
                        placeholder="प्रयोगकर्ताको नाम प्रविष्ट गर्नुहोस्"
                    />
                    <input
                        type="password"
                        placeholder="पासवर्ड प्रविष्ट गर्नुहोस्"
                    />
                    <button type="submit">
                        Sign in <span>&#10148;</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
