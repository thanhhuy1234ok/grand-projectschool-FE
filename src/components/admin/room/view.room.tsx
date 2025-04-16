import { getDetailRoomAPI } from "@/services/api";
import { Descriptions, Drawer, Table } from "antd";
import { useEffect, useState } from "react";

interface IProps {
    onClose: (v: boolean) => void;
    open: boolean;
    dataInit: IRoom | null;
    setDataInit: (v: any) => void;
}

const ViewDetailRoom = (props: IProps) => {
    const { onClose, open, dataInit, setDataInit } = props;
    const [detailRoom, setDetailRoom] = useState<IRoom>();

    useEffect(() => {
        if (dataInit && open) {
            const getDetailRoom = async () => {
                try {
                    const res = await getDetailRoomAPI(dataInit?.id as number);
                    if (res.data) {
                        setDetailRoom(res.data);
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            getDetailRoom();
        }
    }, [dataInit, open]);
console.log("detailRoom", detailRoom);
    return (
        <Drawer
            title={`Chi Tiết Phòng: ${dataInit?.name}`}
            placement="right"
            onClose={() => {
                onClose(false);
                setDataInit(null);
            }}
            open={open}
            width={"40vw"}
            maskClosable={false}
        >
            <Descriptions title="" bordered column={2} layout="vertical">
                <Descriptions.Item label="Cơ sở">{dataInit?.building?.campus?.name}</Descriptions.Item>
                <Descriptions.Item label="Tòa nhà">{dataInit?.building?.name}</Descriptions.Item>
                <Descriptions.Item label="Tên phòng">{detailRoom?.name}</Descriptions.Item>
                <Descriptions.Item label="Sức chứa">{detailRoom?.capacity}</Descriptions.Item>
                <Descriptions.Item label="Trạng thái">
                    {detailRoom?.status}
                </Descriptions.Item>
            </Descriptions>
            <br />
            <h2>Danh sách thiết bị trong phòng</h2>
            {detailRoom?.assignments && detailRoom.assignments.length > 0 ? (
                <Table
                    dataSource={detailRoom.assignments}
                    pagination={false}
                    bordered
                    size="small"
                    rowKey={(record) => record.id || `${record.facility.name}-${record.quantity}`}
                >
                    <Table.Column title="Tên thiết bị" dataIndex={['facility', 'name']} key="name" />
                    <Table.Column title="Số lượng" dataIndex="quantity" key="quantity" />
                </Table>
            ) : (
                <i>Không có thiết bị nào trong phòng</i>
            )}
        </Drawer>
    );
};

export default ViewDetailRoom;
