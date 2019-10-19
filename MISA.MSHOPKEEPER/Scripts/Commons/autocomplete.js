/*---------------------------------------------
* TODO: Class quản lý các function, thuộc tính autocomplete
* Author: NDANH (22/07/2019)
*---------------------------------------------*/
class Autocomplete {
    constructor(element, source, selected) {
        $(element).autocomplete({
            source: source,
            autoFocus: true,
            select: function (event, ui) {
                selected(event, ui);
            },
        })
    }
}