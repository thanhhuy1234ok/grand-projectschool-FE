import React, { useEffect, useRef, useState } from "react";
import { Card, Typography, Divider, Tag, Row, Col, Button } from "antd";
import { detailCampusAPI } from "@/services/api";
import { useParams } from "react-router-dom";
import ModalBuilding from "../buildings/model.building";
import { ActionType } from "@ant-design/pro-components";

const { Title, Text } = Typography;


const DetailCampus: React.FC = () => {
    const [dataCampus, setDataCampus] = useState<IDetailCampus>();
        const [openModal, setOpenModal] = useState<boolean>(false);
    const [dataUpdate, setDataUpdate] = useState<ICampus | null>(null);
    const params = useParams();
    const id = params.id as string;
    
        const tableRef = useRef<ActionType>();
    const reloadTable = () => {
        tableRef.current?.reload();
    }
    let roomCount = 0
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await detailCampusAPI(+id);
                if (response.data) {
                    setDataCampus(response.data);
                }
            } catch (error) {
                console.error("Error fetching dataCampus dataCampus:", error);
            }
        };

        fetchData();
    }, []);


    return (
        <div style={{ padding: 30, background: "#f2f4f7" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <Title level={2} style={{ margin: 0, color: "#2f3542" }}>
                    Quản lý Campus & Phòng học
                </Title>
                <Button
                    type="primary"
                    style={{ borderRadius: 8 }}
                    onClick={() => setOpenModal(true)}
                    title="Tạo mới tòa nhà"
                >
                    Tạo mới tòa nhà
                </Button>
            </div>
            <Card
                key={dataCampus?.name}
                title={<Text strong style={{ color: "#1e90ff" }}>{dataCampus?.name}</Text>}
                style={{ marginBottom: 30, borderRadius: 12 }}
                bodyStyle={{ backgroundColor: "#ffffff", borderRadius: 12 }}
            >
                {dataCampus?.buildings.map((building) => {
                    // Tính tổng số phòng trong floors
                    const floorRoomCount = building.floors?.reduce((count, floor) => count + floor.rooms.length, 0) || 0;
                    const noFloorRoomCount = building.roomsWithoutFloor?.length || 0;
                    const roomCount = floorRoomCount + noFloorRoomCount;

                    return (
                        <Card
                            key={building.name}
                            type="inner"
                            title={<Text strong>{building.name}</Text>}
                            style={{
                                marginBottom: 20,
                                borderLeft: "4px solid #1e90ff",
                                background: "#f9f9f9",
                                borderRadius: 8,
                            }}
                        >
                            {roomCount === 0 ? (
                                <Text type="secondary">Không có phòng</Text>
                            ) : (
                                <>
                                    {/* Có tầng */}
                                    {building.floors?.map((floor) => (
                                        <div key={floor.floor} style={{ marginBottom: 16 }}>
                                            <Text italic style={{ color: "#636e72" }}>
                                                Tầng {floor.floor}:
                                            </Text>
                                            <Row gutter={[8, 8]} style={{ marginTop: 8 }}>
                                                {floor.rooms.length > 0 ? (
                                                    floor.rooms.map((room) => (
                                                        <Col key={room}>
                                                            <Tag color="blue" style={{ borderRadius: 20, padding: "6px 12px" }}>
                                                                Phòng {room}
                                                            </Tag>
                                                        </Col>
                                                    ))
                                                ) : (
                                                    <Col>
                                                        <Tag color="default" style={{ borderRadius: 20, padding: "6px 12px", color: "#999" }}>
                                                            Chưa có phòng
                                                        </Tag>
                                                    </Col>
                                                )}
                                            </Row>
                                        </div>
                                    ))}

                                    {/* Phòng không thuộc tầng */}
                                    {building.roomsWithoutFloor?.length > 0 && (
                                        <div style={{ marginBottom: 16 }}>
                                            <Text italic style={{ color: "#636e72" }}>
                                                Không có tầng:
                                            </Text>
                                            <Row gutter={[8, 8]} style={{ marginTop: 8 }}>
                                                {building.roomsWithoutFloor.map((room) => (
                                                    <Col key={room}>
                                                        <Tag color="blue" style={{ borderRadius: 20, padding: "6px 12px" }}>
                                                            Phòng {room}
                                                        </Tag>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </div>
                                    )}
                                </>
                            )}
                        </Card>
                        );
                })}



                <Divider />
                <Text strong style={{ color: "#27ae60" }}>
                    Tổng số phòng: {roomCount}
                </Text>
            </Card>
            <ModalBuilding
                openModal={openModal}
                setOpenModal={setOpenModal}
                refreshTable={reloadTable}
            />
        </div>
    );
};

export default DetailCampus;
