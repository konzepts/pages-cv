$('[data-toggle="collapsible-nav"]').on('click', function(e){
    var target = ($(this).data('target'));
    $('#' + target).toggleClass('show');
});

$(document).ready(function(){
    if(window.innerWidth >= 992) {
        $('#collapsible-nav').addClass('show');  //Show navigation menu in bigger screens by default.
    } else {
        $('#collapsible-nav').removeClass('show');
    }

    if ($('.hover-box').length) {
        setHoverBoxPerspective();
    }
});

document.getElementById('downloadPdf').addEventListener('click', function() {
    var opt = {
        margin:       10,
        filename:     'myfile.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // New Promise-based usage:
    html2pdf().from(document.body).set(opt).outputPdf().then(function(pdf) {
        var blob = new Blob([pdf], {type: 'application/pdf'});
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'myfile.pdf';
        link.click();
    });
});

$(window).resize(
    function() {
        if ($('.hover-box').length) {
            setHoverBoxPerspective();
        }
    }
);

function setHoverBoxPerspective() {
    $('.hover-box').css({
        'perspective': function () {
            return Math.max( $(this).width(), $(this).height() ) * 2 + 50;
        }
    });
}


var classNames = ['in-up', 'in-right', 'in-down', 'in-left', 'out-up', 'out-right', 'out-down', 'out-left']; // Animation classes.

$('.hover-box').hover(
    function (event) {
        var direction = "up";
        if(jQuery.fn.entry){ //Check if entry js file is loaded.
            direction = $(this).entry({ e: event }); // Get mouse in direction.
        }

        $(this).removeClass(classNames.join(" ")); // Remove existing animation classes.
        $(this).addClass("in-" + direction); //Add mouse in animation

    }, 
    
    function (event) {

        var direction = "up";
        if(jQuery.fn.entry){
            direction = $(this).entry({ e: event }); // Get mouse out direction.
        }

        $(this).removeClass(classNames.join(" "));
        $(this).addClass("out-" + direction); //Add mouse out animation

    }
);
