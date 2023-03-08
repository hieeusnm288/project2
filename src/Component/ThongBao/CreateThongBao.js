import { Button, Checkbox, Form, Input, message, Upload } from "antd";
import { UploadOutlined, LeftCircleOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { NotificationsStore } from "../../mobxStore/NotificationsStore";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../service/Appservice";

function CreateThongBao() {
  const notifications = NotificationsStore();
  const navigate = useNavigate();
  const [idFile, setIdFile] = useState();
  const [fileList, setFileList] = useState();
  // const [userInfo, setUserInfo] = useState({});
  const backToList = () => {
    navigate("/utility/general-notifications");
  };
  useEffect(() => {
    notifications.getAuthor();
    document.title = "Đăng thông báo";
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      subject: "",
      content: "",
      author: {
        name_lowercase: notifications.userInfo?.name_lowercase,
        user_name: notifications.userInfo?.username,
      },
      id: null,
      attachments_request: {
        // new_items: [`${fileList}`],
        new_items: idFile ? idFile : [],
      },
    },
    validationSchema: Yup.object({
      subject: Yup.string().required("Không được để trống"),
    }),
    onSubmit: (values) => {
      console.log(values);
      // alert(values);
      notifications.DangThongBao(values);
      navigate("/utility/general-notifications");
    },
  });
  // console.log("file List: ", fileList);

  // const loadFile = (info) => {
  //   if (info.file.status !== "uploading") {
  //     let reader = new FileReader();
  //     reader.onload = (e) => {};
  //     reader.readAsText(info.file.originFileObj);
  //   }
  //   if (info.file.status === "done") {
  //     console.log("check", info.file.response.file_id);
  //     message.success(`${info.file.name} tải lên thành công!`);
  //     const listId = info.fileList?.map((item) => item.response.file_id);
  //     const a = listId.map((index) => index.toString());
  //     setIdFile(a);
  //   } else if (info.file.status === "error") {
  //     message.error(`${info.file.name} tải lên thất bại!`);
  //   }
  // }

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
        const listId = info.fileList?.map((item) => item.response.file_id);
        // const a = listId.map((index) => index.toString());
        setIdFile(listId);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} tải lên thất bại!`);
      }
    },
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
          Đăng Thông Báo
        </p>
      </div>
      <div className="container w-50 d-flex mt-5">
        <Form
          layout="vertical"
          name="validate_other"
          onFinish={formik.handleSubmit}
        >
          <Form.Item label="Tiêu đề">
            <Input name="subject" onChange={formik.handleChange} />
          </Form.Item>

          <Form.Item label="Nội dung">
            <CKEditor
              editor={ClassicEditor}
              data=""
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
              <button
                // onClick={true}
                // htmlType="button"
                // icon={<UploadOutlined />}
                className="border rounded-md flex items-center px-2 py-1 hover:border-blue-300 "
              >
                <UploadOutlined className="mx-2" />
                Tài liệu đính kèm
              </button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              // onClick={formik.handleSubmit}
            >
              Đăng Thông Báo
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default CreateThongBao;
