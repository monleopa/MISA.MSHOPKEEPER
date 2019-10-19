/*---------------------------------------------
* TODO: Class quản lý các function, thuộc tính để gọi ajax
* Author: NDANH (22/07/2019)
*---------------------------------------------*/
class AjaxJS {
    constructor() {

    }

    static callAjax(method, url, isAsync) {
        debugger
        $.ajax({
            method: method,
            url: url,
            async: isAsync,
            contentType: "application/json",
        }).done(function (res) {
            return res;
            debugger
        }).fail(function (res) {
            return false;
        });
    }
}