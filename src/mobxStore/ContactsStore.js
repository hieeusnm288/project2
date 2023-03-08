import { useState } from "react";
import {
  getListPhongBan,
  getNhanVien,
  getNhanVienByPhongBan,
  getDSCongTy,
} from "../service/Appservice";

export function ContactsStore() {
  const [nhanVien, setNhanVien] = useState();
  const [totalPage, setToTalPage] = useState();
  const [phongBan, setPhongBan] = useState();
  const [nhanVienPB, setNhanVienPB] = useState();
  const [congTy, setCongTy] = useState();
  return {
    listNhanVien: nhanVien,
    totalPageNV: totalPage,
    listPhongBan: phongBan,
    listNVPB: nhanVienPB,
    listCongTy: congTy,
    async getListNhanVien(page, keyword, congty) {
      const res = await getNhanVien(page, keyword, congty);
      setNhanVien(res.data);
      //   console.log(res.total_page);
      setToTalPage(res.total_page);
    },
    async getPhongBan(congty) {
      const res = await getListPhongBan(congty);
      setPhongBan(res);
    },

    async getNhanVienPB(code, congty) {
      const res = await getNhanVienByPhongBan(code, congty);
      setNhanVienPB(res.data);
    },

    async getCongTy() {
      const res = await getDSCongTy();
      //   console.log(res);
      setCongTy(res);
    },
  };
}
