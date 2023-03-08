import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ScheduleStore } from "../../mobxStore/ScheduleStore";
import {
  Button,
  Form,
  Input,
  InputNumber,
  DatePicker,
  TimePicker,
  message,
  Upload,
  TreeSelect,
} from "antd";
import { UploadOutlined, LeftCircleOutlined } from "@ant-design/icons";

import { useFormik } from "formik";
import * as Yup from "yup";
import { titlecase } from "stringcase";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import moment from "moment";

function UpdateLich() {
  const navigate = useNavigate();
  const schedule = ScheduleStore();
  // Tree Select
  const [form] = Form.useForm();
  var { code } = useParams();

  const backToList = () => {
    navigate("/company-work-schedule");
  };
  // const phongBan = schedule?.lstDepartments[0]?.map((index) => index.name);
  // console.log("phong ban: ", phongBan);
  const treeData = schedule?.lstDepartments[0]?.map((item, index) => {
    return {
      title: item?.name,
      value: item?.code,
      children: item.users?.map((item1, index1) => {
        return {
          title: titlecase(item1?.name_uppercase),
          value: item1?.user_code,
          // value: {
          //   assignee_code: item1?.assignee_code,
          //   assignee_type: item1?.assignee_type,
          //   permission: item1?.permission,
          // },
        };
      }),
    };
  });
  const [value, setValue] = useState(undefined);

  // Upload
  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const [startDate, setStartDate] = useState(new Date());
  const [timeStart, setTimeStart] = useState();
  const [assignees, setAssignees] = useState();

  const onFinish = (values) => {
    values.event_notice = form.getFieldValue("data");
    console.log(values);
  };

  const onChangeTree = (newValue) => {
    setValue(newValue);
    formik.setFieldValue("assignees", newValue);
  };

  const onChangeDate = (date, dateString) => {
    setStartDate(date);
    // formik.setFieldValue("start_at", dateString);
    // console.log(startDate._d);
  };
  const onChangeStart = (start, timeStart) => {
    // setTimeStartt(start)
    const startAt = moment(start).format();
    formik.setFieldValue("start_at", startAt);
    // formik.setFieldValue("created_at", `${startAt}`);
    // console.log("start", start);
  };

  const onChangeEnd = (end, timeEnd) => {
    // console.log("first", end);
    const endAt = moment(end).format();
    formik.setFieldValue("end_at", endAt);
  };
  const today = new Date();
  //   schedule.chiTietLich[0]?.start_at = new Date();
  //   console.log("string to date", today);
  const getPhongBan = () => {
    schedule.getUserPhongBan();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      assign_person_update: { new_items: [], remove_items: [] },
      start_at: "",
      // created_at: moment(today).format(),
      updated_at: "",
      title: "",
      end_at: "",
      host: schedule.chiTietLich[0]?.host,
      location: schedule.chiTietLich[0]?.location,
      preparation: schedule.chiTietLich[0]?.preparation,
      event_notice: "",
      attenders: "",
      // assignees: [{}],
      last_edit_by: null,
      file_ids: [],
    },
    validationSchema: Yup.object({
      host: Yup.string().required("Không được để trống"),
      location: Yup.string().required("Không được để trống"),
    }),
    onSubmit: (values) => {
      // console.log("values Lịch", values);
      schedule.updateLich(code, values);
      navigate("/company-work-schedule");
    },
  });

  const getInfoLich = () => {
    schedule.getDetaiSchedule(code);
  };
  //   console.log(schedule.chiTietLich[0]?.host);

  useEffect(() => {
    getPhongBan();
    getInfoLich();
    document.title = "Chi tiết sự kiện";
  }, []);

  return (
    <>
      <div className="d-flex">
        <LeftCircleOutlined
          style={{ fontSize: "25px", color: "#333" }}
          onClick={backToList}
        />
      </div>
      <div className="container">
        <Form
          layout="vertical"
          name="nest-messages"
          onFinish={formik.handleSubmit}
          //   validateMessages={validateMessages}
          form={form}
        >
          <div className="d-flex justify-content-between">
            <Form.Item
              name="start_at"
              label="Ngày Thực Hiện"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker
                onChange={onChangeDate}
                defaultValue={moment(today, "DD-MM-YYYY")}
                format="DD-MM-YYYY"
              />
            </Form.Item>
            <Form.Item
              name="start_at"
              label="Thời gian bắt đầu"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <TimePicker
                onChange={onChangeStart}
                defaultOpenValue={moment("00:00", "HH:mm")}
                format="HH:mm"
              />
            </Form.Item>
            <Form.Item name="end_at" label="Thời gian kết thúc">
              <TimePicker
                onChange={onChangeEnd}
                defaultOpenValue={moment(startDate)}
                format="HH:mm"
              />
            </Form.Item>
          </div>
          <Form.Item
            label="Chủ trì"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              name="host"
              onChange={formik.handleChange}
              //   defaultValue={schedule.chiTietLich[0]?.host}
              value={formik.values.host}
            />
          </Form.Item>
          <Form.Item
            label="Địa điểm"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              name="location"
              onChange={formik.handleChange}
              value={formik.values.location}
            />
          </Form.Item>
          <Form.Item
            label="Chuẩn bị"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              name="preparation"
              onChange={formik.handleChange}
              value={formik.values.preparation}
            />
          </Form.Item>
          <Form.Item label="Nội dung dự kiến">
            <CKEditor
              editor={ClassicEditor}
              data={schedule.chiTietLich[0]?.event_notice}
              name="event_notice"
              // onReady={editor => {
              //     // You can store the "editor" and use when it is needed.
              //     console.log('Editor is ready to use!', editor);
              // }}
              onChange={(event, editor) => {
                const data = editor.getData();
                formik.setFieldValue("event_notice", data);
              }}
              // onBlur={(event, editor) => {
              //     console.log('Blur.', editor);
              // }}
              // onFocus={(event, editor) => {
              //     console.log('Focus.', editor);
              // }}
            />
          </Form.Item>
          <Form.Item name="file_ids" label="Tài liệu đính kèm">
            <div className="d-flex">
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>
                  Chọn tài liệu đính kèm
                </Button>
              </Upload>
            </div>
          </Form.Item>
          <Form.Item label="Thành Viên Tham gia">
            <Input name="attenders" onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item name="assignees" label="Thông báo">
            <TreeSelect
              showSearch
              style={{
                width: "100%",
              }}
              value={value}
              dropdownStyle={{
                maxHeight: 400,
                overflow: "auto",
              }}
              placeholder="- Chọn người nhận thông báo"
              allowClear
              treeDefaultExpandAll
              onChange={onChangeTree}
              treeData={treeData}
              treeCheckable={true}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default UpdateLich;
