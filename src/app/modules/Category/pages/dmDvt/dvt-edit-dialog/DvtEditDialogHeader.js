import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function DvtEditDialogHeader({ id }) {
  // dvt Redux state
  const { dvtForEdit, actionsLoading } = useSelector(
    (state) => ({
      dvtForEdit: state.dvt.dvtForEdit,
      actionsLoading: state.dvt.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "Thêm mới Dvt";
    if (dvtForEdit && id) {
      _title = `Sửa dvt '${dvtForEdit.ma_dvt} ${dvtForEdit.ten_dvt}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [dvtForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
