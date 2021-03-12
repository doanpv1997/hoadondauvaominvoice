import * as requestFromServer from "./dvtCrud";
import { dvtSlice, callTypes } from "./dvtSlice";
import { toast } from "react-toastify";

const { actions } = dvtSlice;
const options = {
    autoClose: 3000,
    hideProgressBar: true,
    pauseOnHover: true
    // and so on ...
};
toast.configure(options)
// lấy danh sách danh mục đơn vị tính
export const fetchDvts = queryParams => dispatch => {
    //callTypes.list chuyển state call sang list (lấy data theo list)
    dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
        .findDmDvt(queryParams)
        .then(response => {
            const { totalCount, entities } = response.data;
            dispatch(actions.dvtsFetched({ totalCount, entities }));
        })
        .catch(error => {
            if (error.response) {
                toast.error(error.response.data, options);
                // reponse trả về nằm ngoài 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // yêu cầu không nhận đc phản hồi từ backend
                console.log(error.request);
            } else {
                // Lỗi khác
                console.log('Error', error.message);
            }
            error.clientMessage = "Có lỗi xảy ra !";
            dispatch(actions.catchError({ error, callType: callTypes.list }));
        });
};
// lấy danh mục đơn vị tính theo id để update
export const fetchDvtId = id => dispatch => {
    if (!id) {
        return dispatch(actions.dvtFetched({ dvtForEdit: undefined }));
    }
    //callTypes.action chuyển state call sang action (lấy data theo action)
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .getDmDvtById(id)
        .then(response => {
            const dvt = response.data[0];

            dispatch(actions.dvtFetched({ dvtForEdit: dvt }));
        })
        .catch(error => {
            if (error.response) {
                // reponse trả về nằm ngoài 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // yêu cầu không nhận đc phản hồi từ backend
                console.log(error.request);
            } else {
                // Lỗi khác
                console.log('Error', error.message);
            }
            error.clientMessage = "Có lỗi xảy ra !";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const SaveDmDvt = dvtInput => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .SaveDmdvt(dvtInput)
        .then(response => {
            const { dvt } = response.data;
            if (dvtInput.editMode === 1) {
                toast.success('Thêm mới thành công', options);
                dispatch(actions.dvtCreated({ dvt }));
            }
            if (dvtInput.editMode === 2) {
                dispatch(actions.dvtUpdated({ dvt }));
            }
            if (dvtInput.editMode === 3) {
                dispatch(actions.dvtDeleted({ dvt }));
            }

        })
        .catch(error => {
            if (error.response) {
                // reponse trả về nằm ngoài 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // yêu cầu không nhận đc phản hồi từ backend
                console.log(error.request);
            } else {
                // Lỗi khác
                console.log('Error', error.message);
            }
            error.clientMessage = "Có lỗi xảy ra !";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const deleteMultiDvt = ids => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .deleteMultiDvt(ids)
        .then(() => {
            dispatch(actions.dvtMultiDeleted({ ids }));
        })
        .catch(error => {
            if (error.response) {
                // reponse trả về nằm ngoài 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // yêu cầu không nhận đc phản hồi từ backend
                console.log(error.request);
            } else {
                // Lỗi khác
                console.log('Error', error.message);
            }
            error.clientMessage = "Có lỗi xảy ra !";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};
// export const updateCustomersStatus = (ids, status) => dispatch => {
//   dispatch(actions.startCall({ callType: callTypes.action }));
//   return requestFromServer
//     .updateStatusForCustomers(ids, status)
//     .then(() => {
//       dispatch(actions.customersStatusUpdated({ ids, status }));
//     })
//     .catch(error => {
//       error.clientMessage = "Can't update customers status";
//       dispatch(actions.catchError({ error, callType: callTypes.action }));
//     });
// };