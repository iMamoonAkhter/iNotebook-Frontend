import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import NoteContext from "../context/notes/noteContext";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { host } = useContext(NoteContext);
  const [showPassword, setShowPassword] = useState(false);

  // Validation schema for changing password
  const validationSchema = Yup.object({
    oldPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Old password is required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const token = localStorage.getItem('auth-token');
  console.log(token);

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(`${host}/api/auth/change-password`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
        body: JSON.stringify({
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (json) {
        toast.success('Password changed successfully');
        
      } else {
        toast.error("Failed to change password");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-container">
      <div className="password-form-wrapper">
        <h1 className="password-heading">Change Password</h1>
        <Formik
          initialValues={{ oldPassword: "", newPassword: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="password-form">
              <div className="password-form-group">
                <label htmlFor="oldPassword" className="password-label">Old Password</label>
                <Field
                  type={showPassword ? "text" : "password"}
                  id="oldPassword"
                  name="oldPassword"
                  placeholder="Enter your old password"
                  className="password-input"
                />
                <ErrorMessage name="oldPassword" component="div" className="password-error" />
              </div>
              <div className="password-form-group">
                <label htmlFor="newPassword" className="password-label">New Password</label>
                <Field
                  type={showPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  placeholder="Enter your new password"
                  className="password-input"
                />
                <ErrorMessage name="newPassword" component="div" className="password-error" />
              </div>
              <div className="password-form-group">
                <label htmlFor="confirmPassword" className="password-label">Confirm New Password</label>
                <Field
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your new password"
                  className="password-input"
                />
                <ErrorMessage name="confirmPassword" component="div" className="password-error" />
              </div>
              {/* Toggle Show/Hide Password button below the Confirm Password field */}
              <div className="password-toggle-wrapper">
                <button
                  type="button"
                  className="password-toggle-button"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? "Hide" : "Show"} Password
                </button>
              </div>
              <button
                type="submit"
                className="password-submit-button"
                disabled={isSubmitting}
              >
                Change Password
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChangePassword;
