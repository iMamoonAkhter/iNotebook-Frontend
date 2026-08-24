import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Hero from "./Hero";
import { useNavigate } from "react-router-dom";

const About = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('auth-token')) {
      navigate('/login');
    }
  }, [navigate]);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I create a note?",
      answer: "To create a note, log in to your account, navigate to the Add Note section, and enter the required details including title, description, and tag."
    },
    {
      question: "How can I edit or delete a note?",
      answer: "You can edit or delete a note by clicking on the respective buttons next to each note in your dashboard. The edit button opens a modal where you can modify the note details."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, iNotebook uses secure encryption methods to ensure your data is safe. All communications are encrypted and we follow industry best practices for data protection."
    },
    {
      question: "Can I access iNotebook on my mobile device?",
      answer: "Yes, iNotebook is fully responsive and can be accessed on any device, including smartphones and tablets. The interface adapts to your screen size."
    },
    {
      question: "How do I change my password?",
      answer: "You can change your password by going to your Profile page and clicking the 'Change Password' button. You'll need to enter your current password and the new password twice for confirmation."
    },
    {
      question: "Can I upload a profile picture?",
      answer: "Yes! On your Profile page, you can click on the profile picture area to upload a new image. The image will be used as your avatar across the application."
    }
  ];

  return (
    <div className="min-h-screen bg-surface-50">
      <Hero />
      
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-surface-900 mb-4">About iNotebook</h1>
            <p className="text-lg text-surface-600 max-w-2xl mx-auto leading-relaxed">
              iNotebook is a digital note-taking platform that simplifies organizing your notes, thoughts, and ideas. 
              With a user-friendly interface and powerful features, iNotebook is your go-to tool for staying organized.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="card-padded animate-slide-up">
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-surface-900 mb-2">Secure & Private</h3>
              <p className="text-surface-600">End-to-end encryption ensures your notes remain private. Only you can access your data.</p>
            </div>

            <div className="card-padded animate-slide-up" style={{ animationDelay: '100ms' }}>
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-surface-900 mb-2">Rich Organization</h3>
              <p className="text-surface-600">Add titles, descriptions, and tags to your notes. Filter and find what you need instantly.</p>
            </div>

            <div className="card-padded animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-surface-900 mb-2">Easy Editing</h3>
              <p className="text-surface-600">Modify your notes anytime with our intuitive editor. Changes save automatically.</p>
            </div>

            <div className="card-padded animate-slide-up" style={{ animationDelay: '300ms' }}>
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-surface-900 mb-2">Cross-Platform</h3>
              <p className="text-surface-600">Access your notes from anywhere. Works seamlessly on desktop, tablet, and mobile devices.</p>
            </div>
          </div>

          {/* Why Choose iNotebook */}
          <div className="card-padded mb-16 animate-fade-in">
            <h3 className="text-2xl font-bold text-surface-900 mb-6 text-center">Why Choose iNotebook?</h3>
            <div className="prose prose-surface max-w-none">
              <p className="text-surface-600 leading-relaxed mb-4">
                iNotebook offers a streamlined experience for users who want to focus on their content without distractions. 
                Whether you are jotting down ideas, organizing tasks, or keeping track of important information, 
                iNotebook provides an efficient, clutter-free environment to help you stay productive.
              </p>
              <p className="text-surface-600 leading-relaxed mb-4">
                Our application is built with modern technologies to ensure fast performance and reliability. 
                We believe that note-taking should be simple, secure, and accessible to everyone.
              </p>
              <p className="text-surface-600 leading-relaxed">
                Join thousands of users who trust iNotebook for their daily note-taking needs.
              </p>
            </div>
          </div>

          {/* FAQs Section */}
          <div className="card-padded animate-fade-in">
            <h3 className="text-2xl font-bold text-surface-900 mb-8 text-center">Frequently Asked Questions</h3>
            
            <div className="space-y-3" role="list">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-surface-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset"
                    aria-expanded={openFAQ === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="font-medium text-surface-900 pr-4">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 text-surface-400 flex-shrink-0 transition-transform duration-200 ${openFAQ === index ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <div
                    id={`faq-answer-${index}`}
                    className={`${openFAQ === index ? 'block' : 'hidden'} animate-slide-down`}
                    role="region"
                    aria-label={faq.question}
                  >
                    <div className="px-5 pb-5 border-t border-surface-200">
                      <p className="text-surface-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12 animate-fade-in">
            <Link to="/signup" className="btn-primary btn-lg">
              Start organizing your notes with iNotebook today!
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;