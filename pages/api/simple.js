/** format **/
import https from "https";
import querystring from "querystring";
import url from "url";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        // const originUrl = url.parse(req.url);
        // const qs = querystring.parse(originUrl.query);
        // const targetUrl = qs["target"];
        // const target = url.parse(targetUrl);
        // console.log(`targetUrl=====${JSON.stringify(targetUrl, null, 2)} target======${JSON.stringify(target, null, 2)}`);
        // const options = {
        //     hostname: target.hostname,
        //     port: 80,
        //     path: url.format(target),
        //     method: "GET"
        // };
        const body = await fetch("https://www.yuansfer.com", {method: 'GET'}).then(res => res.text());
        console.log(body);
        res.status(200).send(body);
        // res.status(200).send(`<!DOCTYPE html>
        // <html>
        // <body>
        // <h1>My First Heading</h1>
        // <p>My first paragraph.</p>
        
        // </body>
        // </html>`);
          
    } else if (req.method === 'POST') {
        const data = req.body;
        persist(data);
        res.status(200).json({ success: 'Data saved' });
    }
}
