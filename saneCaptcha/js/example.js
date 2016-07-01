"use strict";
let d = 'Just to prove that your a human being and not a robot:<br>';
d += 'Please click on each of the green icons below that match the 3 blue icons above';
let k = saneCaptcha({
    numberOfIcons: 30,
    pathToIcons: 'fa.json',
    instructions: d,

    success: () => {
        $('#saneCaptchaCol').slideUp('fast', function() {
            $(this).empty().append('<p id="goodJob" class="text-xs-center lead"></p>');
            $('#goodJob').text('Yep, you have some human DNA!');
            $(this).slideDown();
        });
    },
    failure: () => {
        $('#saneCaptchaCol').empty().append('<p id="badJob" class="text-xs-center lead"></p>');
        $('#badJob').html("Sorry, you don\'t appear to be human!<br/>Additional Help Available ");

        $('<a/>',{
            href:'http://electricpulp.com/guykawasaki/arse/',
            'class': 'btn btn-danger',
            text: 'Here'
        }).appendTo('#badJob');
        $(this).slideDown();
    }
});
k.setup({
    appendTo: $('#putHere')
});
k.create();
