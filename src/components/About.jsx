import React, { useEffect, useState } from "react";
import Banner from "./banner";
import { useNavigate } from "react-router-dom";

const About = () => {
  // State to manage which FAQ is currently open
  const [openFAQ, setOpenFAQ] = useState(null);
  const navigate = useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem === 'auth-token'){
      navigate('/login');
    }
  },[navigate])
  // Toggle function to open/close a specific FAQ
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="about-page">
      {/* Banner Section */}
      <Banner />

      <div className="container mt-5">
        <h2 className="text-center">About iNotebook</h2>
        <p className="text-center text-muted">
          iNotebook is a digital note-taking platform that simplifies organizing
          your notes, thoughts, and ideas. With a user-friendly interface and
          powerful features, iNotebook is your go-to tool for staying organized.
        </p>

        <div className="row mt-5">
          <div className="col-md-6">
            <h3 className="mb-3">
              <i className="bi bi-journal-text"></i> Key Features
            </h3>
            <ul className="list-unstyled">
              <li>
                <i className="bi bi-shield-lock-fill"></i> Secure Login/Signup
              </li>
              <li>
                <i className="bi bi-file-earmark-plus"></i> Add Notes with
                Titles and Tags
              </li>
              <li>
                <i className="bi bi-pencil-square"></i> Edit and Update Notes
              </li>
              <li>
                <i className="bi bi-trash-fill"></i> Delete Notes Easily
              </li>
              <li>
                <i className="bi bi-phone-fill"></i> Responsive Design
              </li>
            </ul>
          </div>

          <div className="col-md-6">
            <h3 className="mb-3">
              <i className="bi bi-lightbulb-fill"></i> Why Choose iNotebook?
            </h3>
            <p>
              iNotebook offers a streamlined experience for users who want to
              focus on their content without distractions. Whether you are
              jotting down ideas, organizing tasks, or keeping track of
              important information, iNotebook provides an efficient,
              clutter-free environment to help you stay productive.
            </p>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mt-5">
          <h3 className="text-center">Frequently Asked Questions (FAQs)</h3>
          <div className="accordion mt-3">
            {/* FAQ 1 */}
            <div className="card">
              <div className="card-header" id="headingOne">
                <h5 className="mb-0">
                  <button
                    className="btn btn-link"
                    type="button"
                    onClick={() => toggleFAQ(0)}
                  >
                    <i className="bi bi-question-circle-fill"></i> How do I
                    create a note?
                    <i
                      className={`bi ${
                        openFAQ === 0 ? "bi-chevron-up" : "bi-chevron-down"
                      } ml-2`}
                    ></i>
                  </button>
                </h5>
              </div>
              <div
                id="collapseOne"
                className={`collapse ${openFAQ === 0 ? "show" : ""}`}
              >
                <div className="card-body">
                  To create a note, log in to your account, navigate to the Add
                  Note section, and enter the required details.
                </div>
              </div>
            </div>

            {/* FAQ 2 */}
            <div className="card">
              <div className="card-header" id="headingTwo">
                <h5 className="mb-0">
                  <button
                    className="btn btn-link"
                    type="button"
                    onClick={() => toggleFAQ(1)}
                  >
                    <i className="bi bi-question-circle-fill"></i> How can I
                    edit or delete a note?
                    <i
                      className={`bi ${
                        openFAQ === 1 ? "bi-chevron-up" : "bi-chevron-down"
                      } ml-2`}
                    ></i>
                  </button>
                </h5>
              </div>
              <div
                id="collapseTwo"
                className={`collapse ${openFAQ === 1 ? "show" : ""}`}
              >
                <div className="card-body">
                  You can edit or delete a note by clicking on the respective
                  buttons next to each note in your dashboard.
                </div>
              </div>
            </div>

            {/* FAQ 3 */}
            <div className="card">
              <div className="card-header" id="headingThree">
                <h5 className="mb-0">
                  <button
                    className="btn btn-link"
                    type="button"
                    onClick={() => toggleFAQ(2)}
                  >
                    <i className="bi bi-question-circle-fill"></i> Is my data
                    secure?
                    <i
                      className={`bi ${
                        openFAQ === 2 ? "bi-chevron-up" : "bi-chevron-down"
                      } ml-2`}
                    ></i>
                  </button>
                </h5>
              </div>
              <div
                id="collapseThree"
                className={`collapse ${openFAQ === 2 ? "show" : ""}`}
              >
                <div className="card-body">
                  Yes, iNotebook uses secure encryption methods to ensure your
                  data is safe.
                </div>
              </div>
            </div>

            {/* FAQ 4 */}
            <div className="card">
              <div className="card-header" id="headingFour">
                <h5 className="mb-0">
                  <button
                    className="btn btn-link"
                    type="button"
                    onClick={() => toggleFAQ(3)}
                  >
                    <i className="bi bi-question-circle-fill"></i> Can I access
                    iNotebook on my mobile device?
                    <i
                      className={`bi ${
                        openFAQ === 3 ? "bi-chevron-up" : "bi-chevron-down"
                      } ml-2`}
                    ></i>
                  </button>
                </h5>
              </div>
              <div
                id="collapseFour"
                className={`collapse ${openFAQ === 3 ? "show" : ""}`}
              >
                <div className="card-body">
                  Yes, iNotebook is fully responsive and can be accessed on any
                  device, including smartphones and tablets.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-5">
          <h3>Start organizing your notes with iNotebook today!</h3>
        </div>
      </div>
    </div>
  );
};

export default About;
