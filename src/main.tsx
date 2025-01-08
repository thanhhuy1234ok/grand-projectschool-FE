import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App, ConfigProvider } from 'antd'
import { AppProvider } from './components/context/app.context.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import enUS from 'antd/locale/en_US';
import DashBoardPage from './pages/admin/dashboard.tsx'
import LayoutAdmin from './components/layout/layout.admin.tsx'
import LoginPage from './pages/auth/login.tsx'
import UserPage from './pages/admin/manager.users.tsx'
import ProtectedRoute from './components/auth/index.tsx'
import RolePage from './pages/admin/manager.roles.tsx'
import CohortPage from './pages/admin/manager.cohort.tsx'
import MajorPage from './pages/admin/manager.major.tsx'
import RoomPage from './pages/admin/manager.room.tsx'
import ClassPage from './pages/admin/manager.classes.tsx'
import SubjectPage from './pages/admin/manager.subject.tsx'
import SemesterPage from './pages/admin/manager.semester.tsx'
import SchedulePage from './pages/admin/manager.schedule.tsx'
import LayoutTeacher from './components/layout/layout.teacher.tsx'
import LayoutStudent from './components/layout/layout.student.tsx'
import TimeTablePage from './pages/teacher/timetable.teacher.tsx'
import TimeTableStudentPage from './pages/student/timetable.student.tsx'
import AttendancePage from './pages/teacher/listattendance/attendance.tsx'
import ClassSchedule from './pages/teacher/classSchedule.teacher.tsx'
import ClassListPage from './pages/teacher/classlist/class_list.tsx'
import ClassListStudent from './pages/teacher/classlist/list.student.tsx'
import ShowListScorePage from './pages/student/academic-outcomes.tsx'
import ProfilePage from './pages/profile/profile.page.tsx'
import HomePage from './pages/home/home.page.tsx'
import UpdateRequestDetails from './components/admin/user/test.tsx'
import TestPage from './pages/admin/test.tsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>,
  },
  {
    path: '/admin',
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <DashBoardPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'users',
        element: (
          <ProtectedRoute>
            <UserPage />
          </ProtectedRoute>

        )
      },
      {
        path: 'roles',
        element: (
          <ProtectedRoute>
            <RolePage />
          </ProtectedRoute>

        )
      },
      {
        path: 'cohort',
        element: (
          <ProtectedRoute>
            <CohortPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'major',
        element: (
          <ProtectedRoute>
            <MajorPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'room',
        element: (
          <ProtectedRoute>
            <RoomPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'classes',
        element: (
          <ProtectedRoute>
            <ClassPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'subject',
        element: (
          <ProtectedRoute>
            <SubjectPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'semester',
        element: (
          <ProtectedRoute>
            <SemesterPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'schedule',
        element: (
          <ProtectedRoute>
            <SchedulePage />
          </ProtectedRoute>
        )
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute >
        )
      },
      {
        path: 'test/:id',
        element: (
          <ProtectedRoute>
            <TestPage />
          </ProtectedRoute>
        )
      },
    ]
  },
  {
    path: '/teacher',
    element: <LayoutTeacher />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <DashBoardPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'classes-list-today',
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <ClassSchedule />
              </ProtectedRoute>
            )
          },
          {
            path: 'attendance',
            element: (
              <ProtectedRoute>
                <AttendancePage />
              </ProtectedRoute>
            )
          }
        ]
      },
      {
        path: 'time-table',
        element: (
          <ProtectedRoute>
            <TimeTablePage />
          </ProtectedRoute >
        )
      },
      {
        path: 'class-list',
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <ClassListPage />
              </ProtectedRoute >
            ),
          },
          {
            path: ':id',
            element: (
              <ProtectedRoute>
                <ClassListStudent />
              </ProtectedRoute >
            ),
          },

        ]
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute >
        )
      }

    ]
  },
  {
    path: '/student',
    element: <LayoutStudent />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <> student</>
          </ProtectedRoute>
        )
      },
      {
        path: 'enrollment',
        element: (
          <ProtectedRoute>
            <ShowListScorePage />
          </ProtectedRoute>
        )
      },
      {
        path: 'time-table',
        element: (
          <ProtectedRoute>
            <TimeTableStudentPage />
          </ProtectedRoute >
        )
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute >
        )
      }

    ]
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App>
      <AppProvider>
        <ConfigProvider locale={enUS}>
          <RouterProvider router={router} />
        </ConfigProvider>
      </AppProvider>
    </App>
  </StrictMode>,
)
