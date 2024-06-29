import React, { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Data submitted successfully!');
        console.log(formData);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
            <form 
                className="w-full max-w-lg p-8 bg-[#282828] rounded-lg shadow-lg"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl mb-6">Contact Us !</h2>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="name">
                        Your Name (required)
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-[#1F1F1F] text-gray-500  rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="email">
                        Your Email (required)
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-[#1F1F1F] text-gray-500 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="subject">
                        Subject
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-[#1F1F1F] text-gray-500 rounded"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-bold mb-2" htmlFor="message">
                        Your Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-[#1F1F1F] text-gray-500rounded h-32"
                    ></textarea>
                </div>
               
                <div>
                    <button 
                        type="submit"
                        className="w-full bg-[#1F1F1F] text-gray-500 hover:bg-[#232020]  font-bold py-2 px-4 rounded"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
