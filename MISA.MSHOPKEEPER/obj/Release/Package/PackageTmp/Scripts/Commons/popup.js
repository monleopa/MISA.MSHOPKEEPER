/*---------------------------------------------
* TODO: Quản lý việc đóng mở, đổ dữ liệu của các popup
* Author: NDANH (22/07/2019)
*---------------------------------------------*/
class Popup {
    constructor(idPopup, idBtnShowPopup, selectRowPopup, inputPopup, arrayPopup) {
        this.idPopup = idPopup;
        this.idBtnShowPopup = idBtnShowPopup;
        this.selectRowPopup = selectRowPopup;
        this.inputPopup = inputPopup;
        this.arrayPopup = arrayPopup;
        this.initEvents();
    }

    /*---------------------------------------------
    * TODO: Khai báo các event của popup
    * Author: NDANH (22/07/2019)
    *---------------------------------------------*/
    initEvents() {
        $(document).on("click", this.idBtnShowPopup + "", {me: this}, this.showPopup);
        $(document).on("click", this.selectRowPopup + "", { me: this }, this.selectedRowPopup);

        $(document).on("click", this.hidePopup.bind(this));
        $(document).on("click", ".select-date", this.setValueForDate);
        $(document).on("dialogdragstart", this.hideDrag.bind(this));
    }

    /*---------------------------------------------
    * TODO: Hiển thị popup
    * Author: NDANH (22/07/2019)
    *---------------------------------------------*/
    showPopup(event) {
        var me = event.data.me;
        var parent = $(this).parent();

        $(me.idPopup).data("input", me.inputPopup);
        var topPrev = $(me.idPopup).offset().top;
        var topNow = $(parent).offset().top + $(parent).outerHeight();

        $(me.idPopup).css("top", $(parent).offset().top + $(parent).outerHeight());
        $(me.idPopup).css("left", $(parent).offset().left);

        if (topPrev == topNow) {
            $(me.idPopup).toggle(false);
        } else {
            $(me.idPopup).toggle(true);
        }
    }

    /*---------------------------------------------
    * TODO: xử lý sự kiện khi chọn 1 dòng trong popup
    * Author: NDANH (22/07/2019)
    *---------------------------------------------*/
    selectedRowPopup(event) {
        var me = event.data.me;

        if ($(me.idPopup).children('table').length != 0) {
            return 1;
        }

        var input = $(me.idPopup).data("input");

        var value = Number($(this).attr("value"));
        var text = me.arrayPopup[value];
        $(input).val(text);
        $(input).text(text);
        $(input).next().attr("type-value", value);
        $(input).focusout();
        $(me.idPopup).scrollTop(0);
        $(me.idPopup).css("display", "none");
    }

    /*---------------------------------------------
    * TODO: Ẩn các dialog khi click ra ngoài
    * Author: NDANH (23/07/2019)
    *---------------------------------------------*/
    hidePopup(e) {
        var popup = $(this.idPopup);
        var btnShowPopup = $(this.idBtnShowPopup);

        if ((!popup.is(e.target) && popup.has(e.target).length === 0) && (!btnShowPopup.is(e.target) && btnShowPopup.has(e.target).length === 0)) {
            popup.find("table").last().scrollTop(0);
            popup.css("display", "none");
        }
    }

    /*---------------------------------------------
    * TODO: Ẩn các dialog khi di chuyển dialog
    * Author: NDANH (23/07/2019)
    *---------------------------------------------*/
    hideDrag() {
        $(this.idPopup).css("display", "none");
    }

    /*---------------------------------------------
    * TODO: set giá trị cho 2 ô từ ngày, đến ngày
    * Author: NDANH (23/07/2019)
    *---------------------------------------------*/
    setValueForDate() {
        var type = Number($("#inputFilterMaster").attr("valueType"));
        var date = getDateByType(type).split(" ");

        $(".from-date-input").val(date[0]);
        $(".to-date-input").val(date[1]);
    }

    /*---------------------------------------------
    * TODO: load dữ liệu lên table popup
    * Author: NDANH (23/07/2019)
    *---------------------------------------------*/
    static loadDataPopup(idTableHeader, idTableBody, array) {
        var columns = $(idTableHeader).find("th[property]");
        $(idTableBody).find("tbody").empty();
        var me = this;
        var objectType = ["Nhân viên", "Khách hàng", "Nhà cung cấp"];
        $.each(array, function (i, item) {
            var row = '';
            if (idTableHeader == "#tableWareHouseHeader") {
                row = $('<tr id="' + item["WareHouseID"] + '"></tr>');
            }
            else if (idTableHeader == "#selecObjectHeader") {
                row = $('<tr id="' + item["OutwardTargetID"] + '"></tr>');
            } else {

                row = $('<tr id="' + item["ItemID"] + '"></tr>');
            }

            $.each(columns, function (index, column) {
                var propertyName = column.getAttribute('property');
                var propertyValue = item[propertyName];

                if (propertyName == "ItemCode") {
                    propertyValue = formatNameAndCode(item["ItemCode"], item["ItemColor"], item["ItemSize"], 1);
                }

                if (propertyName == "ItemName") {
                    propertyValue = formatNameAndCode(item["ItemName"], item["ItemColor"], item["ItemSize"], 2);
                }

                if (propertyName == "OutwardTargetType") {
                    propertyValue = objectType[item["OutwardTargetType"] - 1];
                }

                if (propertyName == "Other") {
                    propertyValue = "";
                }

                var td = '<td title="' + propertyValue + '">' + propertyValue + '</td>';
                row.append(td);
            });

            $(idTableBody).find("tbody").append(row);
        })

    }
}