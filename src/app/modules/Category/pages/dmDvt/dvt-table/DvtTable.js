// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/dvt/dvtActions";
import {
    getSelectRow,
    getHandlerTableChange,
    NoRecordsFoundMessage,
    PleaseWaitMessage,
    sortCaret,
    headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../DvtUIHelper";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useDvtUIContext } from "../DvtUIContext";

export function DvtTable() {
    // Gọi Đơn vị tính UI Context
    const dvtUIContext = useDvtUIContext();
    const dvtUIProps = useMemo(() => {
        return {
            ids: dvtUIContext.ids,
            setIds: dvtUIContext.setIds,
            queryParams: dvtUIContext.queryParams,
            setQueryParams: dvtUIContext.setQueryParams,
            openEditDvtDialog: dvtUIContext.openEditDvtDialog,
            openDeleteDvtDialog: dvtUIContext.openDeleteDvtDialog,
        };
    }, [dvtUIContext]);
    // Lấy state hiện tại của dmdvt trong store (Redux)
    const { currentState } = useSelector(
        (state) => ({ currentState: state.dvt }),
        shallowEqual
    );

    const { totalCount, entities, listLoading } = currentState;

    // Gọi dispatch lấy dữ liệu từ redux store
    const dispatch = useDispatch();

    useEffect(() => {
        // SET Id(Key) đã chọn về null
        dvtUIProps.setIds([]);
        // Gọi actions fetchCustomers với input queryParams
        dispatch(actions.fetchDvts(dvtUIProps.queryParams));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dvtUIProps.queryParams, dispatch]);

    // Table columns
    const columns = [
        {
            dataField: "id",
            text: "ID",
            sort: true,
            hidden: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "ma_dvt",
            text: "Mã đơn vị tính",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "ten_dvt",
            text: "Tên đơn vị tính",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "action",
            text: "Actions",
            formatter: columnFormatters.ActionsColumnFormatter,
            formatExtraData: {
                openEditDvtDialog: dvtUIProps.openEditDvtDialog,
                openDeleteDvtDialog: dvtUIProps.openDeleteDvtDialog,
            },
            classes: "text-right pr-0",
            headerClasses: "text-right pr-3",
            style: {
                minWidth: "100px",
            }
        },
    ];
    // Table pagination properties
    const paginationOptions = {
        custom: true,
        totalSize: totalCount,
        sizePerPageList: uiHelpers.sizePerPageList,
        sizePerPage: dvtUIProps.queryParams.pageSize,
        page: dvtUIProps.queryParams.pageNumber,
    };
    return (
        // <>
        <PaginationProvider pagination={paginationFactory(paginationOptions)}>
            {({ paginationProps, paginationTableProps }) => {
                return (
                    <Pagination
                        isLoading={listLoading}
                        paginationProps={paginationProps}
                    >
                        <BootstrapTable
                            wrapperClasses="table-responsive"
                            bordered={false}
                            classes="table table-head-custom table-vertical-center"
                            bootstrap4
                            remote
                            keyField="id"
                            data={entities === null ? [] : entities}
                            columns={columns}
                            defaultSorted={uiHelpers.defaultSorted}
                            onTableChange={getHandlerTableChange(
                                dvtUIProps.setQueryParams
                            )}
                            selectRow={getSelectRow({
                                entities,
                                ids: dvtUIProps.ids,
                                setIds: dvtUIProps.setIds,
                            })}
                            {...paginationTableProps}
                        >
                            <PleaseWaitMessage entities={entities} />
                            <NoRecordsFoundMessage entities={entities} />
                        </BootstrapTable>
                    </Pagination>
                );
            }}
        </PaginationProvider>
        // </>
    );
}
