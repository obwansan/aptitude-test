function getTemplateAjax(path, callback) {
    var source;
    var template;

    $.ajax({
        url: path,
        success: function (data) {
            source = data;
            template = Handlebars.compile(source);

            //execute the callback if passed
            if (callback) callback(template);
        }
    });
}

function fillTemplate() {
    var source = $("#handle_bars").html()
    var template = Handlebars.compile(source)

    $.ajax({url: "http://localhost:8080/user", success: function(result){
        console.log(result)
        result.data.forEach(function (context) {
            var html = template(context)
            $("body").append(html)
        })
    }});
}

getTemplateAjax('js/templates/userTable.hbs', function(template) {
    //do something with compiled template
    $('#handle_bars').html(template);

    fillTemplate()
})