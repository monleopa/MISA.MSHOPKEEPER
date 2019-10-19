/*---------------------------------------------
* TODO: File quản lý các giá trị, text, message cố định
* Author: NDANH (22/07/2019)
*---------------------------------------------*/

var resource = {
    KeyCode: {
        TAB: 9,
        Enter: 13,
        ArrowDown: 40,
        ArrowUp: 38,
        Backspace: 8,
        Delete: 46,
        Esc: 27,
        Insert: 45,
        Delete: 46,
        F7: 118,
        F9: 120,
    },
    FormStatus: {
        New: 0,
        Saved: 1,
        Edit: 2
    },
    vi: {
        FromOtherShop: "Nhập kho hàng hóa điều chuyển từ cửa hàng khác",
        MinChooseOneItem: "Phải có ít nhất một dòng chi tiết. Vui lòng kiểm tra lại",
        QuantityBiggerZero: "Số tiền phải lớn hơn 0. Vui lòng kiểm tra lại",
        VoucherNumber: "Số chứng từ ",
        VoucherExist: " đã tồn tại. Bạn có muốn lưu với chứng từ khác hay không?",
        FunctionBuilding: "Chức năng này đang được xây dựng !",
    },
    filter: {
        Equal : 0,
        Less : 1,
        LessOrEqual : 2,
        Greater : 3,
        GreaterOrEqual : 4,
        Contain : 5,
        NotContain : 6,
        BeginWith : 7,
        EndWith : 8,
        Date : 9,
        FromDate : 10,
        ToDate : 11,

    },
    filterArray: [
        "=", "<", "≤", ">", "≥", "∗", "!", "+", "-", "=", ">", "<", "≥", "≤"
    ],
    arrayRefType: [
        "Tất cả", "Phiếu thu tiền mặt", "Phiếu thu nợ - Tiền mặt", "Phiếu thu đặt cọc - Tiền mặt",
        "Phiếu chi tiền mặt", "Phiếu trả nợ - Tiền mặt", "Phiếu nhập hàng - Tiền mặt", "Phiếu trả lại hàng mua - Tiền mặt"
    ],
    ref: {
        RefCreate: "Thêm mới phiếu thu",
        RefUpdate: "Sửa phiếu thu",
        RefView: "Phiếu thu",
        RefPayCreate: "Thêm mới phiếu chi",
        RefPayUpdate: "Sửa phiếu chi",
        RefPayView: "Phiếu chi",
    },
    OrderBy: {
        RefDateDesc: "RefDate DESC",
        ModifiedDateDesc: "ModifiedDate DESC",
    },
    RefGet: {
        RefCreate: "Thêm mới phiếu thu",
        RefUpdate: "Sửa phiếu thu",
        RefView: "Phiếu thu",
        PersonImple: "Người nộp",
        RefTarget: "Đối tượng nộp",
        Note: "Lý do thu",
        Employee: "Nhân viên thu",
        RefNo: "Số phiếu thu",
        RefDate: "Ngày thu",
        Budget: "Ngày chi",
        RefType: 1,
    },
    RefPay: {
        RefCreate: "Thêm mới phiếu chi",
        RefUpdate: "Sửa phiếu chi",
        RefView: "Phiếu chi",
        PersonImple: "Người nhận",
        RefTarget: "Đối tượng nhận",
        Note: "Lý do chi",
        Employee: "Nhân viên chi",
        RefNo: "Số phiếu chi",
        RefDate: "Ngày chi",
        Budget: "Mục chi",
        RefType: 4,
    },
    testAutocomplete: [
        {
            label: "Tất cả",
            id: "0",
        },
        {
            label: "Phiếu thu tiền mặt",
            id: "1",
        },
        {
            label: "Phiếu thu nợ - Tiền mặt",
            id: "2",
        },
        {
            label: "Phiếu thu đặt cọc - Tiền mặt",
            id: "3",
        },
        {
            label: "Phiếu chi tiền mặt",
            id: "4",
        },
        {
            label: "Phiếu trả nợ - Tiền mặt",
            id: "5",
        },
        {
            label: "Phiếu nhập hàng - Tiền mặt",
            id: "6",
        },
        {
            label: "Phiếu trả lại hàng mua - Tiền mặt",
            id: "7",
        },
    ]
};