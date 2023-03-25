import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
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
import { addCategory, deleteCategory, getCategories } from "../../actions/category";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("Tên không được để trống"),
  nameCode: yup.string().required("Mã không được để trống"),
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

  const submitForm = (data, e) => {
    e.preventDefault();
    dispatch(addCategory({name: data.name, nameCode: data.nameCode}));
    resetField("name");
    resetField("nameCode");
    handleClose();
  };
  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
  }
  return (
    <div className="container">
      <div
        className="cart-form mb-50px table-responsive px-2"
        style={{ paddingTop: "20px" }}
      >
        <div className="row" style={{ margin: "20px 0" }}>
          <div className="col-md-3">
            <h4>Danh sách thể loại</h4>
          </div>
          <div className="col-md-3">
            <button className="btn btn-success" onClick={handleClickOpen}>
              <FontAwesomeIcon icon={faPlus} /> Thêm
            </button>
          </div>
          <Dialog open={open} onClose={handleClose} >
            <form noValidate onSubmit={handleSubmit(submitForm)} style={{width: '500px', height: '350px'}}>
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
                <TextField
                  autoFocus
                  margin="dense"
                  label="Mã"
                  type="text"
                  fullWidth
                  variant="standard"
                  {...register("nameCode")}
                />
                {errors.nameCode && (
                  <span className="error-message" role="alert">
                    {errors.nameCode?.message}
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
        <table className="table generic-table">
          <thead>
            <tr>
              <th scope="col">Tên</th>
              <th scope="col">Mã</th>
              <th scope="col">Chọn</th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.map((cate, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">
                      <div className="media media-card align-items-center shadow-none p-0 mb-0 rounded-0 bg-transparent">
                        <div className="media-body">
                          <h5 className="fs-15 fw-medium">{cate.name}</h5>
                        </div>
                      </div>
                    </th>
                    <td>{cate.nameCode}</td>
                    <td>
                      <button className="btn btn-danger" onClick={() => handleDelete(cate.nameCode)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
