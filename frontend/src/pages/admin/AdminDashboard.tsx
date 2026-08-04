import Header from "../../components/dashboard/Header";
import Sidebar from "../../components/dashboard/Sidebar";
import StatCard from "../../components/dashboard/StatCard";
import "./AdminDashboard.css";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaBuilding,
  FaBullhorn
} from "react-icons/fa";

import ActionCard from "../../components/dashboard/ActionCard";

// import {
//   FaUserGraduate,
//   FaChalkboardTeacher,
//   FaBook,
//   FaBullhorn,
// } from "react-icons/fa";

function AdminDashboard() {

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (

    <div>

      <Header />

      <div style={{ display: "flex" }}>

        <Sidebar />

        <div className="dashboard-content">

          {/* Welcome Section */}

          <div className="dashboard-top">

              <div className="welcome-section">

                  <h1>
                      Welcome back, {user.full_name} 👋
                  </h1>

                  <p>
                      Here's your College ERP overview.
                  </p>

              </div>

              <div className="profile-card">

                  <h3>Administrator</h3>

                  <p>
                      <strong>Role:</strong> {user.role}
                  </p>

                  <p>
                      <strong>Email:</strong> {user.email}
                  </p>

              </div>

          </div>

          {/* Statistics Section */}

          <div className="stats-container">

            <StatCard
              title="Total Students"
              value={1200}
              color="#2563eb"
              icon={FaUserGraduate}
            />

            <StatCard
              title="Total Faculty"
              value={85}
              color="#16a34a"
              icon={FaChalkboardTeacher}
            />

            <StatCard
              title="Total Courses"
              value={15}
              color="#ea580c"
              icon={FaBook}
            />

            <StatCard
              title="Departments"
              value={6}
              color="#9333ea"
              icon={FaBuilding}
            />
          </div>

          <div className="quick-actions">

            <h2>Quick Actions</h2>

            <div className="actions-grid">

              <ActionCard
                title="Add Student"
                icon={FaUserGraduate}
                color="#2563eb"
              />

              <ActionCard
                title="Add Faculty"
                icon={FaChalkboardTeacher}
                color="#16a34a"
              />

              <ActionCard
                title="Manage Courses"
                icon={FaBook}
                color="#ea580c"
              />

              <ActionCard
                title="Publish Notice"
                icon={FaBullhorn}
                color="#9333ea"
              />

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;