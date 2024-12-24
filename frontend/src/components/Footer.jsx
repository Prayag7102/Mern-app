import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='mt-3 px-5 py-3'>
        <footer className="bg-gradient-to-r from-gray-900 via-gray-700 via-gray-500 via-gray-300 to-gray-900 rounded-[40px] text-white py-8 animate-bg-move">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center">
                        <h2 className="text-2xl font-bold mb-4">About Us</h2>
                        <p className="text-center">We are a leading e-commerce platform providing a wide range of products to cater to all your needs. Our mission is to deliver quality products at the best prices.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
                        <ul className="text-center">
                            <li className="mb-2"><Link to="/" className="hover:underline">Home</Link></li>
                            <li className="mb-2"><Link to="/contact" className="hover:underline">Contact Us</Link></li>
                            <li className="mb-2"><Link to="/profile/cart" className="hover:underline">Cart</Link></li>
                            <li className="mb-2"><Link to="/login" className="hover:underline">Login</Link></li>
                            <li className="mb-2"><Link to="/register" className="hover:underline">Register</Link></li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-center">
                        <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
                        <div className="flex space-x-4">
                            <a target='_blank' href="https://facebook.com" className="hover:text-gray-300">
                                <svg className="w-8 h-8 rounded-md" fill="#3b5998" viewBox="0 0 24 24">
                                    <path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.325v21.351c0 .733.592 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.312h3.587l-.467 3.622h-3.12v9.294h6.116c.733 0 1.325-.591 1.325-1.324v-21.35c0-.733-.592-1.325-1.325-1.325z"/>
                                </svg>
                            </a>
                            <a target='_blank' href="https://twitter.com" className="hover:text-gray-300">
                                <svg className="w-8 h-8 rounded-md" fill="#1DA1F2" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.723-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.719 0-4.924 2.205-4.924 4.924 0 .386.043.762.127 1.124-4.092-.205-7.719-2.165-10.148-5.144-.424.729-.666 1.574-.666 2.476 0 1.708.869 3.215 2.188 4.099-.807-.026-1.566-.247-2.228-.616v.062c0 2.385 1.697 4.374 3.946 4.827-.413.112-.849.171-1.296.171-.317 0-.626-.031-.928-.088.627 1.956 2.444 3.379 4.6 3.419-1.68 1.318-3.809 2.105-6.115 2.105-.398 0-.79-.023-1.175-.069 2.179 1.396 4.768 2.209 7.548 2.209 9.057 0 14.01-7.506 14.01-14.01 0-.213-.005-.426-.014-.637.961-.694 1.797-1.562 2.457-2.549z"/>
                                </svg>
                            </a>
                            <a target='_blank' href="https://instagram.com" className="hover:text-gray-300">
                                <svg className="w-8 h-8 rounded-md" fill="#E1306C" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.248 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.248-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.248-2.242-1.31-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.248 3.608-1.31 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.281.058-2.563.334-3.637 1.408-1.074 1.074-1.35 2.356-1.408 3.637-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.058 1.281.334 2.563 1.408 3.637 1.074 1.074 2.356 1.35 3.637 1.408 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.281-.058 2.563-.334 3.637-1.408 1.074-1.074 1.35-2.356 1.408-3.637.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.058-1.281-.334-2.563-1.408-3.637-1.074-1.074-2.356-1.35-3.637-1.408-1.28-.058-1.688-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.324c-2.293 0-4.162-1.869-4.162-4.162s1.869-4.162 4.162-4.162 4.162 1.869 4.162 4.162-1.869 4.162-4.162 4.162zm6.406-11.845c-.796 0-1.441.645-1.441 1.441s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.441-1.441-1.441z"/>
                                </svg>
                            </a>
                            <a target='_blank' href="https://linkedin.com" className="hover:text-gray-300">
                                <svg className="w-8 h-8 rounded-md" fill="#0077B5" viewBox="0 0 24 24">
                                    <path d="M22.23 0h-20.46c-.977 0-1.77.793-1.77 1.77v20.46c0 .977.793 1.77 1.77 1.77h20.46c.977 0 1.77-.793 1.77-1.77v-20.46c0-.977-.793-1.77-1.77-1.77zm-13.538 20.452h-3.077v-10.769h3.077v10.769zm-1.538-12.308c-.987 0-1.79-.803-1.79-1.79s.803-1.79 1.79-1.79 1.79.803 1.79 1.79-.803 1.79-1.79 1.79zm13.538 12.308h-3.077v-5.385c0-1.282-.026-2.933-1.788-2.933-1.79 0-2.063 1.397-2.063 2.837v5.481h-3.077v-10.769h2.949v1.474h.042c.41-.776 1.41-1.59 2.902-1.59 3.1 0 3.672 2.041 3.672 4.694v6.191z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <p>&copy; 2024 prayag agravat. All rights reserved.</p>
                </div>
            </div>
        </footer>
        <style jsx>{`
            @keyframes bgMove {
                0% { background-position: 0% 50%; }
                25% { background-position: 50% 50%; }
                50% { background-position: 100% 50%; }
                75% { background-position: 50% 50%; }
                100% { background-position: 0% 50%; }
            }
            .animate-bg-move {
                background-size: 200% 200%;
                animation: bgMove 20s ease infinite;
            }
        `}</style>
        </div>
    )
}

export default Footer