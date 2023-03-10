import React, { useState, useEffect, useContext, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import ApiService from "../../ApiService";
import AuthContext from "../../store/auth-context";
import Loading from "../basic/Loading";
import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import eusercss from "./css/euser.module.css";

const EditUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ctx = useContext(AuthContext);

  const [user, setUser] = useState({});
  const [nameIsValid, setNameIsValid] = useState(true);
  const [pwIsValid, setPwIsValid] = useState(true);
  const [formIsValid, setFormIsValid] = useState(true);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const fetchUserByIDHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await ApiService.fetchUserByID(location.state.id);
      if (response.status < 200 || response.status > 299) {
        throw new Error("Something went wrong!");
      }
      const data = await response.data;
      setUser(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [location.state.id]);

  useEffect(() => {
    fetchUserByIDHandler();
    ctx.setCurrentPage("edit-user");
  }, [fetchUserByIDHandler, location]);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(nameIsValid && pwIsValid);
    }, 500)

    return () => {
      clearTimeout(identifier);
    };
  }, [nameIsValid, pwIsValid]);

  const onChangeHandler = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };
  const validateNameHandler = () => {
    setNameIsValid(user.name !== "");
  };
  const validatePwHandler = () => {
    setPwIsValid(user.pw !== "");
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const nameInputRef = useRef();
  const pwInputRef = useRef();

  const editUserHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (formIsValid) {
      const formData = new FormData();
      for (const key in user) {
        if (["borrow1", "borrow2", "borrow3", "donate"].includes(key) && user[key] === "") {
          user[key] = "X";
        }
        if (key === "uid"&& user[key] === "") {
          user[key] = "00 00 00 00";
        }
        if (user[key] !== undefined) {
          formData.append(key, user[key]);
        }
      }
      try {
        const response = await ApiService.editUser(formData);
        if (response.status < 200 || response.status > 299) {
          throw new Error("Something went wrong!");
        }
        navigate("/users");
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    } else if (!nameIsValid) {
      nameInputRef.current.focus();
    } else {
      pwInputRef.current.focus();
    }
  };

  const isEmptyObj = (obj) => {
    if (obj.constructor === Object && Object.keys(obj).length === 0) {
      return true;
    }
    return false;
  };

  let content = <h5>?????? ????????? ???????????? ???????????????.</h5>;
  if (!isEmptyObj(user)) {
    content = (
      <form className={eusercss.form} onSubmit={editUserHandler}>
        <div>
          <TextField
            type="number"
            name="id"
            label="?????? ?????????"
            sx={{ m: 1, width: "45ch" }}
            InputProps={{
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">ID: </InputAdornment>
              ),
            }}
            variant="standard"
            value={user.id || ""}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <TextField
            autoFocus
            required
            type="text"
            name="name"
            label="?????????"
            error={!nameIsValid}
            helperText={nameIsValid ? "" : "?????? ??????????????????."}
            ref={nameInputRef}
            sx={{ m: 1, width: "45ch" }}
            variant="standard"
            value={user.name || ""}
            onChange={onChangeHandler}
            onBlur={validateNameHandler}
          />
        </div>
        <div>
          <TextField
            required
            type={showPassword ? "text" : "password"}
            name="pw"
            label="????????????"
            error={!pwIsValid}
            helperText={pwIsValid ? "" : "?????? ??????????????????."}
            ref={pwInputRef}
            sx={{ m: 1, width: "45ch" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    className={eusercss.iconCell}
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="standard"
            value={user.pw || ""}
            onChange={onChangeHandler}
            onBlur={validatePwHandler}
          />
        </div>
        <div>
          <TextField
            type="text"
            name="borrow1"
            label="?????? ???(1)"
            sx={{ m: 1, width: "45ch" }}
            variant="standard"
            value={user.borrow1 || ""}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <TextField
            type="text"
            name="borrow2"
            label="?????? ???(2)"
            sx={{ m: 1, width: "45ch" }}
            variant="standard"
            value={user.borrow2 || ""}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <TextField
            type="text"
            name="borrow3"
            label="?????? ???(3)"
            sx={{ m: 1, width: "45ch" }}
            variant="standard"
            value={user.borrow3 || ""}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <TextField
            type="text"
            name="donate"
            label="????????? ???"
            sx={{ m: 1, width: "45ch" }}
            variant="standard"
            value={user.donate || ""}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <TextField
            type="text"
            name="uid"
            label="RFID"
            sx={{ m: 1, width: "45ch" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">RFID: </InputAdornment>
              ),
            }}
            variant="standard"
            value={user.uid || ""}
            onChange={onChangeHandler}
          />
        </div>
        <Button
          type="submit"
          className={eusercss.editBtn}
          variant="contained"
        >
          ??????
        </Button>
      </form>
    );
  }
  if (error) {
    content = (
      <div>
        <p>{error}</p>
      </div>
    );
  }
  if (isLoading) {
    content = <Loading />;
  }

  return (
    <>
      <Typography className={eusercss.typo} variant="h6">
        <Box className={eusercss.typoBox}>{user.name}</Box>??? ?????? ?????? ??????
      </Typography>
      {content}
    </>
  );
};

export default EditUser;
