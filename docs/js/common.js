'use strict';


//Main JQuery
$(function(){

    mobileLogo();
    mobileTable();

    //Logo, works first
    function mobileLogo(){
        if($(window).width() <= 1150 || $('.sidebar').width() < 200) {
            var logo = $('.sidebar__logo').text().slice(0, 1);
            $('.sidebar__logo').text(logo).css('text-align','center');
        } else {
            $('.sidebar__logo').text('Company').css('text-align','left');
        }
    }
    
    //Custom Select
    $('select').each(function(){
        var $this = $(this), numberOfOptions = $(this).children('option').length;
    
        $this.addClass('select-hidden'); 
        $this.wrap('<div class="select"></div>');
        $this.after('<div class="select-styled"></div>');

        var $styledSelect = $this.next('div.select-styled');
        $styledSelect.text($this.children('option').eq(0).text());
    
        var $list = $('<ul />', {
            'class': 'select-options'
        }).insertAfter($styledSelect);
    
        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }
    
        var $listItems = $list.children('li');
    
        $styledSelect.click(function(e) {
            e.stopPropagation();
            $('div.select-styled.active').not(this).each(function(){
                $(this).removeClass('active').next('ul.select-options').hide();
            });
            $(this).toggleClass('active').next('ul.select-options').toggle();
        });
    
        $listItems.click(function(e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $list.hide();
        });
    
        $(document).click(function() {
            $styledSelect.removeClass('active');
            $list.hide();
        });

    });

    //Custom Table
    function mobileTable(){

        if($(window).width() <= 950) {

            if($('[data-th]').length == 0) {
                
                var thArr = [], 
                    thArrAll = [],
                    tdArr = [],
                    th = $('.table__thead th'),
                    td = $('.table__tbody tr td'),
                    thTd = $('<td></td>'),
                    tr = $('.table__tbody > tr'),
                    tdArr = [];

                $('.table__thead').css('display', 'none');
                thTd.attr('data-th','').css('text-align', 'center');
                tr.find('td').wrap('<tr></tr>').before(thTd);
                tr.wrapInner('<td></td>');

                $(th).each(function() {
                    thArr.push($(this).text());
                });
                
                $('[data-th = ""]').each(function(){
                    tdArr.push($(this));
                    $(this).parent().css({'display':'flex', 'justify-content':'space-between',
                                            'align-items': 'center','border-bottom': '1px solid #e8e8e8'});
                });

                var count = tdArr.length / thArr.length;

                for(var c = 1; c < count + 1; c++) {
                    thArr.forEach(function(el, i){
                    thArrAll.push(el);
                    });
                }

                    tdArr.forEach(function(data, j){
                        $(tdArr[j]).text(thArrAll[j]);
                });

                td.each(function(){
                    if(td.text()) {
                        td.css({'text-align': 'center'});
                    }
                });
            } 
        } else {
            $('.table__thead').css('display', 'table-header-group');
            $('[data-th]').parent().unwrap();
            $('[data-th]').unwrap().remove();
        }
    }

    //Toggle icon
    $(document).on('click', '.topbar', function(){

        $('.user__about').toggle();
        $('.sidebar__h2').toggle();
        $('.dashboard__header p').toggle();
        $('.links__item span').toggle();
        $('.dashboard__items').fadeOut();
        
        if($('.sidebar').attr('data-toggle') == undefined){

            $('.topbar').animate({'margin-left': '12rem'}).css({'width':'calc(100% - 12rem - 6rem)', 'max-width': 'calc(1247px - 6rem)'});
            $('.content').animate({'margin-left': '12rem'}).css({'width':'calc(100% - 12rem)', 'max-width': '1247px'});
            $('.sidebar').animate({'width': '12rem'}).attr('data-toggle','');
            $('.user__photo').css('margin-right', '0');
            $('.dashboard__header').css({'background-image': 'none', 'text-align': 'center', 'padding': '2rem 4rem 2rem calc(4rem - 8px)'});

                        //function
            var logo = $('.sidebar__logo').text().slice(0, 1);
            $('.sidebar__logo').text(logo).css('text-align','center');

            
        } else {

                $('.sidebar').animate({'width': '31.4rem'}).removeAttr('data-toggle','');
                $('.topbar').animate({'margin-left': '31.4rem'}).css({'width':'calc(100% - 31.4rem - 6rem)', 'max-width': 'calc(1052px - 6rem)'});
                $('.content').animate({'margin-left': '31.4rem'}).css({'width':'calc(100% - 31.4rem)', 'max-width': '1052px'});
                $('.user__photo').css('margin-right', '2.1rem');
                $('.dashboard__header').css({'background-image': 'url("../img/angle-arrow-down.svg")', 'text-align': 'center', 'padding': '2rem 4.5rem 2rem 2.2rem'});

                               // function
                $('.sidebar__logo').text('Company').css('text-align','left');

        }
        
    });

    //Hover Sidebar
    $('.sidebar').hover(function(){

        if($(window).width() > 768) {

        
        // function start
        $('.user__about').fadeIn();
        $('.sidebar__h2').fadeIn();
        $('.dashboard__header p').fadeIn();
        $('.links__item span').fadeIn();
        // function end

        //function start
        if($(window).width() <= 1150 || $('.sidebar').width() < 200) {
                var logo = $('.sidebar__logo').text().slice(0, 1);
                $('.sidebar__logo').text(logo).css('text-align','center');
            } else {
                $('.sidebar__logo').text('Company').css('text-align','left');
            }
        $('.sidebar').animate({'width': '31.4rem'}).removeAttr('data-toggle','');
        $('.topbar').animate({'margin-left': '31.4rem'});
        $('.content').animate({'margin-left': '31.4rem'});
        $('.user__photo').css('margin-right', '2.1rem');
        $('.dashboard__header').css({'background-image': 'url("../img/down-arrow.svg")', 'text-align': 'left', 'padding': '2rem 4.5rem 2rem 2.2rem'});
        // function end
        }
    });

    //Window resize Table
    $(window).on('resize', function() {
        mobileLogo();
        mobileTable();
        if($(window).width() > 768) {
            $('.content').css('padding-top', 'calc(80px + 2.3rem)');
            $('.topbar').fadeIn();
        }
    });

    //Toggle Dashboard
    var tD = 0;
    $('.dashboard__header').on('click' ,function(){
        $(this).next().toggle();
        if($(window).width() <= 768) {
            $('.topbar').toggle();
            if( tD == 0) {
                $('.content').animate({'padding-top':'237px'});
                tD = 1;
            } else {
                $('.content').animate({'padding-top':'160px'});
                tD = 0;
            }
        }        
    });      
    
});


