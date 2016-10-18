$('.ui.search')
    .search({
        apiSettings: {
            url: '//api.github.com/search/repositories?q={query}'
        },
        fields: {
            results: 'items',
            title: 'name',
            url: 'html_url'
        },
        minCharacters: 3
    })
;

$('.ui.dropdown').dropdown();


$('.message .close')
    .on('click', function () {
        $(this)
            .closest('.message')
            .transition('fade')
        ;
    })
;

$('.datepicker').pickadate({
    monthsFull: ["Tháng Một", "Tháng Hai", "Tháng Ba", "Tháng Tư", "Tháng Năm", "Tháng Sáu", "Tháng Bảy", "Tháng Tám", "Tháng Chín", "Tháng Mười", "Tháng Mười Một", "Tháng Mười Hai"],
    monthsShort: ["Một", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy", "Tám", "Chín", "Mưới", "Mười Một", "Mười Hai"],
    weekdaysFull: ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"],
    weekdaysShort: ["C.Nhật", "T.Hai", "T.Ba", "T.Tư", "T.Năm", "T.Sáu", "T.Bảy"],
    today: "Hôm Nay",
    clear: "Xoá",
    firstDay: 1,
    formatSubmit: 'yyyy/mm/dd',
    format: 'dd/mm/yyyy'
})

$(document).ready(function () {
    var datatable1 = $("#datatable1");
    datatable1.DataTable({
            // "bFilter": false,
            // "bSort": false,
            // "bLengthChange": false,
            // "iDisplayLength": 30,
            "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
            "lengthMenu": [
                [10, 20, 30, 40,  -1],
                [10, 20, 30, 40, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 30,
            "order": [
                [1, "asc"]
            ], // set first column as a default sort by asc


            "language": {
                "decimal": "",
                "emptyTable": "Không tim thấy kết quả",
                "info": "Xem từ _START_ đến _END_ trong _TOTAL_ kết quả",
                "infoEmpty": "Xem từ 0 đến 0 của 0 kết quả",
                "infoFiltered": "(filtered from _MAX_ total entries)",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "Xem _MENU_ kết quả",
                "loadingRecords": "Chờ...",
                "processing": "Chờ...",
                "search": "Tìm kiếm:",
                "zeroRecords": "Không tim thấy kết quả",
                "paginate": {
                    "first": "Đầu",
                    "last": "Cuối",
                    "next": "Trang kế",
                    "previous": "Trang trước"
                },
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                }
            }
        }
    );


    var datatable2 = $("#datatable2");
    datatable2.DataTable({
            // "bFilter": false,
            // "bSort": false,
            // "bLengthChange": false,
            // "iDisplayLength": 30,
            "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
            "lengthMenu": [
                [10, 20, 30, 40,  -1],
                [10, 20, 30, 40, "All"] // change per page values here
            ],

            // set the initial value
            "pageLength": 30,
            "order": [
                [1, "asc"]
            ], // set first column as a default sort by asc
            "columnDefs": [ {
                "targets": 0,
                "orderable": false,
                "searchable": false
            }],
            "dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12 text-right'B f >r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12 text-right'p>>",
            buttons: [
                { extend: 'print', className: 'teal tiny ui button' },
                { extend: 'copy', className: ' blue tiny ui button' },
                { extend: 'pdf', className: ' violet tiny ui button' },
                { extend: 'excel', className: 'purple tiny ui button' },
            ],

            "language": {
                "decimal": "",
                "emptyTable": "Không tim thấy kết quả",
                "info": "Xem từ _START_ đến _END_ trong _TOTAL_ kết quả",
                "infoEmpty": "Xem từ 0 đến 0 của 0 kết quả",
                "infoFiltered": "(filtered from _MAX_ total entries)",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "Xem _MENU_ kết quả",
                "loadingRecords": "Chờ...",
                "processing": "Chờ...",
                "search": "Tìm kiếm:",
                "zeroRecords": "Không tim thấy kết quả",
                "paginate": {
                    "first": "Đầu",
                    "last": "Cuối",
                    "next": "Trang kế",
                    "previous": "Trang trước"
                },
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                }
            }
        }
    );

    datatable2.find('.group-checkable').change(function () {
        var set = jQuery(this).attr("data-set");
        var checked = jQuery(this).is(":checked");
        jQuery(set).each(function () {
            if (checked) {
                $(this).prop("checked", true);
                $(this).parents('tr').addClass("warning");
            } else {
                $(this).prop("checked", false);
                $(this).parents('tr').removeClass("warning");
            }
        });
    });

    datatable2.on('change', 'tbody tr .checkboxes', function () {
        $(this).parents('tr').toggleClass("warning");
    });



    var datatable3 = $("#datatable3");
    datatable3.DataTable({
            // "bFilter": false,
            // "bSort": false,
            // "bLengthChange": false,
            // "iDisplayLength": 30,
            "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
            "lengthMenu": [
                [10, 20, 30, 40,  -1],
                [10, 20, 30, 40, "All"] // change per page values here
            ],
            responsive: {
                details: {

                }
            },
            // set the initial value
            "pageLength": 30,
            "order": [
                [1, "asc"]
            ], // set first column as a default sort by asc
            "columnDefs": [ {
                "targets": 0,
                "orderable": false,
                "searchable": false
            }],
            "dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12 text-right'B f >r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12 text-right'p>>",
            buttons: [
                { extend: 'print', className: 'teal tiny ui button' },
                { extend: 'copy', className: ' blue tiny ui button' },
                { extend: 'pdf', className: ' violet tiny ui button' },
                { extend: 'excel', className: 'purple tiny ui button' },
            ],

            "language": {
                "decimal": "",
                "emptyTable": "Không tim thấy kết quả",
                "info": "Xem từ _START_ đến _END_ trong _TOTAL_ kết quả",
                "infoEmpty": "Xem từ 0 đến 0 của 0 kết quả",
                "infoFiltered": "(filtered from _MAX_ total entries)",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "Xem _MENU_ kết quả",
                "loadingRecords": "Chờ...",
                "processing": "Chờ...",
                "search": "Tìm kiếm:",
                "zeroRecords": "Không tim thấy kết quả",
                "paginate": {
                    "first": "Đầu",
                    "last": "Cuối",
                    "next": "Trang kế",
                    "previous": "Trang trước"
                },
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                }
            }
        }
    );




    var table1 = $("#table1");

    table1.find('.group-checkable').change(function () {
        var set = jQuery(this).attr("data-set");
        var checked = jQuery(this).is(":checked");
        jQuery(set).each(function () {
            if (checked) {
                $(this).prop("checked", true);
                $(this).parents('tr').addClass("warning");
            } else {
                $(this).prop("checked", false);
                $(this).parents('tr').removeClass("warning");
            }
        });
    });

    table1.on('change', 'tbody tr .checkboxes', function () {
        $(this).parents('tr').toggleClass("warning");
    });
});