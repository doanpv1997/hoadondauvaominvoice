import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { DvtPage } from "./dmDvt/DVtPage";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";

export default function CategoryPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          <Redirect
            exact={true}
            from="/category"
            to="/category/dvt"
          />
        }
        <ContentRoute path="/category/dvt" component={DvtPage} />
      </Switch>
    </Suspense>
  );
}
