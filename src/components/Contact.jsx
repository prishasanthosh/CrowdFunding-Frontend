import React, { useState } from "react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa"; //React Icons

const Contact = () => {
    const [showMessage, setShowMessage] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 3000);
    };

    return (
        <div id="contact">
        <div className="form-container">
            <h1>Contact Us</h1>
            <div className="form-content">
                <form onSubmit={handleSubmit}>
                    <div className="form-groups">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" placeholder="Your Name" />
                    </div>
                    <div className="form-groups">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Your Email" />
                    </div>
                    <div className="form-groups">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone" placeholder="Your Phone Number" />
                    </div>
                    <div className="form-groups">
                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" placeholder="Your Message" />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>

            {showMessage && (
                <div className="message-popup">
                    <p>Message Sent Successfully!</p>
                </div>
            )}

            <div className="social-links">
                <p>Contact us on:</p>
                <div className="social-icons">
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram size={30} />
                    </a>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebookF size={30} />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                        <FaTwitter size={30} />
                    </a>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Contact;
