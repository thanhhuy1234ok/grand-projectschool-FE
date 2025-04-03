import React from 'react';
import avatar from '@/assets/avatar/avatar.jpg'
const TeacherProfile: React.FC = () => {
    const teacher = {
        id: 'GV001',
        fullName: 'ThS. Nguyễn Văn A',
        gender: 'Nam',
        dob: '15/05/1980',
        degree: 'Thạc sĩ',
        department: 'Kỹ thuật phần mềm',
        faculty: 'Công nghệ thông tin',
        schoolEmail: 'nva@university.edu.vn',
        personalEmail: 'nguyenvana@gmail.com',
        phone: '0912 345 678',
        address: '123 Nguyễn Văn Cừ, Q.5, TP.HCM',
    };

    return (
        <>
            <main style={{ flexGrow: 1, padding: 40 }}>
                <div style={{
                    display: 'flex',
                    backgroundColor: '#fff',
                    padding: 30,
                    borderRadius: 10,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                }}>
                    {/* Avatar section */}
                    <div style={{
                        backgroundColor: '#b63b3b',
                        padding: '30px 20px',
                        color: 'white',
                        textAlign: 'center',
                        borderRadius: 10,
                        width: 220
                    }}>
                        <img
                            src={avatar}
                            alt="Avatar"
                            style={{ width: 90, height: 90, borderRadius: '50%', marginBottom: 12 }}
                        />
                        <h3>{teacher.id} - {teacher.fullName}</h3>
                        <p>{teacher.faculty}</p>
                    </div>

                    {/* Info section */}
                    <div style={{ marginLeft: 40, flex: 1 }}>
                        {/* Personal info */}
                        <section style={{ marginBottom: 30 }}>
                            <h3 style={{
                                fontSize: 16,
                                marginBottom: 15,
                                borderBottom: '1px solid #ddd',
                                paddingBottom: 5
                            }}>
                                Thông tin cá nhân
                            </h3>
                            <table style={{ width: '100%' }}>
                                <tbody>
                                    <tr><td><strong>Mã giảng viên</strong></td><td>{teacher.id}</td></tr>
                                    <tr><td><strong>Họ và tên</strong></td><td>{teacher.fullName}</td></tr>
                                    <tr><td><strong>Giới tính</strong></td><td>{teacher.gender}</td></tr>
                                    <tr><td><strong>Ngày sinh</strong></td><td>{teacher.dob}</td></tr>
                                    <tr><td><strong>Học vị</strong></td><td>{teacher.degree}</td></tr>
                                    <tr><td><strong>Bộ môn</strong></td><td>{teacher.department}</td></tr>
                                    <tr><td><strong>Khoa</strong></td><td>{teacher.faculty}</td></tr>
                                </tbody>
                            </table>
                        </section>

                        {/* Contact info */}
                        <section style={{ marginBottom: 30 }}>
                            <h3 style={{
                                fontSize: 16,
                                marginBottom: 15,
                                borderBottom: '1px solid #ddd',
                                paddingBottom: 5
                            }}>
                                Thông tin liên lạc
                            </h3>
                            <table style={{ width: '100%' }}>
                                <tbody>
                                    <tr><td><strong>Email trường</strong></td><td>{teacher.schoolEmail}</td></tr>
                                    <tr><td><strong>Email cá nhân</strong></td><td>{teacher.personalEmail}</td></tr>
                                    <tr><td><strong>Số điện thoại</strong></td><td>{teacher.phone}</td></tr>
                                    <tr><td><strong>Địa chỉ</strong></td><td>{teacher.address}</td></tr>
                                </tbody>
                            </table>
                        </section>

                        <button style={{
                            padding: '10px 25px',
                            backgroundColor: '#1677ff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 5,
                            cursor: 'pointer'
                        }}>
                            Cập nhật
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
};

export default TeacherProfile;
