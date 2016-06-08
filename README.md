# sane-capture
A user friendly captcha - its just buttons

This is an ES6 script that incorporates Bootstrap and Font-awesome to producea user freindly captcha.
Using the mouse or by touching the correct/matching icon your users will prove to you that they are human - and not a bot!

Here is [an example] (http://matthewhakes.com/saneCaptcha/examples/index.html) of sane-captcha

<h2>Requirements</h2>

<h3>JSON</h3>
In the json folder are the strings for the [Font-Awesome] (https://fontawesom.io) icons.
This is current as of version 4.6.3

<h3>CSS</h3>

```
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha/css/bootstrap.min.css">
<link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
```

<h3>Scripts</h3>

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.13.1/lodash.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.3.2/js/tether.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha/js/bootstrap.min.js"></script>
<script src="sane-captcha.js"></script>
```
<h2>Using</h2>

<h3>Intializing</h3>
On initializing your sane-captcha pass:
 - what you want to happen on success
 - what you want to happen on failure 
 - where in your document to append the sane-captcha

<h3>Methods/Options</h3>
There is only 2 methods to saneCaptcha.
The first is the `create` method.
Options are called with the create method:
- numIcons  (int) * the number of icons to display the default is 50
- max (int) * the maximum ties you want the user to try the default is 3 
- btnClass (str) * the bootstrap style of the buttons the default is btn-outline-success
- size (str)* the font-awesome icon size the default is fa-2x
- directions (str) * Instructions to the user (see below)
- additionalClasses (array) * pass css or unique class for the buttons

The directions/instructions to the user can be html.
The default instruction string is:

Just to prove you are human and not a hacker!<br>click on the button below that matches the icon above:
A dom div #directionsCol is created and is available for instructions, and comments

The second method is appendTo
If you'd like to separate for later and not pass the dom element on initialization
you would call
```
validator.appendTo($('#putHere');
```

<h3>Example Code</h3>

```
let validator = saneCapture({
    success: () => {
        $('#directionsCol').slideUp('fast', function() {
        $(this).append('<p class="lead text-xs-center">Thank you! You're enrolled</p>').slideDown('fast');
          // load your thank you page or redirect your user ect.
        });
    },
    failure: () => {
        $('#directionsCol').empty().append('<p class="lead text-xs-center">Run Away!</p>');
        _.delay(function() {
            //  window.location = 'http://wikipedia.com';
            console.log('I am outta here!');
        }, 3000);
    },
    appendTo: $('#putHere') // where on your document you would like to see the captcha you can pass just the id #putHere
}).create({
    numIcons: 65,
    additionalClasses: ['vert-pos', 'toWhite']
});
```

<h3>Example file in the examples folder</h3>

