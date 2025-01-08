import { getScheduleListTodayAPI } from "@/services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ScheduleCard from "./card.schedule";
import dayjs from "dayjs";
import { Result } from "antd";

const ScheduleClassList = () => {
    const [schedules, setSchedules] = useState<ISchedule[]>([]);
    const navigate = useNavigate();
    const date = dayjs().format("YYYY-MM-DD");
    const handleAttendanceClick = (schedule: ISchedule) => {
        navigate('attendance', { state: { className: schedule.class.name, scheduleId: schedule.id, date: date } });
    };

    useEffect(() => {
        fetchSchedules();
    }, []);
    const fetchSchedules = async () => {
        const query = `date=${date}`
        const res = await getScheduleListTodayAPI(query)
        if (res && res.data) {
            setSchedules(res.data)
        }
    };

    return (
        <div>
            <h2>Lớp dạy hôm nay</h2>
            <ul>
                {schedules.length > 0 ? (
                    schedules.map((schedule) => (
                        <ScheduleCard
                            dataInit={schedule}
                            handleAttendanceClick={handleAttendanceClick}
                            date={date}
                            key={schedule.id}
                        />
                    ))
                ) : (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: "100%"
                    }}>
                        <Result
                            status={404}
                            subTitle="Hôm nay không có lịch dạy"
                        // extra={<Button type="primary">Back Home</Button>}
                        />
                    </div>
                )}
            </ul>
        </div>
    );
}

export default ScheduleClassList