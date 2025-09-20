import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const socialIcons = {
  Facebook: <FaFacebookF size={18} />,
  Twitter: <FaTwitter size={18} />,
  Instagram: <FaInstagram size={18} />,
  LinkedIn: <FaLinkedinIn size={18} />,
  YouTube: <FaYoutube size={18} />,
};

const footerLinks = [
  {
    title: "Shop",
    links: [
      { name: "Home", href: "/" },
      { name: "Products", href: "/products" },
      { name: "Cart", href: "/cart" },
      { name: "Login", href: "/login" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Contact", href: "mailto:support@mockstore.com" },
      { name: "FAQ", href: "/faq" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  },
  {
    title: "Social",
    links: [
      { name: "Facebook", href: "#", icon: socialIcons.Facebook },
      { name: "Twitter", href: "#", icon: socialIcons.Twitter },
      { name: "Instagram", href: "#", icon: socialIcons.Instagram },
      { name: "LinkedIn", href: "#", icon: socialIcons.LinkedIn },
      { name: "YouTube", href: "#", icon: socialIcons.YouTube },
    ],
    isSocial: true,
  },
];

const Footer = () => {
  return (
    <>
      <style>
        {`
          .footer-container {
            width: 100%;
            padding-top: 1rem;
            background-color: #111827;
            color: #9ca3af;
            font-family: sans-serif;
            border-top: 1px solid #374151;
          }

          .content-wrapper {
            max-width: 1280px;
            margin: auto;
            padding: 2rem 1rem;
          }

          .grid-layout {
            display: grid;
            grid-template-columns: repeat(1, minmax(0, 1fr));
            gap: 2rem;
          }

          @media (min-width: 640px) {
            .grid-layout {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }

          @media (min-width: 768px) {
            .grid-layout {
              grid-template-columns: repeat(4, minmax(0, 1fr));
              gap: 4rem;
            }
          }
          
          .section {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .section-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: #fff;
            margin-bottom: 0.5rem;
          }

          .link-list {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .link-item a {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 1rem;
            color: #9ca3af;
            text-decoration: none;
            transition: color 0.3s ease-in-out;
          }

          .link-item a:hover {
            color: #fff;
          }

          /* 🔥 Icon hover color */
          .link-item a svg {
            transition: transform 0.3s, color 0.3s;
          }

          .link-item a:hover svg {
            color: #3b82f6; /* blue on hover */
            transform: scale(1.2);
          }

          .copyright-section {
            margin-top: 2rem;
            padding-top: 1.5rem;
            text-align: center;
            border-top: 1px solid #374151;
          }

          .copyright-text {
            color: #6b7280;
            font-size: 0.875rem;
          }
        `}
      </style>
      <footer className="footer-container">
        <div className="content-wrapper">
          <div className="grid-layout">
            {footerLinks.map((section) => (
              <div key={section.title} className="section">
                <h4 className="section-title">{section.title}</h4>
                <ul className="link-list">
                  {section.links.map((link) => (
                    <li key={link.name} className="link-item">
                      <a href={link.href} target="_blank" rel="noreferrer">
                        {section.isSocial && link.icon}
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="copyright-section">
            <p className="copyright-text">
              © {new Date().getFullYear()} Mock Store. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
