import React from 'react';

const footerLinks = [
  {
    title: 'Shop',
    links: [
      { name: 'Home', href: '/' },
      { name: 'Products', href: '/Products' },
      { name: 'Cart', href: '/Cart' },
      { name: 'Login', href: '/Login' }
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Blog', href: '/blog' }
    ]
  },
  {
    title: 'Support',
    links: [
      { name: 'Contact', href: 'mailto:support@mockstore.com' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' }
    ]
  }
];

const Footer = () => (
  <footer style={{
    background: 'linear-gradient(90deg, #e3e8ff 60%, #f5f5f5 100%)',
    color: '#333',
    padding: '40px 0 18px 0',
    marginTop: '48px',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '1.05rem',
    borderTop: '1px solid #e0e0e0'
  }}>
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '64px',
      flexWrap: 'wrap',
      marginBottom: '24px'
    }}>
      {footerLinks.map((section) => (
        <div key={section.title}>
          <h4 style={{ marginBottom: '12px', color: '#007bff', fontWeight: 'bold' }}>{section.title}</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {section.links.map(link => (
              <li key={link.name} style={{ marginBottom: '8px' }}>
                <a href={link.href} style={{
                  color: '#333',
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                  onMouseOver={e => e.target.style.color = '#007bff'}
                  onMouseOut={e => e.target.style.color = '#333'}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div style={{ textAlign: 'center', fontSize: '0.95rem', color: '#666' }}>
      &copy; {new Date().getFullYear()} Mock Store. All rights reserved.
    </div>
  </footer>
);

export default Footer;