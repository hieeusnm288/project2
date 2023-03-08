import React, { useState, useEffect } from "react";
import { NotificationsStore } from "../../mobxStore/NotificationsStore";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Button,
  Descriptions,
  PageHeader,
  Dropdown,
  Space,
  Menu,
  Popconfirm,
  message,
  Modal,
} from "antd";
import { MoreOutlined, EyeOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { FileViewer } from "react-file-viewer";
import "./ListThongBao.scss";

function ListThongBao() {
  const [size, setSize] = useState(10);
  const notifications = NotificationsStore();
  const [idDetail, setIdDetail] = useState();
  //   const [fileId, setFileId] = useState();
  const [hasMore, setHasMore] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
    // alert("aaaaaaaaa");
  };
  // const stringToHTML = (str) => {
  //   var dom = document.createElement("div");
  //   dom.innerHTML = str;
  //   return dom;
  // };

  const navigate = useNavigate();
  const pageDetailNoti = () => {
    // const id = notifications.lstThongBao?.map((data) => data.id);
    navigate(`/utility/general-notifications/view/${idDetail}`);
    // console.log("data detail id: ", id);
  };

  const pageUpdate = () => {
    // const id = notifications.lstThongBao?.map((data) => data.id);
    navigate(`/utility/general-notifications/update/${idDetail}`);
    // console.log("data detail id: ", id);
  };

  const confirm = (e) => {
    notifications.XoaThongBao(idDetail);
    message.success("Xóa Thành Công");
    notifications.getListThongBao(10);
  };
  const cancel = (e) => {
    // message.error("Click on No");
  };

  const menudrop = (
    <Menu
      //   defaultSelectedKeys={["1"]}
      mode="inline"
      //   style={{ backgroundColor: "transparent" }}
    >
      <Menu.Item key="1">
        <a
          className="text-black nav-link focus:font-bold"
          onClick={pageDetailNoti}
          style={{ border: "none", width: "100%" }}
        >
          Xem chi tiết
        </a>
      </Menu.Item>
      <Menu.Item key="2">
        <a
          className="text-black nav-link focus:font-bold"
          onClick={pageUpdate}
          style={{ border: "none" }}
        >
          Sửa
        </a>
      </Menu.Item>
      <Menu.Item key="3">
        <Popconfirm
          title="Bạn có chắc muốn xóa tin này!"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <a
            style={{
              border: "none",
            }}
          >
            Xóa
          </a>
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

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

  useEffect(() => {
    notifications.getListThongBao(size);
  }, [size]);

  // console.log("list: ", notifications.lstThongBao);
  // console.log(notifications.sizeThongBao);
  // console.log("Ngoai", size);
  const fetchMoreData = () => {
    console.log(notifications.lstThongBao);
    setSize(size + 10);
    notifications.getListThongBao(size + 10);
  };

  return (
    <div>
      <Button
        key="1"
        style={{ border: "none", float: "right" }}
        className="my-3"
        onClick={() => navigate("/utility/general-notifications/create")}
      >
        Đăng Thông Báo
      </Button>
      <div>
        <InfiniteScroll
          dataLength={
            notifications.sizeThongBao ? notifications.sizeThongBao : 50
          }
          next={fetchMoreData}
          hasMore={hasMore}
          className="d-flex w-100 flex-wrap mt-5"
        >
          {notifications.lstThongBao?.map((noti, index) => (
            <PageHeader
              ghost={false}
              title={noti.subject}
              style={{ margin: "20px 20px 0px 0px", width: "48%" }}
              extra={[
                <Dropdown overlay={menudrop} trigger={["click"]}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <MoreOutlined
                        style={{ margin: "0 auto", fontSize: "20px" }}
                        onClick={() => setIdDetail(noti.id)}
                      />
                    </Space>
                  </a>
                </Dropdown>,
              ]}
            >
              <Descriptions
                size="small"
                column={1}
                style={{ textAlign: "left" }}
              >
                <Descriptions.Item>
                  {/* {stringToHTML(noti.content).textContent} */}
                  <div
                    style={{ width: "100%" }}
                    dangerouslySetInnerHTML={{
                      __html: noti.content,
                    }}
                  ></div>
                </Descriptions.Item>
                <Descriptions.Item label="Tài liệu đính kèm">
                  <p>
                    {noti.attachments ? (
                      <>
                        {noti.attachments.map((file) => {
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
                                <EyeOutlined onClick={showModal} />
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
          ))}
        </InfiniteScroll>
        <Modal title="Basic Modal" open={isModalOpen}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    </div>
  );
}

export default ListThongBao;
