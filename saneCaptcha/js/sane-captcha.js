"use strict";
/*
ES6 update version of my old Bootstrap-captcha
Requirements:
    Javascript:
        jQuery,         // (you know where to get it!)
        Bootstrap 4,    // https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha/js/bootstrap.min.js
        Lodash          // https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.13.1/lodash.min.js
    CSS:
        font-awesome:   // https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css
        Bootstrap       // https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha/css/bootstrap.min.css
*/
const saneCapture = (args = null) => {
    let faicons = [];
    let sendBack = {};
    let opts = {
        numIcons: 20,
        max: 3,
        attempts: 0,
        btnClass: 'btn-success-outline',
        size: 'fa-2x',
        additionalClasses: [],
        directions: 'Just to prove you are human and not a bot hacker!<br>click on the button below that matches the icon above:'
    };
    let $faAppend = null;
    let layoutLoaded = false;
    const setOptions = (obj) => {
        if (_.isPlainObject(obj)) {
            if (!_.isNil(obj.numIcons)) {
                obj.numIcons = _.toInteger(obj.numIcons);
                if (obj.numIcons % 5 !== 0) {
                    alert('Use any multiple of 5 for the number of icons, up to 450!');
                    return;
                }
            }
            opts = _.merge(opts, obj);
            opts.attempts = 0;
        }
    };
    let success = () => {
        alert('Very Good!');
    };
    let failure = () => {
        alert('You are a bot! Run Away');
    };
    const makeIcon = (icon, inx) => {
        let x = `<p><button class="btn ${opts.btnClass} btn-block faButton" data-inx="${inx}">`;
        x += `<i class="fa ${opts.size} ${icon}" aria-hidden="true"></i><br></button></p>`;
        return x;
    };
    const createMaster = ($i) => {
        let $s = $('<span class="fa-stack fa-lg"><i class="fa fa-square-o fa-stack-2x"></i></span>');
        $i.addClass('fa-stack-1x');
        $i.removeClass(opts.size);
        $s.append($i);
        return $s;
    };
    const createIcons = () => {
        let inx = 1;
        let $org = null;
        let $c = null;
        let faAll = _.chunk(_.shuffle(faicons), opts.numIcons)[0];
        let fa = _.chunk(_.shuffle(faAll), 5);
        $('.iconCol').empty();
        if (opts.attempts > opts.max) {
            $('#faMaster').empty();
            failure();
            return;
        }
        if (opts.attempts > 0) {
            $('#directions').html('Sorry, try again');
        }
        _.forEach(fa, function(row, i) {
            let col = 0;
            _.forEach(row, function(icon) {
                let x = makeIcon(icon, inx);
                $('#col' + col).append(x);
                inx++;
                col++;
            });
        });
        if (opts.additionalClasses.length) {
            for (let i of opts.additionalClasses) {
                $('.faButton').addClass(i);
            }
        }
        inx = _.random(1, opts.numIcons);
        $org = $('[data-inx="' + inx + '"');
        $c = $org.find('.fa').clone();
        $c.addClass('element');
        $('#faMaster').empty().append($c);
        $('.faButton').on('click', function(e) {
            let x = Number($(this).attr('data-inx'));
            e.preventDefault();
            if (x === inx) {
                $(".faButton").attr('disabled', 'disabled');
                success();
                return;
            }
            opts.attempts++;
            createIcons();
        });
        $('.faButton').css('color', 'black');

    };
    const createLayout = () => {
        let $wrapper = $('<div class="row"></div>');
        let $cols = $('<div class="col-md-offset-3 col-md-6 text-center" id="directionsCol"></div>');
        let $inner = $('<div class="row"><div class="col-md-1">&nbsp;</div></div>');
        let directions = '<p><div class="text-xs-center masterFA parent-element lead" id="faMaster"></div></p><p><hr></p>';
        directions += `<p id="directions" class="text-xs-center lead">${opts.directions}</p><p><hr></p>`;

        for (let i = 0; i < 5; i++) {
            $inner.append('<div class="col-md-2 iconCol" id="col' + i + '"></div >');
        }
        $cols.append(directions);
        $cols.append($inner);
        $wrapper.append($cols);
        $faAppend.append($wrapper);
        layoutLoaded = true;
    };

    sendBack.appendTo = ($at) => {
        $faAppend = $at;
        if (!layoutLoaded) {
            createLayout();
        }
        return sendBack;
    };
    sendBack.create = (options = null) => {
        if (!_.isNull(options)) {
            setOptions(options);
        }
        if (_.isNull($faAppend)) {
            alert('Where should put the icons (call appendTo)?');
            return;
        }
        $.getJSON('../json/fa.json', function(json) {
            faicons = json;
            createIcons();
        });
    };
    if (!_.isNull(args)) {
        if (!_.isNil(args.success) && _.isFunction(args.success)) {
            success = args.success;
        }
        if (!_.isNil(args.failure) && _.isFunction(args.failure)) {
            failure = args.failure;
        }
        if (!_.isNil(args.appendTo)) {
            if (args.appendTo instanceof jQuery) {
                $faAppend = args.appendTo;
                createLayout();
            } else if (_.isString(args.appendTo) && _.indexOf(args.appendTo, '#') === 0) {
                $faAppend = $(args.appendTo);
                createLayout();
            }
        }
    }
    return sendBack;
};
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