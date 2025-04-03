import { summaryCampusDetailAPI } from "@/services/api";
import { Badge, Button, Descriptions, Drawer } from "antd";
import dayjs from 'dayjs';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
    onClose: (v: boolean) => void;
    open: boolean;
    dataInit: IAssignment | null;
    setDataInit: (v: any) => void;
}
const ViewDetailAssignment = (props: IProps) => {
    const { onClose, open, dataInit, setDataInit } = props;
    // const [dataInit, setDetailCampus] = useState<ISummaryCampus>();

    // useEffect(() => {
    //     if(dataInit && open) {
    //         const getDetailCampus = async () => {
    //             try {
    //                 const res = await summaryCampusDetailAPI(dataInit?.id as number);
    //                 if (res.data) {
    //                     setDetailCampus(res.data);
    //                 }
    //             } catch (error) {
    //                 console.log(error);
    //             }
    //         }
    //         getDetailCampus();
    //     }},[dataInit, open])


    return (
        <>
            <Drawer
                title={`Thông Tin Phân bổ thiết bị ở ${dataInit?.room?.building?.campus?.name} ${dataInit?.room?.building?.name} Lớp ${dataInit?.room?.name}`}
                placement="right"
                onClose={() => { onClose(false); setDataInit(null); }}
                open={open}
                width={"40vw"}
                maskClosable={false}
            >
                <Descriptions title="" bordered column={2} layout="vertical">
                    <Descriptions.Item label="Tên thiết bị">{dataInit?.facility.name}</Descriptions.Item>
                    <Descriptions.Item label="Số lượng thiết bị">{dataInit?.quantity}</Descriptions.Item>
                    <Descriptions.Item label="Trạng thái">{dataInit?.facility.status.name}</Descriptions.Item>
                    <Descriptions.Item label="Người phân phát">{dataInit?.assignedBy.name}</Descriptions.Item>
                    <Descriptions.Item label="Ngày phân phát">{dataInit?.assignedAt}</Descriptions.Item>
  
                </Descriptions>
            </Drawer>
        </>
    )
}

export default ViewDetailAssignment;