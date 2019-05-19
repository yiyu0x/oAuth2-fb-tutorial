const express = require('express')
const request = require('request')
const router = express()
require('dotenv').config()

let facebook_client_id  = process.env.facebook_client_id
let facebook_secret_id  = process.env.facebook_secret_id
let redirect_uri        = process.env.redirect_uri
let facebook_console_id = process.env.facebook_console_id

router.get('/', (req, res, next) => {
    let facebook_oauth_url = "https://www.facebook.com/dialog/oauth?" +
        "redirect_uri="+ redirect_uri +
        "&client_id=" + facebook_client_id +
        "&scope=public_profile"+
        "&response_type=code";

    res.send(`
        <input type="button" value="facebook-login" 
        onclick="location.href='${facebook_oauth_url}'">
    `)
})

router.get("/facebook/callback", (req, res, next) => {
    var code = req.query.code;
    console.log('<- fb 帶著 code 來敲我了, code: ', code.slice(0, 10) + '...')
    
    let token_option = {
        url:"https://graph.facebook.com/v2.3/oauth/access_token?" +
            "client_id=" + facebook_client_id +
            "&client_secret=" + facebook_secret_id +
            "&code=" + code +
            "&redirect_uri=" + redirect_uri,
        method:"GET"
    };

    console.log('-> 我帶著 fb 給我的 code 去要資料囉')
    request(token_option, (err, resposne, body) => {
        let access_token = JSON.parse(body).access_token;
        console.log('<- fb 回應給我 token 了, token: ', access_token.slice(0, 10) + '...')

        let info_option = {
            url:"https://graph.facebook.com/debug_token?"+
            "input_token=" + access_token +
            "&access_token=" + facebook_console_id,
            method:"GET"
        };
        
        console.log('-> 我帶著這次的 token, 與我帳號本身的 token 去要資料了!')
        request({url:"https://graph.facebook.com/me?access_token=" + access_token}, function(err, response, body){
            if(err){
                res.send(err);
            }else{
                console.log('<- 資料到手: ', body, '你的名字: ', JSON.parse(body)['name'])
                res.send(`你的名字是: ${JSON.parse(body)['name']} <br>
                            <input type="button" value="回首頁" 
                            onclick="location.href='http://localhost:3000'">`);
                console.log('------------------------------------------------------------')
            }
        });
  
    });
});   

router.listen(3000, () => {console.log('Server is running at : http://localhost:3000')})
