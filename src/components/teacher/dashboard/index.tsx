// import { getDashboardAPI } from "@/services/api";
import { Card, Col, Row, Statistic } from "antd";
import { useEffect, useState } from "react";
import CountUp from 'react-countup';

const TeacherDashboard = () => {
    const [dataDashboard, setDataDashboard] = useState({
        countOrder: 100,
        countUser: 3,
        countBook: 1000
    })

    // useEffect(() => {
    //     const initDashboard = async () => {
    //         const res = await getDashboardAPI();
    //         if (res && res.data) setDataDashboard(res.data)
    //     }
    //     initDashboard();
    // }, []);

    const formatter = (value: any) => <CountUp end={value} separator="," />;
    return (
        <Row gutter={[40, 40]}>
            <Col span={24}>
                <Card title="" bordered={false} >
                    <Statistic
                        title="Lịch dạy hôm nay"
                        value={dataDashboard.countUser}
                        formatter={formatter}
                        valueRender={() => (
                            <>
                                <div>Bạn có {formatter(dataDashboard.countUser)} lịch dạy hôm nay</div>
                            </>
                        )}
                    />
                </Card>
            </Col>
        </Row>
    )
}

export default TeacherDashboard;
