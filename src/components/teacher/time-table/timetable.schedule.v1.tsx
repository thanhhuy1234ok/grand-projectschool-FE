import React from "react";
import "./TeacherSchedule.css";

type ClassType = "theory" | "practice" | "online" | "exam" | "cancel";

interface ClassItem {
    subject: string;
    className?: string;
    period: string;
    time: string;
    room?: string;
    teacher: string;
    type?: ClassType;
}

interface ScheduleData {
    [session: string]: {
        [day: string]: ClassItem[];
    };
}

const days = [
    { label: "Thứ 2", date: "31/03/2025" },
    { label: "Thứ 3", date: "01/04/2025" },
    { label: "Thứ 4", date: "02/04/2025" },
    { label: "Thứ 5", date: "03/04/2025" },
    { label: "Thứ 6", date: "04/04/2025" },
    { label: "Thứ 7", date: "05/04/2025" },
    { label: "Chủ nhật", date: "06/04/2025" },
];

const scheduleData: ScheduleData = {
    Sáng: {
        "Thứ 2": [
            {
                subject: "Cấu trúc dữ liệu & Giải thuật",
                className: "CTDLGT202",
                period: "1–3",
                time: "07:00–09:15",
                room: "A101",
                teacher: "TS. Nguyễn Văn An",
                type: "theory",
            },
        ],
        "Thứ 3": [
            {
                subject: "Lập trình hướng đối tượng",
                className: "OOP304",
                period: "1–3",
                time: "07:00–09:15",
                room: "A204",
                teacher: "TS. Nguyễn Văn An",
                type: "theory",
            },
        ],
        "Thứ 5": [
            {
                subject: "Thi giữa kỳ: CSDL301",
                className: "CSDL301",
                period: "1–3",
                time: "07:00–09:15",
                room: "P.Thi 05",
                teacher: "TS. Nguyễn Văn An",
                type: "exam",
            },
        ],
    },
    Chiều: {
        "Thứ 4": [
            {
                subject: "Thực hành Lập trình Web",
                className: "WEB305-TH",
                period: "7–9",
                time: "13:00–15:15",
                room: "LAB A4",
                teacher: "TS. Nguyễn Văn An",
                type: "practice",
            },
        ],
    },
    Tối: {
        "Thứ 3": [
            {
                subject: "Quản trị dự án CNTT",
                className: "PMQL406",
                period: "10–12",
                time: "18:00–20:15",
                room: "A302",
                teacher: "TS. Nguyễn Văn An",
                type: "theory",
            },
        ],
    },
};

const TimeTableV1: React.FC = () => {
    return (
        <div className="schedule-wrapper">
            <h2>Lịch dạy của giảng viên</h2>
            <table>
                <thead>
                    <tr>
                        <th>Ca học</th>
                        {days.map((day) => (
                            <th key={day.label}>
                                {day.label}
                                <br />
                                {day.date}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {["Sáng", "Chiều", "Tối"].map((session) => (
                        <tr key={session}>
                            <td className="time">{session}</td>
                            {days.map((day) => {
                                const classes = scheduleData[session]?.[day.label] || [];
                                return (
                                    <td key={day.label}>
                                        {classes.map((cls, index) => (
                                            <div key={index} className={`class-box ${cls.type ?? "theory"}`}>
                                                <strong>{cls.subject}</strong><br />
                                                {cls.className && <>Lớp: {cls.className}<br /></>}
                                                Tiết: {cls.period} ({cls.time})<br />
                                                {cls.room && <>Phòng: {cls.room}<br /></>}
                                            </div>
                                        ))}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="legend">
                <span className="theory">Lý thuyết</span>
                <span className="practice">Thực hành</span>
                <span className="online">Trực tuyến</span>
                <span className="exam">Thi</span>
                <span className="cancel">Tạm ngưng</span>
            </div>
        </div>
    );
};

export default TimeTableV1;
