var inbox = require("inbox");
var useOAuth = false

var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/gmail-nodejs.json
var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'gmail-nodejs.json';

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
    if (err) {
        console.log('Error loading client secret file: ' + err);
        return;
    }
    // Authorize a client with the loaded credentials, then call the
    // Gmail API.
    authorize(JSON.parse(content), main);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, function(err, token) {
        if (err) {
            console.log("get token first time:", err)
            getNewToken(oauth2Client, callback);
        } else {
            console.log("found saved token:")
            oauth2Client.credentials = JSON.parse(token);
            callback(oauth2Client);
        }
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
    var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Enter the code from that page here: ', function(code) {
        rl.close();
        oauth2Client.getToken(code, function(err, token) {
            if (err) {
                console.log('Error while trying to retrieve access token', err);
                return;
            }
            oauth2Client.credentials = token;
            storeToken(token);
            callback(oauth2Client);
        });
    });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
    try {
        fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
        if (err.code != 'EEXIST') {
            throw err;
        }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token));
    console.log('Token stored to ' + TOKEN_PATH);
}

function main(auth){
    if (!useOAuth) {
        console.log("connect gmail with basic authentication")
        var client = inbox.createConnection(false, "imap.gmail.com", {
            secureConnection: true,
            auth:{
                user: "jimmy@hyper.sh",
                pass: process.env.GMAIL_PASSWORD
            }
        });
    } else {
        console.log("connect gmail with oauth2 authentication")
        console.log("client_id:", auth._clientId, " client_secret:", auth._clientSecret)
        console.log("refresh_token:",auth.credentials.refresh_token, " access_token:", auth.credentials.access_token)
        var client = inbox.createConnection(false, "imap.gmail.com", {
            secureConnection: true,
            debug: true,
            auth:{
                XOAuth2:{
                    user: "jimmy@hyper.sh",
                    clientId: auth._clientId,
                    clientSecret: auth._clientSecret,
                    refreshToken: auth.credentials.refresh_token,
                    accessToken: auth.credentials.access_token,
                    timeout: 3600
                }
            }
        });
    }

    //register event
    client.on("connect", function(){
        console.log("Successfully connected to server");
        this.close();
    });
    client.on('close', function (){
        console.log('DISCONNECTED!');
    });

    //start
    client.connect();

}
