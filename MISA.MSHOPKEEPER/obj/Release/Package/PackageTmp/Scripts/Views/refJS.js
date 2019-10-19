$.getScript("/Scripts/Commons/common.js");

$(document).ready(function () {
    refJS = new RefJS();
})

/*---------------------------------------------
* TODO: Class quản lý các function, thuộc tính cho trang Thu/chi
* Author: NDANH (28/08/2019)
*---------------------------------------------*/
class RefJS {
    constructor() {
        this.configPage();
        this.configForm();
        this.configPopup();
        this.initEnvents();
        this.drawTable(this.columnsRef, "#tableMasterHeader");
        this.drawFilterForTable("#tableMasterHeader");
        this.refreshPage();
        this.drawTable(this.columnsRefDetail, "#tableDetailHeader");

        $(".date-picker").datepicker({
            showOn: "button",
            buttonImageOnly: true,
            buttonImage: "/Contents/Icons/calendar.png",
            showOtherMonths: true,
            buttonText: "Select date",
            showButtonPanel: true
            //onSelect: function (dateText, inst) {
            //    me.bindDateOnFilterType(dateText, inst);
            //},
        });

        $(".ref-type-autocomple").autocomplete({
            source: resource.testAutocomplete,
            autoFocus: true,
            select: function (event, ui) 
            {
                $(this).val(ui.item.label);
                $(this).attr("value-filter", ui.item.id);
                $("input[filtername]").change();
            },
        })
    }

    /**
     * TODO: Khởi tạo các biến của class
     * AUTHOR: NDANH 28/8/2019
     * */
    configPage() {
        this.columnsRef = [
            {
                ColumnProperty: "checkbox",
                ColumnName: '<div class="cell-checkbox" id="totalCheckBox"></div>',
                ColumnClass: "table-header-checkbox",
                ColumnSpan: 2,
                ColumnPosition: -10,
                ColumnFilter: -1,
            },
            {
                ColumnProperty: "RefDate",
                ColumnName: 'Ngày',
                ColumnClass: "table-header-date",
                ColumnSpan: 1,
                ColumnPosition: 2,
                ColumnFilter: 4,
            },
            {
                ColumnProperty: "RefNo",
                ColumnName: 'Số chứng từ',
                ColumnClass: "table-header-code",
                ColumnSpan: 1,
                ColumnPosition: 1,
                ColumnFilter: 1,
            },
            {
                ColumnProperty: "RefType",
                ColumnName: 'Loại chứng từ',
                ColumnClass: "table-header-type",
                ColumnSpan: 1,
                ColumnPosition: 4,
                ColumnFilter: 3,
            },
            {
                ColumnProperty: "TotalAmount",
                ColumnName: 'Tổng tiền',
                ColumnClass: "table-header-total",
                ColumnSpan: 1,
                ColumnPosition: 3,
                ColumnFilter: 2,
            },
            {
                ColumnProperty: "RefTargetName",
                ColumnName: 'Đối tượng nộp/nhận',
                ColumnClass: "table-header-target",
                ColumnSpan: 1,
                ColumnPosition: 1,
                ColumnFilter: 1,
            },
            {
                ColumnProperty: "Note",
                ColumnName: 'Lý do',
                ColumnClass: "table-header-note",
                ColumnSpan: 1,
                ColumnPosition: 1,
                ColumnFilter: 1,
            },
            {
                ColumnProperty: "other",
                ColumnName: '',
                ColumnClass: "table-header-other",
                ColumnSpan: 2,
                ColumnPosition: 1,
                ColumnFilter: -1,
            }
        ]

        this.columnsRefDetail = [
            {
                ColumnProperty: "Description",
                ColumnName: 'Diễn giải',
                ColumnClass: "table-detail-desc",
                ColumnSpan: 2,
                ColumnPosition: 1,
                ColumnFilter: -1,
            },
            {
                ColumnProperty: "AmountMoney",
                ColumnName: 'Số tiền',
                ColumnClass: "table-detail-money",
                ColumnSpan: 1,
                ColumnPosition: 3,
                ColumnFilter: 4,
            },
            {
                ColumnProperty: "BudgetName",
                ColumnName: 'Mục thu/chi',
                ColumnClass: "table-detail-budget",
                ColumnSpan: 1,
                ColumnPosition: 1,
                ColumnFilter: 1,
            },
        ]

        this.refType = ["Nhân viên", "Khách hàng", "Nhà cung cấp", "Đối tác giao hàng", "Nhân viên"];

        this.columnsRefDialog = [
            {
                ColumnProperty: "Description",
                ColumnName: 'Diễn giải',
                ColumnClass: "table-detail-desc",
                ColumnSpan: 2,
                ColumnPosition: 1,
                ColumnFilter: -1,
            },
            {
                ColumnProperty: "AmountMoney",
                ColumnName: 'Số tiền',
                ColumnClass: "table-detail-money",
                ColumnSpan: 1,
                ColumnPosition: 3,
                ColumnFilter: 4,
            },
            {
                ColumnProperty: "BudgetName",
                ColumnName: 'Mục thu/chi',
                ColumnClass: "table-detail-budget",
                ColumnSpan: 1,
                ColumnPosition: 1,
                ColumnFilter: 1,
            },
            {
                ColumnProperty: "delete",
                ColumnName: '',
                ColumnClass: "table-detail-delete",
                ColumnSpan: -8,
                ColumnPosition: 1,
                ColumnFilter: 1,
            },
            {
                ColumnProperty: "other",
                ColumnName: '',
                ColumnClass: "table-header-other",
                ColumnSpan: -9,
                ColumnPosition: 1,
                ColumnFilter: 1,
            }
        ]

        this.checkSave = true;

        $.datepicker.regional["vi-VN"] =
            {
                closeText: "Đóng",
                prevText: "Trước",
                nextText: "Sau",
                currentText: "Hôm nay",
                monthNames: ["Tháng Một", "Tháng Hai", "Tháng Ba", "Tháng Tư", "Tháng Năm", "Tháng Sáu", "Tháng Bảy", "Tháng Tám", "Tháng Chín", "Tháng Mười", "Tháng Mười Một", "Tháng Mười Hai"],
                monthNamesShort: ["Một", "Hai", "Ba", "Bốn", "Năm", "Sáu", "Bảy", "Tám", "Chín", "Mười", "Mười một", "Mười hai"],
                dayNames: ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"],
                dayNamesShort: ["CN", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy"],
                dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
                weekHeader: "Tuần",
                dateFormat: "dd/mm/yy",
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: false,
                yearSuffix: ""
            };

        $.datepicker.setDefaults($.datepicker.regional["vi-VN"]);

        $.datepicker._gotoToday = function (id) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            if (this._get(inst, 'gotoCurrent') && inst.currentDay) {
                inst.selectedDay = inst.currentDay;
                inst.drawMonth = inst.selectedMonth = inst.currentMonth;
                inst.drawYear = inst.selectedYear = inst.currentYear;
            }
            else {
                var date = new Date();
                inst.selectedDay = date.getDate();
                inst.drawMonth = inst.selectedMonth = date.getMonth();
                inst.drawYear = inst.selectedYear = date.getFullYear();
                // the below two lines are new
                this._setDateDatepicker(target, date);
                this._selectDate(id, this._getDateDatepicker(target));
            }
            this._notifyChange(inst);
            this._adjustDate(target);
        }
    }

    /**
     * TODO: Khởi tạo form dialog
     * AUTHOR: NDANH 28/8/2019
     * */
    configForm() {
        this.dialogCreateEditView = new Dialog("#dialogCreateEditView", 1000, 700);
        this.dialogCreateEditView.setDialog("closeCreateEditView", "#ui-id-1");

        this.dialogDeleteRef = new Dialog("#dialogDeleteRef", 400, 146);
        this.dialogDeleteRef.setDialog("closeDeleteRef", "#ui-id-2");

        this.dialogNotifyRef = new Dialog("#dialogNotifyRef", 400, 146);
        this.dialogNotifyRef.setDialog("closeNotifyRef", "#ui-id-3");

        this.dialogNotifyDataInvalid = new Dialog("#dialogNotifyDataInvalid", 400, 146);
        this.dialogNotifyDataInvalid.setDialog("closeDataInvalid", "#ui-id-4");
    }
    
    /**
     * TODO: Khởi tạo popup
     * AUTHOR: NDANH 28/8/2019
     * */
    configPopup() {
        this.popupTypeCreate = new Popup("#typeCreate", "#btnAdd", ".row-type-create", "", "");

        // Popup Filter
        this.popupFilterDate = new Popup("#filterDate", '.btn-filter[property="RefDate"]', '#filterDate .filter-row', '.btn-filter[property="RefDate"]', resource.filterArray);
        this.popupFilterTotalAmount = new Popup("#filterTotalAmount", '.btn-filter[property="TotalAmount"]', '#filterTotalAmount .filter-row', '.btn-filter[property="TotalAmount"]', resource.filterArray);
        this.popupFilterRefCode = new Popup("#filterRefCode", '.btn-filter[property="RefNo"]', '#filterRefCode .filter-row', '.btn-filter[property="RefNo"]', resource.filterArray);
        this.popupFilterRefTarget = new Popup("#filterRefTargetName", '.btn-filter[property="RefTargetName"]', '#filterRefTargetName .filter-row', '.btn-filter[property="RefTargetName"]', resource.filterArray);
        this.popupFilterNote = new Popup("#filterNote", '.btn-filter[property="Note"]', '#filterNote .filter-row', '.btn-filter[property="Note"]', resource.filterArray);

        // Popup Select Dialog

        this.popupRefTarget = new Popup("#popupRefTarget", "#btnSelectRefTarget");
        this.popupEmployee = new Popup("#popupEmployee", "#btnSelectEmployee");
        //this.popupBudget = 
    }

    /**
     * TODO: Khởi tạo các sự kiện
     * AUTHOR: NDANH 28/8/2019
     * */
    initEnvents() {
        $(window).on("resize", this.configSize.bind(this));
        $(document).on("focus", ".ui-dialog input", this.setFocus);
        $(document).on("focusout", ".ui-dialog input", this.removeFocus);
        $(document).on("focus", "input", this.setSelectInput);
        $(document).on("focus", "#tableDialogFooter", this.setFocusOnTable);
        $(document).on("keydown", this.setShortcutKey.bind(this));

        $(document).on("click", "#tableMasterBody tbody tr", this.rowSelected.bind(this));
        $(document).on("click", ".input-checkbox", { pointThis: this }, this.rowSelectedByCheckBox);
        $(document).on("click", "#totalCheckBox", { pointThis: this }, this.allRowSelected);
        $(document).on("click", "#tableMasterHeader .filter-dropdown", this.setAutocomplete);
        $(document).on("click", ".dropdown-budget", this.setAutocomplete);

        $(document).on("click", "#btnDlClose", this.closeDialogCreateEditView.bind(this));
        $(document).on("click", "#closeCreateEditView", this.closeDialogCreateEditView.bind(this));

        $(document).on("click", "#btnAdd", this.showPopupTypeCreate);
        $(document).on("focus", ".row-type-create", this.selectTypeCreate);
        $(document).on("click", ".row-type-create", { mode: 1 }, this.showDialogCreateEditView.bind(this));
        $(document).on("click", "#btnDuplicate", { mode: 2 }, this.showDialogCreateEditView.bind(this));
        $(document).on("click", "#btnUpdate", { mode: 4 }, this.showDialogCreateEditView.bind(this));
        $(document).on("click", "#btnView", { mode: 3 }, this.showDialogCreateEditView.bind(this));
        $(document).on("click", ".table-body tr td:nth-child(3)", this.viewByLink.bind(this));
        $(document).on("dblclick", ".table-body tr", this.viewByLink.bind(this));

        // sự kiện trên Dialog Delete
        $(document).on("click", "#btnDelete", this.showDialogDelete.bind(this));
        $(document).on("click", "#agreeDelete", this.agreeDelete.bind(this));
        $(document).on("click", "#cancelDelete", this.cancelDelete.bind(this));
        $(document).on("click", "#closeDeleteRef", this.cancelDelete.bind(this));

        $(document).on("dialogclose", "#dialogCreateEditView", this.resetForm.bind(this));
        $(document).on("dialogbeforeclose", "#dialogCreateEditView", this.closeDialogDefault.bind(this));

        // Table Dialog
        $(document).on("click", '#tableDialogBody tr', this.rowTableDialogSelected);
        $(document).on("focus", '#tableDialogBody input', this.tableDialogInputFocus);
        $(document).on("keydown", 'input[property="RefTargetCode"]', { popup: "#popupRefTarget", header: "#tableTargetHeader", tbody: "#tableTargetBody",body: "#tableTargetBody tr", me: this} ,this.autoCompleteHandle);
        $(document).on("keydown", 'input[property="EmployeeCode"]', { popup: "#popupEmployee", header: "#tableEmployeeHeader", tbody: "#tableEmployeeBody", body: "#tableEmployeeBody tr", me: this }, this.autoCompleteHandle);
        $(document).on("focusout", 'input[property="BudgetName"]', this.setValuDefault.bind(this));
        $(document).on("click", '#tableDialogBody .btn-delete-row', this.deleteRowTableDialogByButton.bind(this));
        $(document).on("change", '#tableDialogBody input[property="AmountMoney"]', this.countTotalAmount);
        $(document).on("change", '#tableDialogBody input[property="AmountMoney"]', this.newRowWhenTypeAmountMoney.bind(this));
        $(document).on("keydown", '#tableDialogBody input[property="AmountMoney"]', this.checkNumberFormat);
        $(document).on("keyup", '#tableDialogBody input[property="AmountMoney"]', formatMoneyInput);
        $(document).on("keydown", 'input[filtername="TotalAmount"]', this.checkNumberFormat);
        $(document).on("keyup", 'input[filtername="TotalAmount"]', formatMoneyInput);

        // Phân trang
        $(document).on('change', '#PageSize', this.paginatePageSize.bind(this));
        $(document).on('focus', '#offsetRow', this.paginateOffsetRow.bind(this));
        $(document).on('keydown', '#offsetRow', this.checkNumberFormat);
        $(document).on('click', '.icon-prev', this.paginatePrev.bind(this));
        $(document).on('click', '.icon-go-first', this.paginateGoFirst.bind(this));
        $(document).on('click', '.icon-next', this.paginateNext.bind(this));
        $(document).on('click', '.icon-go-last', this.paginateGoLast.bind(this));

        // Load data popup
        $(document).on('click', '.popup-table-body tr', this.rowPopupSelected);
        $(document).on('click', '#btnSelectRefTarget', { header: "#tableTargetHeader", body: "#tableTargetBody" }, this.loadDataOnPopup.bind(this));
        $(document).on('click', '#btnSelectEmployee', { header: "#tableEmployeeHeader", body: "#tableEmployeeBody" }, this.loadDataOnPopup.bind(this));

        // Sự kiện trong dialog thông báo dữ liệu invalid
        $(document).on("click", "#closeNotifyDataInvalid", this.closeDialogNotifyDataInvalid.bind(this));
        $(document).on("click", "#agreeNotify", this.closeDialogNotifyDataInvalid.bind(this));
        $(document).on("click", "#closeDataInvalid", this.closeDialogNotifyDataInvalid.bind(this));
        $(document).on("click", "#noNewNumber", this.closeDialogNotifyDataInvalid.bind(this));
        $(document).on("click", "#yesNewNumber", this.saveWithNewCode.bind(this));

        // Sự kiện trong dialog xác nhận không lưu
        $(document).on("click", "#closeNotifyInward", this.closeDialogNotify.bind(this));
        $(document).on("click", "#btnCancelClose", this.closeDialogNotify.bind(this));
        $(document).on("click", "#closeNotifyRef", this.closeDialogNotify.bind(this));
        $(document).on("click", "#btnDontSave", this.dontSaveDialog.bind(this));

        // Validate dữ liệu
        $(document).on("focus", "#refNo", { pointThis: this }, this.inputCodeOnFocus);
        $(document).on("focus", "#refDate", { pointThis: this }, this.inputDateOnFocus);
        $(document).on("focus", 'input[filtername="RefDate"]', { pointThis: this}, this.inputFilterDate);
        $(document).on("change", '#dialogCreateEditView input[property="RefTargetName"]', this.changeValueRefTargetName);
        $(document).on("focus", '#dialogCreateEditView input[property="RefTargetCode"]', this.resetValueForm.bind(this));
        $(document).on("focus", '#dialogCreateEditView input[property="EmployeeCode"]', this.resetValueForm.bind(this));

        // Toolbar Dialog
        $(document).on("click", "#btnSave", this.save.bind(this));
        $(document).on("click", "#btnDlUpdate", this.updateFromDialog.bind(this));
        $(document).on("click", "#btnDlCancel", this.cancelUpdateToView.bind(this));
        $(document).on("click", "#btnDlAdd", this.createFromDialog.bind(this));
        $(document).on("click", "#btnDlDelete", this.deleteFromDialog.bind(this));
        $(document).on("click", "#btnDlPrev", {mode : 1}, this.viewOtherRecord.bind(this));
        $(document).on("click", "#btnDlNext", { mode: 2 }, this.viewOtherRecord.bind(this));
        $(document).on("click", "#goLast", { mode: 4 }, this.viewOtherRecord.bind(this));
        $(document).on("click", "#goFirst", { mode: 3 }, this.viewOtherRecord.bind(this));

        //$(document).on("click", "#filter", this.filterRef.bind(this));
        $(document).on("change", "input[filtername]", {mode: 1},this.filterRef.bind(this));
        $(document).on("click", "#paginateRefresh", {mode: 2},this.filterRef.bind(this));
        $(document).on("click", ".filter-row", this.conditionFilter.bind(this));
        $(document).on("click", "#tableMasterHeader th[property]", this.orderRef.bind(this));
        $(document).on("click", "#btnRefresh", this.refreshPage.bind(this));
    }

        /**
     * TODO: Chọn tất cả các hàng
     * Author: NDANH 31/8/2019
     * @param {any} event
     */
    allRowSelected(event) {
        var rows = $(".table-body tbody tr");
        var me = event.data["pointThis"];
        console.log($(this).attr('class'));
        if ($(this).hasClass("cell-checkbox-selected")) {
            rows.removeClass("row-selected");
            $(".table-body .cell-checkbox").removeClass("cell-checkbox-selected");
            $(this).removeClass("cell-checkbox-selected");
        } else {
            rows.addClass("row-selected");
            $(".table-body .cell-checkbox").addClass("cell-checkbox-selected");
            $(this).addClass("cell-checkbox-selected");
        }

        me.setDisableButton();
    }

    /**
     * TODO: Chọn nhiều bằng checkbox
     * Author: NDANH 31/8/2019
     * @param {any} event
     */
    rowSelectedByCheckBox(event) {
        event.stopPropagation();
        var me = event.data['pointThis'];
        if (!$(this).hasClass("cell-checkbox-selected")) {
            $(this).addClass('cell-checkbox-selected');
            $(this).parents('tr').addClass('row-selected');
        } else {
            $(this).removeClass('cell-checkbox-selected');
            $(this).parents('tr').removeClass('row-selected');
        }

        me.setDisableButton();
    }

    /**
     * TODO: xử lý bằng bàn phím để thêm mới
     * Author: NDANH 31/8/2019
     * */
    selectTypeCreate() {
        $(this).keyup(function (event) {
            if (event.keyCode == resource.KeyCode.ArrowDown) {
                if ($(this).next().length) {
                    $(this).next().focus();
                } else {
                    $(this).prev().focus();
                }
            }

            if (event.keyCode == resource.KeyCode.ArrowUp) {
                if ($(this).prev().length) {
                    $(this).prev().focus();
                } else {
                    $(this).next().focus();
                }
            }
        });

        $(this).keypress(function (event) {
            var typeCreate = $(".row-type-create");

            if ($(typeCreate[0]).is(":focus")) {
                $(typeCreate[0]).trigger("click");
            } else {
                $(typeCreate[1]).trigger("click");
            }
            event.preventDefault();
            event.stopImmediatePropagation();
        });
    }

    /**
     * TODO: Focus vào dòng đầu tiên của chọn loại để thêm chứng từ
     * Author: NDANH 31/8/2019
     * */
    showPopupTypeCreate() {
        $(".row-type-create").first().focus();
    }

    /**
     * TODO: Refresh trang
     * Author: NDANH 31/8/2019
     * */
    refreshPage() {
        $("#tableMasterHeader tr").last().remove();
        this.drawFilterForTable("#tableMasterHeader");
        $(".ASC").removeClass("ASC");
        $(".DESC").removeClass("DESC");
        $("#PageSize").val(50);
        $("#offsetRow").val(1);
        $('#tableMasterHeader th[property="RefDate"]').addClass("DESC");
        var data = this.getValueToLoadData();
        data["OrderQuery"] = resource.OrderBy.RefDateDesc;
        this.order = resource.OrderBy.RefDateDesc;
        this.loadDataMaster(data);
    }

    /**
     * TODO: Thay đổi giá trị RefTargetName by type
     * Author: NDANH 30/8/2019
     * */
    changeValueRefTargetName(event) {
        $('input[property="RefTargetCode"]').val("");
        $('input[property="RefID"]').val("");
    }

    /**
     * TODO: Sắp xếp
     * Author: NDANH 30/8/2019
     * */
    orderRef(event) {
        var thisElement = $(event.currentTarget);
        var propertyName = thisElement.attr('property');
        var orderQuery = "";
        if (propertyName != 'other' && propertyName != 'checkbox') {
            if (!$(thisElement).hasClass("DESC") && !$(thisElement).hasClass("ASC")) {
                $("#tableMasterHeader th[property]").removeClass("DESC");
                $("#tableMasterHeader th[property]").removeClass("ASC");

                $(thisElement).addClass("DESC");
                orderQuery = propertyName + " DESC";
            } else {
                if ($(thisElement).hasClass("DESC")) {
                    $("#tableMasterHeader th[property]").removeClass("DESC");
                    $("#tableMasterHeader th[property]").removeClass("ASC");

                    $(thisElement).addClass("ASC");
                    orderQuery = propertyName + " ASC";
                } else {
                    $("#tableMasterHeader th[property]").removeClass("DESC");
                    $("#tableMasterHeader th[property]").removeClass("ASC");

                    $(thisElement).addClass("DESC");
                    orderQuery = propertyName + " DESC";
                }
            }
            var data = this.getValueToLoadData();
            data["OrderQuery"] = orderQuery;
            this.order = orderQuery;
            this.loadDataMaster(data);
        }
    }

    /**
     * TODO: filter
     * Author: NDANH 30/8/2019
     * */
    filterRef(event) {
        var mode = event.data.mode;
        var data = this.getValueToLoadData();
        if (mode == 1) {
            data.OffsetRow = 0;
        }
        if ($(event.currentTarget).attr("filtername") == "RefType") {

        } else {
            this.loadDataMaster(data);
        }
    }

     /**
     * TODO: Lọc nếu có giá trị
     * Author: NDANH 30/8/2019
     * */
    conditionFilter(event) {
        var input = $(event.currentTarget).parent().data("input");
        if ($(input).next().val()) {
            $('input[filtername]').change();
        }
    }

    /*
    * TODO: focus vào ngày nhập
    * Author: NDANH (28/08/2019)
    * @param {Event} event event
    **/
    inputDateOnFocus(event) {
        var me = event.data.pointThis;
        var inputElement = $('#' + this.id);

        me.resetValue(inputElement, isDate);
        me.validateInput(inputElement, isDate, "Định dạng ngày tháng không hợp lệ. Vui lòng nhập đúng định dạng dd/mm/yyyy.");
    }

    /**
     * TODO: Reset giá trị filter ngày
     * Author: NDANH 2/9/2019
     * */
    inputFilterDate() {
        var previousValue = $(this).val();
        $(this).on('change', function () {
            var newValue = $(this).val();
            if ((isDate && !isDate(newValue))) {
                $(this).val(previousValue);
            } else {
                previousValue = newValue;
            }
        });
    }

    /*
    * TODO: focus vào mã phiếu nhập
    * Author: NDANH (28/08/2019)
    * @param {Event} event event
    **/
    inputCodeOnFocus(event) {
        var me = event.data.pointThis;
        var inputElement = $('#' + this.id);
        me.resetValue(inputElement, notNull);
        me.validateInput(inputElement, notNull, "Trường này không được bỏ trống");
    }

    /**
     * TODO: reset giá trị ban đầu nếu tự nhập
     * AuthorL NDANH 31/8/2019
     * @param {any} event
     */
    resetValueForm(event) {
        var inputElement = $(event.currentTarget);
        var me = this;
        var value = inputElement.val();
        if (value) {
            this.previousValue = value;
        }
        inputElement.on('change', function () {
            var newValue = $(this).val();
            if (newValue == '') {
                me.previousValue = newValue;
                if ($(this).attr('property') == "EmployeeCode") {
                    $('input[property="EmployeeID"]').val("");
                    $('input[property="EmployeeName"]').val("");
                } else {
                    $('input[property="RefTargetID"]').val("");
                    $('input[property="RefTargetName"]').val("");
                }
            } else {
                $(this).val(me.previousValue);
            }
        });
    }

    /*
    * TODO: set lại giá trị nếu như giá trị nhập vào là invalid
    * Author: NDANH (28/08/2019)
    * @param {function} isValidate: hàm để check validate dữ liệu
    * @param {any} inputElement: id của input cần check valid
    **/
    resetValue(inputElement, isValidate) {
        var previousValue = inputElement.val();
        inputElement.on('change', function () {
            var newValue = $(this).val();
            if (newValue == '' || (isValidate && !isValidate(newValue))) {
                $(this).val(previousValue);
            } else {
                previousValue = newValue;
            }
        });
    }

    /*
    * TODO: Validate input
    * Author: NDANH (28/08/2019)
    * @param {any} inputElement: id của element
    * @param {function} isValidate: hàm để check validate dữ liệu
    * @param {any} warningTitle: thông báo của tooltip
    **/
    validateInput(inputElement, isValidate, warningTitle) {
        $(inputElement).on('change keyup', function () {
            var currentValue = $(this).val();
            if (currentValue == '') {
                $(this).parent().addClass('in-valid');
                $(this).parent().next().prop('title', 'Trường này không được bỏ trống.').show().tooltip({
                    classes: {
                        'ui-tooltip': 'warning-tooltip'
                    },
                });
            }
            else if (isValidate && !isValidate(currentValue)) {
                $(this).parent().addClass('in-valid');
                $(this).parent().next().show();
                $(this).parent().next().prop('title', warningTitle).tooltip({
                    classes: {
                        'ui-tooltip': 'warning-tooltip'
                    },
                });
            }
            else {
                $(this).parent().removeClass('in-valid');
                $(this).parent().next().hide();
            }
        });
    }

    /**
     * TODO: Kiểm tra dữ liệu trước khi lưu
     * Author: NDANH 28/8/2019
     * */
    checkValid() {
        var tr = $("#tableDialogBody tbody tr");
        var me = this;
        var valid = true;
        var totalRowEmpty = 0;
        if (tr.length < 1) {
            $("#iconQuestion").hide();
            $("#iconDanger").show();
            $("#textInfor").text(resource.vi.MinChooseOneItem);
            $("#yesNewNumber").hide();
            $("#noNewNumber").hide();
            $("#agreeNotify").show();
            this.dialogNotifyDataInvalid.open();
            return valid = false;
        }
        else if (tr.length == 1) {
            var amountMoney = Number($(tr).find('input[property="AmountMoney"]').val());
            var budgetName = $(tr).find('input[property="BudgetName"]').val();
            var description = $(tr).find('input[property="Description"]').val();
            if ((amountMoney == 0 && (budgetName || description)) || (amountMoney == 0 && !budgetName && !description)) {
                $("#iconQuestion").hide();
                $("#iconDanger").show();
                $("#textInfor").text(resource.vi.QuantityBiggerZero);
                $("#yesNewNumber").hide();
                $("#noNewNumber").hide();
                $("#agreeNotify").show();
                me.dialogNotifyDataInvalid.open();
                return valid = false;
            }
        }
        else {
            $.each(tr, function (i, row) {
                var amountMoney = Number($(row).find('input[property="AmountMoney"]').val());
                var budgetName = $(row).find('input[property="BudgetName"]').val();
                var description = $(row).find('input[property="Description"]').val();

                if (amountMoney == 0 && !budgetName && !description) {
                    totalRowEmpty += 1;
                }

                if (amountMoney == 0 && (budgetName || description)) {
                    $("#iconQuestion").hide();
                    $("#iconDanger").show();
                    $("#textInfor").text(resource.vi.QuantityBiggerZero);
                    $("#yesNewNumber").hide();
                    $("#noNewNumber").hide();
                    $("#agreeNotify").show();
                    me.dialogNotifyDataInvalid.open();
                    return valid = false;
                }
            }); 
        }

        if (totalRowEmpty == tr.length) {
            $("#iconQuestion").hide();
            $("#iconDanger").show();
            $("#textInfor").text(resource.vi.QuantityBiggerZero);
            $("#yesNewNumber").hide();
            $("#noNewNumber").hide();
            $("#agreeNotify").show();
            me.dialogNotifyDataInvalid.open();
            return valid = false;
        }

        return valid;
    }

    /**
    * TODO: Đóng dialog khi không lưu
    * Author: NDANH (29/08/2019)
    **/
    dontSaveDialog() {
        this.dialogNotifyRef.close();
        this.checkSave = true;
        this.dialogCreateEditView.close();
    }

    /**
    * TODO: Đóng dialog notify
    * Author: NDANH (29/08/2019)
    * @param {Event} event event
    **/
    closeDialogNotify() {
        this.dialogNotifyRef.close();
    }

    /**
    * TODO: Bắt sự kiện khi người dùng chưa lưu mà đóng dialog thêm, sửa
    * Author: NDANH (29/08/2019)
    * @param {Event} event event
    **/
    closeDialogDefault(event) {
        var valueToCheck = this.getValueForSave();
        if (JSON.stringify(valueToCheck) == JSON.stringify(this.valueDefault)) {
            this.checkSave = true;
        }

        this.valueDefault = '';
        if (!this.checkSave) {
            event.preventDefault();
            this.dialogNotifyRef.open();
        }
    }

    /**
     * TODO: Set disable button
     * Author: NDANH 28/8/2019
     * */
    setDisableButton() {
        $(".grid-table-master .toolbar-item").addClass("button-disable");
        $("#btnAdd").removeClass("button-disable");
        $("#btnRefresh").removeClass("button-disable");

        var lenght = $("#tableMasterBody tr.row-selected").length;

        if (lenght == 0) {
            $("#btnDuplicate").addClass("button-disable");
            $("#btnUpdate").addClass("button-disable");
            $("#btnView").addClass("button-disable");
            $("#btnDelete").addClass("button-disable");
        }
        else if (lenght == 1) {
            $("#btnDuplicate").removeClass("button-disable");
            $("#btnUpdate").removeClass("button-disable");
            $("#btnView").removeClass("button-disable");
            $("#btnDelete").removeClass("button-disable");
        }
        else if (lenght > 1) {
            $("#btnDuplicate").addClass("button-disable");
            $("#btnUpdate").addClass("button-disable");
            $("#btnView").addClass("button-disable");
            $("#btnDelete").removeClass("button-disable");
        }
    }

    /**
    * TODO: Đóng dialog data invalid
    * Author: NDANH (24/07/2019)
    **/
    closeDialogNotifyDataInvalid() {
        this.dialogNotifyDataInvalid.close();
    }

    /**
     * TODO: Hủy xóa
     * Author: NDANH 28/8/2019
     * */
    cancelDelete() {
        this.dialogDeleteRef.close();
    }

    /**
     * TODO: Xác nhận xóa
     * Author: NDANH 28/8/2019
     * */
    agreeDelete() {
        var listID = [];
        if (this.dialogCreateEditView.isOpen()) {
            var refID = $('input[property="RefID"]').val();
            listID.push(refID);
            this.dialogCreateEditView.close();
        } else {
            var rows = $("#tableMasterBody tr.row-selected");
            $.each(rows, function (i, row) {
                listID.push($(row).data("recordID"));
            });
        }

        this.callAjaxToDelete(listID);

    }

    /**
     * TODO: Gọi Ajax để xóa chứng từ
     * Author: NDANH 1/9/2019
     * @param {any} listID
     */
    callAjaxToDelete(listID) {
        var me = this;
        $.ajax({
            method: "PUT",
            url: "/refs/deletion",
            async: true,
            contentType: "application/json",
            data: JSON.stringify(listID),
        }).done(function (res) {
            $("#messageToast").toast(res);
            if (res.Success) {
                var data = me.getValueToLoadData();
                me.loadDataMaster(data);
            } else {

            }

        }).fail(function (res) {

            });

        me.dialogDeleteRef.close();
    }

    /**
     * TODO: Hiển thị dialog xác nhận xóa
     * Author: NDANH 28/8/2019
     * */
    showDialogDelete() {
        var rows = $("#tableMasterBody tr.row-selected");
        var length = $(rows).length;

        if (length == 1) {
            var td = $(rows).find('td');
            var text = $(td[2]).text();
            $("#refCodeDelete").text(text);
            $("#deleteMulti").hide();
            $("#deleteSingle").show();
        }
        else if (length > 1) {
            $("#deleteMulti").show();
            $("#deleteSingle").hide();
        }

        this.dialogDeleteRef.open();
    }

    /**
     * TODO: Lấy giá trị listFilter và Phân trang
     * AUTHOR: NDANH 28/8/2019
     * */
    getValueToLoadData() {
        var listFilter = this.getValueToFilter();
        var PageSize = Number($('#PageSize').val());
        var OffsetRow = Number($('#offsetRow').val());
        var offset = (OffsetRow - 1) * PageSize;
        if (offset < 0) {
            offset = 0;
        }
        var OrderQuery = this.order;

        return { PageSize: PageSize, OffsetRow: offset, ListFilter: listFilter, OrderQuery: OrderQuery };
    }

    /**
     * TODO: Lấy giá trị listFilter
     * AUTHOR: NDANH 28/8/2019
     * */
    getValueToFilter() {
        var filters = $("input[filtername]");
        var listFilter = [];
        $.each(filters, function (index, filter) {
            var FilterValue = $(filter).val();
            if (FilterValue) {
                var FilterName = filter.getAttribute('filtername');
                var FilterType = Number(filter.getAttribute('type-value'));

                if (FilterName == "RefType") {
                    FilterValue = Number($(filter).attr("value-filter"));
                    if (FilterValue == 0) {
                        FilterValue = "";
                    }
                }

                if (FilterName == "TotalAmount") {
                    FilterValue = (FilterValue + ``).formatNumberMoney();
                }

                var Filter = {
                    FilterName: FilterName,
                    FilterValue: FilterValue,
                    FilterType: FilterType,
                }

                listFilter.push(Filter);
            }
        });
        return listFilter;
    }

    /**
     * TODO: set disable button cho nút phân trang
     * Author: NDANH 30/8/2019
     * */
    setDisableButtonPaginate() {
        $("#paginateRefresh").removeClass('button-disable');
        var totalPage = Number($("#totalPage").text());
        var offsetRow = Number($("#offsetRow").val());

        if (offsetRow > 1) {
            $(".icon-go-first").removeClass('button-disable');
            $(".icon-prev").removeClass('button-disable');
        }

        if (offsetRow < totalPage) {
            $(".icon-go-last").removeClass('button-disable');
            $(".icon-next").removeClass('button-disable');
        }
    }

    /**
     * TODO: Set lại giá trị paginate
     * Author: NDANH (28/8/2019)
     * */
    setPaginate(condition, data) {
        var totalRecord;
        if (data.length) {
            $("#noData").hide();
            $("#hasData").show();
            totalRecord = data[0].TotalRecord;
            var pageSize = condition.PageSize;
            var offsetRow = condition.OffsetRow;
            var pageNumber = Math.ceil(totalRecord / pageSize);
            $('#totalPage').text(pageNumber);
            $('#totalRecord').text(totalRecord)
            $('#fromRecord').text(offsetRow + 1);
            if ($("#offsetRow").val() == 0) {
                $("#offsetRow").val(1);
            }
            var temp = (offsetRow + pageSize)
            var toRecord = temp < totalRecord ? temp : totalRecord;
            $('#toRecord').text(toRecord);
        } else {
            totalRecord = 1;
            $("#noData").show();
            $("#hasData").hide();
            $("#offsetRow").val("0");
            $("#totalPage").text("0");
        }
    }

    /**
     * TODO: Thay đổi số bản ghi hiện lên
     * Author: NDANH (28/8/2019)
     * */
    paginatePageSize() {
        $('#offsetRow').val(1);
        var data = this.getValueToLoadData();
        this.loadDataMaster(data);
    }

    /**
     * TODO: Thay đổi số trang hiện tại
     * Author: NDANH (28/8/2019)
     * */
    paginateOffsetRow(event) {
        var offsetRow = Number($('#offsetRow').val());

        $('#offsetRow').change(function () {
            var offsetRowNow = Number($('#offsetRow').val());
            var totalPage = Number($('#totalPage').text());
            console.log('hello');
            if (offsetRowNow > totalPage || offsetRowNow <= 0) {
                $('#offsetRow').val(offsetRow);
            }
            else if (offsetRowNow <= totalPage && offsetRowNow > 0) {
                var data = this.getValueToLoadData();
                this.loadDataMaster(data);
            }
            event.preventDefault();
        }.bind(this));
    }

    /**
     * TODO: Về trang trước đó
     * Author: NDANH (23/8/2019)
     * */
    paginatePrev() {
        var OffsetRow = Number($('#offsetRow').val()) -1;
        if (OffsetRow > 0) {
            $('#offsetRow').val(OffsetRow);
            var data = this.getValueToLoadData();
            this.loadDataMaster(data);
        } else {

        }
    }

    /**
     * TODO: Về trang đầu tiên
     * Author: NDANH (28/8/2019)
     * */
    paginateGoFirst() {
        $('#offsetRow').val(1);
        var data = this.getValueToLoadData();
        this.loadDataMaster(data);
    }

    /**
     * TODO: Sang tragn tiếp theo
     * Author: NDANH (28/8/2019)
     * */
    paginateNext() {
        var OffsetRow = Number($('#offsetRow').val()) + 1;
        var TotalPage = Number($('#totalPage').text());
        if (OffsetRow <= TotalPage) {
            $('#offsetRow').val(OffsetRow);
            var PageSize = Number($('#PageSize').val());

            var data = this.getValueToLoadData();
            this.loadDataMaster(data);
        } else {

        }
    }

    /**
     * TODO: Về trang cuối cùng
     * Author: NDANH (28/8/2019)
     * */
    paginateGoLast() {
        var TotalPage = Number($('#totalPage').text());
        $('#offsetRow').val(TotalPage)
        var data = this.getValueToLoadData();
        this.loadDataMaster(data);
    }

    /**
     * TODO: Reset Form thêm mới, sửa
     * Author: NDANH (28/8/2019)
     * */
    resetForm() {
        $('#formCreateEditView').trigger('reset');
        $("#totalAmountDialog").text(0);
        $("#tableDialogBody tbody").empty();
        $("#tableDialogHeader thead tr").empty();
        $(".ui-dialog .toolbar-item").addClass("button-disable");
        $("#dialogCreateEditView input").removeAttr("disabled");
        $("#dialogCreateEditView input").parent().removeClass("disable");
        $(".input-disable").attr("disabled", "disabled");
        $(".input-disable").parent().addClass("disable");
        $("#columnDelete").show();
        $("#popupEmployee").css('display','none');
        $("#popupRefTarget").css('display','none');
        this.setTable("#tableDialogHeader", "#tableDialogFooter");
    }

    /**
     * TODO: Vẽ table header
     * AUTHOR: NDANH 28/8/2019
     * @param {any} columnsDraw
     * @param {any} idTable
     */
    drawTable(columnsDraw, idTable) {
        $.each(columnsDraw, function (index, column) {
            var th = "";
            th = '<th rowspan="' + column.ColumnSpan + '" class="' + column.ColumnClass + '"'
                + 'property="' + column.ColumnProperty + '"'
                + 'position="' + column.ColumnPosition + '"'
                + 'filterType="' + column.ColumnFilter + '">'
                + column.ColumnName + '</th>';
            $(idTable).find('thead tr').append(th);
        })
    }

    /**
     * TODO: Vẽ table filter
     * AUTHOR: NDANH 28/8/2019
     * @param {any} idTable
     */
    drawFilterForTable(idTable) {
        var columns = $(idTable + " th[property]");
        var rowHTML = $('<tr></tr>');
        $.each(columns, function (index, column) {
            var filterType = Number(column.getAttribute('filtertype'));
            var columnProperty = column.getAttribute('property');
            
            var filterHTML = '';
            switch (filterType) {
                case 1:
                    filterHTML = '<th><div class="display-flex">'
                        + '<button class="btn-filter" property="' + columnProperty + '">∗</button>'
                        + '<input class="filter-input" maxlength="255" type-value="5" filterName="' + columnProperty  + '">'
                        + '</div></th>';
                    break;
                case 2:
                    filterHTML = '<th><div class="display-flex">'
                        + '<button class="btn-filter" property="' + columnProperty + '">=</button>'
                        + '<input maxlength="24" class="filter-input" type-value="0" filterName="' + columnProperty + '">'
                        + '</div></th>';
                    break;
                case 3:
                    filterHTML = '<th><div class="display-flex" style="position: relative;">'
                        + '<input maxlength="255" class="filter-input filter-input-dropdown ref-type-autocomple" type-value="0" filterName="' + columnProperty + '">'
                        + '<div class="btn-filter filter-dropdown icon-dropdown-arrow" property="' + columnProperty + '"></div>'
                        + '</div></th>';
                    break;
                case 4:
                    filterHTML = '<th><div class="display-flex">'
                        + '<button class="btn-filter" property="' + columnProperty + '">=</button>'
                        + '<input maxlength="12" class="filter-input date-picker" type-value="9" filterName="' + columnProperty + '">'
                        + '</div></th>';
                    break;
                default:
                    break;
            }

            $(rowHTML).append(filterHTML);
        });

        $(idTable + ' thead').append(rowHTML);
    }

    /**
     * TODO: Lấy dữ liệu từ Server cho bảng Master
     * AUTHOR: NDANH 28/8/2019
     * */
    loadDataMaster(dataCondition) {
        $(".grid-table-master .toolbar-item").addClass("button-disable");
        $(".paginate-icon").addClass("button-disable");
        $("#loadTableMaster").show();
        $("#loadTableDetail").show();
        var me = this;
        $.ajax({
            method: "POST",
            url: "/refs/filter",
            data: JSON.stringify(dataCondition),
            contentType: "application/json",
            async: true,
        }).done(function (res) {
            if (res.Success) {
                me.bindDataTable(res.Data, "#tableMasterHeader", "#tableMasterBody", "RefID");
                me.setPaginate(dataCondition, res.Data);
                me.setDisableButtonPaginate();
                if ($('#tableMasterBody tbody tr').length > 0) {
                    $('#tableMasterBody tbody tr').first().trigger('click');
                } else {
                    $('#tableDetailBody tbody').empty();
                    $('.total-amount').text('0');
                    $("#loadTableDetail").hide();
                }
            } else {
                $("#tableDetailBody tbody").empty();
                $('.total-amount').text('0');
                $("#loadTableDetail").hide();
            }

            me.setDisableButton();
            $("#tableMasterBody").scrollTop(0);
            $("#loadTableMaster").hide();
            $("#messageToast").toast(res);
        }).fail(function (res) {

        });
    }

    /**
     * TODO: Đổ dữ liệu lên table
     * AUTHOR: NDANH 28/8/2019
     * @param {any} data
     * @param {any} idHeader
     * @param {any} id
     * @param {any} target
     */
    bindDataTable(data, idHeader, idBody, id) {
        var me = this;
        $(idBody + " tbody").empty();
        $.each(data, function (index, item) {
            var rowHTML = $('<tr></tr>').data('recordID', item[id])

            var fields = $(idHeader+" th[property]");
            $.each(fields, function (i, field) {
                var propertyName = field.getAttribute('property');
                var propertyValue = item[propertyName];
                var cls = "text-left";
                var type = Number(field.getAttribute('position'));
                var title = propertyValue;
                switch (type) {
                    case 3:
                        propertyValue = (propertyValue + ``).formatMoney();
                        title = propertyValue;
                        cls = "text-right";
                        break;
                    case 2:
                        cls = "text-center";
                        propertyValue = propertyValue.DDMMYYY();
                        title = propertyValue;
                        break;
                    case 4:
                        propertyValue = resource.arrayRefType[propertyValue];
                        title = propertyValue;
                        break;
                    case -10:
                        cls = "text-center";
                        title = '';
                        propertyValue = '<div class="cell-checkbox input-checkbox"></div>'
                        break;
                    case -9:
                        cls = "text-center";
                        propertyValue = '';
                        title = '';
                        break;
                }

                if (propertyName == "RefTargetType") {
                    propertyValue = me.refType[propertyValue];
                }

                if (!propertyValue) {
                    propertyValue = "";
                }

                var tdHTML = '<td title="' + title + '" class="' + cls + '">' + propertyValue + '</td>';
                rowHTML.append(tdHTML);
            });

            $(idBody + " tbody").append(rowHTML);
        })

        this.setTable(idHeader, idBody);
    }

    /**
     * TODO: set lại kích thước khi có thay đổi màn hình
     * AUTHOR: NDANH 28/8/2019
     * */
    configSize() {
        this.setTable("#tableMasterHeader", "#tableMasterBody");
        this.setTable("#tableDetailHeader", "#tableDetailBody");
        this.setTable("#tableDetailHeader", "#tableDetailFooter");
    }

    /**
     * TODO: set kích thước của các cell table
     * AUTHOR: NDANH 28/8/2019
     * @param {any} idTableHeader
     * @param {any} idTableBody
     */
    setTable(idTableHeader, idTableBody) {
        var thead = $(idTableHeader + " th");
        var tbody = $(idTableBody + " tr");

        $.each(tbody, function (index, row) {
            var cell = $(row).children("td");
            $.each(cell, function (i, e) {
                $(e).css('min-width', $(thead[i]).outerWidth());
                $(e).css('max-width', $(thead[i]).outerWidth());
            });
        })

    }

    /**
     * TODO: Lưu
     * AUTHOR: NDANH 28/8/2019
     * */
    save() {
        if (this.checkValid()) {
            this.checkSave = true;
            var data = this.getValueForSave();
            this.callAjaxToSave(data);
        }
    }

    /**
     * TODO: Gọi ajax để save
     * Author: NDANH 1/9/2019
     * @param {any} data
     */
    callAjaxToSave(data) {
        var me = this;
        var method = "";
        var order = "";


        if (data.RefID) {
            method = "PUT";
            order = resource.OrderBy.ModifiedDateDesc;
        } else {
            method = "POST";
        }

        $("#loadDialog").show();
        $.ajax({
            method: method,
            url: "/refs",
            async: true,
            data: JSON.stringify(data),
            contentType: "application/json",
        }).done(function (res) {
            if (res.Success) {
                var dataLoad = me.getValueToLoadData();
                dataLoad["OrderQuery"] = order;
                me.loadDataMaster(dataLoad);
                me.dataUpdate = data;
                me.cancelUpdateToView();
                if (method == "POST") {
                    $('input[property="RefID"]').val(res.Data);
                }
                me.checkButtonViewDisable();
            }
            else {
                if (res.Data.DataCode == -10) {
                    me.NewCode = res.Data.NewCode;
                    $("#iconQuestion").show();
                    $("#iconDanger").hide();
                    var text = resource.vi.VoucherNumber + data.RefNo + resource.vi.VoucherExist;
                    $("#textInfor").text(text);
                    $("#yesNewNumber").show();
                    $("#noNewNumber").show();
                    $("#agreeNotify").hide();
                    me.dialogNotifyDataInvalid.open();
                }
            }
            $("#loadDialog").hide();
            $("#messageToast").toast(res);
        }).fail(function (res) {
        });
    }

    /**
     * TODO: Lưu với mã mới
     * Author: NDANH 1/9/2019
     */
    saveWithNewCode() {
        var data = this.getValueForSave();
        data.RefNo = this.NewCode;
        this.callAjaxToSave(data);
        this.dialogNotifyDataInvalid.close();
    }

    /**
     * TODO: Click 1 hàng table master
     * AUTHOR: NDANH 28/8/2019
     * @param {any} event
     */
    rowSelected(event) {
        var target = event.currentTarget;
        $(".cell-checkbox-selected").removeClass("cell-checkbox-selected");
        if (event.ctrlKey) {
            if ($(target).hasClass("row-selected")) {
                $(target).removeClass("row-selected");
            } else {
                $(target).addClass("row-selected");
            }
        } else if (event.shiftKey) {
            var indexRowSelectedLast = $('#tableMasterBody tr.row-selected').last().index();
            var indexSelect = $(target).index();
            var start = (indexRowSelectedLast > indexSelect) ? indexSelect : indexRowSelectedLast;
            var end = (indexRowSelectedLast > indexSelect) ? indexRowSelectedLast : indexSelect;
            $(target).parent().find('tr').slice(start, end + 1).addClass('row-selected');
            //$(target).parent().children().slice(start, end + 1).children().children('.checkbox-square').removeClass('unchecked-box').addClass('checked-box');
        }
        else {
            $("#tableMasterBody tbody tr.row-selected").removeClass("row-selected");
            $(event.currentTarget).addClass("row-selected");
        }
        this.setDisableButton();
        var refID = $(event.currentTarget).data("recordID");
        this.loadDataDetail(refID);
    }

    /**
     * TODO: Lấy dữ liệu từ server cho bảng detail
     * AUTHOR: NDANH 28/8/2019
     * @param {any} idRef
     */
    loadDataDetail(idRef) {
        var me = this;
        $("#loadTableDetail").show();
        $.ajax({
            method: "GET",
            url: "/refdetails/" + idRef,
            async: true,
        }).done(function (res) {
            me.bindDataTable(res.Data, "#tableDetailHeader", "#tableDetailBody", "RefDetailID")
            var totalAmount = 0;
            $.each(res.Data, function (index, item) {
                totalAmount += item["AmountMoney"];
            })

            $("#tableDetailFooter .total-amount").text((totalAmount + ``).formatMoney());
            me.setTable("#tableDetailHeader", "#tableDetailFooter");

            $("#loadTableDetail").hide();
        }).fail(function (res) {

        });
    }

    /**
     * TODO: Hiển thị dialog thêm mới, sửa, xem
     * AUTHOR: NDANH 28/8/2019
     * MODIFIED: NDANH 29/8/2019
     * */
    showDialogCreateEditView(event) {
        $("#loadDialog").show();
        var type = event.data.mode;
        $(".ui-dialog .toolbar-item").addClass("button-disable");
        this.dialogCreateEditView.open();
        this.drawTable(this.columnsRefDialog, "#tableDialogHeader");
        this.setTable("#tableDialogHeader", "#tableDialogFooter");
        switch (type) {
            case 1:
                var label = resource.RefGet;
                if ($(event.currentTarget).attr('type') == 4) {
                    label = resource.RefPay;
                }
                this.create(label);
                break;
            case 2:
                this.duplicate();
                break;
            case 3:
                this.view();
                break;
            case 4:
                this.update();
                break;
        }
        
    }

    /**
     * TODO: Xem bằng cách click vào link
     * AUTHOR: NDANH 28/8/2019
     * @param {any} event
     */
    viewByLink(event) {
        $(event.currentTarget).parent().trigger("click");
        $("#btnView").trigger("click");
    }

    /**
     * TODO: Đóng dialog dialog thêm mới, sửa, xem
     * AUTHOR: NDANH 28/8/2019
     * */
    closeDialogCreateEditView() {
        this.dialogCreateEditView.close();
    }

    /**
     * TODO: Get Ref theo ID
     * AUTHOR: NDANH 29/8/2019
     * */
    getRefByID(mode) {
        var me = this;
        var refID = $("#tableMasterBody tr.row-selected").data("recordID");
        $.ajax({
            method: "GET",
            url: "/refs/" + refID,
            async: true,
        }).done(function (res) {
            if (res.Success) {
                me.dataUpdate = res.Data;
                var dataUpdate = res.Data;
                var label;
                var typeRef = 1;
                if (res.Data.RefType < 4) {
                    label = resource.RefGet;
                    typeRef = 1;
                } else {
                    label = resource.RefPay;
                    typeRef = 2;
                }

                $.ajax({
                    method: 'GET',
                    url: "/budgets/" + typeRef,
                    async: true
                }).done(function (res) {
                    if (res.Success) {
                        me.listBudgets = res.Data;
                        me.listBudget = getList(res.Data, "BudgetName", "BudgetID");
                        me.bindDataOnDialog(dataUpdate, label);
                        me.valueDefault = me.getValueForSave();
                    } else {
                        $("#messageToast").toast(res);
                    }
                }).fail(function (res) {
                    });

                me.setLabelRef(label);
                if (mode == 2) {
                    $("#loadDialog").show();
                    $.ajax({
                        method: 'GET',
                        url: "/refs/newcode/" + typeRef,
                        async: true
                    }).done(function (res) {
                        if (res.Success) {
                            $('#dialogCreateEditView input[property="RefNo"]').val(res.Data);
                            $('#dialogCreateEditView input[property="RefDate"]').val(getDateToday());
                            $('#dialogCreateEditView input[property="RefID"]').val("");
                            me.valueDefault = me.getValueForSave();
                        } else {
                            $("#messageToast").toast(res);
                        }
                        $("#loadDialog").hide();
                    }).fail(function (res) {
                    });
                }
               
                me.valueDefault = me.getValueForSave();
            } else {
                $("#messageToast").toast(res);
            }
            me.valueDefault = me.getValueForSave();
        }).fail(function (res) {

        });
    }

    /**
     * TODO: Thêm mới
     * AUTHOR: NDANH 28/8/2019
     * */
    create(label) {
        this.dialogCreateEditView.option(label["RefCreate"]);
        var typeRef = 1;
        if (label.RefType != 1) {
            typeRef = 2;
        }
        $("#btnSave").removeClass("button-disable");
        $("#btnDlHelp").removeClass("button-disable");
        $("#btnDlClose").removeClass("button-disable");
        this.setLabelRef(label);
        this.checkSave = false;
        $('input[property="RefDate"]').val(getDateToday());
        var me = this;
        $.ajax({
            method: 'GET',
            url: "/refs/newcode/" + typeRef,
            async: true
        }).done(function (res) {
            if (res.Success) {
                $('#dialogCreateEditView input[property="RefNo"]').val(res.Data);
                me.valueDefault = me.getValueForSave();
            } else {
                $("#messageToast").toast(res);
            }
            $("#loadDialog").hide();
        }).fail(function (res) {
            });

        $.ajax({
            method: 'GET',
            url: "/budgets/" + typeRef,
            async: true
        }).done(function (res) {
            if (res.Success) {
                me.listBudgets = res.Data;
                me.listBudget = getList(res.Data, "BudgetName", "BudgetID");
                me.addNewRowToTableDialog();
            } else {
                $("#messageToast").toast(res);
            }
        }).fail(function (res) {

        });

        $.ajax({
            method: 'GET',
            url: "/reftargets",
            async: true
        }).done(function (res) {
            if (res.Success) {
                me.bindDataTable(res.Data, "#tableTargetHeader", "#tableTargetBody", "RefTargetID");
            } else {
                $("#messageToast").toast(res);
            }
        }).fail(function (res) {

        });

        $.ajax({
            method: 'GET',
            url: "/employees",
            async: true
        }).done(function (res) {
            if (res.Success) {
                me.bindDataTable(res.Data, "#tableEmployeeHeader", "#tableEmployeeBody", "EmployeeID");
                $("#tableEmployeeBody tr").first().trigger("click");
                me.valueDefault = me.getValueForSave();
            } else {
                $("#messageToast").toast(res);
            }
        }).fail(function (res) {

        });

    }

    /**
     * TODO: set nhãn cho các input
     * Author: NDANH 1/9/2019
     * */
    setLabelRef(label) {
        $("#labelRefTarget").text(label["RefTarget"]);
        $("#labelPersonImple").text(label["PersonImple"]);
        $("#labelNote").text(label["Note"]);
        $("#labelEmployee").text(label["Employee"]);
        $("#labelRefNo").text(label["RefNo"]);
        $("#labelRefDate").text(label["RefDate"]);
        $('input[property="RefType"]').val(label["RefType"]);
    }

     /**
     * TODO: Nhân bản
     * AUTHOR: NDANH 28/8/2019
     * */
    duplicate() {
        this.dialogCreateEditView.option(resource.ref.RefCreate);
        $("#btnSave").removeClass("button-disable");
        $("#btnDlHelp").removeClass("button-disable");
        $("#btnDlClose").removeClass("button-disable");
        this.checkSave = false;

        this.getRefByID(2);
        var me = this;

        $.ajax({
            method: 'GET',
            url: "/reftargets",
            async: true
        }).done(function (res) {
            if (res.Success) {
                me.bindDataTable(res.Data, "#tableTargetHeader", "#tableTargetBody", "RefTargetID");
            } else {
                $("#messageToast").toast(res);
            }
        }).fail(function (res) {

        });

        $.ajax({
            method: 'GET',
            url: "/employees",
            async: true
        }).done(function (res) {
            if (res.Success) {
                me.bindDataTable(res.Data, "#tableEmployeeHeader", "#tableEmployeeBody", "EmployeeID");;
            } else {
                $("#messageToast").toast(res);
            }
        }).fail(function (res) {

        });


    }

    /**
     * TODO: Xem
     * AUTHOR: NDANH 28/8/2019
     * */
    view() {
        this.dialogCreateEditView.option(resource.ref.RefView);
        $("#btnDlHelp").removeClass("button-disable");
        $("#btnDlClose").removeClass("button-disable");
        $("#btnDlAdd").removeClass("button-disable");
        $("#btnDlUpdate").removeClass("button-disable");
        $("#btnDlPrev").removeClass("button-disable");
        $("#btnDlNext").removeClass("button-disable");
        $("#btnDlPrint").removeClass("button-disable");
        $("#btnDlDelete").removeClass("button-disable");
        $("#goFirst").removeClass("button-disable");
        $("#goLast").removeClass("button-disable");
        this.checkButtonViewDisable();
        this.checkSave = true;
        this.getRefByID(1);
        $("#dialogCreateEditView input:visible").attr("disabled", "disabled");
        $("#dialogCreateEditView input:visible").parent().addClass("disable");
    }

    /**
     * TODO: Sửa
     * AUTHOR: NDANH 28/8/2019
     * */
    update() {
        this.dialogCreateEditView.option(resource.ref.RefUpdate);
        $("#btnSave").removeClass("button-disable");
        $("#btnDlHelp").removeClass("button-disable");
        $("#btnDlClose").removeClass("button-disable");
        $("#btnDlCancel").removeClass("button-disable");

        this.checkSave = false;
        var me = this;
        this.getRefByID(1);

        $.ajax({
            method: 'GET',
            url: "/reftargets",
            async: true
        }).done(function (res) {
            if (res.Success) {
                me.bindDataTable(res.Data, "#tableTargetHeader", "#tableTargetBody", "RefTargetID");
            } else {
                $("#messageToast").toast(res);
            }
        }).fail(function (res) {

        });

        $.ajax({
            method: 'GET',
            url: "/employees",
            async: true
        }).done(function (res) {
            if (res.Success) {
                me.bindDataTable(res.Data, "#tableEmployeeHeader", "#tableEmployeeBody", "EmployeeID");
                me.valueDefault = me.getValueForSave();
            } else {
                $("#messageToast").toast(res);
            }
        }).fail(function (res) {

        });

    }

    /**
     * TODO: Đổ dữ liệu lên table dialog
     * AUTHOR: NDANH 28/8/2019
     * @param {any} data
     */
    bindDataOnDialog(data, reftype) {
        var me = this;
        this.dialogCreateEditView.option(reftype.RefUpdate);
        var inputMaster = $("#dialogCreateEditView .dialog-content input[property]");

        $.each(inputMaster, function (i, input) {
            var propertyName = input.getAttribute('property');
            var propertyValue = data[propertyName];
            if (propertyName == "RefDate") {
                if ($.type(propertyValue) == "date") {
                    propertyValue = propertyValue.formatDate();
                } else {
                    propertyValue = propertyValue.DDMMYYY();
                }
            }
            $(input).val(propertyValue);
        });

        var listRefDetail = data.ListRefDetail;
        $.each(listRefDetail, function (i, detail) {
            me.addNewRowToTableDialog();
            var tableInputs = $("#tableDialogBody tr").last().find("input[property]");
            $.each(tableInputs, function (i, input) {
                var propertyName = input.getAttribute('property');
                var propertyValue = detail[propertyName];

                if (propertyName == 'AmountMoney') {
                    propertyValue = (propertyValue+``).formatMoney();
                }

                $(input).val(propertyValue);
            });
        });

        if (!$("#btnDlUpdate").hasClass("button-disable")) {
            this.dialogCreateEditView.option(reftype.RefView);

            $("#tableDialogBody input:visible").attr("disabled", "disabled");
            $("#tableDialogBody tr").addClass("disable");

            $(".table-detail-delete").hide();
            $(".btn-delete-row").parent().hide();
            this.setTable("#tableDialogHeader", "#tableDialogBody");
            $("#columnDelete").hide();
            this.setTable("#tableDialogHeader", "#tableDialogFooter");
        }
        this.countTotalAmount();
        $("#loadDialog").hide();
    }

    /**
     * TODO: Thực hiện sửa trên Dialog
     * AUthor: NDANH 30/8/2019
     * */
    updateFromDialog() {
        $("#loadDialog").show();
        var me = this;
        var type = Number($('input[property="RefType"]').val());
        if (type < 4) {
            this.dialogCreateEditView.option(resource.RefGet.RefUpdate);
        } else {
            this.dialogCreateEditView.option(resource.RefPay.RefUpdate);
        }

        $(".ui-dialog .toolbar-item").addClass("button-disable");
        $("#btnSave").removeClass("button-disable");
        $("#btnDlHelp").removeClass("button-disable");
        $("#btnDlClose").removeClass("button-disable");
        $("#btnDlCancel").removeClass("button-disable");
        this.checkSave = false;
        $("#dialogCreateEditView input:visible").removeAttr("disabled");
        $("#dialogCreateEditView .disable").removeClass("disable");
        $(".input-disable").attr("disabled", "disabled");
        $(".input-disable").parent().addClass("disable");
        $(".table-detail-delete").show();
        $(".btn-delete-row").parent().show();
        this.setTable("#tableDialogHeader", "#tableDialogBody");
        $("#columnDelete").show();
        this.setTable("#tableDialogHeader", "#tableDialogFooter");

        $.ajax({
            method: 'GET',
            url: "/reftargets",
            async: true
        }).done(function (res) {
            if (res.Success) {
                me.bindDataTable(res.Data, "#tableTargetHeader", "#tableTargetBody", "RefTargetID");
            } else {
                $("#messageToast").toast(res);
            }
            $("#loadDialog").hide();
        }).fail(function (res) {

        });

        $.ajax({
            method: 'GET',
            url: "/employees",
            async: true
        }).done(function (res) {
            if (res.Success) {
                me.bindDataTable(res.Data, "#tableEmployeeHeader", "#tableEmployeeBody", "EmployeeID");
                me.valueDefault = me.getValueForSave();
            } else {
                $("#messageToast").toast(res);
            }
            $("#loadDialog").hide();
        }).fail(function (res) {

        });
        $("#dialogCreateEditView input:visible").first().focus();
    }

    /**
     * TODO: Thực hiện thêm mới trên Dialog
     * AUthor: NDANH 30/8/2019
     * */
    createFromDialog() {
        $("#loadDialog").show();
        var me = this;
        var type = Number($('input[property="RefType"]').val());
        var typeRef = 1;
        if (type < 4) {
            typeRef = 1;
            this.dialogCreateEditView.option(resource.RefGet.RefCreate);
        } else {
            this.dialogCreateEditView.option(resource.RefPay.RefCreate);
            typeRef = 2;
        }
        $('#formCreateEditView').trigger('reset');
        $("#tableDialogBody tbody").empty();
        $(".ui-dialog .toolbar-item").addClass("button-disable");
        $("#btnSave").removeClass("button-disable");
        $("#btnDlHelp").removeClass("button-disable");
        $("#btnDlClose").removeClass("button-disable");
        this.checkSave = false;
        $("#dialogCreateEditView input:visible").removeAttr("disabled");
        $("#dialogCreateEditView .disable").removeClass("disable");
        $(".input-disable").attr("disabled", "disabled");
        $(".input-disable").parent().addClass("disable");
        $(".table-detail-delete").show();
        $(".btn-delete-row").parent().show();
        this.setTable("#tableDialogHeader", "#tableDialogBody");
        $("#columnDelete").show();
        this.setTable("#tableDialogHeader", "#tableDialogFooter");
        this.addNewRowToTableDialog();
        $('input[property="RefType"]').val(type);
        $('input[property="RefDate"]').val(getDateToday());
        this.valueDefault = this.getValueForSave();
        $("#dialogCreateEditView input:visible").first().focus();

        $.ajax({
            method: 'GET',
            url: "/refs/newcode/" + typeRef,
            async: true
        }).done(function (res) {
            if (res.Success) {
                $('#dialogCreateEditView input[property="RefNo"]').val(res.Data);
                me.valueDefault = me.getValueForSave();
            } else {
                $("#messageToast").toast(res);
            }
            $("#loadDialog").hide();
        }).fail(function (res) {
        });

        $.ajax({
            method: 'GET',
            url: "/reftargets",
            async: true
        }).done(function (res) {
            if (res.Success) {
                me.bindDataTable(res.Data, "#tableTargetHeader", "#tableTargetBody", "RefTargetID");
            } else {
                $("#messageToast").toast(res);
            }
            $("#loadDialog").hide();
        }).fail(function (res) {

        });

        $.ajax({
            method: 'GET',
            url: "/employees",
            async: true
        }).done(function (res) {
            if (res.Success) {
                me.bindDataTable(res.Data, "#tableEmployeeHeader", "#tableEmployeeBody", "EmployeeID");
                $("#tableEmployeeBody tr").first().trigger("click");
                me.valueDefault = me.getValueForSave();
            } else {
                $("#messageToast").toast(res);
            }
            $("#loadDialog").hide();
        }).fail(function (res) {

        });
        $("#dialogCreateEditView input:visible").first().focus();
    }

    /**
     * TODO: Xóa bản ghi trên form xem
     * AUthor: NDANH 30/8/2019
     * */
    deleteFromDialog() {
        var refNo = $('input[property="RefNo"]').val();
        $("#refCodeDelete").text(refNo);
        $("#deleteMulti").hide();
        $("#deleteSingle").show();
        this.dialogDeleteRef.open();
    }

    /**
     * TODO: Hủy việc sửa
     * Author: NDANH 30/8/2019
     * */
    cancelUpdateToView() {
        this.dialogCreateEditView.option(resource.ref.RefView);
        $("#tableDialogBody tbody").empty();
        $(".ui-dialog .toolbar-item").addClass("button-disable");
        $("#btnDlHelp").removeClass("button-disable");
        $("#btnDlClose").removeClass("button-disable");
        $("#btnDlAdd").removeClass("button-disable");
        $("#btnDlUpdate").removeClass("button-disable");
        $("#btnDlPrev").removeClass("button-disable");
        $("#btnDlNext").removeClass("button-disable");
        $("#btnDlPrint").removeClass("button-disable");
        $("#btnDlDelete").removeClass("button-disable");
        $("#goFirst").removeClass("button-disable");
        $("#goLast").removeClass("button-disable");

        $("#dialogCreateEditView input:visible").attr("disabled", "disabled");
        $("#dialogCreateEditView input:visible").parent().addClass("disable");

        var type = Number($('input[property="RefType"]').val());
        var typeref = resource.RefGet;
        if (type < 4) {
            typeref = resource.RefGet;
        } else {
            typeref = resource.RefPay;
        }

        this.bindDataOnDialog(this.dataUpdate, typeref);
    }

    /**
     * TODO: Xem bản ghi khác
     * Author: NDANH 30/8/2019
     * */
    viewOtherRecord(event) {
        var mode = event.data.mode;
        $("#loadDialog").show();
        switch (mode) {
            case 1:
                $("#tableMasterBody tr.row-selected").prev().trigger("click");
                break;
            case 2:
                $("#tableMasterBody tr.row-selected").next().trigger("click");
                break;
            case 3: 
                $("#tableMasterBody tr").first().trigger("click");
                break;
            case 4: 
                $("#tableMasterBody tr").last().trigger("click");
                break;
        }

        this.resetForm();
        this.drawTable(this.columnsRefDialog, "#tableDialogHeader");
        this.setTable("#tableDialogHeader", "#tableDialogFooter");
        this.view();
    }

    /**
     * TODO: set disable button trước, sau
     * Author: NDANH 30/8/2019
     * */
    checkButtonViewDisable() {
        if (!$("#tableMasterBody tr.row-selected").prev().length) {
            $("#btnDlPrev").addClass("button-disable");
            $("#goFirst").addClass("button-disable");
        }
        if (!$("#tableMasterBody tr.row-selected").next().length) {
            $("#btnDlNext").addClass("button-disable");
            $("#goLast").addClass("button-disable");
        }
    }

    /**
     * TODO: Get giá trị
     * AUTHOR: NDANH 28/8/2019
     * */
    getValueForSave() {
        var me = this;
        var inputMaster = $("#dialogCreateEditView .dialog-content input[property]");
        var ref = {};
        var ListRefDetail = [];
        var TotalAmount = ($("#totalAmountDialog").text()).formatNumberMoney();
        ref["TotalAmount"] = TotalAmount;
        //ref["RefType"] = 1;
        $('input[property="RefObjectName"]').val($('input[property="RefTargetName"]').val());
        $.each(inputMaster, function (i, input) {
            var propertyName = input.getAttribute('property');
            var propertyValue = $(input).val();
            if (propertyName == "RefDate") {
                propertyValue = convertStringToDate(propertyValue);
            }

            ref[propertyName] = propertyValue;
        });
        var rows = $("#tableDialogBody tr");
        $.each(rows, function (i, row) {
            var amountMoney = $(row).find('input[property="AmountMoney"]').val().formatNumberMoney();
            if (amountMoney > 0) {
                var RefDetail = {};
                var inputs = $(row).find("input[property]");
                $.each(inputs, function (index, input) {
                    var propertyName = input.getAttribute('property');
                    var propertyValue = $(input).val();
                    
                    if (propertyName == "AmountMoney") {
                        propertyValue = $(input).val().formatNumberMoney();
                    }

                    RefDetail[propertyName] = propertyValue;
                });

                ListRefDetail.push(RefDetail);
            }
        })

        ref["ListRefDetail"] = ListRefDetail;
        return ref;
    }

    /**
     * TODO: Thêm dòng mới vào table dialog
     * Author: NDANH 29/8/2019
     * */
    addNewRowToTableDialog() {
        var row = '<tr>'
            + '<td> <div class="input-container"><input maxlength="255" property="Description"/></div> </td >'
            + '<td> <div class="input-container"><input maxlength="24" property="AmountMoney" value="0"/></div> </td>'
            + '<td>'
            + '<div class="input-container display-flex">'
            + '<input hidden property="BudgetID"/>'
            + '<input class="budget-autocomplete" property="BudgetName" maxlength="255"/> <div class="icon-dropdown-arrow dropdown-budget"></div>'
            + '</div></td>'
            + '<td><div class="btn-delete-row"></div></td>'
            + '<td></td></tr>';

        $("#tableDialogBody tbody").append(row);

        this.setTable("#tableDialogHeader", "#tableDialogBody");
        this.budgetAuto = new Autocomplete(".budget-autocomplete", this.listBudget, this.budgetSelected);
    }

    /**
     * TODO: chọn mục thu/chi
     * Author: NDANH 1/9/2019
     * @param {any} event
     * @param {any} ui
     */
    budgetSelected(event, ui) {
        $("#tableDialogBody tr.row-selected").find('input[property="BudgetID"]').val(ui.item.id);
    }

    /**
     * TODO: Thêm dòng mới vào table dialog nếu dòng vừa nhập là dòng cuối cùng
     * Author: NDANH 29/8/2019
     * */
    newRowWhenTypeAmountMoney(event) {
        var next = $(event.currentTarget).parents('tr').next().length;
        if (!next) {
            this.addNewRowToTableDialog();
        }
    }

    /**
     * TODO: Xóa dòng trong table dialog
     * Author: NDANH 29/8/2019
     * */
    deleteRowToTableDialog() {
        var next = $("#tableDialogBody tr.row-selected").next();
        var lenght = $("#tableDialogBody tr").length;
        $("#tableDialogBody tr.row-selected").remove();
        if (lenght == 1) {
            this.addNewRowToTableDialog();
        }
        if ($(next).length) {
            $(next).find("input").first().focus();
        } else {

        }
    }

    /**
     * TODO: Chọn dòng trong table dialog
     * Author: NDANH 29/8/2019
     * */
    rowTableDialogSelected(event) {
        $("#tableDialogBody tr").removeClass("row-selected");
        $(event.currentTarget).addClass("row-selected");
    }

    /**
     * TODO: Chọn dòng khi focus vào input
     * Author: NDANH 29/8/2019
     * */
    tableDialogInputFocus() {
        $(this).parents("tr").trigger("click");
    }

    /**
     * Delete hàng bằng button
     * Author: NDANH 30/8/2019
     * @param {any} event
     **/
    deleteRowTableDialogByButton(event) {
        $(event.currentTarget).parents("tr").trigger("click");
        this.deleteRowToTableDialog();
    }

    /**
     * TODO: Tính tổng tiền
     * Author: NDANH 29/8/2019
     * */
    countTotalAmount() {
        var rowsDialog = $("#tableDialogBody tr");
        var totalAmount = 0;

        $.each(rowsDialog, function (i, row) {
            totalAmount += $(row).find('input[property="AmountMoney"]').val().formatNumberMoney();
        })

        $("#totalAmountDialog").text((totalAmount + ``).formatMoney());
    }

    /**
     * TODO: auto complete loại chứng từ
     * Author: NDANH 29/8/2019
     * */
    setAutocomplete() {
        var inputAuto = $(this).prev();
        inputAuto.focus();
        if (!inputAuto.val()) {
            inputAuto.val(" ");
        }

        inputAuto.keydown();
    }

    /**
     * TODO: Gọi server lấy dữ liệu cho các popup
     * Author: NDANH 29/8/2019
     * @param {any} event
     */
    loadDataOnPopup(event) {
        var header = event.data.header;
        var body = event.data.body;
        this.setTable(header, body);

        $(body).find("tr").removeClass("row-selected");
        $(body).find("tr:visible").first().addClass("row-selected");
    }

    /**
     * TODO: Chọn 1 dòng trong popup
     * Author: NDANH 29/8/2019
     * */
    rowPopupSelected() {
        var td = $(this).find('td');
        var length = td.length;
        switch (length) {
            case 3:
                var RefTargetID = $(this).data("recordID");
                var RefTargetCode = $(td[0]).text();
                var RefTargetName = $(td[1]).text();
                $('input[property="RefTargetID"]').val(RefTargetID);
                $('input[property="RefTargetCode"]').val(RefTargetCode);
                $('input[property="RefTargetName"]').val(RefTargetName);
                break;
            case 2:
                var EmployeeID = $(this).data("recordID");
                var EmployeeCode = $(td[0]).text();
                var EmployeeName = $(td[1]).text();
                $('input[property="EmployeeID"]').val(EmployeeID);
                $('input[property="EmployeeCode"]').val(EmployeeCode);
                $('input[property="EmployeeName"]').val(EmployeeName);
                break;
            case 1:
                break;
        }

        $(this).parents("div").css("display", "none");
    }

    /**
     * TODO: set focus trong table
     * Author: NDANH 29/8/2019
     * */
    setFocusOnTable() {
        $("#tableDialogBody input").first().focus();
    }

    /**
     * TODO: set focus trong dialog
     * Author: NDANH 29/8/2019
     * */
    setFocus() {
        $(this).parent().addClass("input-focus");
    }

    /**
     * TODO: remove focus trong dialog
     * Author: NDANH 29/8/2019
     * */
    removeFocus() {
        $(".input-focus").removeClass("input-focus");
    }

    /**
     * TODO: set focus vào input
     * Author: NDANH 29/8/2019
     * */
    setSelectInput() {
        $(this).select();
    }

    /**
     * TODO: Set lại giá trị rỗng
     * Author: NDANH 29/8/2019
     * */
    setValuDefault(event) {
        var value = $(event.currentTarget).val();
        var id = getTypeOrID(value, this.listBudget, 'label', 'id')
        if (!id) {
            $(event.currentTarget).val("");
        } else {
            $(event.currentTarget).parents("tr").find('input[property="BudgetID"]').val(id);
        }
    }

    /**
     * TODO: Phím tắt, tổ hợp phím
     * Author: NDANH 29/8/2019
     * @param {any} event
     */
    setShortcutKey(event) {
        if (event.ctrlKey && event.key == 1) {
            event.preventDefault();
            if (!this.dialogCreateEditView.isOpen()) {
                $('#btnAdd').trigger('click');
            }
        }
        else if (event.ctrlKey && event.key == 'e') {
            event.preventDefault();
            if (!this.dialogCreateEditView.isOpen() && !$("#btnUpdate").hasClass("button-disable")) {
                $('#btnUpdate').trigger('click');
            }
        }
        else if (event.ctrlKey && event.key == 'd') {
            event.preventDefault();
            if (!this.dialogCreateEditView.isOpen()) {
                if (!this.dialogDeleteRef.isOpen() && !$('#btnDlDelete').hasClass("button-disalbe")) {
                    $('#btnDelete').trigger('click');
                }
            } else {
                if (!this.dialogDeleteRef.isOpen() && !$('#btnDlDelete').hasClass("button-disalbe")) {
                    $('#btnDlDelete').trigger('click');
                }
            }

        }
        else if (event.ctrlKey && event.key == 'p') {
            event.preventDefault();
            if (!this.dialogCreateEditView.isOpen()) {
                $('#btnPrint').trigger('click');
            }
        }
        else if (event.ctrlKey && event.key == 'q') {
            event.preventDefault();
            if (this.dialogCreateEditView.isOpen()) {
                $('#btnDlClose').trigger('click');
            }
        }
        else if (event.ctrlKey && event.key == 's') {
            event.preventDefault();
            if (this.dialogCreateEditView.isOpen() && !$("#btnSave").hasClass("button-disable")) {
                $('#btnSave').trigger('click');
            }
        }
        else if (event.ctrlKey && event.keyCode == resource.KeyCode.Insert) {
            if (this.dialogCreateEditView.isOpen()) {
                this.addNewRowToTableDialog();
            }
        }
        else if (event.ctrlKey && event.keyCode == resource.KeyCode.Delete) {
            if (this.dialogCreateEditView.isOpen()) {
                this.deleteRowToTableDialog();
            }
        } else if (event.keyCode == resource.KeyCode.F7) {
            event.preventDefault();
            if (this.dialogCreateEditView.isOpen() && !$("#btnDlPrev").hasClass("button-disable")) {
                $('#btnDlPrev').trigger('click');
            }
        } else if (event.keyCode == resource.KeyCode.F9) {
            event.preventDefault();
            if (this.dialogCreateEditView.isOpen() && !$("#btnDlNext").hasClass("button-disable")) {
                $('#btnDlNext').trigger('click');
            }
        }
    }

    /*---------------------------------------------
    * TODO: Chỉ cho nhập số
    * Author: NDANH (22/07/2019)
    * @param {Event} event event
    *---------------------------------------------*/
    checkNumberFormat(event) {
        if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || (event.keyCode == resource.KeyCode.Backspace) || (event.keyCode == resource.KeyCode.TAB) || (event.keyCode == resource.KeyCode.Delete)) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * TODO: Autocomplete xử lý bằng tay
     * Author: NDANH 1/9/2019
     * @param {any} event
     */
    autoCompleteHandle(event) {
        var me = event.data.me;
        var menu = $(event.data.popup);
        var body = $(event.data.tbody);
        var tbody = event.data.tbody;
        var header = event.data.header;
        var element = $(this);
        var parent = $(this).parent();
        setTimeout(function () {
            var value = element.val();

            var listRow = menu.find('tbody tr');
            var eventKey = event.which;
            if (eventKey == resource.KeyCode.ArrowDown || eventKey == resource.KeyCode.ArrowUp || eventKey == resource.KeyCode.Enter) {

                if (eventKey == resource.KeyCode.ArrowDown) {
                    if (!menu.is(':visible')) {
                        menu.css("top", $(parent).offset().top + $(parent).outerHeight());
                        menu.css("left", $(parent).offset().left);
                        menu.css('display', 'block');
                        body.find("tr").removeClass("row-selected");
                        body.find("tr").first().addClass("row-selected");
                        me.setTable(header, tbody);
                    } else {

                        if (!listRow.hasClass('row-selected')) {
                            var first = listRow.first();
                            while (!first.is(':visible') && !first.is(listRow.last())) {
                                first = first.next();
                            }
                            if (first.is(':visible')) {
                                first.addClass('row-selected');
                            }
                            var currentRowSelected = menu.find('.row-selected').next();
                            var rowCoordinateTop = currentRowSelected.position().top;
                            rowCoordinateTop -= 32;
                            var scrollHeight = body.scrollTop();
                            var menuHeight = body.height();
                            if (rowCoordinateTop < 0) {
                                scrollHeight += 32*6;
                                $(tbody).scrollTop(scrollHeight)
                            }
                        }
                        else {
                            var currentRow = menu.find('.row-selected');
                            if (!currentRow.is(listRow.last())) {
                                var nextRow = currentRow.next();
                                while (!nextRow.is(':visible') && !nextRow.is(listRow.last())) {
                                    nextRow = nextRow.next();
                                }
                                if (nextRow.is(':visible')) {
                                    currentRow.removeClass('row-selected')
                                    nextRow.addClass('row-selected');
                                }
                                var currentRowSelected = menu.find('.row-selected').next();
                                var rowCoordinateTop = currentRowSelected.position().top;
                                var scrollHeight = body.scrollTop();
                                var menuHeight = body.height();
                                if (rowCoordinateTop > menuHeight) {
                                    scrollHeight += 32 * 6;
                                    $(tbody).scrollTop(scrollHeight)
                                }
                            }
                        }

                    }
                }
                if (eventKey == resource.KeyCode.ArrowUp) {
                    if (menu.is(':visible')) {
                        if (!listRow.hasClass('row-selected')) {
                            var last = listRow.last();
                            while (!last.is(':visible') && !last.is(listRow.first())) {
                                last = last.prev();
                            }
                            if (last.is(':visible')) {
                                last.addClass('row-selected');
                            }
                            var currentRowSelected = menu.find('.row-selected');
                            var rowCoordinateTop = currentRowSelected.position().top;
                            var menuHeight = body.height();
                            var scrollHeight = body.scrollTop();
                            if (rowCoordinateTop > menuHeight) {
                                scrollHeight += (rowCoordinateTop - menuHeight);
                                body.scrollTop(scrollHeight)
                            }
                        }
                        else {
                            var currentRow = menu.find('.row-selected');
                            if (!currentRow.is(listRow.first())) {
                                var nextRow = currentRow.prev();
                                while (!nextRow.is(':visible') && !nextRow.is(listRow.first())) {
                                    nextRow = nextRow.prev();
                                }
                                if (nextRow.is(':visible')) {
                                    currentRow.removeClass('row-selected')
                                    nextRow.addClass('row-selected');
                                }
                                var currentRowSelected = menu.find('.row-selected');
                                var rowCoordinateTop = currentRowSelected.position().top;
                                rowCoordinateTop -= 32
                                var scrollHeight = body.scrollTop();
                                var menuHeight = body.height();
                                if (rowCoordinateTop < 0) {
                                    scrollHeight += rowCoordinateTop;
                                    body.scrollTop(scrollHeight)
                                }
                            }
                            }
                    }
                }
                if (eventKey == resource.KeyCode.Enter) {
                    if (menu.is(':visible')) {
                        menu.find('.row-selected').click();
                    }
                }
            }
            else if (eventKey == resource.KeyCode.TAB) {
                body.scrollTop(0)
                menu.css('display', 'none');
            }
            else {
                if (value.length > 0) {
                    value = value.toLowerCase();
                    body.filter(function () {
                        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                    })
                }
                else {
                    body.scrollTop(0)
                    body.show();
                    menu.css('display', 'none');
                }
            }
        }, 100);

    }
}