/**
 * 홈 화면
 */
import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { CircularProgress, makeStyles, Modal, Paper } from "@material-ui/core";
import clsx from "clsx";

// 스타일들
const useStyles = makeStyles((theme) => ({
   paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
   },
   fixedHeight: {
      height: "100%",
   },

   content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto",
   },
   container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
   },

   loading: {
      position: "absolute",
      top: "47%",
      left: "47%",
   },
   appBarSpacer: theme.mixins.toolbar,
}));

function Home() {
   const classes = useStyles();
   const [loading, setLoading] = useState(true); // 로딩 상태 관리

   // 가운데 paper 사이즈 적용
   const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

   return (
      <>
         <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
               <Paper className={fixedHeightPaper}>dasdasds</Paper>
            </Container>
         </main>
         <Modal open={loading}>
            <CircularProgress color="secondary" className={classes.loading} />
         </Modal>
      </>
   );
}

export default Home;
