Receive mail via gmail API
==========================

# ref

- https://developers.google.com/gmail/api/guides/
- https://developers.google.com/gmail/api/quickstart/nodejs
- https://github.com/PHPMailer/PHPMailer/wiki/Using-Gmail-with-XOAUTH2#configure-an-oauth2-app


# prepare

There are different authentication way to receive gmail via third-part app.

##  Basic authentication 

You can use email username and password, but you have to set `Allow less secure apps:` to `ON` for `access and security settings` of your google account.

[detail](doc/config-basic-auth.md)

## OAuth2 authentication 

If you don't want to set `Allow less secure apps:` to `ON`. You can use Oauth2 authentication.

[detail](doc/config-oauth2.md)

# required node module

```
$ npm install googleapis --save
$ npm install google-auth-library --save
```


# usage

```
$ proxychains4 -q node quickstart.js
$ GMAIL_PASSWORD=xxxxx proxychains4 -q  node main.js
```