import { avatar } from "@/assets/avatar/avatar.jpg";
import { Boolean } from "./../../node_modules/sass/types/legacy/function.d";
export {};

declare global {
  interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }

  interface IModelPaginate<T> {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    result: T[];
  }

  interface ILogin {
    access_token: string;
    user: IUser;
  }

  interface IFetchAccount {
    user: IUser;
  }
  export interface IOptionSelect {
    label?: string | number;
    value?: number | string;
    key?: number | string;
  }

  interface IUser {
    id: string | number;
    email: string;
    name: string;
    avatar: string;
    role?: {
      id: string | number;
      name: string;
    };
  }

  interface IRole {
    id: string | number;
    name: string;
    description: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
  }

  interface IUserTable {
    id: string | number;
    name: string;
    email: string;
    date_of_birth: Date;
    gender: string;
    phone: string;
    address: string;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    role?: IRole;
    major?: IMajor;
    class?: IClass;
    yearOfAdmission?: ICohort;
    scores?: IScore[];
  }

  interface IDayOfWeek {
    id: number;
    name: string;
  }

  interface ICohort {
    id?: number | string;
    startYear?: number;
    endYear?: number;
  }

  interface IMajor {
    id?: number | string;
    name?: string;
    code: string;
  }

  interface IRoom {
    id?: number | string;
    name?: string;
    capacity?: number;
  }

  interface IClass {
    id?: number | string;
    name?: string;
    maxCapacity: number;
    students: IUserTable[];
  }

  interface ISemester {
    id?: number | string;
    name?: string;
    startDate: Date;
    endDate: Date;
    isMainSemester?: boolean;
    minCredits?: number;
    maxCredits?: number;
    status: number;
    cohort?: ICohort;
  }

  interface ISubject {
    id?: number | string;
    name?: string;
    code: string;
    credits: number;
    type: string;
    schedules: ISchedule;
  }
  interface ISchedule {
    id: number;
    daysOfWeek: IDayOfWeek[];
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    room: IRoom;
    subject: ISubject;
    teacher: IUser;
    class: IClass;
    semester: ISemester;
  }
  interface IAttendance {
    id: number;
    date: Date;
    isPresent: boolean;
    student: IUserTable;
    schedule: ISchedule;
  }
  interface IScore {
    id: number;
    attendanceScore: float;
    midtermScore: float;
    finalScore: float;
    subject?: ISubject;
    semesters: ISemester;
  }

  interface IScoreSemester {
    id: number | string;
    semesterName: string;
    scores: IScore[];
  }
  interface IUpdateData {
    id:string
    data: Record<string, any>;
    status?: "pending" | "approved" | "rejected";
    user:IUserTable
  }

  interface IExcelData {
    fullName: string;
    email: string;
    // phone: string;
    password?: string;
  }

  interface IDataImportProps {
    setOpenModalImport: (open: boolean) => void;
    openModalImport: boolean;
    fetchData: () => void;
    headers: string[];
    dataMapping: string[];
    templateFileUrl: string;
    uploadTitle?: string;
    apiFunction: (data: ExcelData[]) => Promise<any>;
  }

  interface IChangePassword {
    code: string;
    password: string;
    confirmPassword: string;
    email: string;
  }

  interface ICreateQRCode {
    qrCode: string;
  }
}
