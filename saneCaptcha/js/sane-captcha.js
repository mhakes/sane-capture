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
"use strict";
const saneCaptcha = (setupData = null) => {
    let opts = {
        numberOfIcons: 25,
        numberOfMasters: 3,
        btnStyle: 'btn-success',
        btnMaster: 'btn-primary',
        maxAttempts: 3,
        instructions: 'Do a good job'
    };
    let sc = {};
    let $appendTo = null;
    let success = null;
    let failure = null;
    let pathToIcons = null;
    let icons = [];
    let indexi = [];
    let tableCreated = false;
    let iconsLoaded = false;
    const makeIcon = (icon, inx) => {
        let b = `<button data-sc="${icon}" class="btn ${opts.btnStyle} scButton"`;
        b += `data-inx="${inx}"><i class="fa fa-2x ${icon}"></i></button>`;
        return b;
    };
    const createIcons = () => {
        let working = _.chunk(_.chunk(_.shuffle(icons), opts.numberOfIcons)[0], 5);
        let inx = 1;
        $('#saneCaptchaTable').hide();
        _.forEach(_.shuffle(working), function(row) {
            let tr = '<tr>';
            _.forEach(row, function(icon) {
                let i = makeIcon(icon, inx);
                tr += `<td title="${icon}" class="text-xs-center scTD">` + i + '</td>';
                inx++;
            });
            tr += '</tr>';
            $('#saneCaptchaTable').append(tr);
        });
        _.forEach(indexi, function(i) {
            let $a = $(`[data-inx="${i}"]`);
            let $b = $a.clone(true);
            $b.removeClass(`scButton ${opts.btnStyle}`).addClass(`scKey ${opts.btnMaster}`);
            $('#saneCaptchaKeys').append($b);
        });
        $(".scButton").click(function(e) {
            let $t = $(this);
            let inx = Number($t.attr('data-inx'));
            let sc = $t.attr('data-sc');
            e.preventDefault();
            if ($t.hasClass('sbKey')) {
                return;
            }
            if (_.indexOf(indexi, inx) === -1) {
                opts.attempts++;
                if (opts.attempts >= opts.maxAttempts) {
                    failure();
                    return;
                }
                $('#saneCaptchaInstructions').html('Opps! Try again.<br>' + opts.instructions);
                setIndexi();
                return;
            }
            $t.parent().addClass('bg-success');
            $t.css('background-color', 'black').attr('disabled', 'disabled');
            $('#saneCaptchaKeys').find('.' + sc).parent().hide();
            indexi = _.without(indexi, inx);
            if (_.size(indexi) === 0) {
                success();
            }
        });
        $('')
        $('#saneCaptchaTable').show();
    };
    const createTable = () => {
        let $row = $('<div id="saneCaptchaWrapper" class="row"></row>');
        let $col = $('<div/>', {
            id: 'saneCaptchaCol',
            'class': 'col-md-offset-3 col-md-6 text-xs-center'
        });
        let $p = $('<p/>', {
            id: 'saneCaptchaKeys',
            'class': 'btn-group text-xs-center'
        });
        $col.append($p);
        let $dir = $('<div>', {
            'class': 'text-xs-center',
            html: '<p id="saneCaptchaInstructions" class="text-xs-center"></p>'
        });
        $col.append($dir);
        let $table = $('<table/>', {
            'class': 'table table-bordered',
            id: 'saneCaptchaTable'
        });
        $col.append($table);
        $row.append($col);
        $appendTo.append($row);
        $('#saneCaptchaInstructions').html(opts.instructions);
        createIcons();
    };
    const createIndexi = () => {
        let x = _.random(1, opts.numberOfIcons);
        if (_.size(indexi) === opts.numberOfMasters) {
            if (tableCreated === true) {
                $('#saneCaptchaTable').empty();
                $('#saneCaptchaKeys').empty();
                createIcons();
                return;
            }
            tableCreated = true;
            createTable();
            return;
        }
        if (_.indexOf(indexi, x) === -1) {
            indexi.push(x);
        }
        createIndexi();
    }
    const setIndexi = () => {
        indexi = [];
        if (iconsLoaded === true) {
            createIndexi();
            return;
        }
        $.getJSON(pathToIcons, function(json, xh) {
            icons = json;
            opts.attempts = 0;
            iconsLoaded = true;
            createIndexi();
        });
    };
    const setup = (obj) => {
        if (!_.isNil(obj.success)) {
            if (_.isFunction(obj.success)) {
                success = obj.success;
            }
            obj = _.omit(obj, ['success']);
        }
        if (!_.isNil(obj.failure)) {
            if (_.isFunction(obj.failure)) {
                failure = obj.failure;
            }
            obj = _.omit(obj, ['failure']);

        }
        if (!_.isNil(obj.appendTo)) {
            if (obj.appendTo instanceof jQuery) {
                $appendTo = obj.appendTo;
            }
            obj = _.omit(obj, ['appendTo']);
        }
        if (!_.isNil(obj.pathToIcons)) {
            if (_.isString(obj.pathToIcons)) {
                pathToIcons = obj.pathToIcons;

            }
            obj = _.omit(obj, ['pathToIcons']);
        }
        if (_.isPlainObject(obj)) {
            opts = _.merge(opts, obj);
        }
    };
    if (!_.isNull(setupData)) {
        setup(setupData);
    }
    sc.setup = setup;
    const create = () => {
        if (_.isNull(success)) {
            console.log('Add a success callback!');
            return;
        }
        if (_.isNull(failure)) {
            console.log('Add a failure callback!');
            return;
        }
        if (_.isNull($appendTo)) {
            console.log('Add the dom location for saneCaptcha!');
            return;
        }
        if (_.isNull(pathToIcons)) {
            console.log('Add the path to the location of the json file!');
            return;
        }
        setIndexi();
    };
    sc.create = create;
    return sc;
};
