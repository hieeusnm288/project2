import {
  getThongBaoChung,
  getDetailThongBao,
  getTaiLieuThongBao,
  UploadFile,
  createThongBao,
  getUser,
  deleteThongBao,
  updateThongBao,
} from "../service/Appservice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function NotificationsStore() {
  const [listThongBao, setListThongBao] = useState([]);
  const [detailTB, setDeatilTB] = useState();
  const [fileTB, setFileTB] = useState();
  const [user, setUser] = useState();
  const [resDelete, setResDelete] = useState();
  const [sizeTB, setSizeTB] = useState();
  const navigate = useNavigate();
  // const [fil]
  return {
    lstThongBao: listThongBao,
    detailThongBao: detailTB,
    filesTB: fileTB,
    userInfo: user,
    resdel: resDelete,
    sizeThongBao: sizeTB,
    async getListThongBao(size) {
      const res = await getThongBaoChung(size);
      // console.log(res.total_count);
      setSizeTB(res.total_count);
      setListThongBao(res.data);
    },

    async getDetail(id) {
      const res = await getDetailThongBao(id);
      setDeatilTB(res);
    },

    async getFile(file_id) {
      const res = await getTaiLieuThongBao(file_id);
    },
    async uploadFiles() {
      const res = await UploadFile();
      setDeatilTB(res);
      console.log(res);
    },

    async getAuthor() {
      const res = await getUser();
      setUser(res);
    },

    async DangThongBao(data) {
      // console.log("data", data);
      const res = await createThongBao(data);
      // console.log("res", res);
    },

    async XoaThongBao(id) {
      const res = await deleteThongBao(id);
      setResDelete(res);
      console.log(res);
      if (res === 200) {
        navigate("/utility/general-notifications");
        this.getListThongBao(0);
      }
    },

    async SuaThongBao(data) {
      const res = await updateThongBao(data);
      // console.log("id: ", id + " data:, ", data);
    },
  };
}
