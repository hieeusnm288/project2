import React, { useEffect, Fragment, useState } from "react";
import { Layout, Menu, Table } from "antd";
import { ContactsStore } from "../../mobxStore/ContactsStore";
import { titlecase } from "stringcase";

function PhongBan(props) {
  const { codeCongTy } = props;
  const { Header, Content, Footer, Sider } = Layout;
  const contact = ContactsStore();
  const [phongBan, setPhongBan] = useState();
  //   const [keySearch, setSearch] = useState("");
  useEffect(() => {
    contact.getPhongBan(codeCongTy);
  }, [codeCongTy]);
  //   const items = contact.listPhongBan?.map((item) => item.code);
  //   console.log("Phong Ban: ", codeCongTy);
  useEffect(() => {
    contact.getNhanVienPB(phongBan, codeCongTy);
  }, [phongBan, codeCongTy]);

  const columns = [
    {
      title: "Thông Tin",
      dataIndex: "name_uppercase",
      render: (index) => (
        <Fragment>
          {index ? (
            titlecase(index)
          ) : (
            <span style={{ opacity: 0.7 }}>
              <i>Không rõ</i>
            </span>
          )}
        </Fragment>
      ),
    },
    {
      title: "ID",
      dataIndex: "username",
    },
    {
      title: "Mã Nhân Viên",
      dataIndex: "ma_nv",
      render: (index) => (
        <Fragment>
          {index ? (
            index
          ) : (
            <span style={{ opacity: 0.7 }}>
              <i>Không rõ</i>
            </span>
          )}
        </Fragment>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Số máy nội bộ",
      dataIndex: "home_phone",
      render: (index) => (
        <Fragment>
          {index ? (
            index
          ) : (
            <span style={{ opacity: 0.7 }}>
              <i>Không rõ</i>
            </span>
          )}
        </Fragment>
      ),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      render: (index) => (
        <Fragment>
          {index ? (
            index
          ) : (
            <span style={{ opacity: 0.7 }}>
              <i>Không rõ</i>
            </span>
          )}
        </Fragment>
      ),
    },
    {
      title: "Chức vụ",
      dataIndex: "position",
      render: (index) => (
        <Fragment>
          {index ? (
            index.name
          ) : (
            <span style={{ opacity: 0.7 }}>
              <i>Không rõ</i>
            </span>
          )}
        </Fragment>
      ),
    },
    {
      title: "Phòng Ban",
      dataIndex: "department",
      render: (index) => (
        <Fragment>
          {index ? (
            index.name
          ) : (
            <span style={{ opacity: 0.7 }}>
              <i>Không rõ</i>
            </span>
          )}
        </Fragment>
      ),
    },
  ];

  return (
    <Layout hasSider style={{ maxHeight: "100%", backgroundColor: "white" }}>
      <Sider
        style={{
          overflow: "auto",
          backgroundColor: "white",
          //   border: "0.5px solid #333",
          //   maxHeight: "75%",
        }}
      >
        <Menu>
          {contact.listPhongBan?.map((item) => (
            <Menu.Item onClick={() => setPhongBan(item.code)}>
              {item.name}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Content
        style={{
          margin: "24px 16px 0",
          overflow: "initial",
          backgroundColor: "white",
        }}
      >
        <div
          className="site-layout-background"
          style={{
            padding: 24,
            textAlign: "center",
            backgroundColor: "white",
          }}
        >
          <Table
            columns={columns}
            dataSource={contact.listNVPB}
            size="middle"
            pagination={false}
            style={{ marginBottom: "20px" }}
          />
        </div>
      </Content>
    </Layout>
  );
}

export default PhongBan;
