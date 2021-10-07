import {EntryPoints} from "N/types";
import * as serverWidget from 'N/ui/serverWidget';
import * as redirect from "N/redirect";
import * as http from "N/http";
import  * as email from "N/email";

function onRequest(context: EntryPoints.Suitelet.onRequestContext){
    if(context.request.method === 'GET'){
        let form = serverWidget.createForm({
            title: 'Select Courses to Sync'
        });
        email.send({
            author: 123,
            body:'hello',
            recipients: [],
            subject:'hi'
        });

        form.clientScriptModulePath = '../some.js';

        var states = form.addField({
            id: 'custpage_statesfield',
            type: serverWidget.FieldType.SELECT,
            label: 'Sync courses located in',
            source: 'customlist_golfschmoozer_states'
        });
        states.isMandatory = true;
        states.defaultValue = 'United States';

        var stateName = form.addField({
            id: 'custpage_state_name_field',
            type: serverWidget.FieldType.TEXT,
            label: 'State name'
        });
        //stateName.updateDisplayType({displayType: serverWidget.FieldDisplayType.HIDDEN});
        form.addSubmitButton({
            label: 'Sync'
        });

        context.response.writePage(form);
    } else{
        var gwResponse = http.get({
            url:'http://golfworldapi.com/api/bv1/Clubs'
        });
        //console.log(gwResponse.body)
        redirect.toSavedSearchResult({
            id : 123
        });
    }
}

export { onRequest};
