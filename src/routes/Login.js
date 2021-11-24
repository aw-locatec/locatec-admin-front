/**
 * 로그인 화면
 */

import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Auth from "../components/auth/Auth";
import pic from "../mainImage.png";
import { connect } from "react-redux";
import { logined } from "../stores/loginState";

// 상태들
const useStyles = makeStyles((theme) => ({
   root: {
      height: "100vh",
   },
   image: {
      backgroundImage: `url(${pic})`,
      backgroundRepeat: "no-repeat",
      backgroundColor: "white",
      backgroundSize: "contain",
      backgroundPosition: "center",
   },
}));

function Login({ onLogined, isLogined }) {
   const classes = useStyles();

   return (
      <Grid container component="main" className={classes.root}>
         <CssBaseline />
         <Grid item xs={12} sm={8} md={9} className={classes.image} />
         <Grid
            item
            xs={false}
            sm={4}
            md={3}
            component={Paper}
            elevation={6}
            square>
            <Auth />
         </Grid>
      </Grid>
   );
}

// 리덕스 action을 가져오기 위한 함수
function mapDispatchToProps(dispatch) {
   return {
      onLogined: (uid) => dispatch(logined(uid)),
   };
}
// 리덕스 상태를 가져오기 위한 함수
function mapStateToProps(state) {
   return {
      isLogined: state.loginReducer.isLogined,
   };
}
// 현재 element를 리덕스와 연결시키서 export
export default connect(mapStateToProps, mapDispatchToProps)(Login);
