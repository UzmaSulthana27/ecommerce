import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(p => {
    if (error) p.reject(error); else p.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalReq = err.config;
    if (err.response && err.response.status === 401 && !originalReq._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalReq.headers["Authorization"] = "Bearer " + token;
          return axios(originalReq);
        });
      }
      originalReq._retry = true;
      isRefreshing = true;
      try {
        const resp = await axios.post("http://localhost:4000/auth/refresh", {}, { withCredentials: true });
        const newToken = resp.data.accessToken;
        api.defaults.headers.common["Authorization"] = "Bearer " + newToken;
        processQueue(null, newToken);
        isRefreshing = false;
        originalReq.headers["Authorization"] = "Bearer " + newToken;
        return api(originalReq);
      } catch (err2) {
        processQueue(err2, null);
        isRefreshing = false;
        return Promise.reject(err2);
      }
    }
    return Promise.reject(err);
  }
);

export default api;
