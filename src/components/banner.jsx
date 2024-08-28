import banner from "../assets/images/notebook.png"; // Adjust the path based on your folder structure

const Banner = () => {
  return (
    <div>
        <div className="banner-section" style={{ position: "relative" }}>
        <img
          src={banner}
          alt="Banner"
          className="img-fluid w-100"
          style={{ height: "400px", objectFit: "cover", opacity: "50%" }}
        />
        <div
          className="banner-text"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#fa1",
            textAlign: "center",
            fontWeight: "800",
          }}
        >
          <h1 className="display-4">Welcome to iNotebook</h1>
          <p className="lead">
            Organize your thoughts, ideas, and tasks efficiently!
          </p>
        </div>
      </div>
      
    </div>
  )
}

export default Banner;
