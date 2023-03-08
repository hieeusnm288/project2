import {
  getLichCoQuan,
  getDetailLich,
  getUserDepartments,
  createLichCoQuan,
  deleteLichCoQuan,
  updateLichCoQuan,
  UploadFile,
} from "../service/Appservice";
import { useState } from "react";

export function ScheduleStore() {
  const [schedule, setSchedule] = useState([]);
  const [detialLich, setDetialLich] = useState();
  const [userDepartments, setUserDepartments] = useState();
  const [dataLich, setDataLich] = useState({});
  return {
    lstSchedule: [schedule],
    chiTietLich: [detialLich],
    lstDepartments: [userDepartments],
    async getSchedule(from_date, to_date) {
      const res = await getLichCoQuan(from_date, to_date);
      setSchedule(res);
    },

    async getDetaiSchedule(code) {
      const res = await getDetailLich(code);
      // console.log("res detail:", res);
      setDetialLich(res);
    },

    async getUserPhongBan() {
      const res = await getUserDepartments();
      setUserDepartments(res);
    },

    async createLich(data) {
      // console.log(data);
      const res = await createLichCoQuan(data);
      // console.log(res);
    },

    async deleteLich(code) {
      console.log(code);
      const res = await deleteLichCoQuan(code);
    },

    async updateLich(code, data) {
      const res = await updateLichCoQuan(code, data);
      // console.log("code update: ", code);
      // console.log("data update: ", data);
    },

    async uploadFile() {
      const res = await UploadFile();
    },
  };
}
