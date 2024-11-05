$(document).on("click", "#loadmoredatabtn", function () {
    // console.log("response","2");
    // return false;
    $('.loader-main').show();
    // alert("Hello");
    var page = $('#loadmoredatabtn').attr('data-page'); 
    $.ajax({
        url: "/photoslistshow",
        type: "GET",
        data: {'page':page },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        dataType: 'JSON',
        success: function (response) {
            if (response.status == true) {
                console.log("response1",response.newsResponce);
                // return false;
                $('.loader-main').hide();
                // $('#bannerDiv').html(response.banner);
                $('#photosData').append(response.photo_data);
                $('#loadmoredatabtn').attr('data-page',parseInt(response.newsResponce.page) + 1);
            }
        },
        error: function (response) {
        }
    });
});