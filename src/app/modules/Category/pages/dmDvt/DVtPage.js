import React from "react";
import { Route } from "react-router-dom";
import { DvtLoadingDialog } from "./dvt-loading-dialog/DvtLoadingDialog";
import { DvtEditDialog } from "./dvt-edit-dialog/DvtEditDialog";
import { DvtDeleteDialog } from "./dvt-delete-dialog/DvtDeleteDialog";
import { DvtDeleteMultiDialog } from "./dvt-delete-dialog/DvtDeleteMultiDialog";
// import { DvtsFetchDialog } from "./customers-fetch-dialog/DvtsFetchDialog";
// import { DvtsUpdateStateDialog } from "./customers-update-status-dialog/DvtsUpdateStateDialog";
import { DvtUIProvider } from "./DvtUIContext";
import { DvtCard } from "./DvtCard";

export function DvtPage({ history }) {
  const dvtUIEvents = {
    newDvtButtonClick: () => {
      // được gọi khi click <Link> component
      history.push("/category/dvt/new");
    },
    openEditDvtDialog: (id) => {
      history.push(`/category/dvt/${id}/edit`);
    },
    openDeleteDvtDialog: (id) => {
      history.push(`/category/dvt/${id}/delete`);
    },
    openDeleteMultiDialog: () => {
      history.push(`/category/dvt/deleteMulti`);
    }
    // openFetchDvtsDialog: () => {
    //   history.push(`/category/dvt/fetch`);
    // },
    // openUpdateSvtsStatusDialog: () => {
    //   history.push("/category/dvt/updateStatus");
    // }
  }
  return (
    <DvtUIProvider dvtUIEvents={dvtUIEvents}>
      <DvtLoadingDialog />
      <Route path="/category/dvt/new">
        {({ history, match }) => {
         return (
            <DvtEditDialog
              show={match != null}
              onHide={() => {
                history.push("/category/dvt");
              }}
            />
          )
        }
        }
      </Route>
      <Route path="/category/dvt/:id/edit">   
        {({ history, match }) => (
          <DvtEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/category/dvt");
            }}
          />
        )}
      </Route>
      <Route path="/category/dvt/deleteMulti">
        {({ history, match }) => (
          <DvtDeleteMultiDialog
            show={match != null}
            onHide={() => {
              history.push("/category/dvt");
            }}
          />
        )}
      </Route>
      <Route path="/category/dvt/:id/delete">
        {({ history, match }) => (
          <DvtDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/category/dvt");
            }}
          />
        )}
      </Route>
      {/*<Route path="/category/dvt/fetch">
        {({ history, match }) => (
          <CustomersFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/category/dvt");
            }}
          />
        )}
      </Route>
      <Route path="/category/dvt/updateStatus">
        {({ history, match }) => (
          <CustomersUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/category/dvt");
            }}
          />
        )}
      </Route>*/}
      <DvtCard />
    </DvtUIProvider>
  );
}
