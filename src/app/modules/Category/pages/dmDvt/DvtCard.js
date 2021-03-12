import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
// import { DvtsFilter } from "./dvts-filter/DvtsFilter";
import { DvtTable } from "./dvt-table/DvtTable";
import { DvtGrouping } from "./dvt-ultil-group/DvtGroup";
import { useDvtUIContext } from "./DvtUIContext";
import {
  Button
} from "@material-ui/core";

export function DvtCard() {
  const dvtUIContext = useDvtUIContext();
  const dvtUIProps = useMemo(() => {
    return {
      ids: dvtUIContext.ids,
      newDvtButtonClick: dvtUIContext.newDvtButtonClick,
    };
  }, [dvtUIContext]);

  return (
    <Card>
      <CardHeader title="Danh mục đơn vị tính">
        <CardHeaderToolbar>
          <Button
            type="button"  variant="outlined" color="primary"
            //className="btn btn-primary"
            onClick={dvtUIProps.newDvtButtonClick}
          >
            Thêm mới
          </Button>
            {/*<button
            className="btn btn-primary"
            onClick={dvtUIProps.newDvtButtonClick}
          >
            Thêm mới
          </button>*/}
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {/*<DvtsFilter />*/}
        {dvtUIProps.ids.length > 0 && <DvtGrouping />}
        <DvtTable />
      </CardBody>
    </Card>
  );
}
