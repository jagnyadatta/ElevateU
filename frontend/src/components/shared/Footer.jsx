import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white py-10 px-5 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">

        <div>
          <h2 className="text-xl font-bold mb-4">ElevateU</h2>
          <p className="text-sm">Your Journey, Our Guidance.</p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:brightness-125 transition">About Us</a></li>
            <li><a href="#" className="hover:brightness-125 transition">Our Team</a></li>
            <li><a href="#" className="hover:brightness-125 transition">Careers</a></li>
            <li><a href="#" className="hover:brightness-125 transition">Testimonials</a></li>
            <li><a href="#" className="hover:brightness-125 transition">Blog</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Services</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:brightness-125 transition">Career Counseling</a></li>
            <li><a href="#" className="hover:brightness-125 transition">Admission Guidance</a></li>
            <li><a href="#" className="hover:brightness-125 transition">Resume & Interview Prep</a></li>
            <li><a href="#" className="hover:brightness-125 transition">Study Abroad Consulting</a></li>
            <li><a href="#" className="hover:brightness-125 transition">Student Mentorship</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:brightness-125 transition">FAQs</a></li>
            <li><a href="#" className="hover:brightness-125 transition">Success Stories</a></li>
            <li><a href="#" className="hover:brightness-125 transition">Free Counseling Session</a></li>
            <li><a href="#" className="hover:brightness-125 transition">Download Brochure</a></li>
            <li><a href="#" className="hover:brightness-125 transition">Blog Articles</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Legal & Contact</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:brightness-125 transition">Terms & Conditions</a></li>
            <li><a href="#" className="hover:brightness-125 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:brightness-125 transition">Refund Policy</a></li>
            <li><a href="#" className="hover:brightness-125 transition">Disclaimer</a></li>
            <li><a href="#" className="hover:brightness-125 transition">Contact Us</a></li>
          </ul>
        </div>

      </div>

      <div className="mt-8 border-t border-white pt-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} ElevateU. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;