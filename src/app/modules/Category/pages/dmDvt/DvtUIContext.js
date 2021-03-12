import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./DvtUIHelper";

const DvtUIContext = createContext();

export function useDvtUIContext() {
  return useContext(DvtUIContext);
}

export const DvtUIConsumer = DvtUIContext.Consumer;

export function DvtUIProvider({dvtUIEvents, children}) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);

  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback(nextQueryParams => {
  
    setQueryParamsBase(prevQueryParams => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const initDvt = {
    editMode: 1,
    dm_dvt_id: undefined,
    ma_dvt: "",
    ten_dvt: "",
    user_new: "",
    date_new: "",
    user_edit: "",
    date_edit: "",
    database_code: ""
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initDvt,
    newDvtButtonClick: dvtUIEvents.newDvtButtonClick,
    openEditDvtDialog: dvtUIEvents.openEditDvtDialog,
    openDeleteDvtDialog: dvtUIEvents.openDeleteDvtDialog,
    openDeleteMultiDialog: dvtUIEvents.openDeleteMultiDialog
    // openFetchDvtDialog: dvtUIEvents.openFetchDvtDialog,
    // openUpdateDvtStatusDialog: dvtUIEvents.openUpdateDvtStatusDialog
  };
  // console.log(value);
  return <DvtUIContext.Provider value={value}>{children}</DvtUIContext.Provider>;
}