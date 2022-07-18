### Steps to get running
- Install fastly CLI tool `https://github.com/fastly/cli/releases`
- Initialize fastly `fastly profile create`
- Enter Your Api token. You need to log into fastly and create a personal api token in your user settings. 

### To run locally
-   `fastly compute serve`

### Push to fastly
- `fastly compute publish -s <<Your Service Id>>`

