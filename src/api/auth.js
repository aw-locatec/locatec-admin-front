import axios from "axios";
import { ADDRESS } from "./address";

// 로그인
export const login = async (info) => {
   try {
      const res = await axios.post(`${ADDRESS}/admin/login`, info);
      return res.data;
   } catch (e) {
      throw e;
   }
};
