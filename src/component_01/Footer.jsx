import React, { useRef, useState } from "react";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import logo from "/logo/karlo.png";

// Magnetic Button Component
const MagneticLink = ({ children, href, className }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - left - width / 2) * 0.3;
    const y = (clientY - top - height / 2) * 0.3;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: position.x === 0 ? "transform 0.5s ease-out" : "none",
      }}
    >
      {children}
    </a>
  );
};

const Footer = () => {
  const socialLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com",
      icon: (
        <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: (
        <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      )
    },
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: (
        <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      name: "YouTube",
      href: "https://youtube.com",
      icon: (
        <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: (
        <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
  ];

  return (
    <footer className="bg-black text-white overflow-hidden">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Brand & CTA */}
          <div className="space-y-8">
            <div className="space-y-4">
              <img
                src={logo}
                alt="KARLO"
                className="h-10 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
              />
              <p className="text-gray-400 text-lg max-w-md opacity-0 animate-[fadeInUp_0.6s_ease-out_0.1s_forwards]">
                Government licensed dealer for officially auctioned vehicles.
              </p>
            </div>

            {/* Contact */}
            <div className="flex flex-wrap gap-6 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.2s_forwards]">
              <a
                href="tel:+919993653299"
                className="flex items-center gap-3 text-gray-400 hover:text-orange-400 transition-colors group"
              >
                <div className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center group-hover:border-gray-500 group-hover:bg-gray-900 group-hover:text-white transition-all">
                  <Phone className="size-4" />
                </div>
                <span>+91 9993653299</span>
              </a>
              <a
                href="mailto:karlo.live2694@gmail.com"
                className="flex items-center gap-3 text-gray-400 hover:text-orange-400 transition-colors group"
              >
                <div className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center group-hover:border-gray-500 group-hover:bg-gray-900 group-hover:text-white transition-all">
                  <Mail className="size-4" />
                </div>
                <span>karlo.live2694@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Right - Magnetic Social Links */}
          <div className="flex flex-col items-start lg:items-end gap-8">
            <p className="text-sm text-gray-500 uppercase tracking-widest opacity-0 animate-[fadeInUp_0.6s_ease-out_0.3s_forwards]">
              Follow Us
            </p>
            <div className="flex gap-4 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.4s_forwards]">
              {socialLinks.map((social, idx) => (
                <MagneticLink
                  key={social.name}
                  href={social.href}
                  className="w-14 h-14 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-900 hover:border-gray-600 transition-all duration-300 cursor-pointer"
                  style={{ animationDelay: `${0.4 + idx * 0.05}s` }}
                >
                  {social.icon}
                </MagneticLink>
              ))}
            </div>

            {/* Location Badge */}
            <div className="flex items-center gap-2 text-gray-500 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.5s_forwards]">
              <MapPin className="size-4" />
              <span className="text-sm">MP • GJ • CG • MH</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} KARLO • Govt. Licensed Dealer
            </p>
            <div className="flex items-center gap-8">
              {["Privacy", "Terms", "Cookies"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-gray-500 hover:text-orange-400 text-sm transition-colors relative group"
                >
                  {link}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-orange-500 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
