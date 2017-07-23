$(document).ready(function () {
    var link = "1212312/OACEED/"

    function send(varible, value) {
        $.ajax({
                url: link + varible + "/set/" + value
            }).done(function () {

            }).fail(function () {
                
            })
    }

    function autoClick(slider) {
        if (slider.checked) {
            
        } else {
            
        }
    }

    function airClick(slider) {
        if(slider.checked) {
            send(airStatus, 1)
        } else {
            send(airStatus, 0)
        }
    }

    function lightClick(slider) {
        if(slider.checked) {
            send(lightStatus, 1)
        } else {
            send(lightStatus, 0)
        }
    }
})