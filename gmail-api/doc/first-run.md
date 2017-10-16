First time run
==============

When run program first time, the file ~/.credentials/gmail-nodejs-main.json isn't exist.
it will get the token, and save it to the file(gmail-nodejs-main.json)

```
$ proxychains4 -q node main.js
```

![](../image/first-run/get-token-first-time.PNG)



Open the above url, then click "Allow" button  
![](../image/first-run/allow-permission.PNG)


A code will be return  
![](../image/first-run/token-code.PNG)