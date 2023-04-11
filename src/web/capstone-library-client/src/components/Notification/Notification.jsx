import { faBell, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DoneAll } from "@mui/icons-material";
import {
  Button,
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  changeAllNotification,
  changeNotificationStatus,
  getNotification,
} from "../../apis/notification";
import { getTimeAgo } from "../../helper/helpFunction";
import "./notification.css";

export default function Notification() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [listNotice, setListNotice] = useState([]);
  const [isAllNotice, setIsAllNotice] = useState(true);
  const [notice, setNotice] = useState({});

  useEffect(() => {
    const getNotice = async () => {
      const { data } = await getNotification();
      data.value &&
        setListNotice(data.value.sort((a, b) => b.id - a.id).slice());
    };
    getNotice();
  }, []);
  //const [open, setOpen] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  useEffect(() => {
    const getNotice = async () => {
      const { data } = await getNotification();
      if (data.value) {
        isAllNotice
          ? setListNotice(data.value.sort((a, b) => b.id - a.id).slice())
          : setListNotice(
              data.value
                .filter((val) => val.status === 0)
                .sort((a, b) => b.id - a.id)
                .slice()
            );
      }
    };
    getNotice();
  }, [isAllNotice]);

  const handleClickAll = (value) => {
    setIsAllNotice(value);
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (notice, index) => {
    setNotice(notice);
    let temp = listNotice;
    temp[index].status = 1;
    setListNotice(temp);
    setOpen(true);
    changeNotificationStatus(notice.id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickReadAll = () => {
    setListNotice((prev) =>
      prev.map((p) => {
        return {
          ...p,
          status: 1,
        };
      })
    );
    changeAllNotification();
  };

  const getNumberOfUnreadNotice = (list) => {
    let res = 0;
    list.forEach((l) => l.status === 0 && res++);
    return res;
  };
  return (
    <>
      <div className="notice-wrapper" onClick={handleClick}>
        <FontAwesomeIcon icon={faBell} size={"lg"} color="#fff" />
        {listNotice && getNumberOfUnreadNotice(listNotice) > 0 && (
          <span className="notice-number">
            {getNumberOfUnreadNotice(listNotice)}
          </span>
        )}
      </div>
      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        placement="bottom-end"
        transition
        style={{ zIndex: "10000" }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper style={{ overflowY: "scroll", height: "400px" }}>
              <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                <MenuList role="menu">
                  <div className="notice-header">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <h5 style={{ paddingTop: "10px" }}>Thông báo</h5>
                      <button
                        className="btn btn-readAll"
                        onClick={() => handleClickReadAll()}
                      >
                        <DoneAll />
                      </button>
                    </div>
                  </div>
                  <div className="notice-header">
                    <div className="notice-menu">
                      <ul>
                        <li
                          style={{ marginRight: "15px" }}
                          className={isAllNotice ? "active-notice" : ""}
                          onClick={() => handleClickAll(true)}
                        >
                          Tất cả
                        </li>
                        <li
                          className={isAllNotice ? "" : "active-notice"}
                          onClick={() => handleClickAll(false)}
                        >
                          Chưa đọc
                        </li>
                      </ul>
                    </div>
                  </div>
                  {listNotice &&
                    listNotice.map((notice, index) => {
                      return (
                        <MenuItem
                          key={index}
                          className="notice-item"
                          onClick={() => handleClickOpen(notice, index)}
                        >
                          <div className="notice-title">
                            {notice.status === 0 ? (
                              <div className="unread">
                                <FontAwesomeIcon
                                  icon={faCircle}
                                  size="xs"
                                  color="red"
                                />
                              </div>
                            ) : null}
                            Bạn có thông báo từ admin
                          </div>
                          <p className="notice-content">
                            {notice.description.substring(0, 50) + "..."}
                          </p>
                          <p className="date-notice notice-content">
                            {getTimeAgo(notice.createdDate)}
                          </p>
                        </MenuItem>
                      );
                    })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
      <Dialog open={open} onClose={handleClose} style={{zIndex: 10010}}>
        <DialogTitle>Thông báo</DialogTitle>
        <DialogContent>{notice.description}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
