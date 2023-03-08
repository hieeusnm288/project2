import { Tabs } from "antd";
import React, { useState, useEffect } from "react";
import NhanVien from "./NhanVien";
import PhongBan from "./PhongBan";
import { ContactsStore } from "../../mobxStore/ContactsStore";
import { Select } from "antd";

function DanhBa() {
  const contact = ContactsStore();
  const [codeCongTy, setCodeCongTy] = useState();
  useEffect(() => {
    contact.getCongTy();
  }, []);
  const handleChange = (value) => {
    // console.log(`selected ${value}`);
    setCodeCongTy(value);
  };
  // console.log("code", codeCongTy);
  //   console.log(contact?.listCongTy[0].code);
  return (
    <div style={{ backgroundColor: "white" }}>
      <div className="pt-5" style={{ float: "right", marginRight: "50px" }}>
        <Select
          style={{ width: "300px" }}
          onChange={handleChange}
          //   defaultValue={contact ? contact.listCongTy[0]?.code : ""}
        >
          {contact.listCongTy?.map((item) => {
            return <Select.Option value={item.code}>{item.name}</Select.Option>;
          })}
        </Select>
      </div>
      <Tabs defaultActiveKey="1" style={{ width: "95%", margin: "0 auto" }}>
        <Tabs.TabPane tab="Nhân Viên" key="1" style={{ marginBottom: "20px" }}>
          <NhanVien codeCongTy={codeCongTy} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Phòng Ban" key="2" style={{ marginBottom: "20px" }}>
          <PhongBan codeCongTy={codeCongTy} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default DanhBa;
