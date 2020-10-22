import Axios from "axios";

const instance = Axios.create({
  baseURL: "https://fire-burger-d017d.firebaseio.com/",
});

export default instance;
