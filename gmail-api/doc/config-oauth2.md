Configure OAuth2 authentication
========================================

# Create Client Secret for OAuth2 authentication.

## open google developer console

First of all you need to log into your google account and go to the [developer console](https://console.developers.google.com).
This will list all Google API projects you are using already and allow you to create new ones.

![](../image/config-oauth2/dashboard.PNG)


## create project

Click the "Create" button:

![](../image/config-oauth2/create-project.PNG)


## config OAuth consent screen

![](../image/config-oauth2/credentials-consent-screen.PNG)


## create Oauth Client ID

![](../image/config-oauth2/create-credentials.PNG)

![](../image/config-oauth2/credentials-create-client.PNG)

## download Client Secret

Click the download icon, a json file will be downloaded. The filename will be `client_secret_<clientID>.json`
rename it to `client_secret.json`

![](../image/config-oauth2/credentials-download-client_secret.PNG)


# Enable Gmail API

![](../image/config-oauth2/library.PNG)

![](../image/config-oauth2/library-gmail-api.PNG)

![](../image/config-oauth2/enable-gmail-api.PNG)