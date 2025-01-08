import React, { useEffect, useState } from 'react';
import {
    AppstoreOutlined,
    ExceptionOutlined,
    HeartTwoTone,
    TeamOutlined,
    UserOutlined,
    DollarCircleOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    CalendarOutlined,
    HomeOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Dropdown, Space, Avatar } from 'antd';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useCurrentApp } from '../context/app.context';
import type { MenuProps } from 'antd';
import { LogoutAPI } from '@/services/api';
import avatar from '@/assets/avatar/avatar.jpg'
type MenuItem = Required<MenuProps>['items'][number];

const { Content, Footer, Sider } = Layout;


const LayoutStudent = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState('');
    const {
        user, setUser, setIsAuthenticated, isAuthenticated,
    } = useCurrentApp();
    const navigate = useNavigate();
    const location = useLocation();

    const items: MenuItem[] = [
        {
            label: <Link to='/student'>Dashboard</Link>,
            key: '/student',
            icon: <AppstoreOutlined />,

        },
        {
            label: <Link to={'/student/enrollment'}>Kết quả học tập</Link>,
            key: '/student/enrollment',
            icon: <ExceptionOutlined />,
        },
        {
            label: <Link to={'/student/time-table'}>Thời khóa biểu</Link>,
            key: '/student/time-table',
            icon: <ExceptionOutlined />,
        },

    ];


    useEffect(() => {
        const active: any = items.find(item => location.pathname === (item!.key as any)) ?? "/admin";
        setActiveMenu(active.key)
    }, [location])

    const handleLogout = async () => {
        //todo
        const res = await LogoutAPI();
        if (res.data) {
            setUser(null);
            setIsAuthenticated(false);
            localStorage.removeItem("access_token");
            navigate("/login");
        }
    }

    const handleProfile = () => {
        navigate("/student/profile");
    }



    const itemsDropdown = [
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={handleProfile}
            >Quản lý tài khoản</label>,
            key: 'account',
        },
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={() => handleLogout()}
            >Đăng xuất</label>,
            key: 'logout',
        },

    ];

    // const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user?.avatar}`;
    const urlAvatar = avatar

    if (isAuthenticated === false) {
        return (
            <Outlet />
        )
    }

    const protectedRoutes = ["/admin", "/teacher", "/student"];

    const isProtectedRoute = protectedRoutes.some((route) =>
        location.pathname.startsWith(route)
    );
    const localPath = location.pathname.replace(/^\//, "").split("/")[0];
    if (isAuthenticated && isProtectedRoute) {
        const role = user?.role?.name.toLocaleLowerCase();
        if (role !== localPath) {
            return (
                <Outlet />
            );
        }
    }
    return (
        <>
            <Layout
                style={{ minHeight: '100vh' }}
                className="layout-admin"
            >
                <Sider
                    theme='light'
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}>
                    <div style={{ height: 32, margin: 16, textAlign: 'center' }}>
                        Student
                    </div>
                    <Menu
                        // defaultSelectedKeys={[activeMenu]}
                        selectedKeys={[activeMenu]}
                        mode="inline"
                        items={items}
                        onClick={(e) => setActiveMenu(e.key)}
                    />
                </Sider>
                <Layout>
                    <div className='admin-header' style={{
                        height: "50px",
                        borderBottom: "1px solid #ebebeb",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0 15px",

                    }}>
                        <span>
                            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: () => setCollapsed(!collapsed),
                            })}
                        </span>
                        <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
                            <Space style={{ cursor: "pointer" }}>
                                <Avatar src={urlAvatar} />
                                {user?.email}
                            </Space>
                        </Dropdown>
                    </div>
                    <Content style={{ padding: '15px' }}>
                        <Outlet />
                    </Content>
                    {/* <Footer style={{ padding: 0, textAlign: "center" }}>
                        React Test Fresher &copy; Hỏi Dân IT - Made with <HeartTwoTone />
                    </Footer> */}
                </Layout>
            </Layout>
        </>
    );
};

export default LayoutStudent;