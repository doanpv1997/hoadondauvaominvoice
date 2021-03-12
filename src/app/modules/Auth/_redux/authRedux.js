import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import * as requestServer from "./authCrud";
// import { put, takeLatest, takeEvery, call } from "redux-saga/effects";

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  GetInfoUser: "[GetInfoUser] Action",
  SetInfoUser: "[SetInfoUser] Action"
};

const initialAuthState = {
  username: undefined,
  user: undefined,
  authToken: undefined
};

// khởi tạo persistReducer(persistConfig, rootReducer);
export const reducer = persistReducer(
  { storage, key: "mv-tk", whitelist: ["user", "authToken"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Login: {
        const { authToken, username, user } = action.payload;
        return { authToken, username, user };
      }

      case actionTypes.Logout: {
        return initialAuthState;
      }
      // case actionTypes.GetInfoUser: {
      //   requestServer.getInfoUsername(state.user).then(
      //     response => {
      //       console.log(response.data[0]);
      //       const user = response.data[0];
      //       dispatch({ "type": "SetInfoUser" , "user" :response.data[0] })
      //     })
      //     .catch(error => {
      //       if (error.response) {
      //         // reponse trả về nằm ngoài 2xx
      //         console.log(error.response.data);
      //         console.log(error.response.status);
      //         console.log(error.response.headers);
      //       } else if (error.request) {
      //         // yêu cầu không nhận đc phản hồi từ backend
      //         console.log(error.request);
      //       } else {
      //         // Lỗi khác
      //         console.log('Error', error.message);
      //       }
      //     });
      // }
      // case actionTypes.SetInfoUser: {
      //   const { user } = action.payload;
      //   return { user };
      // }
      default:
        return state;
    }
  }
);

export const actions = {
  login: (authToken, username, user) => ({ type: actionTypes.Login, payload: { authToken, username , user } }), // props.login
  logout: () => ({ type: actionTypes.Logout }),
  SetInfoUser: user => ({ type: actionTypes.SetInfoUser, payload: { user } })
};

export function* saga() {
  // bắt các action với type là [Login] Action chay function loginSaga
  // yield takeLatest(actionTypes.Login, function* loginSaga() {
  // console.log(actions.requestUser());
  //put <=> dispatch
  // yield put(actions.requestUser());
  // });

  // sau khi login  phát đi 1 acctions type actions.SetInfoUser()
  // yield takeLatest(actionTypes.Login, function* loginSaga() {
  //   yield put(actions.SetInfoUser());
  // });
  // lắng nghe actions actionTypes.SetInfoUser thực hiện function userRequested
  // yield takeLatest(actionTypes.SetInfoUser, function* userRequested() {
  //   const { data: user } = yield requestServer.getInfoUsername();

  //   yield put(actions.SetInfoUser(user));
  // });
}
