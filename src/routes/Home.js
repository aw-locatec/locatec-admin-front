/**
 * 홈 화면
 */
import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import { CircularProgress, makeStyles, Modal, Paper } from "@material-ui/core";
import clsx from "clsx";
import { Route } from "react-router";
import PageList from "../components/request/PageList";
import PageItem from "../components/request/PageItem";
import WholeList from "../components/wholeList/WholeList";
import WholeListItem from "../components/wholeList/WholeListItem,";
import {
   REQUEST,
   REQUEST_ITEM,
   WHOLELIST,
   WHOLELIST_ITEM,
} from "../constants/Link";
import { SMOKE, TRASHCAN } from "../constants/types";

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

const tempRequestList = [
   {
      id: 1,
      type: TRASHCAN,
      coords: {
         latitude: 37.630682295065505,
         longitude: 127.0804025572257,
      },
      image: "https://www.costco.co.kr/medias/sys_master/images/hb9/hb8/15318005022750.jpg",
   },
   {
      id: 2,
      type: SMOKE,
      coords: {
         latitude: 37.629635550859,
         longitude: 127.08086267102873,
      },
      image: "https://newsimg.hankookilbo.com/cms/articlerelease/2015/10/18/201510182224437401_1.jpg",
   },
   {
      id: 3,
      type: SMOKE,
      coords: {
         latitude: 37.63133962861005,
         longitude: 127.07673969062887,
      },
      image: "https://newsimg.hankookilbo.com/cms/articlerelease/2015/10/18/201510182224437401_1.jpg",
   },
   {
      id: 4,
      type: TRASHCAN,
      coords: {
         latitude: 37.63311154223848,
         longitude: 127.07690659454285,
      },
      image: "https://www.costco.co.kr/medias/sys_master/images/hb9/hb8/15318005022750.jpg",
   },
   {
      id: 5,
      type: SMOKE,
      coords: {
         latitude: 37.633976049288925,
         longitude: 127.08052886291345,
      },
      image: "https://newsimg.hankookilbo.com/cms/articlerelease/2015/10/18/201510182224437401_1.jpg",
   },
   {
      id: 6,
      type: TRASHCAN,
      coords: {
         latitude: 37.634836974008856,
         longitude: 127.07739828481888,
      },
      image: "https://www.costco.co.kr/medias/sys_master/images/hb9/hb8/15318005022750.jpg",
   },
   {
      id: 7,
      type: SMOKE,
      coords: {
         latitude: 37.6349341635446,
         longitude: 127.07542743118924,
      },
      image: "https://newsimg.hankookilbo.com/cms/articlerelease/2015/10/18/201510182224437401_1.jpg",
   },
];

function Home() {
   const classes = useStyles();
   const [loading, setLoading] = useState(false); // 로딩 상태 관리
   const [requestItem, setRequestItem] = useState(null); // 요청 리스트 중 하나를 선택할지 여기에 그 데이터가 들어감
   const [requestList, setRequestList] = useState([]); // 요청리스트
   const [wholeListItem, setWholeListItem] = useState(null); // 전체 리스트 중 하나를 선택할지 여기에 그 데이터가 들어감
   const [wholeList, setWholeList] = useState([]); // 전체 리스트
   const [refresh, setRefresh] = useState(0);

   // 가운데 paper 사이즈 적용
   const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

   useEffect(() => {
      // 리스트 받아오기
      const getList = async () => {
         setLoading(true);
         // 요청리스트 받아오기
         setRequestList(tempRequestList);
         setWholeList(tempRequestList);
         setLoading(false);
      };
      getList();
   }, [refresh]);

   return (
      <>
         <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
               <Paper className={fixedHeightPaper}>
                  <Route exact path={REQUEST}>
                     <PageList
                        setLoading={setLoading}
                        list={requestList}
                        setItem={setRequestItem}
                        setRefresh={setRefresh}
                     />
                  </Route>
                  <Route path={REQUEST_ITEM}>
                     <PageItem item={requestItem} />
                  </Route>
                  <Route exact path={WHOLELIST}>
                     <WholeList
                        setLoading={setLoading}
                        list={wholeList}
                        setItem={setWholeListItem}
                        setRefresh={setRefresh}
                     />
                  </Route>
                  <Route path={WHOLELIST_ITEM}>
                     <WholeListItem
                        item={wholeListItem}
                        setItem={setWholeListItem}
                        setLoading={setLoading}
                        setRefresh={setRefresh}
                     />
                  </Route>
               </Paper>
            </Container>
         </main>
         <Modal open={loading}>
            <CircularProgress color="secondary" className={classes.loading} />
         </Modal>
      </>
   );
}

export default Home;
