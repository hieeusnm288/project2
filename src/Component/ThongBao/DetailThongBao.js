import React, { useState, useEffect } from "react";
import { NotificationsStore } from "../../mobxStore/NotificationsStore";
import { Button, Descriptions, PageHeader, Dropdown, Space, Menu } from "antd";
import { MoreOutlined, EyeOutlined } from "@ant-design/icons";
import { NavLink, useParams } from "react-router-dom";

function DetailThongBao() {
  const menudrop = (
    <Menu
      defaultSelectedKeys={["1"]}
      mode="inline"
      //   style={{ backgroundColor: "transparent" }}
    >
      <Menu.Item key="1">
        <a
          className="text-black nav-link focus:font-bold"
          to="/utility/general-notifications"
        >
          Sửa thông tin
        </a>
      </Menu.Item>
      <Menu.Item key="2">
        <a
          className="text-black nav-link focus:font-bold"
          to="/utility/general-notifications"
        >
          Xóa
        </a>
      </Menu.Item>
    </Menu>
  );

  const stringToHTML = (str) => {
    var dom = document.createElement("div");
    dom.innerHTML = str;
    return dom;
  };

  const getFiles = (fileId, file_name) => {
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("item"),
      },
    };
    fetch(
      `https://stg.vimc.fafu.com.vn/api/v1/upload/attachments/${fileId}`,
      options
    )
      .then((res) => {
        res.blob().then((blob) => {
          console.log("first", blob);
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement("a");
          a.href = url;
          a.download = `${file_name}`;
          a.click();
        });
      })
      .catch(() => alert("Tải không thành công!"));
  };

  const notifications = NotificationsStore();
  //   console.log("detail", notifications.detailThongBao);
  var { id } = useParams();
  //   console.log(id);
  //   const getDetailTB = () => {
  //     notifications.getDetail(id)
  //   };

  useEffect(() => {
    notifications.getDetail(id);
    document.title = "Chi tiết tin tức";
  }, []);
  return (
    <div>
      <div>
        <PageHeader
          ghost={false}
          title={notifications.detailThongBao?.subject}
          extra={[
            //   <Button
            //     key="1"
            //     style={{ border: "none", width: "40px", height: "40px" }}
            //   >
            //     <MoreOutlined style={{ margin: "0 auto", fontSize: "20px" }} />
            //   </Button>,
            <Dropdown overlay={menudrop} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <MoreOutlined
                    style={{ margin: "0 auto", fontSize: "20px" }}
                  />
                </Space>
              </a>
            </Dropdown>,
          ]}
        >
          <Descriptions size="small" column={1} style={{ textAlign: "left" }}>
            <Descriptions.Item>
              {/* {stringToHTML(notifications.detailThongBao?.content).textContent}
               */}
              <div
                style={{ width: "100%" }}
                dangerouslySetInnerHTML={{
                  __html: notifications.detailThongBao?.content,
                }}
              ></div>
            </Descriptions.Item>
            <Descriptions.Item label="Tài liệu đính kèm">
              {/* {notifications.detailThongBao?.attachments ? (
                <a
                  href={notifications.detailThongBao?.attachments[0]?.file_name}
                  style={{ textDecoration: "none" }}
                >
                  {notifications.detailThongBao?.attachments[0]?.file_name}
                </a>
              ) : (
                ""
              )} */}
              <p>
                {notifications.detailThongBao?.attachments ? (
                  <>
                    {notifications.detailThongBao?.attachments.map((file) => {
                      return (
                        <div className="mx-2 flex items-center text-blue-600">
                          {/* <AiOutlineFile /> */}
                          <a
                            className="ml-1 mr-3 hover:underline"
                            title="Tải xuống"
                            style={{ textDecoration: "none" }}
                            onClick={() => {
                              getFiles(file.file_id, file.file_name);
                            }}
                          >
                            {file.file_name}
                          </a>
                          <a
                            className="px-1 rounded text-green-600 hover:bg-slate-100"
                            title="Xem tài liệu"
                          >
                            <EyeOutlined />
                          </a>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <i className="mx-2">Không có tài liệu đính kèm</i>
                )}
              </p>
            </Descriptions.Item>
          </Descriptions>
        </PageHeader>
      </div>
    </div>
  );
}

export default DetailThongBao;
