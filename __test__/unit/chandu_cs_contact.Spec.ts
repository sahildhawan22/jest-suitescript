import { saveRecord } from '../../src/TypeScript/chandu_cs_contact';
import { ClientResponse} from "@hitc/netsuite-types/N/https";
import * as https from "@hitc/netsuite-types/N/https";
import {currentRecord} from "@hitc/netsuite-types/N";

var result: ClientResponse = {
    headers: '',
    code: 200,
    body: JSON.stringify({result: 'hello', status: 'OK'})
}
jest.mock('N/https',()=>{
    return {
        get : jest.fn().mockImplementation (()=> result)
    }
});


beforeEach(() => {
    jest.clearAllMocks();
});

describe('client test', () => {
    let context:any = null;
    let currentRecord;
    beforeAll(()=>{
        currentRecord = {
            getValue : jest.fn(),
            getText: jest.fn(),
            setValue: jest.fn()
        };
        context = {
            currentRecord: currentRecord
        };
    })

    it('should have SaveRecord entry point', ()=>{
        expect(saveRecord).toBeDefined();
    } );

    it('should return false in case response from server is not OK', () => {
        result.body = JSON.stringify({result: 'hello', status: 'NOK'});
        var test = saveRecord(context);
        expect(test).not.toBeTruthy();
    })

    it('should return true in case response from server is not OK', () => {
        result.body = JSON.stringify({results: [{geometry : {
                    location:{
                        lat: 10,
                        lng : 20
                    }
                }, }], status: 'OK'});

        var test = saveRecord(context);

        expect(test).toBeTruthy();
    });

    it('should have called current record setValue twice', ()=>{
        var test = saveRecord(context);
        expect(context.currentRecord.getValue).toHaveBeenCalledTimes(3);
        expect(context.currentRecord.setValue).toHaveBeenCalledTimes(2);
    })

    it('should have called https get method', ()=>{
        var test = saveRecord(context);
        expect(https.get).toHaveBeenCalledTimes(1);
    });


})

