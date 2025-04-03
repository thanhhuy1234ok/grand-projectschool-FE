import axios from "services/axios.customize";

export const LoginAPI = (username: string, password: string) => {
  const urlBackend = "/api/v1/auth/login";
  return axios.post<IBackendRes<ILogin>>(urlBackend, { username, password });
};

export const getAccountAPI = () => {
  const urlBackend = "/api/v1/auth/account";
  return axios.get<IBackendRes<IFetchAccount>>(urlBackend);
};

export const LogoutAPI = () => {
  const urlBackend = "/api/v1/auth/logout";
  return axios.post<IBackendRes<IFetchAccount>>(urlBackend);
};

export const callRetryActive = (email: any) => {
  const urlBackend = "/api/v1/auth/retry-password";
  return axios.post<IBackendRes<string>>(urlBackend, {
    email,
  });
};

export const callForgotPassword = (data: IChangePassword) => {
  const urlBackend = "/api/v1/auth/forgot-password";
  return axios.post<IBackendRes<string>>(urlBackend, {
    ...data,
  });
};

/**
 *Module Roles API
 *
 */
export const getRolesAPI = (query: string) => {
  const urlBackend = `/api/v1/roles?${query}`;
  return axios.get<IBackendRes<IModelPaginate<IRole>>>(urlBackend);
};

export const createRoleAPI = (data: any) => {
  const urlBackend = "/api/v1/roles";
  return axios.post<IBackendRes<IRole>>(urlBackend, { ...data });
};

export const updateRolesAPI = (data: any) => {
  const urlBackend = "/api/v1/roles";
  return axios.patch<IBackendRes<IRole>>(urlBackend, { ...data });
};

export const detailRolesAPI = (id: number | string) => {
  const urlBackend = `/api/v1/roles/${id}`;
  return axios.get<IBackendRes<IRole>>(urlBackend);
};



/**
 * Module User API
 */

export const getUsersAPI = (query: string) => {
  const urlBackend = `/api/v1/users?${query}`;
  return axios.get<IBackendRes<IModelPaginate<IUserTable>>>(urlBackend);
};

export const createUserAPI = (data: any) => {
  const urlBackend = "/api/v1/users";
  return axios.post<IBackendRes<IUserTable>>(urlBackend, { ...data });
};
export const updateUserAPI = (id: number, data: any) => {
  const urlBackend = `/api/v1/users/${id}`;
  return axios.patch<IBackendRes<IUserTable>>(urlBackend, { ...data });
};

export const detailUserAPI = (id: number) => {
  const urlBackend = `/api/v1/users/${id}`;
  return axios.get<IBackendRes<IUserTable>>(urlBackend);
};

export const deleteUserAPI = (id: number) => {
  const urlBackend = `/api/v1/users/${id}`;
  return axios.delete<IBackendRes<IUserTable>>(urlBackend);
};

export const callBulkCreateUser = (user: IExcelData[]) => {
  return axios.post<IBackendRes<IExcelData[]>>(
    "/api/v1/users/bulk-create",
    user
  );
};

/**
 * Module Cohort API
 */
export const getCohortsAPI = (query: string) => {
  const urlBackend = `/api/v1/cohort?${query}`;
  return axios.get<IBackendRes<IModelPaginate<ICohort>>>(urlBackend);
};

export const createCohortAPI = (data: any) => {
  const urlBackend = "/api/v1/cohort";
  return axios.post<IBackendRes<ICohort>>(urlBackend, { ...data });
};

export const updateCohortAPI = (id: number, data: any) => {
  const urlBackend = `/api/v1/cohort/${id}`;
  return axios.patch<IBackendRes<ICohort>>(urlBackend, { ...data });
};

/**
 * Module Major API
 */

export const getMajorAPI = (query: string) => {
  const urlBackend = `/api/v1/major?${query}`;
  return axios.get<IBackendRes<IModelPaginate<IMajor>>>(urlBackend);
};

export const createMajorAPI = (data: any) => {
  const urlBackend = "/api/v1/major";
  return axios.post<IBackendRes<IMajor>>(urlBackend, { ...data });
};

/**
 * Module Room API
 */

export const getRoomAPI = (query: string) => {
  const urlBackend = `/api/v1/room?${query}`;
  return axios.get<IBackendRes<IModelPaginate<IRoom>>>(urlBackend);
};
export const createRoomAPI = (data: any) => {
  const urlBackend = "/api/v1/room";
  return axios.post<IBackendRes<IRoom>>(urlBackend, { ...data });
};

// export const createRoomAPIV1 = (data: any) => {
//   const urlBackend = "/api/v1/room";
//   return axios.post<IBackendRes<IRoom>>(urlBackend, { ...data });
// }

/**
 * Module Class API
 */

export const getClassAPI = (query: string) => {
  const urlBackend = `/api/v1/classes?${query}`;
  return axios.get<IBackendRes<IModelPaginate<IClass>>>(urlBackend);
};
export const createClassAPI = (data: any) => {
  const urlBackend = "/api/v1/classes";
  return axios.post<IBackendRes<IClass>>(urlBackend, { ...data });
};

/**
 * Module Semester API
 */
export const getSemesterAPI = (query: string) => {
  const urlBackend = `/api/v1/semester?${query}`;
  return axios.get<IBackendRes<IModelPaginate<ISemester>>>(urlBackend);
};
export const createSemesterAPI = (data: any) => {
  const urlBackend = "/api/v1/semester";
  return axios.post<IBackendRes<ISemester>>(urlBackend, { ...data });
};

export const callUpdateSemester = (
  id: number | string,
  semester: ISemester
) => {
  return axios.patch<IBackendRes<ISemester>>(`/api/v1/semester/${id}`, {
    ...semester,
  });
};

/**
 * Module Subject API
 */
export const getSubjectAPI = (query: string) => {
  const urlBackend = `/api/v1/subject?${query}`;
  return axios.get<IBackendRes<IModelPaginate<ISubject>>>(urlBackend);
};

export const createSubjectAPI = (data: any) => {
  const urlBackend = "/api/v1/subject";
  return axios.post<IBackendRes<ISubject>>(urlBackend, { ...data });
};

/**
 * Module Schedule API
 */
export const getScheduleAPI = (query: string) => {
  const urlBackend = `/api/v1/schedule?${query}`;
  return axios.get<IBackendRes<IModelPaginate<ISchedule>>>(urlBackend);
};
export const createScheduleAPI = (data: any) => {
  const urlBackend = "/api/v1/schedule";
  return axios.post<IBackendRes<ISchedule>>(urlBackend, { ...data });
};

export const getScheduleListTodayAPI = (query: string) => {
  const urlBackend = `/api/v1/schedule/today?${query}`;
  return axios.get<IBackendRes<ISchedule[]>>(urlBackend);
};

export const getScheduleTimeTableTeacherAPI = () => {
  const urlBackend = "/api/v1/schedule/time-table";
  return axios.get<IBackendRes<ISchedule[]>>(urlBackend);
};
export const getScheduleTimeTableStudentAPI = () => {
  const urlBackend = "/api/v1/schedule/time-table-student";
  return axios.get<IBackendRes<ISchedule[]>>(urlBackend);
};

export const getClassListTeacher = () => {
  const urlBackend = "/api/v1/schedule/class-list";
  return axios.get<IBackendRes<ISchedule[]>>(urlBackend);
};

export const getClassStudentListAPI = (id: number) => {
  const urlBackend = `/api/v1/schedule/schedule-class/${id}`;
  return axios.get<IBackendRes<ISchedule>>(urlBackend);
};

/**
 * Day of week
 */
export const getDayOfWeekAPI = () => {
  const urlBackend = `/api/v1/day-of-week?`;
  return axios.get<IBackendRes<IDayOfWeek[]>>(urlBackend);
};

/**
 * Module Attendance API
 */
export const getAttendanceByDateAPI = (query: string) => {
  const urlBackend = `/api/v1/attendance/by-date?${query}`;
  return axios.get<IBackendRes<IAttendance[]>>(urlBackend);
};

export const updateAttendanceAPI = (query: string, data: any) => {
  const urlBackend = `/api/v1/attendance/update?${query}`;
  return axios.put<IBackendRes<IAttendance>>(urlBackend, { ...data });
};
export const createListAttendanceScheduleAPI = (scheduleId: number) => {
  const urlBackend = `/api/v1/attendance/add-attendance`;
  return axios.post<IBackendRes<IAttendance>>(urlBackend, { scheduleId });
};

export const createQrCodeAPI = (scheduleId: number, date:string) => {
  const urlBackend = `/api/v1/attendance/qrcode`;
  return axios.post<IBackendRes<ICreateQRCode>>(urlBackend, { scheduleId, date });
};
/**
 * Module Score API
 */
export const updateScoreStudentAPI = (id: number, data: any) => {
  const urlBackend = `/api/v1/score/${id}`;
  return axios.patch<IBackendRes<IScore>>(urlBackend, { ...data });
};

export const showAllListScoreStudentAPI = () => {
  const urlBackend = "/api/v1/semester/score-student";
  return axios.get<IBackendRes<IScoreSemester[]>>(urlBackend);
};

/**
 * Module Mail API
 */
export const callUpdateMailUserAPI = (data: any) => {
  const urlBackend = "/api/v1/update-info-user";
  return axios.post<IBackendRes<IUpdateData>>(urlBackend, { ...data });
};

/** 
 * Module Update user info API
*/

export const getUpdateUserInfo = (id: string) =>{
  const urlBackend = `/api/v1/update-info-user/approve-user/${id}`;
  return axios.get<IBackendRes<IUpdateData>>(urlBackend);
}

export const updateUserInfo = (id:string) =>{
  const urlBackend = `/api/v1/update-info-user/approve-update/${id}`;
  return axios.post<IBackendRes<IUpdateData>>(urlBackend);
}


/**
 * Module Campus API
 */
export const getCampusAPI = (query: string) => {
  const urlBackend = `/api/v1/campus?${query}`;
  return axios.get<IBackendRes<IModelPaginate<ICampus>>>(urlBackend);
}

export const getAllTotalCampusAPI = () => {
  const urlBackend = `/api/v1/campus/total-all-campus`;
  return axios.get<IBackendRes<ITotalCampus>>(urlBackend);
}

export const summaryCampusDetailAPI = (campusId:number) => {
  const urlBackend = `/api/v1/campus/summary?campusId=${campusId}`;
  return axios.get<IBackendRes<ISummaryCampus>>(urlBackend);
};

export const createCampusAPI = (data: any) => {
  const urlBackend = "/api/v1/campus";
  return axios.post<IBackendRes<ICampus>>(urlBackend, { ...data });
}

export const detailCampusAPI = (id: number) => {
  const urlBackend = `/api/v1/campus/campus-detail?campusId=${id}`;
  return axios.get<IBackendRes<IDetailCampus>>(urlBackend);
}

export const createBuildingAPI = (data: any) => {
  const urlBackend = "/api/v1/building";
  return axios.post<IBackendRes<IBuildingData>>(urlBackend, { ...data });
}

export const getListBuildingByCampusAPI = (id: string) => {
  const urlBackend = `/api/v1/building?campusID=${id}`;
  return axios.get<IBackendRes<IModelPaginate<IBuildingData>>>(urlBackend);
}


/**
 * Module Floor API
 */
export const getFloorAPI = (query: string) => {
  const urlBackend = `/api/v1/floor?buildingId=${query}`;
  return axios.get<IBackendRes<IModelPaginate<IFloorData>>>(urlBackend);
}