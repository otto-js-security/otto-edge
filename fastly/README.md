### Steps to get running
- Install fastly CLI tool `https://github.com/fastly/cli/releases`
- Initialize fastly `fastly profile create`
- Enter Your Api token. You need to log into fastly and create a personal api token in your user settings. 
-

## Config the App
- Update the config.json file add the UUID from the ottobox script into the `key` parameter
- Set the `host` parameter to the some host that compute@edge will be in front of
- Do not change the `apiHost` parameter.
Example: if your On page Installation script is `<script src="//d3plfjw9uod7ab.cloudfront.net/XXX-XX-XX-XX-XXXXA.js" type="text/javascript"></script>`; Paste `XXX-XX-XX-XXXXX` into the `key` parameter

### To run locally
-   `fastly compute serve`

### Push to fastly
- `fastly compute publish -s <<Your Service Id>>`

