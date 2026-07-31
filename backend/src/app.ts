import express from "express";
import prisma from "./config/prisma";
import studentRoutes from "./routes/student.routes";
import authRoutes from "./routes/auth.routes";
import facultyRoutes from "./routes/faculty.routes";
import departmentRoutes from "./routes/department.routes";
import attendanceRoutes from "./routes/attendance.routes";
import subjectRoutes from "./routes/subject.routes";
import courseRoutes from "./routes/course.routes";
import timetableRoutes from "./routes/timetable.routes";
import examinationRoutes from "./routes/examination.routes";
import resultRoutes from "./routes/result.routes";
import feeRoutes from "./routes/fee.routes";
import noticeRoutes from "./routes/notice.routes";
import assignmentRoutes from "./routes/assignment.routes";
import assignmentSubmissionRoutes from "./routes/assignmentSubmission.routes";
import leaveRoutes from "./routes/leave.routes";
import eventRoutes from "./routes/event.routes";
import libraryRoutes from "./routes/library.routes";
import libraryIssueRoutes from "./routes/libraryIssue.routes";
import placementRoutes from "./routes/placement.routes";
import placementApplicationRoutes from "./routes/placementApplication.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import hostelRoutes from "./routes/hostel.routes";
import transportRoutes from "./routes/transport.routes";
import feedbackRoutes from "./routes/feedback.routes";

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
app.use("/timetable", timetableRoutes);
app.use("/examinations", examinationRoutes);
app.use("/results", resultRoutes);
app.use("/fees", feeRoutes);
app.use("/notices", noticeRoutes);
app.use("/assignments", assignmentRoutes);
app.use("/assignment-submissions", assignmentSubmissionRoutes);
app.use("/leave-requests", leaveRoutes);
app.use("/events", eventRoutes);
app.use("/library-books", libraryRoutes);
app.use("/library-issues", libraryIssueRoutes);
app.use("/placements", placementRoutes);
app.use("/placement-applications", placementApplicationRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/hostel-rooms", hostelRoutes);
app.use("/transport-buses", transportRoutes);
app.use("/feedback", feedbackRoutes);

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