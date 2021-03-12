import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/dvt/dvtActions";
import {useDvtUIContext} from "../DvtUIContext";

export function DvtDeleteDialog({ id, show, onHide }) {
  // Customers UI Context
  const dvtUIContext = useDvtUIContext();
  const dvtUIProps = useMemo(() => {
    return {
      setIds: dvtUIContext.setIds,
      queryParams: dvtUIContext.queryParams
    };
  }, [dvtUIContext]);

  // dvt Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.dvt.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteDmDvt = () => {
    // server request for deleting customer by id
    var putData = {dmdvt_id : id, editMode : 3, id: id};
    dispatch(actions.SaveDmDvt(putData)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchDvts(dvtUIProps.queryParams));
      // clear selections list
      dvtUIProps.setIds([]);
      // closing delete modal
      onHide();
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Xóa đơn vị tính
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Bạn có chắc chắn muốn xóa ĐVT?</span>
        )}
        {isLoading && <span>ĐVT is deleting...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteDmDvt}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
