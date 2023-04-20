import { faPen, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  deleteCategory,
  getCategories,
} from "../../actions/category";
import * as yup from "yup";
import { removeTones } from "../../helper/helpFunction";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import Sidebar from "../../components/Sidebar/Sidebar";
import ManagementSidebar from "../../components/Sidebar/ManagementSidebar";
import { useState } from "react";

const schema = yup.object({
  name: yup.string().required("Tên không được để trống"),
});

export default function Category() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const categories = useSelector((state) => state.category);
  const [listCategories, setListCategories] = useState([]);

  useEffect(() => {
    categories && setListCategories(categories.slice());
  }, [categories]);
  
  const [sName, setSName] = useState("");

  const submitForm = async (data, e) => {
    e.preventDefault();
    data.nameCode = removeTones(data.name);
    const res = await dispatch(
      addCategory({ name: data.name, nameCode: data.nameCode })
    );
    if (res.success) {
      NotificationManager.success(res.message, "Thông báo", 2000);
    } else {
      NotificationManager.error(res.message, "Lỗi", 2000);
    }
    resetField("name");
    resetField("nameCode");
    handleClose();
  };
  const handleDelete = async (id) => {
    const res = await dispatch(deleteCategory(id));
    if (res.success) {
      NotificationManager.success(res.message, "Thông báo", 2000);
    } else {
      NotificationManager.error(res.message, "Lỗi", 2000);
    }
  };
  const handleEdit = async (name) => {

  }

  const handleClickSearch = () => {
    setListCategories(categories.filter(cate => cate.name.indexOf(sName) !== -1));
  }

  return (
    <>
      <div className="container">
        <NotificationContainer />
        <div className="row">
          <div className="col-md-2" style={{ backgroundColor: "#fff" }}>
            <ManagementSidebar />
          </div>
          <div className="col-md-10">
            <div className="cart-form table-responsive px-2">
              <div className="search-card">
                <div className="row">
                  <h4>Lọc</h4>
                  <div className="col-md-3">
                    <TextField
                      id="outlined-basic"
                      label="Theo tên"
                      variant="outlined"
                      value={sName}
                      onChange={e => setSName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row" style={{ margin: "20px 0", display: "flex", justifyContent: "flex-start" }}>
                  <div className="btn-wrapper">
                    <button className="btn btn-primary" onClick={() => handleClickSearch()}>
                      <FontAwesomeIcon icon={faSearch} />
                      Tìm
                    </button>
                  </div>
                  <div className="btn-wrapper">
                    <button
                      className="btn btn-success"
                      onClick={handleClickOpen}
                    >
                      <FontAwesomeIcon icon={faPlus} /> Thêm
                    </button>
                  </div>
                </div>
              </div>
              <div className="search-result">
                <table className="table generic-table">
                  <thead>
                    <tr>
                      <th scope="col">Tên</th>
                      <th scope="col">Mã</th>
                      <th scope="col">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listCategories &&
                      listCategories.map((cate, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row">
                              <div className="media media-card align-items-center shadow-none p-0 mb-0 rounded-0 bg-transparent">
                                <div className="media-body">
                                  <h5 className="fs-15 fw-medium">
                                    {cate.name}
                                  </h5>
                                </div>
                              </div>
                            </th>
                            <td>{cate.nameCode}</td>
                            <td className="edit-column">
                              <button
                                className="btn btn-danger"
                                onClick={() => handleDelete(cate.nameCode)}
                              >
                                <FontAwesomeIcon icon={faTrash} /> Xóa
                              </button>
                              <button
                                className="btn btn-info"
                                onClick={() => handleEdit(cate)}
                              >
                                <FontAwesomeIcon icon={faPen} /> Sửa
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Dialog open={open} onClose={handleClose}>
          <form
            noValidate
            onSubmit={handleSubmit(submitForm)}
            style={{ width: "500px", height: "350px" }}
          >
            <DialogTitle>Thêm thể loại</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Tên thể loại"
                type="text"
                fullWidth
                variant="standard"
                {...register("name")}
              />
              {errors.name && (
                <span className="error-message" role="alert">
                  {errors.name?.message}
                </span>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Hủy</Button>
              <Button type="submit">Thêm</Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </>
  );
}
