//Admin Side Code

$(document).ready(function () {
    setTimeout(() => {
      extractLinks();
      function extractLinks() {
          const links = [];
          var reg = [];
          
        
          for (let index = 0; index < document.links.length; index++) {
            links.push(decodeURI(document.links[index].href));
          }
          
        $.each(links, function (index) { 
          if(links[index].match(/https\:\/\/www\.linkedin\.com\/company\/[0-9]*?\/admin\/$/g))
          {
          reg[index] = links[index];
          }
        });

        // UNIQUE FINDER
          var uniqueItems = Array.from(new Set(reg));
        // CHECK ABOVE IN CASE OF ISSUES
        
          reg.length = 0;
          for(i = 0 ; i < uniqueItems.length ; i++){
            if(uniqueItems[i]){
              reg.push(uniqueItems[i].split('admin', 1)[0]+'?viewAsMember=true');
            }
          }

        $.each(reg, function (index) { 
          window.open(reg[index], 'PageWindow', "resizable=no,height=1080,width=1920");

        });

      }
    }, 4000);
});