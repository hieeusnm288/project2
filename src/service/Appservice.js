import axios from "./axios";
import axiosuser from "./useraxios";

const loginUser = (client_id, username, password, grant_type, scope) => {
  return axios.post("/auth/realms/VIMC/protocol/openid-connect/token", {
    client_id,
    username,
    password,
    grant_type,
    scope,
  });
};

const getUser = () => {
  return axiosuser.get("/api/v1/users/current-user");
};

const getLichCoQuan = (from_date, to_date) => {
  return axiosuser.get(
    `/api/v1/work-schedules?from_date=${from_date}&to_date=${to_date}`
  );
};

const getDetailLich = (code) => {
  return axiosuser.get(`/api/v1/work-schedules/${code}`);
};

const getUserDepartments = () => {
  return axiosuser.get("/api/v1/departments/users");
};

const createLichCoQuan = (data) => {
  return axiosuser.post("/api/v1/work-schedules", data);
};

const deleteLichCoQuan = (code) => {
  return axiosuser.delete(`/api/v1/work-schedules/${code}`);
};

const updateLichCoQuan = (code, data) => {
  return axiosuser.put(`/api/v1/work-schedules/${code}`, data);
};

// Thông báo

const getThongBaoChung = (size) => {
  return axiosuser.get(`/api/v1/news?page=0&size=${size}`);
};

const getDetailThongBao = (new_id) => {
  return axiosuser.get(`/api/v1/news/${new_id}`);
};
const deleteThongBao = (new_id) => {
  return axiosuser.delete(`/api/v1/news/${new_id}`);
};

const getTaiLieuThongBao = (file_id) => {
  return axiosuser.get(`/api/v1/upload/attachments/${file_id}`);
};

const UploadFile = () => {
  return axiosuser.post("/api/v1/upload");
};

const createThongBao = (data) => {
  return axiosuser.post("/api/v1/news", data);
};

const updateThongBao = (data) => {
  return axiosuser.patch(`/api/v1/news`, data);
};

// Danh bạ

const getNhanVien = (page, keyword, congty) => {
  return axiosuser.get(
    `/api/v1/users?page=${page}&size=10&keyword=${keyword}&status=true&sort=departmentCode,desc,HDQT,BDH,BTCNS,BTCKT,BTKTH,BKTKTNB,BVTB,BCB%26DVHH,BTTKH,BPC%26QTRR,BTGTT,VPCQTCT,BCNTT,CDTCT&company_code=${congty}`
  );
};

const getListPhongBan = (congty) => {
  return axiosuser.get(`/api/v1/departments/getAll?company_code=${congty}`);
};

const getNhanVienByPhongBan = (code, congty) => {
  return axiosuser.get(
    `/api/v1/users?page=0&size=10&keyword=&department_code=${code}&status=true&company_code=${congty}`
  );
};

const getDSCongTy = () => {
  return axiosuser.get("/api/v1/companies?status=true");
};

export {
  loginUser,
  getUser,
  getLichCoQuan,
  getDetailLich,
  getUserDepartments,
  createLichCoQuan,
  deleteLichCoQuan,
  updateLichCoQuan,
  getThongBaoChung,
  getDetailThongBao,
  getTaiLieuThongBao,
  UploadFile,
  createThongBao,
  deleteThongBao,
  updateThongBao,
  getNhanVien,
  getListPhongBan,
  getNhanVienByPhongBan,
  getDSCongTy,
};
