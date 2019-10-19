/*---------------------------------------------
* TODO: File quản lý các function dùng chung cho project
* Author: NDANH (28/8/2019)
*---------------------------------------------*/

/*---------------------------------------------
* TODO: format ngày theo dạng ddMMyyyy
* Author: NDANH (28/8/2019)
*---------------------------------------------*/
String.prototype.DDMMYYY = function () {
    var date = this;

    if ($.type(this) == "string") {
        date = new Date(this);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        day = day < 10 ? "0" + day : day;
        month = month < 10 ? "0" + month : month;

        return day + "/" + month + "/" + year;
    }

    if ($.type(this) == "date") {
        return this.formatDate();
    }
    
}

/*---------------------------------------------
* TODO: format Giờ theo định dạng HH:MM
* Author: NDANH (28/8/2019)
*---------------------------------------------*/
String.prototype.HHMM = function () {
    var date = this;
    if ($.type(this) == "string") {
        date = new Date(this);
    }
    var hours = date.getHours();
    var minutes = date.getMinutes();
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return hours + ':' + minutes;
}

/*---------------------------------------------
* TODO: Format tiền: 1000000 -> 1.000.000
* Author: NDANH (28/8/2019)
*---------------------------------------------*/
String.prototype.formatMoney = function () {
    var price = this;
    price = price.replace(/\./g, '');
    price = Number(price);
    if (price < 1000) {
        return price;
    } 
    else {
        price = price + ``;
        price = price.replace(/\./g, '');
        return [...price.match(/\d{1,3}(?=(\d{3})+(?!\d))/g), ...price.match(/\d{3}$/g)].join(`.`);
    }
}

/*---------------------------------------------
* TODO: Format date
* Author: NDANH (28/8/2019)
*---------------------------------------------*/
Date.prototype.formatDate = function () {
    var date = this;
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy = date.getFullYear();

    var dateFormat = dd + '/' + mm + '/' + yyyy;

    return dateFormat;
}

/*---------------------------------------------
* TODO: format tiền về dạng số
* Author: NDANH (28/8/2019)
*---------------------------------------------*/
String.prototype.formatNumberMoney = function (){
    var price = this;
    return Number(price.replace(/\./g, ''));
}

/*---------------------------------------------
* TODO: Lấy ngày hôm nay
* Author: NDANH (28/08/2019)
*---------------------------------------------*/
function getDateToday() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    return today;
}

/*---------------------------------------------
* TODO: Kiểm tra xem có scroll hay không ?
* Author: NDANH (28/8/2019)
*---------------------------------------------*/
(function ($) {
    $.fn.hasScrollBar = function () {
        return Math.round(this.get(0).scrollHeight) > Math.round(this.height());
    }
})(jQuery);

/*---------------------------------------------
* TODO: valid giá trị ngày
* Author: NDANH (28/08/2019)
* @param: {any} date
*---------------------------------------------*/
function isDate(date) {
    var dateRegex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    return dateRegex.test(date);
}

/*---------------------------------------------
* TODO: Valid giá trị mã đối tượng
* Author: NDANH (19/07/2019)
* @param: {any} text
*---------------------------------------------*/
function notNull(text) {
    if (text) {
        return true;
    } else {
        return false;
    }
}

/*---------------------------------------------
* TODO: Thông báo chứng năng đang xây dựng
* Author: NDANH (25/07/2019)
*---------------------------------------------*/
function functionBuilding() {
    alert(resource.vi.FunctionBuilding);
}

/*---------------------------------------------
* TODO: format định dạng tiền cho input
* Author: NDANH (25/07/2019)
*---------------------------------------------*/
function formatMoneyInput() {
    var value = $(this).val().trim().toString().replace(/\./g, '');
    if (value.length > 1 && value.substr(0, 1) === '0') {
        value = value.substr(1, value.length);
    }
    $(this).val(value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."));
}

/*---------------------------------------------
* TODO: chuyển list về mảng
* Author: NDANH (28/08/2019)
*---------------------------------------------*/
function getList(list, name, id) {
    var listGet = [];
    $.each(list, function (index, item) {
        var itemAu = { label: item[name], id: item[id] }
        listGet.push(itemAu);
    });

    return listGet;
}

/**
 * TODO: Lấy về bản ghi với giá trị tương ứng
 * Author: NDANH (28/08/2019)
 * @param {any} value
 * @param {any} list
 */
function getTypeOrID(value, list, nameValue, nameReturn) {
    if (!list) {
        return null;
    }
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        if (item[nameValue] == value) {
            return item[nameReturn];
        }
    }

    return 0;
}

/**
 * TODO: chuyển dạng chuỗi sang ngày
 * Author: NDANH (29/8/2019)
 * @param {any} date
 */
function convertStringToDate(dateStr) {
    var date = dateStr.split("/");
    return new Date(date[2], date[1]-1, date[0]);
}

/**
 * TODO: chuyển Config lại tooltip
 * Author: NDANH (29/8/2019)
 * */
$(document).ready(function () {
    $(".img-danger-valid").tooltip({
        classes: {
            "ui-tooltip": "warning-tooltip"
        }, position: {
            my: "left top",
            at: "center bottom+5"
        },
    });

    $(".toolbar-item").tooltip({
        classes: {
            "ui-tooltip": "default-tooltip"
        }, position: {
            my: "left top",
            at: "center bottom+5"
        },
    });
})

/**
 * TODO: Toast
 * Author: NDANH (29/8/2019)
 * @param {any} res
 */
$.fn.toast = function (res) {
    $('#messageToast').fadeIn();
    if (res["Success"]) {
        $("#messageToast").css("background", "#007bff");
    } else {
        $("#messageToast").css("background", "#dc3545");
    }

    $('#messageToast').text(res["Message"]);
    setTimeout(function () {
        $('#messageToast').fadeOut();
    }, 1500);
}

/**
 * TODO: Set ngày theo chuẩn JSON
 * Author: NDANH 30/8/2019
 * */
Date.prototype.toJSON = function () { return moment(this).format(); }