import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router";
import ApiService from "../../ApiService";
import AuthContext from "../../store/auth-context";
import Loading from "../basic/Loading";
import {
  Select,
  MenuItem,
  InputAdornment,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import abookcss from "./css/abook.module.css";

const AddBook = () => {
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);

  const [book, setBook] = useState({});
  const [nameIsValid, setNameIsValid] = useState(true);
  const [formIsValid, setFormIsValid] = useState(true);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    ctx.setCurrentPage("add-book");
  }, []);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(nameIsValid);
    }, 500)

    return () => {
      clearTimeout(identifier);
    };
  }, [nameIsValid])

  const onChangeHandler = (event) => {
    setBook({
      ...book,
      [event.target.name]: event.target.value,
    });
  };
  const validateNameHandler = () => {
    setNameIsValid(book.name !== "");
  };

  const nameInputRef = useRef();

  const addBookHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (formIsValid) {
      const formData = new FormData();
      for (const key in book) {
        if (key === "bookCmp" && book[key] === "") {
          book[key] = 0;
        }
        if (book[key] !== undefined) {
          formData.append(key, book[key]);
        }
      }
      try {
        const response = await ApiService.addBook(formData);
        if (response.status < 200 || response.status > 299) {
          throw new Error("Something went wrong!");
        }
        navigate("/books");
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    } else {
      nameInputRef.current.focus();
    }
  };

  let content = (
    <form className={abookcss.form} onSubmit={addBookHandler}>
      <div>
        <TextField
          type="number"
          name="id"
          label="구분 아이디"
          sx={{ m: 1, width: "45ch" }}
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">ID: 자동생성</InputAdornment>
            ),
          }}
          variant="standard"
          value={book.id || ""}
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
          value={book.uid || ""}
          onChange={onChangeHandler}
        />
      </div>
      <div>
        <TextField
          type="text"
          name="smartUid"
          label="Robot UID"
          sx={{ m: 1, width: "45ch" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">UID: </InputAdornment>
            ),
          }}
          variant="standard"
          value={book.smartUid}
          onChange={onChangeHandler}
        />
      </div>
      <div>
        <TextField
          autoFocus
          required
          type="text"
          name="name"
          label="도서명"
          error={!nameIsValid}
          helperText={nameIsValid ? "" : "필수 작성란입니다."}
          ref={nameInputRef}
          sx={{ m: 1, width: "45ch" }}
          variant="standard"
          value={book.name || ""}
          onChange={onChangeHandler}
          onBlur={validateNameHandler}
        />
      </div>
      <div>
        <TextField
          type="number"
          name="bookNum"
          label="도서번호"
          sx={{ m: 1, width: "45ch" }}
          variant="standard"
          value={book.bookNum || ""}
          onChange={onChangeHandler}
        />
      </div>
      <div>
        <TextField
          type="text"
          name="borrower"
          label="빌린 사람"
          sx={{ m: 1, width: "45ch" }}
          variant="standard"
          value={book.borrower || ""}
          onChange={onChangeHandler}
        />
      </div>
      <div>
        <TextField
          type="number"
          name="bookCmp"
          label="비교 결과"
          sx={{ m: 1, width: "45ch" }}
          variant="standard"
          value={book.bookCmp || 0}
          onChange={onChangeHandler}
        />
      </div>
      <div>
        <TextField
          type="number"
          name="bookFloor"
          label="도서 위치"
          sx={{ m: 1, width: "45ch" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">층</InputAdornment>
            ),
          }}
          variant="standard"
          value={book.bookFloor || ""}
          onChange={onChangeHandler}
        />
      </div>
      <div>
        <TextField
          type="text"
          name="donor"
          label="기부자"
          sx={{ m: 1, width: "45ch" }}
          variant="standard"
          value={book.donor || ""}
          onChange={onChangeHandler}
        />
      </div>
      <div>
        <TextField
          type="text"
          name="category"
          label="장르"
          sx={{ m: 1, width: "45ch" }}
          variant="standard"
          value={book.category || ""}
          onChange={onChangeHandler}
        />
      </div>
      <div>
        <TextField
          type="text"
          name="writer"
          label="작가"
          sx={{ m: 1, width: "45ch" }}
          variant="standard"
          value={book.writer || ""}
          onChange={onChangeHandler}
        />
      </div>
      <div>
        <TextField
          type="number"
          name="count"
          label="대출 누적 횟수"
          sx={{ m: 1, width: "45ch" }}
          variant="standard"
          value={book.count || ""}
          onChange={onChangeHandler}
        />
      </div>
      <div>
        <TextField
          type="text"
          name="img"
          label="이미지"
          sx={{ m: 1, width: "45ch" }}
          variant="standard"
          value={book.img || ""}
          onChange={onChangeHandler}
        />
      </div>
      <div>
        <Select
          name="img"
          sx={{ m: 1, width: "35ch" }}
          value={book.img}
          onChange={onChangeHandler}
        >
          <MenuItem value={`https://placeimg.com/480/480/any`}>Any</MenuItem>
          <MenuItem value={`https://placeimg.com/480/480/animals`}>
            Animals
          </MenuItem>
          <MenuItem value={`https://placeimg.com/480/480/arch`}>
            Architecture
          </MenuItem>
          <MenuItem value={`https://placeimg.com/480/480/nature`}>
            Nature
          </MenuItem>
          <MenuItem value={`https://placeimg.com/480/480/people`}>
            People
          </MenuItem>
          <MenuItem value={`https://placeimg.com/480/480/tech`}>Tech</MenuItem>
        </Select>
      </div>
      <Button
        type="submit"
        className={abookcss.addBtn}
        variant="contained"
      >
        저장
      </Button>
    </form>
  );
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
      <Typography className={abookcss.typo} variant="h6">
        도서 추가
      </Typography>
      {content}
    </>
  );
};

export default AddBook;
