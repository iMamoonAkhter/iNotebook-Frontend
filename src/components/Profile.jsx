import { useContext, useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import NoteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const { host, setUserData, fetchUserData, userData } = useContext(NoteContext);
  const token = localStorage.getItem("auth-token");
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      await fetchUserData();
      setLoading(false);
    };
    loadUser();
  }, [fetchUserData]);

  // Clean up object URL when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleChangePassword = () => {
    navigate("/changepassword");
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        toast.error("Please select a valid image file (JPEG, PNG, WEBP, etc.)");
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }

      setFile(selectedFile);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      const localUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(localUrl);
    }
  };

  const handleCancelSelection = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      toast.error("No file selected. Please choose an image first.");
      return;
    }

    if (!token) {
      toast.error("Authentication token missing. Please log in again.");
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);

    try {
      const response = await fetch(`${host}/api/auth/uploadprofileimage`, {
        method: "POST",
        headers: {
          "auth-token": token,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.user) {
        toast.success("Profile picture updated successfully!");

        // Update state immediately so UI and Navbar reflect changes without page refresh
        setUserData((prevUser) => ({
          ...prevUser,
          ...data.user,
          profileImage: data.user.profileImage,
        }));

        handleCancelSelection();
      } else {
        toast.error(data.message || data.error || "Failed to upload profile picture");
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(err.message || "An error occurred while uploading. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (loading && userData === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-50">
        <div className="animate-spin rounded-full h-10 w-10 border-3 border-primary-200 border-t-primary-600" aria-label="Loading" />
      </div>
    );
  }

  // Active profile image display (priority: preview -> uploaded image -> null)
  const displayImage = previewUrl || userData?.profileImage;

  return (
    <div className="min-h-screen bg-surface-50 py-12 px-4 sm:px-6 lg:px-8 pt-20">
      <div className="max-w-3xl mx-auto">
        <div className="card-padded">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-surface-900">User Profile</h1>
              <p className="text-surface-500 mt-1">Manage your account settings</p>
            </div>
            <button
              onClick={handleChangePassword}
              className="btn-secondary btn-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Change Password
            </button>
          </div>

          <div className="text-center mb-8">
            <div className="relative w-28 h-28 mx-auto mb-4">
              {displayImage ? (
                <img
                  src={displayImage}
                  alt={`${userData?.name || "User"}'s profile`}
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg ring-2 ring-primary-100"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  {userData?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                id="profile-image-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Camera badge trigger */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-primary-600 text-white flex items-center justify-center cursor-pointer hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                aria-label="Change profile picture"
                title="Select a new image"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>

            {/* Selected File Name / Status */}
            {file && (
              <p className="text-xs text-primary-600 font-medium mb-3 truncate max-w-xs mx-auto">
                Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-2">
              {file ? (
                <>
                  <button
                    onClick={handleFileUpload}
                    disabled={uploading}
                    className="btn-primary btn-sm inline-flex items-center"
                  >
                    {uploading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Upload Picture
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleCancelSelection}
                    disabled={uploading}
                    className="btn-secondary btn-sm"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-secondary btn-sm inline-flex items-center"
                >
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Select Profile Picture
                </button>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-surface-50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-surface-500 uppercase tracking-wider">Name</p>
                  <p className="text-lg font-medium text-surface-900">{userData?.name || "Not set"}</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-surface-50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-surface-500 uppercase tracking-wider">Email</p>
                  <p className="text-lg font-medium text-surface-900">{userData?.email || "Not set"}</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-surface-50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-surface-500 uppercase tracking-wider">Member Since</p>
                  <p className="text-lg font-medium text-surface-900">
                    {userData?.date ? new Date(userData.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "Not available"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="mt-6 card-padded border-t border-surface-200">
          <h3 className="text-lg font-semibold text-surface-900 mb-4">Account Actions</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleChangePassword}
              className="btn-outline sm:flex-1"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Change Password
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("auth-token");
                toast.success("Logged out successfully");
                navigate("/login");
              }}
              className="btn-danger sm:flex-1"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;