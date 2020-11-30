
// Admin Side Code

var min = 2000;
var max = 3500;

sessionStorage.setItem('myEmail', 'test@test.com');
sessionStorage.setItem('myPassword', 'test123123123');



if(sessionStorage.getItem('myEmail') && sessionStorage.getItem('myPassword')){
    $.ajax({
        type: "POST",
        url: "https://reply.onblick.com/api/getUserApiBearer",
        data: {
            email :  sessionStorage.getItem('myEmail'),
            password :  sessionStorage.getItem('myPassword')
        },
        success: function(response){
            if(response.data.apiBearer != null){
                apiBearer = response.data.apiBearer;
                dataCollection(apiBearer);
            }else{
                alert('Failed To Authenticate');

            }
        }
    });
}

function dataCollection(apiTokenHeader){
    linkArray = [];
    const scrollToBottom = () => {
        var refreshId = setInterval(()=> { 
            if (document.documentElement.scrollTop < document.documentElement.scrollHeight) {
                scrollCheck = document.documentElement.scrollHeight;
                $("html, body").animate({ scrollTop: document.body.scrollHeight }, "slow");
                setTimeout(()=>{
                    if(scrollCheck == document.documentElement.scrollHeight){
                        shareScrape(apiTokenHeader);
                        clearInterval(refreshId);
                    }
                },timeout = scrollRandom(min, max) );
            }
        },timeout = scrollRandom(min, max));    
    }
    scrollToBottom();
}

function shareScrape(apiTokenHeader){

    $('div.feed-shared-update-v2').each(function (index, element) {
        if($(element).attr('data-urn')  != "urn:li:l2mPromotion:tortoise:premium" && $(element).attr('data-urn')  != 'urn:li:l2mPromotion:galapagos:pgs-fd:lss_acq_self_serve_sign_ups'){
            linkArray.push('https://www.linkedin.com/feed/update/'+($(element).attr('data-urn')));  
        }
    });
    var uniqueLinks= [];
    $.each(linkArray, function(i, el){
        if($.inArray(el, uniqueLinks) === -1) uniqueLinks.push(el);
    });
    
    var companyName = $('h4.t-16 > span:nth-child(1)').text().replace(/\s/g,'');
    var dataCollections = JSON.stringify(uniqueLinks);

    $.ajax({
        type: "POST",
        url: "https://reply.onblick.com/api/posts/"+companyName+"/savePostLinks",
        dataType: "JSON",
        headers: { 
            Authorization : "Bearer "+apiTokenHeader
        },
        data: {
            email :  sessionStorage.getItem('myEmail'),
            password : sessionStorage.getItem('myPassword'),
            dataCollection : dataCollections
        },
        success: function (response) {
           alert('Scrape Status : '+response);
        }
    });

}

function scrollRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
  }




