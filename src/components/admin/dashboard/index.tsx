import { getAllTotalCampusAPI } from '@/services/api';
import {
    HomeOutlined,
    ApartmentOutlined,
    BorderOuterOutlined,
} from '@ant-design/icons';
import { Card, Col, Row, Statistic } from "antd";
import { useEffect, useState } from "react";
import CountUp from 'react-countup';

const AdminDashboard = () => {
    const [dataDashboard, setDataDashboard] = useState<ITotalCampus>({
        totalCampuses: 0,
        totalBuildings: 0,
        totalRooms: 0,
    })

    useEffect(() => {
        const initDashboard = async () => {
            const res = await getAllTotalCampusAPI();
            if (res && res.data) setDataDashboard(res.data)
        }
        initDashboard();
    }, []);

    const formatter = (value: any) => <CountUp end={value} separator="," />;
    return (
        <Row gutter={[20, 20]} justify="space-around">
            <Col xs={24} sm={12} md={8} lg={6}>
                <Card bordered={false} style={{ textAlign: 'center' }}>
                    <HomeOutlined style={{ fontSize: 40, color: '#4CAF50', marginBottom: 16 }} />
                    <Statistic
                        title="Số lượng Campus"
                        value={dataDashboard.totalCampuses}
                        formatter={formatter}
                        valueStyle={{ color: '#2196F3' }}
                    />
                </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
                <Card bordered={false} style={{ textAlign: 'center' }}>
                    <ApartmentOutlined style={{ fontSize: 40, color: '#4CAF50', marginBottom: 16 }} />
                    <Statistic
                        title="Số lượng tòa nhà"
                        value={dataDashboard.totalBuildings}
                        formatter={formatter}
                        valueStyle={{ color: '#2196F3' }}
                    />
                </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
                <Card bordered={false} style={{ textAlign: 'center' }}>
                    <BorderOuterOutlined  style={{ fontSize: 40, color: '#4CAF50', marginBottom: 16 }} />
                    <Statistic
                        title="Tổng Số phòng"
                        value={dataDashboard.totalRooms}
                        formatter={formatter}
                        valueStyle={{ color: '#2196F3' }}
                    />
                </Card>
            </Col>
        </Row>
    )
}

export default AdminDashboard;
