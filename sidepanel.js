window.addEventListener("message", function(e) {
    console.log(e.data)
    if (e.data.message == 'clear') {
        $('#items').empty();
    }
    if (e.data.message == 'todo') {
        $.each(e.data.list, function(key,tag){
            if(tag[2] == 'yes') {
                $('#items').find('#'+tag[0]).remove()
                $('#items').append("<div id=" + tag[0] + ">" + tag[0] + ": (" + tag[1] + ")" + "<hr>")
                $('#'+tag[0]).css('color','rgb(128, 128, 128)')
            }else{
                $('#items').find('#'+tag[0]).remove()
                $('#items').append("<div id=" + tag[0] + ">" + tag[0] + ": (" + tag[1] + ")" + "<hr>")
                $('#'+tag[0]).css('color','10A37F')
                var manual = JSON.parse(localStorage.getItem(e.data.user+'_'+e.data.protocol_or_results+'_'+e.data.article_id));
                $.each(manual, function(k,t){
                    if(tag[0] == t){
                        $('#'+tag[0]).css('color','rgb(208, 208, 208)')
                    }
                })
                $('#'+tag[0]).dblclick(function(){
                    if($('#'+tag[0]).css('color') == 'rgb(208, 208, 208)'){
                        $('#'+tag[0]).css('color','10A37F') // green
                        var manual = JSON.parse(localStorage.getItem(e.data.user+'_'+e.data.protocol_or_results+'_'+e.data.article_id));
                        if(manual == null) manual = [];
                        $.each(manual, function(k,t){
                            if(tag[0] == t){
                                manual.splice(k,1)
                            }
                        })
                        localStorage.setItem(e.data.user+'_'+e.data.protocol_or_results+'_'+e.data.article_id, JSON.stringify(manual));
                        localStorage.setItem("location",$('body').scrollTop())
                    }else {
                        $('#' + tag[0]).css('color', 'rgb(208,208,208)')
                        var manual = JSON.parse(localStorage.getItem(e.data.user + '_' + e.data.protocol_or_results + '_' + e.data.article_id));
                        if (manual == null) manual = [];
                        manual.push(tag[0])
                        localStorage.setItem(e.data.user + '_' + e.data.protocol_or_results + '_' + e.data.article_id, JSON.stringify(manual));
                        localStorage.setItem("location",$('body').scrollTop())
                    }
                })
            }
        })
        var location = localStorage.getItem("location")
        $('body').scrollTop(location);
    }
    //
})

$(document).scroll(function(){
    setTimeout(function () {
        localStorage.setItem("location",$('body').scrollTop())
    }, 10000);
})