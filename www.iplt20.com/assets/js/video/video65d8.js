$(function() {
    var last = window.location.pathname.split("/").pop();
    $("." + last).addClass('activate');
    // $('#' + last).click();
    setTimeout(function() { $(".rmv").remove(); }, 2000);

});

$(document).on("click", ".sub_menu", function() {
    $('.sub_menu').removeClass('activate');
    var slug = $(this).find('a').data('slug');
    $("#" + slug).addClass('active');
    $("." + slug).addClass('activate');
    // $("#" + slug).click();
});

$(document).on("click", ".submenu", function() {
    $('.submenu').removeClass('active');
    $(this).addClass('active');
});

$(document).on("change", "#yeardropdown,#teamsdropdown", function() {
    $('.loadmorebtn').hide();
    $('.loadmorebtnDiv').hide();
     var url = window.location.pathname.split( '/' );     
    var slug = url[2];
    var page = 1;
    var year=$('#yeardropdown').val();
    var team=$('#teamsdropdown').val();
    var tray_type =$('#tray-type').val();
    $('#videosMidpageBanner').html('');
     $('#videosData').html('');
    $.ajax({
        url: "/videoslist",
        type: "GET",
        data: { "tab": slug, 'page': page,'year':year,'teamslug':team,'tray_type':tray_type },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        dataType: 'JSON',
        success: function(response) {
            if (response.status == true) {  
                $('.loadmorebtn').hide(); 
                $('.loadmorebtnDiv').hide();
               var totalPageno = Math.ceil(parseFloat(response.total_results / response.entries_per_page));
               if(response.datastatus===true)
                {
                  $('.Datanotfound').show();
                }else
                {
                  $('.Datanotfound').hide();
                }
                $('#slugtitle').html(slug);
                $('.loader-main').hide();
                // $('#bannerDiv').html(response.banner);
                $('#videosData').html(response.video_data).fadeIn();
                $('#videosMidpageBanner').html(response.banner).fadeIn();
                $('.loadmorebtn').attr('data-page', parseInt(page) + 1);
                 // $('.loadmorebtn').attr('data-id',slug);
                $('.teamsResponce').html('');
                $('.yearResponce').html('');
                if (totalPageno == response.page || totalPageno == 0) {
                    $('.loadmorebtn').hide();
                } else {
                    $('.loadmorebtn').show();
                }
                if(response.loadmoreshow===true)
                    {
                      $('.loadmorebtnDiv').show();
                    }else
                    {
                      $('.loadmorebtnDiv').hide();
                    }
            } else {
                
                $('#videosData').html('');
                $('#videosMidpageBanner').html('');
                $('.Datanotfound').show();
                $('.loader-main').hide();
                $('.loadmorebtn').hide();
                $('#videosData').html("");
            }

        },
        error: function(response) {

        }
    });
    
});


$(document).on("click", "#magic-moments,#feature,#highlights,#interviews,#press-conferences,.firsttab,.loadmorebtn,.submenu", function() {
    $('.loader-main').show();
    $('#seemore-content').show();    
    $('.sub_menu').removeClass('activate');
    var year=$('#yeardropdown').val();
    var tray_type =$('#tray-type').val();
    var team=$('#teamsdropdown').val();
    var slug = $(this).attr('id');
    if(slug=='' || slug==undefined || slug =='undefined')
    {
         slug= $('.loadmorebtn').attr('data-id');
    }   
    if(slug =='all')
    {  $('#videobanner').show();
        $('.loadmorebtn').hide();
    }else{
        $('#videobanner').hide();
       $('.loadmorebtn').show();
    }
    $("." + slug).addClass('activate');
    var tab = $('.submenu.active').attr('data-tab');
    var page = $('.loadmorebtn').attr('data-page');
    $.ajax({
        url: "/videoslist",
        type: "GET",
        data: { "tab": slug, 'page': page,'year':year,'teamslug':team,'tray_type':tray_type },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        dataType: 'JSON',
        success: function(response) {
           if (response.status == true) {
                 $('.loader-main').hide();
                var totalPageno = Math.ceil(parseFloat(response.total_results / response.entries_per_page));
                if (totalPageno == response.page || totalPageno == 0) {
                    $('.loadmorebtn').hide();
                } else {
                    $('.loadmorebtn').show();
                }
                $('#slugtitle').html(slug);                
                // $('#bannerDiv').html(response.banner);
                $('#videosData').append(response.video_data);
                $('.loadmorebtn').attr('data-page', parseInt(page) + 1);
                 // $('.loadmorebtn').attr('data-id',slug);
                $('.teamsResponce').html('');
                $('.yearResponce').html('');

                $.each(response.teamResponce.data.men, function(key, val) {
                    var teams = '<li><input type="radio" id="' + val.fullName + '" name="team" value="' + val.id + '"><label for="' + val.fullName + '" class ="year_pointble">' + val.fullName + '</label></li>';
                    $('.teamsResponce').append(teams);
                });

                $.each(response.teamResponce.data.women, function(key, val) {
                    var teams = '<li><input type="radio" id="' + val.fullName + '" name="team" value="' + val.id + '"><label for="' + val.fullName + '" class ="year_pointble">' + val.fullName + '</label></li>';
                    $('.teamsResponce').append(teams);
                });

                $.each(response.yearResponce.data, function(key, val) {
                    var remove = (key > 6) ? 'rmv' : '';
                    var year = '<li class="' + remove + '"><input type="radio" id="' + val.year + '" name="year" value="' + val.year + '"><label for="' + val.year + '" class ="year_pointble">' + val.year + '</label></li>';
                    $('.yearResponce').append(year);

                });
                if ($('.ap-slider-video').length > 0) {
                    $('.ap-slider-video').slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true,
                        fade: true,
                        speed: 500,
                        autoplay: true,
                        autoplaySpeed: 1500,

                    });
                    $('.ap-slider-video').show();

                }
            } else {
                $('.loader-main').hide();
                $('.loadmorebtn').hide();
                $('#videosData').html("");
            }

        },
        error: function(response) {

        }
    });
});


$(document).on("click", ".submit,.filterLoadmore", function(e) {
    e.preventDefault();
    var click = $(this).attr('data-click');
    var tab = $('.submenu.active').attr('data-tab');
    var team = $("input[name='team']:checked").val();
    var year = $("input[name='year']:checked").val();
    if (click == 'loadmore') {
        var page = $('.filterLoadmore').data('page');
    } else {
        var page = $("input[name='page']").val();
    }

    $('.filterpopup').hide();
    $.ajax({
        url: "/videosFilter",
        type: "GET",
        data: { "team": team, 'year': year, 'tab': tab, 'page': page },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        dataType: 'JSON',
        success: function(response) {
            if (response.status == true) {
                var totalPageno = parseInt(response.videoResponce.total_results / response.videoResponce.entries_per_page);
                 // if (totalPageno == response.videoResponce.page || totalPageno == 1)
                if(response.videoResponce.videos.length >= 21)
                 {
                    $('.loadmorebtnDiv').show();
                } else {
                    $('.loadmorebtnDiv').hide();
                }
                var pageNumber = parseInt(response.videoResponce.page) + 1;
                if (click == 'loadmore') {
                    $('.loadmorebtnDiv').html('<a href="javascript:void(0);" data-click="loadmore" data-page="' + pageNumber + '" class="load-more-pagination filterLoadmore">Load More</a>');
                    $('#videosData').append(response.video_data);
                } else {
                    $('.loadmorebtnDiv').html('<a href="javascript:void(0);" data-click="loadmore" data-page="' + pageNumber + '" class="load-more-pagination filterLoadmore">Load More</a>');
                    $('#videosData').html(response.video_data);
                }
            } else {
                $('.loadmorebtnDiv').hide();
                $('#videosData').html("<div class='w-100 text-center'><b>No Data Available..!!</b></div>");
            }
        },
        error: function(response) {

        }
    });
});