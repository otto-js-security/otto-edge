/// <reference types="@fastly/js-compute" />
import { decode } from "base-64"

const handler = async (event) => {
  // ENTER OTTO API KEY
  const dict = new Dictionary("otto")
  const otto_key=dict.get("key") //,"0066c2c5-3306-4529-879e-1fcb4aed675c")
  const otto_host=dict.get("apihost") //, "dev-api.devconops.com")
  const site_host=dict.get("host") //, "delicate-dew-0422.on.fleek.co")


  const otto_url=`https://${otto_host}/api/v2/script/${otto_key}.js`
  // Get the request from the client.
  const req = event.request
    req.headers.set("Host", site_host)
    let apiReq = new Request(otto_url);

    let apiRes = await fetch(apiReq, { backend: "origin_1"} );
    let apiResBody = await apiRes.text();
    let start = apiResBody.indexOf('"policy":"')
    let csp = apiResBody.substring(start+10, apiResBody.indexOf('"', start+11))
    if(otto_host.indexOf("dev-api") != -1){
      csp = csp.replace("report-uri https://analyticssystems.net/csp/report/", `report-uri https://dev-api.devconops.com/api/v2/csp/report/`)
    }else{
      csp = csp.replace("report-uri https://analyticssystems.net/csp/report/", `report-uri https://analyticssystems.net/api/v2/csp/report/`)
    }

    const beresp = await fetch(req, {
      backend: "origin_0"
    })

    beresp.headers.set("content-security-policy", csp);

    // Send our response back to the client.
    //return beresp;
    return beresp;
};

addEventListener("fetch", event => event.respondWith(handler(event)));
