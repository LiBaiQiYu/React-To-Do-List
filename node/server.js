'use strict'

/**
 * Module dependencies.
 */

var express = require('express');
var cors = require('cors');
var app = module.exports = express();
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
var logger = require('morgan');
var cookieParser = require('cookie-parser');

// custom log format
if (process.env.NODE_ENV !== 'test') app.use(logger(':method :url'))

// parses request cookies, populating
// req.cookies and req.signedCookies
// when the secret is passed, used
// for signing the cookies.
app.use(cookieParser());

// parses x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

app.get('/', function (req, res) {
    if (req.cookies.remember) {
        res.send('Remembered :). Click to <a href="/forget">forget</a>!.');
    } else {
        res.send('<form method="post"><p>Check to <label>'
            + '<input type="checkbox" name="remember"/> remember me</label> '
            + '<input type="submit" value="Submit"/>.</p></form>');
    }
});

app.get('/setCookie', function (req, res) {
    res.cookie('remember', '1', { maxAge: 20000 });
    res.send('ok')
})

app.get('/forget', function (req, res) {
    res.clearCookie('remember');
    res.send('ok')
});

app.post('/', function (req, res) {
    var minute = 60000;
    res.cookie('remember', 1, { maxAge: minute });
});

/* istanbul ignore next */
if (!module.parent) {
    app.listen(8080);
    console.log('Express started on port 8080');
}