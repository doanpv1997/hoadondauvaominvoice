export default function setupAxios(axios, store) {
  axios.defaults.baseURL = process.env.REACT_APP_PUBLIC_URL;
  axios.interceptors.request.use(
    config => {
      const {
        auth: { authToken }
      } = store.getState();

      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }

      return config;
    },
    err => Promise.reject(err)
  );
  axios.interceptors.response.use(response => {
    return response;
  }, error => {
    if (error.response.status === 401) {
      window.localStorage.removeItem('persist:mv-tk');
      window.location.reload(); 
    }
    return error;
  });
}