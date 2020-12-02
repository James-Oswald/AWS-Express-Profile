var expect  = require('chai').expect;
var request = require('sync-request');

process.chdir(__dirname);
require('dotenv').config({path:"../.env"})

//Testing API function Calls

//The output of the login endpoint results in an error when the the wrong password is used
it('Authentication Failure', function(done) {
    let head = {'content-type':'application/x-www-form-urlencoded'};
    let data = "username=wrongUser&password=wrongPassword";
    let res = request('POST', 'http://localhost:3000/loginEndpoint', {body: data, headers: head});
    expect("" + res.body).to.equal('{"err":"Wrong Password"}');
    done();
});

//The output of the login endpoint results in no error when the the correct password is used
it('Authentication Sucess', function(done) {
    let head = {'content-type':'application/x-www-form-urlencoded'};
    let data = "username=" + process.env.username + "&password=" + process.env.password;
    let res = request('POST', 'http://localhost:3000/loginEndpoint', {body: data, headers: head});
    expect("" + res.body).to.equal('{"err":""}');
    done();
});

//We expect to fail with a "Already Logged Out" error if we call this without being logged in
it('Logout Failiure', function(done) {
    let head = {'content-type':'application/x-www-form-urlencoded'};
    let res = request('POST', 'http://localhost:3000/logoutEndpoint', {headers: head});
    expect("" + res.body).to.equal('{"err":"Error: Already Logged Out"}');
    done();
});