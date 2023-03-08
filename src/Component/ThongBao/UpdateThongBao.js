import { Button, Checkbox, Form, Input, message, Upload } from "antd";
import { UploadOutlined, LeftCircleOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { NotificationsStore } from "../../mobxStore/NotificationsStore";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";

function UpdateThongBao() {
  const notifications = NotificationsStore();
  const navigate = useNavigate();
  const [idFile, setIdFile] = useState();
  const [fileList, setFileList] = useState();
  const [listFileDetailTB, setListFileDeatailTB] = useState();

  var { id } = useParams();
  //   console.log("params id", id);
  // const [userInfo, setUserInfo] = useState({});
  const backToList = () => {
    navigate("/utility/general-notifications");
  };
  useEffect(() => {
    notifications.getAuthor();
    notifications.getDetail(id);
    notifications.getFile("63e1c67b3628337f0ddd853f");
    document.title = "Sửa thông báo";
  }, []);

  const listFileDetail = notifications.detailThongBao?.attachments?.map(
    (item) => {
      const fileList = {
        uid: item.file_id,
        name: item.file_name,
        status: "done",
      };
      return fileList;
    }
  );

  //   setListFileDeatailTB(listFileDetail);
  //   console.log("listFileDetailTB: ", listFileDetailTB);
  //   console.log(
  //     "Detail TB: ",
  //     notifications.detailThongBao?.attachments.map((item) => item.file_id)
  //   );

  const new_items_detail = listFileDetail
    ? listFileDetail?.map((item) => item.uid)
    : [];

  //   console.log(new_items_detail);

  console.log("list File: ", listFileDetail);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      subject: notifications.detailThongBao?.subject,
      content: notifications.detailThongBao?.content,
      author: {
        name_lowercase: notifications.userInfo?.name_lowercase,
        user_name: notifications.userInfo?.username,
      },
      id: id,
      attachments_request: {
        // new_items: [`${fileList}`],
        new_items: idFile ? idFile : new_items_detail,
      },
    },
    validationSchema: Yup.object({
      subject: Yup.string().required("Không được để trống"),
    }),
    onSubmit: (values) => {
      console.log(values);
      //   notifications.SuaThongBao(values);
      //   navigate("/utility/general-notifications");
    },
  });
  // console.log("file List: ", fileList);

  //   console.log(listFileDetail?.map((item) => item.uid));

  const props = {
    name: "file",
    action: "https://stg.vimc.fafu.com.vn/api/v1/upload",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("item"),
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        let reader = new FileReader();
        reader.onload = (e) => {};
        reader.readAsText(info.file.originFileObj);
      }
      if (info.file.status === "done") {
        // console.log("check", info.file.response.file_id );
        message.success(`${info.file.name} tải lên thành công!`);
        const listId = info.fileList
          ?.map((item) => item.response.file_id)
          .toString();
        // const a = listId.map((index) => index.toString());
        setIdFile([listId, ...new_items_detail]);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} tải lên thất bại!`);
      }
    },
    // defaultFileList: listFileDetail ? listFileDetail : [],
    defaultFileList: [
      {
        uid: "1",
        name: "Abc",
        status: "done",
      },
    ],
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        marginTop: "50px",
        width: "90%",
        margin: "0 auto",
        height: "900px",
        // display: "flex",
      }}
    >
      <div style={{ display: "flex", marginLeft: "50px", paddingTop: "30px" }}>
        <LeftCircleOutlined
          style={{
            fontSize: "25px",
            color: "#333",
            marginTop: "8px",
            marginLeft: "20px",
          }}
          onClick={backToList}
        />
        <p style={{ fontWeight: "500", fontSize: "25px", marginLeft: "20px" }}>
          Sửa Thông Báo
        </p>
      </div>
      <div className="container w-50 d-flex mt-5">
        <Form
          layout="vertical"
          name="nest-messages"
          onFinish={formik.handleSubmit}
        >
          <Form.Item label="Tiêu đề">
            <Input
              name="subject"
              onChange={formik.handleChange}
              value={formik.values.subject}
            />
          </Form.Item>

          <Form.Item label="Nội dung">
            <CKEditor
              editor={ClassicEditor}
              data={notifications.detailThongBao?.content}
              name="content"
              onChange={(event, editor) => {
                const data = editor.getData();
                formik.setFieldValue("content", data);
              }}
            />
          </Form.Item>
          <Form.Item>
            <Upload
              {...props}
              accept=".docx, .pdf, .png, .xlsx"
              multiple={true}
            >
              <button className="border rounded-md flex items-center px-2 py-1 hover:border-blue-300 ">
                <UploadOutlined className="mx-2" />
                Tài liệu đính kèm
              </button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default UpdateThongBao;
