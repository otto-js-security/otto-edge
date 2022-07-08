/// <reference types="@fastly/js-compute" />
import { decode } from "base-64"

const handler = async (event) => {
  const dict = new Dictionary("otto")
  const ottoKey=dict.get("key") 
  const ottoHost=dict.get("apihost") 
  const siteHost=dict.get("host") 
  const replaceReportUri=dict.get("report-uri-host")


  // Get the request from the client.
  const req = event.request
  const ottoCSPUrl=getCSPUrl(req.url, ottoHost, ottoKey)
  req.headers.set("Host", siteHost)
  const apiReq = new Request(ottoCSPUrl);
  

  const apiRes = await fetch(apiReq, { backend: "origin_1"} );


  const beresp = await fetch(req, {
    backend: "origin_0"
  })

  if(apiRes.status == "200"){
    const csp = await apiRes.json()
    let policy = csp.policy;
    if(replaceReportUri){
      policy = csp.policy.replace("report-uri https://analyticssystems.net", `report-uri https://${replaceReportUri}`);
    }
    beresp.headers.set("content-security-policy", policy);
  }


  // Send our response back to the client.
  //return beresp;
  return beresp;
};

addEventListener("fetch", event => event.respondWith(handler(event)));

function getCSPUrl(url, ottoHost, ottoKey){
  const revUrl = getRevsionIdURL(url, ottoHost, ottoKey)
  if(revUrl == null){
    return `https://${ottoHost}/csp/${ottoKey}.json`
  }else{
    return revUrl
  }
}

function getRevsionIdURL(url, ottoHost, ottoKey){
  const revId = getRevisionId(url)
  if(revId){
    return `https://${ottoHost}/csp/${ottoKey}/${revId}.json`
  }else{
    return null
  }
}

function getRevisionId(url){
  try{
    if(url.indexOf("?") != -1 && url.indexOf("otto_revision_id") != -1){
      const qs = url.split("?")
      if(qs.length > 1){
        const params = qs[1].split("&")
        const revision = params.filter( p => p.indexOf("otto_revision_id=") != -1)
        if(revision){
          const keyValue = revision[0].split("=")
          return keyValue[1]
        }
      }
    }
  }catch(e){
    console.log(e)
  }
  return null
}

