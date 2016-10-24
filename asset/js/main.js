/**
 Core script to handle the entire Desadmin
 **/

var Desadmin = function () {
    var layoutImgPath = 'layout/img/';

    var layoutCssPath = 'layout/css/';


    var ajaxContentSuccessCallbacks = [];
    var ajaxContentErrorCallbacks = [];

    //handle the search of Semantic UI
    var handleSearchSemantic = function () {

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
            });
    };

    //handle the dropdown of Semantic UI
    var handleDropdownSemantic = function () {
        $('.ui.dropdown').dropdown();
    };

    //handle the fucntion close message
    var handleMessageClose = function () {
        $('.message .close')
            .on('click', function () {
                $(this)
                    .closest('.message')
                    .transition('fade')
                ;
            });
    };

    //handle accordion Semantic ui
    var handleAccordionSemantic = function () {
        $('.ui.accordion')
            .accordion()
        ;
    };


    //handle when open modal Semantic, depend on class show-modal, href and data-modal
    var handleModalSemantic = function () {
        $(".show-modal").on("click", function (e) {
            e.preventDefault();

            var $this = $(this);
            var name;

            if ($this.attr('data-modal')) {
                name = "#" + $this.data("modal");
            } else {
                name = $this.attr('href')
            }
            $(name)
                .modal({
                    transition: "fade",
                    closable: false,
                    autofocus: false,
                    detachable: false,
                    onShow: function(){

                    }
                })
                .modal('show')

        });
    };

    //handle checkbox Semantic
    var handleCheckboxSemantic = function(){
        $('.ui.checkbox').checkbox();
    };


    var handleTinyMce = function(){
        //Init tiny MCE normal
        tinymce.init({
            selector:'textarea.editor-tinymce',
        });

    }

    //handle date picker for semantic ui

    var handleDatePicker = function () {
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
    };


    //handle table normal
    var handleTable = function () {
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
    };

    var handleDataTable = function () {

        var datatable1 = $("#datatable1");
        datatable1.DataTable({
                // "bFilter": false,
                // "bSort": false,
                // "bLengthChange": false,
                // "iDisplayLength": 30,
                "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
                "lengthMenu": [
                    [10, 20, 30, 40, -1],
                    [10, 20, 30, 40, "All"] // change per page values here
                ],
                // set the initial value
                "pageLength": 30,
                "order": [
                    [1, "asc"]
                ] // set first column as a default sort by asc

            }
        );




        var datatable2 = $("#datatable2");
        datatable2.DataTable({

                "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
                "lengthMenu": [
                    [10, 20, 30, 40, -1],
                    [10, 20, 30, 40, "All"] // change per page values here
                ],

                // set the initial value
                "pageLength": 30,
                "order": [
                    [1, "asc"]
                ], // set first column as a default sort by asc
                "columnDefs": [{
                    "targets": 0,
                    "orderable": false,
                    "searchable": false
                }],
                "dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12 text-right'B f >r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12 text-right'p>>",
                buttons: [
                    {extend: 'print', className: 'teal tiny ui button'},
                    {extend: 'copy', className: ' blue tiny ui button'},
                    {extend: 'pdf', className: ' violet tiny ui button'},
                    {extend: 'excel', className: 'purple tiny ui button'},
                ]
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

                "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
                "lengthMenu": [
                    [10, 20, 30, 40, -1],
                    [10, 20, 30, 40, "All"] // change per page values here
                ],
                responsive: {
                    details: {}
                },
                "pageLength": 30,
                "order": [
                    [1, "asc"]
                ], // set first column as a default sort by asc
                "columnDefs": [{
                    "targets": 0,
                    "orderable": false,
                    "searchable": false
                }],
                "dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12 text-right'B f >r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12 text-right'p>>",
                buttons: [
                    {extend: 'print', className: 'teal tiny ui button'},
                    {extend: 'copy', className: ' blue tiny ui button'},
                    {extend: 'pdf', className: ' violet tiny ui button'},
                    {extend: 'excel', className: 'purple tiny ui button'},
                ]
            }
        );

    };


    return {
        initSemanticUI: function () {
            handleSearchSemantic();

            handleDropdownSemantic();

            handleMessageClose();

            handleAccordionSemantic();

            handleModalSemantic();

            handleCheckboxSemantic();
        },
        initTable: function () {
            handleTable();
        },
        initDataTable: function () {
            handleDataTable();
        },
        initDatapicker: function () {
            handleDatePicker();
        },
        initTinyMce: function(){
            handleTinyMce();
        },

        init: function () {
            this.initSemanticUI();
            this.initTable();
            this.initDataTable();
            this.initDatapicker();
            this.initTinyMce();
        },
    }
}(jQuery);

jQuery(document).ready(function() {
    // init Desadmin core componets
    Desadmin.init();


});
