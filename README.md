# oAuth2-fb-tutorial


## setup

0. 首先，先在 [facebook for developers](https://developers.facebook.com/) 註冊應用程式

1. 在此專案目錄下建立 .env, 並且將你的資料填入

```
facebook_client_id=
facebook_secret_id=
redirect_uri=
facebook_console_id=
```


`facebook_client_id` 以及 `facebook_secret_id` 在註冊完的應用程式設定中可以找到

![fb_dev](https://i.imgur.com/oVVOTJe.png)

分別為 `應用程式編號` 以及 `應用程式密鑰`

`redirect_uri` 則填入 ip:3000/facebook/callback ，這邊要注意的是臉書不允許用 http，所以無法只接用 localhost， 這邊推薦大家用 [ngrok](https://ngrok.com/) 來將一個外網網址映射到 localhost:3000/callback/facebook

![ngrok](https://i.imgur.com/9qRRtYh.png)

例如我的 ngrok 幫我映射的 URL 為 https://7bfbb3ed.ngrok.io

則 `redirect_uri` 就填入 `https://7bfbb3ed.ngrok.io/facebook/callback`

除了在 `.env` 填入以外， 也要記得在剛才應用程式設定中填入 `有效的 OAuth 重新導向 URI` 之中

![fb-dev2](https://i.imgur.com/AWp3a5P.png)

最後一個 `facebook_console_id` 則是自己的 facebook 帳戶 token

取得方式為:

`curl -X GET "https://graph.facebook.com/oauth/access_token?client_id={id}&client_secret={id}&grant_type=client_credentials"`

`client_id` 與 `client_secret` 與 .env 的前兩個欄位相同

2. `npm i` 
(安裝所需套件)

3. `npm run server`
(此時瀏覽 localhost:3000 即可)

## demo

![demo](https://i.imgur.com/PVjXJk1.png)
