import React from "react";

const Footer = () => {
    return (
        <footer className="bg-[#0F172A] text-gray-300 py-6 border-t border-gray-700 mt-auto w-full">
            <div className="container mx-auto px-4 flex flex-col items-center text-sm">
                <div className="text-center mb-4">
                    <p className="font-semibold text-white">© {new Date().getFullYear()} Uni-තක්සලාව</p>
                    <p className="text-gray-400">Developed by Lumos Solutions</p>
                </div>

                <div className="flex space-x-4">
                    <a href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors duration-200">
                        Privacy Policy
                    </a>
                    <span className="text-gray-500">|</span>
                    <a href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
                        Terms of Service
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
