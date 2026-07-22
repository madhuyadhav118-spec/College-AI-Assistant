import express from "express";
import prisma from "./config/prisma";
import studentRoutes from "./routes/student.routes";
import authRoutes from "./routes/auth.routes";
import facultyRoutes from "./routes/faculty.routes";
import departmentRoutes from "./routes/department.routes";
import attendanceRoutes from "./routes/attendance.routes";
import subjectRoutes from "./routes/subject.routes";
import courseRoutes from "./routes/course.routes";

const app = express();

const PORT = 5000;
app.use(express.json());

app.use("/students", studentRoutes);
app.use("/auth", authRoutes);
app.use("/faculty", facultyRoutes);
app.use("/departments", departmentRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/subjects", subjectRoutes);
app.use("/courses", courseRoutes);

app.get("/", (req, res) => {
    res.send("College AI Assistant Backend Running");
});

async function connectDatabase() {
    try {
        await prisma.$connect();
        console.log("✅ Database connected successfully!");
    } catch (error) {
        console.error("❌ Database connection failed!");
        console.error(error);
    }
}

connectDatabase();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});