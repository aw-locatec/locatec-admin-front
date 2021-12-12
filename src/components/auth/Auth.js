/**
 * 로그인 처리 element
 */

import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import styled from "styled-components";
import { connect } from "react-redux";
import { logined } from "../../stores/loginState";
import { REQUEST } from "../../constants/Link";
import { login as loginApi } from "../../api/auth";

// styled-component로 ErrorMessage 스타일 적용
const ErrorMessege = styled.div`
   padding-left: 10px;
   color: red;
`;

// 스타일
const useStyles = makeStyles((theme) => ({
   paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
   },
   avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
   },
   form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
   },
}));

function Auth({ onLogined }) {
   const history = useHistory(); // 브라우저 history 객체 가져오기
   const [email, setEmail] = useState(""); // 유저가 입력한 이메일 상태
   const [pw, setPw] = useState(""); // 유저가 입력한 비밀번호 상태
   const [errMsg, setErrMsg] = useState(""); // 에러메세지 상태
   const classes = useStyles(); // 위에서 선언한 스타일 가져오리

   // 로그인
   const login = async () => {
      const email_test = email.trim();
      const pw_test = pw.trim();

      if (email_test === "" || pw_test === "") {
         setErrMsg("이메일 또는 비밀번호를 입력해주세요.");
         return;
      } else if (
         /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(
            email_test
         ) === false
      ) {
         setErrMsg("이메일 형식을 지켜주세요.");
         return;
      }

      try {
         await loginApi({ id: email_test, password: pw_test });
         setEmail("");
         setPw("");
         onLogined("logined");
         history.push(REQUEST);
      } catch (err) {
         setErrMsg("잘못된 이메일 혹은 비밀번호입니다.");
         console.log(err);
      }
   };

   // 로그인 버튼 클릭시 호출
   const onClick = (e) => {
      e.preventDefault();
      login();
   };

   // 입력 처리 콜백함수
   const onChangeEmail = (e) => {
      setEmail(e.target.value);
   };
   const onChangePw = (e) => {
      setPw(e.target.value);
   };

   return (
      <div className={classes.paper}>
         <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
         </Avatar>
         <Typography component="h1" variant="h5">
            로그인
         </Typography>
         <form className={classes.form} noValidate>
            <TextField
               variant="outlined"
               margin="normal"
               required
               fullWidth
               id="email"
               label="Email Address"
               name="email"
               autoComplete="email"
               value={email}
               onChange={onChangeEmail}
               autoFocus
            />
            <TextField
               variant="outlined"
               margin="normal"
               required
               fullWidth
               name="password"
               label="Password"
               type="password"
               id="password"
               value={pw}
               onChange={onChangePw}
               autoComplete="current-password"
            />
            <ErrorMessege>{errMsg}</ErrorMessege>
            <Button
               type="submit"
               fullWidth
               variant="contained"
               color="primary"
               className={classes.submit}
               onClick={onClick}>
               로그인
            </Button>
         </form>
      </div>
   );
}

// 리덕스 action을 가져오기 위한 함수
function mapDispatchToProps(dispatch) {
   return {
      onLogined: (uid) => dispatch(logined(uid)),
   };
}

// 현재 element를 리덕스와 연결시키서 export
export default connect(null, mapDispatchToProps)(Auth);
