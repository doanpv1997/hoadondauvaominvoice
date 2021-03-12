import axios from "axios";

export const _URL = "Invoice/DmDvt";

// CREATE =>  POST: add a new customer to the server
export function deleteMultiDvt(ids) {
  return axios.post("Invoice/DmdvtDeleteMulti", {ids});
}

// READ
export function getAllDmDvt() {
  return axios.get(_URL);
}

export function getDmDvtById(dmdvt_id) {
  return axios.get(`Invoice/getDmDvtById?id=${dmdvt_id}`);
}

// // Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// // items => filtered/sorted result
export function findDmDvt(queryParams) {
  var sta = queryParams.pageNumber === 1 ? 0 : queryParams.pageNumber*queryParams.pageSize;
  return axios.get(`${_URL}?start=${sta}&count=${queryParams.pageSize}`);
}

// CREATE, UPDATE => POST: create update the dvt on the server
export function SaveDmdvt(dvt) {
  return axios.post(`Invoice/SaveDmdvt`, { dvt });
}

// DELETE => delete the ĐVT from the server
// export function deleteDvt(id) {
//   return axios.post(`${CUSTOMERS_URL}/${customerId}`);
// }

// // UPDATE Status
// export function updateStatusForCustomers(ids, status) {
//   return axios.post(`${CUSTOMERS_URL}/updateStatusForCustomers`, {
//     ids,
//     status
//   });
// }


// // DELETE Customers by ids
// export function deleteCustomers(ids) {
//   return axios.post(`${CUSTOMERS_URL}/deleteCustomers`, { ids });
// }
