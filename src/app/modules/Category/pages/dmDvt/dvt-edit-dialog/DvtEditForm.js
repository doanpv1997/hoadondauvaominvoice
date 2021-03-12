// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
} from "../../../../../../_metronic/_partials/controls";

// Validation schema
const DvtEditSchema = Yup.object().shape({
  ma_dvt: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Mã đơn vị tính is required"),
  ten_dvt: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Tên đơn vị tính is required")
});

export function DvtEditForm({
  saveDmDvt,
  dmDvt,
  actionsLoading,
  onHide,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={dmDvt}
        validationSchema={DvtEditSchema}
        onSubmit={(values) => {
          saveDmDvt(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      name="ma_dvt"
                      component={Input}
                      placeholder="Mã ĐVT"
                      label="Mã đơn vị tính"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="ten_dvt"
                      component={Input}
                      placeholder="Tên ĐVT"
                      label="Tên đơn vị tính"
                    />
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                Cancel
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Save
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
