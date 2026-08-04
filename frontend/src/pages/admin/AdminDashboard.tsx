import Header from "../../components/dashboard/Header";
import Sidebar from "../../components/dashboard/Sidebar";

function AdminDashboard() {

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (

    <div>

      <Header />

      <div style={{ display: "flex" }}>

        <Sidebar />

        <div style={{ padding: "30px", flex: 1 }}>

          <h1>Welcome, {user.full_name}</h1>

          <p><strong>Role:</strong> {user.role}</p>

          <p><strong>Email:</strong> {user.email}</p>

        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;