# sane-capture
A user friendly captcha - its just buttons

This is an ES6 script that incorporates Bootstrap and Font-awesome to producea user freindly captcha.
Using the mouse or by touching the correct/matching icon your users will prove to you that they are human - and not a bot!

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

<h3>Intializing</h3>
On initializing your sane-captcha pass:
 - what you want to happen on success
 - what you want to happen on failure 
 - where in your document to append the sane-captcha

<h3>Options</h3>
Options are called with the create method:
- numIcons the number of icons to display the default is 50

<h3>Example Code</h3>

```
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
```



```

```

