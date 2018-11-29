import React from "react";
// BrowserRouter用來裝入所有的routes，而Route則用來實際宣告route`
// Switch則是用來創建404 page
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Header from "../components/Header";
import ExpenseDashboardPage from "../components/ExpenseDashboardPage";
import AddExpensePage from "../components/AddExpensePage";
import EditExpensePage from "../components/EditExpensePage";
import HelpPage from "../components/HelpPage";
import NotFoundPage from "../components/NotFoundPage";

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            {/* BrowserRouter預設只接受一個子組件，所以所有的routes都要放在一個div裡 */}
            {/* 而藉由把那個div改成Switch(或是直接把BrowserRouter改成Switch)，則可以讓react一個個檢查Route是否match的同時，當它檢查到後就立即停止動作 */}
            {/* 這樣就可以藉由在最後面放一個always match的route來製作404 page */}
            <Switch>
                {/*path的值預設為使用"開頭為"來配對，因此若要改成"完全符合"，則必須多傳入一個exact參數並設成true*/}
                <Route path="/" component={ExpenseDashboardPage} exact />
                <Route path="/create" component={AddExpensePage} />
                <Route path="/edit/:id" component={EditExpensePage} />
                <Route path="/help" component={HelpPage} />
                {/* path是選填的，若沒定義path則所有頁面都會match */}
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
        
    </BrowserRouter>
);

export default AppRouter;