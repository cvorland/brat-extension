
if(!$('#brat_sidepanel').length) {
    $('body').css({
        'padding-left': '200px'
    });
    var iframe_ML = document.createElement('iframe');
    iframe_ML.src = chrome.runtime.getURL('sidepanel.html');
    var height = '75px';
    iframe_ML.style.height = 'calc(100% - ' + height + ')';
    iframe_ML.style.width = '200px';
    iframe_ML.style.position = 'fixed';
    bodyStyle = document.body.style;
    cssTransform = 'transform' in bodyStyle ? 'transform' : 'webkitTransform';
    iframe_ML.style.top = height;
    iframe_ML.style.left = '0';
    iframe_ML.scrolling = 'yes';
    iframe_ML.style.border = '0';
    iframe_ML.style.zIndex = '938088';
    iframe_ML.id = "brat_sidepanel";
    document.documentElement.appendChild(iframe_ML);
}else{
    var iframe = $('#brat_sidepanel');
    iframe[0].contentWindow.postMessage({
        message: 'clear'
    }, chrome.runtime.getURL('sidepanel.html'));
}

function gogo_gadget() {
    var url = window.location.href;
    var user = url.split('SPIRIT_CONSORT/')[1].split('/')[0]
    var protocol_or_results = url.split(user+'/')[1].split('/')[0]
    var article_id = url.split(protocol_or_results+'/')[1]
    //console.log(user,protocol_or_results,article_id)
    var list_to_do = []
    $.each($(document).find('.item'), function (key, tag) {
        //console.log($(tag).find('.item_content').find('.span_type_label').text())
        list_to_do.push($(tag).find('.item_content').find('.span_type_label').text())
    })
    var url = 'http://ec2-3-144-241-74.us-east-2.compute.amazonaws.com/brat/ajax.cgi?action=downloadFile&collection=%2FSPIRIT_CONSORT%2F'+user+'%2F'+protocol_or_results+'%2F&document='+article_id+'&extension=ann&protocol=1'
    var list_of_done = []
    $.get(url, {}, function results(content) {
        var done = content.split(/T\d+/)
        //console.log(content.split(/T\d+/))
        $.each(done, function (key, tag) {
            var item = tag.split('\t')
            if (item.length > 2) {
                var title = item[1].split(' ')[0]
                list_of_done.push(title)
            }
        })
        const counts = {};
        list_of_done.map(x => counts[x] = (counts[x] || 0) + 1);
        var final_list = []
        $.each(list_to_do, function (key, tag) {
            var found = 'false'
            $.each(counts, function (key2, tag2) {
                if (tag == key2) {
                    final_list.push([tag, tag2, 'yes'])
                    //$(iframe_ML).find('#items').append("<div id='key'>"+ tag + ": ("+tag2+")"+"<hr>")
                    found = 'true'
                }
                //console.log(key2,tag2)
            })
            if (found == 'false') {
                final_list.push([tag, 0, 'no'])
                //$(iframe_ML).find('#items').append("<div id='key'>NO_" + tag + ": ("+tag2+")"+"<hr>")
            }
        })
        var iframe = $('#brat_sidepanel');
        iframe[0].contentWindow.postMessage({
            message: 'todo',
            list: final_list,
            user: user,
            protocol_or_results: protocol_or_results,
            article_id: article_id
        }, chrome.runtime.getURL('sidepanel.html'));
    })
}


setTimeout(function () {
    gogo_gadget();
    $('.ui-button-text').click(function () {
        // var iframe = $('#brat_sidepanel');
        // iframe[0].contentWindow.postMessage({
        //     message: 'clear'
        // }, chrome.runtime.getURL('sidepanel.html'));
        setTimeout(function () {
            gogo_gadget();
        }, 3000);
    })
}, 5000);

