function Sidebar() {

  return (

    <div
      style={{
        width: "220px",
        backgroundColor: "#f4f4f4",
        padding: "20px",
        minHeight: "100vh"
      }}
    >

      <h3>Menu</h3>

      <hr />

      <p>Dashboard</p>

      <p>Students</p>

      <p>Faculty</p>

      <p>Courses</p>

      <p>Departments</p>

      <p>Attendance</p>

        <button
            onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/";
            }}
            style={{
                marginTop: "20px",
                width: "100%",
                padding: "10px",
                backgroundColor: "#dc2626",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
            }}
            >
            Logout
        </button>

    </div>

  );

}

export default Sidebar;