function fillUserTable() {
    var source = $("#handle_bars").html()
    var template = Handlebars.compile(source)

    $.ajax({url: "http://localhost:8080/user", success: function(result){
        result.data.forEach(function (context) {
            var html = template(context)
            $("body").append(html)
        })
    }})
}

getTemplateAjax('js/templates/userTable.hbs', function(template) {
    //do something with compiled template
    $('#handle_bars').html(template)

    fillUserTable()
})