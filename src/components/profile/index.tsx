import { Avatar, Button, Descriptions, Layout } from "antd";
import { useCurrentApp } from "../context/app.context";
import { Content } from "antd/es/layout/layout";
import styles from '@/styles/profileAdminPage.module.scss'
import { useEffect, useState } from "react";
import { detailUserAPI } from "@/services/api";
import avatar from '@/assets/avatar/avatar.jpg'
import dayjs from "dayjs";
import UpdateProfileModal from "./modal.profile";
const Profile = () => {
    const {
        user, setUser, setIsAuthenticated, isAuthenticated,
    } = useCurrentApp();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [dataUser, setDataUser] = useState<IUserTable>()
    const fetchUserData = async (id: number) => {
        const response = await detailUserAPI(id)
        setDataUser(response.data)
    }

    const reloadTable = async () => {
        location.reload();
    }

    useEffect(() => {
        if (user?.id) {
            fetchUserData(+user.id);
        }
    }, [user?.id]);

    const urlAvatar = user?.avatar
        ? `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user.avatar}`
        : avatar;
    return (
        <>
            <Layout>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: '#ffffff',
                            borderRadius: '8px',
                            overflowX: 'auto',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                gap: '24px',
                                flexWrap: 'wrap',
                            }}
                        >
                            {/* Hình đại diện và tên */}
                            <div className={styles.mobileMinWidth} style={{ textAlign: 'center', flex: '1 1 320px' }}>
                                <div className={styles.avatarContainer}>
                                    <Avatar size={100} src={urlAvatar} />
                                    <h2>{dataUser?.name}</h2>
                                </div>

                                {/* Ngành học bên dưới hình đại diện */}
                                <Descriptions column={1} bordered style={{ marginBottom: '24px' }}>
                                    <Descriptions.Item labelStyle={{ width: '20%' }}
                                        label="MSSV">{dataUser?.id}</Descriptions.Item>
                                    {
                                        dataUser?.yearOfAdmission && (
                                            <Descriptions.Item label="Khóa">{dataUser?.yearOfAdmission?.startYear}</Descriptions.Item>
                                        )
                                    }

                                    {
                                        dataUser?.major && (
                                            <Descriptions.Item label="Ngành">{dataUser.major.name}</Descriptions.Item>
                                        )
                                    }

                                    <Descriptions.Item label="Lớp">{dataUser?.class?.name}</Descriptions.Item>
                                </Descriptions>
                            </div>

                            {/* Thông tin chi tiết */}
                            <div style={{ flex: '2 1 600px' }}>
                                <h3>Thông tin cá nhân</h3>
                                <Descriptions column={1} bordered style={{ marginBottom: '24px' }}>
                                    <Descriptions.Item labelStyle={{ width: '20%' }}
                                        label="Họ tên">{dataUser?.name}</Descriptions.Item>
                                    <Descriptions.Item label="Ngày sinh">
                                        {dataUser?.date_of_birth ? dayjs(dataUser.date_of_birth).format("DD-MM-YYYY") : ""}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Giới tính">{dataUser?.gender}</Descriptions.Item>
                                    {/* <Descriptions.Item label="CMND/CCCD">123456789</Descriptions.Item> */}
                                </Descriptions>

                                <h3>Thông tin liên lạc</h3>
                                <Descriptions column={1} bordered style={{ width: '100%' }}>
                                    <Descriptions.Item labelStyle={{ width: '20%' }}
                                        label="Email HSU">{dataUser?.email}</Descriptions.Item>
                                    <Descriptions.Item label="Email cá nhân">{dataUser?.email}</Descriptions.Item>
                                    <Descriptions.Item label="Điện thoại">{dataUser?.phone}</Descriptions.Item>
                                    <Descriptions.Item label="Địa chỉ hiện tại">{dataUser?.address}</Descriptions.Item>
                                </Descriptions>

                            </div>

                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <Button
                                // icon={<MdUpdate size={20} />}
                                type="primary"
                                onClick={() => setOpenModal(true)}
                            >
                                Cập nhật
                            </Button>
                        </div>
                    </Content>
                </Layout>
                <UpdateProfileModal
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    dataInit={dataUser}
                    setDataInit={setDataUser}
                    reloadTable={reloadTable}
                />
            </Layout>
        </>
    )
}
export default Profile