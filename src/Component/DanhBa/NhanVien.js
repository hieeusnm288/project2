import React, { Fragment, useEffect, useState } from "react";
import { ContactsStore } from "../../mobxStore/ContactsStore";
import { Table, Input, Pagination } from "antd";
import { titlecase } from "stringcase";
import ReactPaginate from "react-paginate";

function NhanVien(props) {
  const { codeCongTy } = props;
  //   console.log("code cong ty nhan vien: ", codeCongTy);
  const [page, setPage] = useState(0);
  const [keySearch, setSearch] = useState("");
  const { Search } = Input;
  const contact = ContactsStore();
  useEffect(() => {
    contact.getListNhanVien(page, keySearch, codeCongTy);
  }, [codeCongTy, keySearch]);

  const onSearch = (value) => {
    // console.log(value);
    setSearch(value);
    if (keySearch !== "") {
      contact.getListNhanVien(page, keySearch, codeCongTy);
    }
  };

  const handlePageClick = (event) => {
    contact.getListNhanVien(+event.selected, keySearch, codeCongTy);
  };

  //   console.log("nhan vien: ", contact.listNhanVien);
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
  //   const data = [];
  return (
    <div>
      <Search
        placeholder="Tìm kiếm người dùng theo tên...."
        onSearch={onSearch}
        enterButton
        allowClear
        style={{ marginBottom: "30px", width: "30%", display: "flex" }}
      />
      <Table
        columns={columns}
        dataSource={contact.listNhanVien}
        size="middle"
        pagination={false}
        style={{ marginBottom: "20px" }}
      />
      {/* <Pagination defaultCurrent={1} total={50} pageSize={10} />; */}
      <div style={{ float: "right" }}>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={4}
          pageCount={contact?.totalPageNV}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
    </div>
  );
}

export default NhanVien;
