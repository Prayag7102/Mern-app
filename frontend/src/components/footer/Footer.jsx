import React from 'react';
import AboutSection from './AboutSection';
import QuickLinks from './QuickLinks';
import SocialLinks from './SocialLinks';
import FooterBottom from './FooterBottom';

const Footer = () => {
    return (
        <div className=''>
            <footer className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900  text-white py-8 animate-bg-move">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <AboutSection />
                        <QuickLinks />
                        <SocialLinks />
                    </div>
                    <FooterBottom />
                </div>
            </footer>
        </div>
    );
};

export default Footer;