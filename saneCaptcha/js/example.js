"use strict";

let validator = saneCapture({
    success: () => {
        alert("Very Good Choice");
    },
    failure: () => {
        $('#directionsCol').empty().append('<p class="lead text-xs-center">Run Away!</p>');
        _.delay(function() {
            //  window.location = 'http://wikipedia.com';
            console.log('I am outta here!');
        }, 3000);
    },
    appendTo: $('#putHere')
}).create({
    numIcons: 65,
    additionalClasses: ['vert-pos', 'toWhite']
});
