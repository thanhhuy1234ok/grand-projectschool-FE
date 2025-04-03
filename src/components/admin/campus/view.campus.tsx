import { summaryCampusDetailAPI } from "@/services/api";
import { Badge, Button, Descriptions, Drawer } from "antd";
import dayjs from 'dayjs';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
    onClose: (v: boolean) => void;
    open: boolean;
    dataInit: ICampus | null;
    setDataInit: (v: any) => void;
}
const ViewDetailCampus = (props: IProps) => {
    const { onClose, open, dataInit, setDataInit } = props;
    const [detailCampus, setDetailCampus] = useState<ISummaryCampus>();

    useEffect(() => {
        if(dataInit && open) {
            const getDetailCampus = async () => {
                try {
                    const res = await summaryCampusDetailAPI(dataInit?.id as number);
                    if (res.data) {
                        setDetailCampus(res.data);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            getDetailCampus();
        }},[dataInit, open])


    return (
        <>
            <Drawer
                title={`Thông Tin Cơ Sở: ${dataInit?.name}`}
                placement="right"
                onClose={() => { onClose(false); setDataInit(null); }}
                open={open}
                width={"40vw"}
                maskClosable={false}
            >
                <Descriptions title="" bordered column={2} layout="vertical">
                    <Descriptions.Item label="Tên cơ sở">{detailCampus?.campusName}</Descriptions.Item>
                    <Descriptions.Item label="Vị trí">{dataInit?.location}</Descriptions.Item>
                    <Descriptions.Item label="Tổng số tòa nhà">{detailCampus?.totalBuildings}</Descriptions.Item>
                    <Descriptions.Item label="Tổng số tầng">{detailCampus?.totalFloors}</Descriptions.Item>
                    <Descriptions.Item label="Tổng số phòng">{detailCampus?.totalRooms}</Descriptions.Item>
                </Descriptions>
            </Drawer>
        </>
    )
}

export default ViewDetailCampus;