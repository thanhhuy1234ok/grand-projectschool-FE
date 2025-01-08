import { Badge, Descriptions, Drawer } from "antd";
import dayjs from 'dayjs';

interface IProps {
    onClose: (v: boolean) => void;
    open: boolean;
    dataInit: IUserTable | null;
    setDataInit: (v: any) => void;
}
const ViewDetailUser = (props: IProps) => {
    const { onClose, open, dataInit, setDataInit } = props;
    
    return (
        <>
            <Drawer
                title="Thông Tin User"
                placement="right"
                onClose={() => { onClose(false); setDataInit(null) }}
                open={open}
                width={"40vw"}
                maskClosable={false}
            >
                <Descriptions title="" bordered column={1} layout="horizontal">
                    <Descriptions.Item label="Tên hiển thị">{dataInit?.name}</Descriptions.Item>
                    <Descriptions.Item label="Email">{dataInit?.email}</Descriptions.Item>

                    <Descriptions.Item label="Giới Tính">{dataInit?.gender}</Descriptions.Item>
                    <Descriptions.Item label="Năm sinh">{dayjs(dataInit?.date_of_birth).format("DD-MM-YYYY")}</Descriptions.Item>

                    <Descriptions.Item label="Vai trò" >
                        <Badge status="processing" text={<>{dataInit?.role?.name}</>} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Chuyên Ngành" >{dataInit?.major?.name}</Descriptions.Item>
                    {
                        dataInit?.role?.name.toUpperCase() === 'STUDENT' && (
                            <Descriptions.Item label="Lớp">
                                {dataInit?.class?.name}
                            </Descriptions.Item>
                        )}
                    <Descriptions.Item label="Địa chỉ" >{dataInit?.address}</Descriptions.Item>
                    <Descriptions.Item label="Ngày tạo">{dataInit && dataInit.createdAt ? dayjs(dataInit.createdAt).format('DD-MM-YYYY HH:mm:ss') : ""}</Descriptions.Item>
                    <Descriptions.Item label="Ngày sửa">{dataInit && dataInit.updatedAt ? dayjs(dataInit.updatedAt).format('DD-MM-YYYY HH:mm:ss') : ""}</Descriptions.Item>

                </Descriptions>
            </Drawer>
        </>
    )
}

export default ViewDetailUser;