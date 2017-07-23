$(document).ready(function () {
    var link = "http://158.108.165.223/data/OACEED/"

    function send(value, variable = "") {
        console.log(link + variable + (variable ? "/" : "") + "set/" + value)
        $.ajax({
            url: link + variable + (variable ? "/" : "") + "set/" + value
        }).done(function () {

        }).fail(function () {
            console.error(variable + " error!")
        })
    }
    function turnBoolean(x) {
        if (x == 0) {
            return false
        } else {
            return true
        }
    }
    function receive(variable, tag) {
        $.ajax({
            url: link + variable,

        }).done(function (data) {
            console.log(tag + " " + data)
            $(tag).prop('checked', turnBoolean(data))
        });

    }

    $('#auto-switch').change(function () {
        if ($(this).prop("checked")) {
            send(1, "autoStatus")

            $('#light-switch').attr('disabled', 'disabled')
            $('#air-switch').attr('disabled', 'disabled')
            $('#door-switch').attr('disabled', 'disabled')

            return
        }
        send(0, "autoStatus")

        $('#light-switch').removeAttr('disabled')
        $('#air-switch').removeAttr('disabled')
        $('#door-switch').removeAttr('disabled')
    })

    function recieveData(variable, tag) {
        $.ajax({
            url: link + variable,
        }).done(function (data) {
            console.log(tag + " " + data)
            $(tag).text(data)
        });
    }

    setInterval(function () {
        if ($('#auto-switch').prop('checked')) {
            receive("lightStatus", '#light-switch')
            receive("airStatus", '#air-switch')
            receive("doorStatus", '#door-switch')
        }
        // var temp = receive("tempStatus")
        // var person = receive("personCount")
        // $('#temperature').text(temp)
        // $('#human').text(person)
        recieveData("tempStatus", "#temperature")
        recieveData("personCount", "#human")
        // $('#human').text(0)
        console.log("OK");
    }, 5000)

    $('#air-switch').change(function () {
        if ($(this).prop("checked")) {
            send(1, "airStatus")
            return
        }
        send(0, "airStatus")
    })

    $('#light-switch').change(function () {
        if ($(this).prop("checked")) {
            send(1, "lightStatus")
            return
        }
        send(0, "lightStatus")
    })

    $('#door-switch').change(function () {
        if ($(this).prop("checked")) {
            send(1, "doorStatus")
            return
        }
        send(0, "doorStatus")
    })

})