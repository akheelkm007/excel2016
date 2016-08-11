# Excel 2016 Web App


### Setup




##### Prerequisites

Install [bower](https://github.com/bower/bower):

    npm install -g bower

Install [polymer-cli](https://github.com/Polymer/polymer-cli):

    npm install -g polymer-cli


### Start the development server

This command serves the app at `http://localhost:8080` and provides basic URL
routing for the app:

    polymer serve


### Build

This command performs HTML, CSS, and JS minification on the application
dependencies, and generates a service-worker.js file with code to pre-cache the
dependencies based on the entrypoint and fragments specified in `polymer.json`.
The minified files are output to the `build/unbundled` folder, and are suitable
for serving from a HTTP/2+Push compatible server.

In addition the command also creates a fallback `build/bundled` folder,
generated using fragment bundling, suitable for serving from non
H2/push-compatible servers or to clients that do not support H2/Push.

    polymer build

### Test the build

This command serves the minified version of the app in an unbundled state, as it would
be served by a push-compatible server:

    polymer serve build/unbundled

This command serves the minified version of the app generated using fragment bundling:

    polymer serve build/bundled

###EDITS TO DO
<code>
 
 @bower_components/paper-header-panel/paper-header-panel.html
 
      #mainContainer::-webkit-scrollbar-track
      {
        border-radius: 10px;
      }
      #mainContainer::-webkit-scrollbar
      {
        width: 10px;
        /*width: 8px;*/
        background-color: #F5F5F5;
      }

      #mainContainer::-webkit-scrollbar-thumb
      {
        /*width: 10px;*/
        border-radius: 10px;
        background-color: #cabfbe;
        /*border-right: 2px solid rgba(0,0,0,0.00001);*/
        border-right-width: 2px;
        border-right-style: solid;
        border-right-color: white;
      }

      @media (max-width: 600px) {
        #mainContainer::-webkit-scrollbar-thumb
        {
          border-radius: 5px;
          background-color: #cabfbe;
          border-right-width: 1px;
          border-right-style: solid;
          border-right-color: white;
        }
        #mainContainer::-webkit-scrollbar
        {
          width: 5px;
          background-color: #F5F5F5;
        }
      }
</code>
