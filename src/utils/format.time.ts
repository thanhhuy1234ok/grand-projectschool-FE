import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Kích hoạt các plugin
dayjs.extend(utc);
dayjs.extend(timezone);

const FormatUtils = {
  formatCurrencyWithVND: (amount: number): string => {
    const formatted = amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formatted.replace("₫", "VND");
  },

  // Định dạng ngày
  formatDate: (date: string | Date | undefined) => {
    const validDate = dayjs(date).isValid() ? dayjs(date) : dayjs();
    return validDate.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY");
  },

  formatMonth: (date: string | Date | undefined) => {
    const validDate = dayjs(date).isValid() ? dayjs(date) : dayjs();
    return validDate.tz("Asia/Ho_Chi_Minh").format("MM/YYYY");
  },

  // Định dạng ngày theo năm
  formatDateYear: (date: string | Date | undefined) => {
    const validDate = dayjs(date).isValid() ? dayjs(date) : dayjs();
    return validDate.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY");
  },

  // Định dạng ngày và giờ (giờ:phút:giây)
  formatDateTime: (date: string | Date | undefined) => {
    const validDate = dayjs(date).isValid() ? dayjs(date) : dayjs();
    return validDate.tz("Asia/Ho_Chi_Minh").format("DD/MM - HH:mm:ss");
  },

  // Định dạng đầy đủ ngày giờ
  formatFullDateTime: (date: string | Date | undefined) => {
    const validDate = dayjs(date).isValid() ? dayjs(date) : dayjs();
    return validDate.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY - HH:mm:ss");
  },

  // Định dạng giờ
  formatHour: (date: string | Date | undefined) => {
    const validDate = dayjs(date).isValid() ? dayjs(date) : dayjs();
    return validDate.tz("Asia/Ho_Chi_Minh").format("HH");
  },
};

export default FormatUtils;
