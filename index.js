$(document).ready(function () {
    var link = "http://158.108.165.223/data/OACEED/"

    function send(variable, value) {
        $.ajax({
            url: link + variable + "/set/" + value
        }).done(function () {

        }).fail(function () {
            console.error(variable+" error!")
        })
        console.log(variable + " " + value)
    }

    function receive(variable) {
        $.ajax({
            url: link + variable
        }).done(function (data) {
            return data
        }).fail(function (data) {
            console.error(variable + " " + data + " error!")
            return 0
        })
        console.log("receive "+variable)
    }

    $('#auto-switch').change(function () {
        if ($(this).prop("checked")) {
            send("", 1)

            $('#light-switch').attr('disabled','disabled')
            $('#air-switch').attr('disabled','disabled')
            $('#door-switch').attr('disabled','disabled')

            return
        }
        send("", 0)

        $('#light-switch').removeAttr('disabled')
        $('#air-switch').removeAttr('disabled')
        $('#door-switch').removeAttr('disabled')
    })

    function turnBoolean(binary) {
        if (binary == 0) {
            return false
        }
        return true
    }

    setInterval(function () {
        if ($('#auto-switch').prop('checked')) {
            $('#light-switch').prop('checked',  turnBoolean(receive("lightStatus")) )
            $('#air-switch').prop('checked',  turnBoolean(receive("airStatus")) )
            $('#door-switch').prop('checked',  turnBoolean(receive("doorStatus")) )
        }
        var temp = receive("tempStatus")
        var person = receive("personCount")
        $('#temperature').text(temp)
        $('#human').text(person)
    }, 5000)

    $('#air-switch').change(function () {
        if ($(this).prop("checked")) {
            send("airStatus", 1)
            $('#temperature').text(1)
            return
        }
        send("airStatus", 0)
    })

    $('#light-switch').change(function () {
        if ($(this).prop("checked")) {
            send("lightStatus", 1)
            return
        }
        send("lightStatus", 0)
    })

    $('#door-switch').change(function () {
        if ($(this).prop("checked")) {
            send("doorStatus", 1)
            return
        }
        send("doorStatus", 0)
    })

})