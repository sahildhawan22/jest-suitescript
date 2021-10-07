import {onRequest } from "../../src/TypeScript/sync_courses";
import * as redirect from "@hitc/netsuite-types/N/redirect";
import * as http from "@hitc/netsuite-types/N/http";
import * as email from "@hitc/netsuite-types/N/email";

jest.mock('N/ui/serverWidget',()=>{
    return{
        createForm: jest.fn().mockImplementation(()=>{
            class Form{
                fields: any =[];
                clientScriptModulePath : string = '';
                addField(){
                    this.fields.push({
                        defaultValue: ''
                    });
                    return this.fields[0];
                };
                addSubmitButton(){};
            }
            return new Form();
        }),
        FieldType: {
            SELECT: 'select',
            TEXT: 'text'
        },
        FieldDisplayType: {
            HIDDEN: 'hidden'
        }
    }
})

jest.mock('N/redirect', ()=>{
    return{
        toSavedSearchResult : jest.fn()
    }
});
jest.mock('N/http', ()=>{
    return{
        get: jest.fn()
    }
});

jest.mock('N/email', ()=>{
    return{
        send: jest.fn()
    }
})

describe('sync courses suitelet', ()=>{
    let context: any = null;

    beforeAll(()=> {
        context = {
            request:{
                method : 'GET'
            },
            response: {
                writePage: jest.fn()
            }
        }
    })
    it('should have on Request Method defined', ()=>{
        expect(onRequest).toBeDefined();
    });

    it('should create form when request method is GET',()=>{
        onRequest(context);
        expect(context.response.writePage).toHaveBeenCalled();
    });

    it('should redirect to saved search Result when request method is POST', ()=>{
        jest.spyOn(redirect, 'toSavedSearchResult');
        jest.spyOn(http, 'get').mockReturnValue({
            body: '12345',
            code: 200,
            headers:''
        })
        context.request.method = 'POST';
        onRequest(context);
        expect(redirect.toSavedSearchResult).toHaveBeenCalledWith({id:123});
    });

    it('should add form with two fields', ()=>{
        context.request.method = 'GET';
        onRequest(context);
        expect(context.response.writePage).toHaveBeenCalledWith({"clientScriptModulePath": "../some.js", "fields": [{"defaultValue": "United States", "isMandatory": true}, {"defaultValue": ""}]});
    })

    it('should have called email send', ()=>{
        jest.spyOn(email, 'send');
        onRequest(context);
        expect(email.send).toHaveBeenCalledWith('chandu');
    })

});
