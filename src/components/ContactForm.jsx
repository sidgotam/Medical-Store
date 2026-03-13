import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const form = useRef();
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('loading');
    
    emailjs.sendForm(
      'service_bpkw49l', 
      'template_kcvixpp', 
      form.current, 
      {
        publicKey: 'jRPvn2TmKAP5a-HS-',
      }
    )
    .then((result) => {
      console.log(result.text);
      setStatus('success');
      setMessage('Your message has been sent successfully. We will get back to you soon!');
      form.current.reset();
    }, (error) => {
      console.error('EmailJS Error:', error);
      setStatus('error');
      setMessage(`Failed: ${error.text || error.message || "Invalid API Keys or Network Issue"}. Please verify your Service/Template IDs.`);
    });
  };

  return (
    <div className="contact-form-container">
      <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', color: 'var(--color-primary-dark)' }}>Send Us A Message</h3>
      
      {status === 'success' && (
        <div className="alert-success">
          {message}
        </div>
      )}
      
      {status === 'error' && (
        <div className="alert-error">
          {message}
        </div>
      )}

      <form ref={form} onSubmit={sendEmail} className="contact-form">
        <div className="form-group">
          <input 
            type="text" 
            name="user_name" 
            className="form-control" 
            placeholder="Your Full Name" 
            required 
          />
        </div>
        
        <div className="form-group">
          <input 
            type="tel" 
            name="user_phone" 
            className="form-control" 
            placeholder="Your Phone Number" 
            required 
          />
        </div>
        
        <div className="form-group">
          <input 
            type="email" 
            name="user_email" 
            className="form-control" 
            placeholder="Your Email Address" 
            required 
          />
        </div>
        
        <div className="form-group">
          <textarea 
            name="message" 
            className="form-control" 
            placeholder="Describe your health condition or query..." 
            rows="4" 
            required
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={status === 'loading'}
          style={{ width: '100%', padding: '0.75rem', fontSize: '1.1rem' }}
        >
          {status === 'loading' ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
