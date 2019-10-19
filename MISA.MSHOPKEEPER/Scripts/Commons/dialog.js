/*---------------------------------------------
* TODO: Quản lý dialog
* Author: NDANH (22/07/2019)
*---------------------------------------------*/
class Dialog {

    constructor(idDialog, width, height) {
        this.Dialog = $(idDialog).dialog({
            width: width,
            height: height,
            fluid: true,
            resizable: true,
            modal: true,
            autoOpen: false,
            
        });

    }

    /**
     * TODO: Thêm button để đóng dialog
     * Author: NDANH 30/8/2019
     * @param {any} id
     * @param {any} idDialog
     */
    setDialog(id, idDialog) {
        var imgClose = '<div id="' + id + '" class="btn-icon dialog-img-close"></div>'
        $(idDialog).after(imgClose);
    }

    /*---------------------------------------------
    * TODO: mở Dialog
    * Author: NDANH (22/07/2019)
    *---------------------------------------------*/
    open() {
        this.Dialog.dialog('open');
    }

    /*---------------------------------------------
    * TODO: đóng Dialog
    * Author: NDANH (22/07/2019)
    *---------------------------------------------*/
    close() {
        this.Dialog.dialog('close');
    }

    /*---------------------------------------------
    * TODO: Thay đổi title
    * Author: NDANH (22/07/2019)
    *---------------------------------------------*/
    option(title) {
        this.Dialog.dialog("option", "title", title);
    }

    /**
    * TODO: Kiểm tra dialog có bật hay không
    * Author: NDANH (28/08/2019)
     * */
    isOpen() {
        return this.Dialog.dialog('isOpen');
    }
}