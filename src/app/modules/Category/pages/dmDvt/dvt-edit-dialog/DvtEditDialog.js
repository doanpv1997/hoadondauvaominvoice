import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/dvt/dvtActions";
import { DvtEditDialogHeader } from "./DvtEditDialogHeader";
import { DvtEditForm } from "./DvtEditForm";
import { useDvtUIContext } from "../DvtUIContext";

export function DvtEditDialog({ id, show, onHide }) {
  // dvt UI Context
  const dvtUIContext = useDvtUIContext();
  const dvtUIProps = useMemo(() => {
    return {
      initDvt: dvtUIContext.initDvt,
    };
  }, [dvtUIContext]);

  // dvt Redux state
  const dispatch = useDispatch();
  const { actionsLoading, dvtForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.dvt.actionsLoading,
      dvtForEdit: state.dvt.dvtForEdit,
    }),
    shallowEqual
  );
  // nếu không có actions thì sẽ false 
  // gét dmdvt theo id để update 
  useEffect(() => {
    // server call for getting dvt by id
    dispatch(actions.fetchDvtId(id));
  }, [id, dispatch]);

  // server request for saving Dvt
  const saveDmDvt = (dmDvt) => {
    if (!id) {
      dmDvt.editMode = 1;
    } else {
      dmDvt.editMode = 2;
    }
    // server request for creating dmdvt
    dispatch(actions.SaveDmDvt(dmDvt)).then(() => onHide());
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <DvtEditDialogHeader id={id} />
      {/* truyền function vào props*/}
      <DvtEditForm
        saveDmDvt={saveDmDvt}
        actionsLoading={actionsLoading}
        dmDvt={dvtForEdit || dvtUIProps.initDvt}
        onHide={onHide}
      />
    </Modal>
  );
}
