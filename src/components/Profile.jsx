import { useContext, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import NoteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null); // State for file
  const { host, setUserData, fetchUserData, userData } = useContext(NoteContext);
  const token = localStorage.getItem("auth-token"); // Get the token from localStorage
  const navigate = useNavigate();
  
  useEffect(() => {
    // Fetch user data
    

    fetchUserData();
  }, [host, token, setUserData]); // Include host and token in dependency array

  const handleChangePassword = () => {
    navigate("/changepassword");
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Profile.jsx
  const handleFileUpload = async () => {
    if (!file) {
      toast.error("No file selected");
      return;
    }
  
    const formData = new FormData();
    formData.append("image", file);
  
    try {
      const response = await fetch(`${host}/api/auth/uploadprofileimage`, {
        method: "POST",
        headers: {
          "auth-token": token,
        },
        body: formData,
      });
  
      const data = await response.json();
      if (data.message === "Profile image uploaded successfully") {
        toast.success("Profile picture updated successfully");
  
        // Update the user state with the new profile image
        setUserData((prevUser) => ({
          ...prevUser,
          profileImage: data.user.profileImage, // Assuming `profileImage` is the field name in the API response
        }));
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  
  if (loading && userData===null) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-danger">{error}</div>;

  return (
    <div className="container" style={{margin: "5vw 0"}}>
      <Card className="shadow">
        <Card.Body>
          <Card.Title className="text-center mb-4">User Profile</Card.Title>
          <div className="text-center mb-4">
            <img
              src={userData.profileImage || "https://via.placeholder.com/150"}
              alt="Profile"
              className="rounded-circle"
              style={{ width: "150px", height: "150px" }}
            />
          </div>
          <div className="mb-3">
            <strong>Name:</strong> {userData.name}
          </div>
          <div className="mb-3">
            <strong>Email:</strong> {userData.email}
          </div>
          <div className="mb-3">
            <strong>Profile Created:</strong>{" "}
            {new Date(userData.date).toLocaleDateString()}
          </div>
          <div className="mb-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="form-control"
            />
            <Button
              variant="primary"
              onClick={handleFileUpload}
              className="mt-3"
            >
              Upload Profile Picture
            </Button>
          </div>
          <div className="text-center">
            <Button variant="primary" onClick={handleChangePassword}>
              Change Password
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
