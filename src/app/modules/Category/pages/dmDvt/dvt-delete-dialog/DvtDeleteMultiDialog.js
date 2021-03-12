import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/dvt/dvtActions";
import { useDvtUIContext } from "../DvtUIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function DvtDeleteMultiDialog({ show, onHide }) {
  // dvt UI Context
  const dvtUIContext = useDvtUIContext();
  const dvtUIProps = useMemo(() => {
    return {
      ids: dvtUIContext.ids,
      setIds: dvtUIContext.setIds,
      queryParams: dvtUIContext.queryParams,
    };
  }, [dvtUIContext]);

  // dvt Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.dvt.actionsLoading }),
    shallowEqual
  );

  // nếu khồng có dvt nào chọn thì đóng modal
  useEffect(() => {
    if (!dvtUIProps.ids || dvtUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dvtUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteMultiDvt = () => {
    // server request for deleting customer by selected ids
    dispatch(actions.deleteMultiDvt(dvtUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchDvts(dvtUIProps.queryParams)).then(
        () => {
          // clear selections list
          dvtUIProps.setIds([]);
          // closing delete modal
          onHide();
        }
      );
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
          ĐVT Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Bạn có chắc chắn xóa ĐVT đã chọn ?</span>
        )}
        {isLoading && <span>Đang xóa ĐVT...</span>}
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
            onClick={deleteMultiDvt}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
