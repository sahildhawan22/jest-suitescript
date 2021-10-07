/**
 * @NAPIVersion 2.0
 * @NScriptType ClientScript
 */

import {EntryPoints} from 'N/types';
import * as https from "N/https";

export let saveRecord: EntryPoints.Client.saveRecord = (context: EntryPoints.Client.saveRecordContext) : boolean => {
    let course = context.currentRecord;
    let address = course.getValue('custrecord_golfschmoozer_course_address');
    var city = course.getValue('custrecord_golfschmoozer_course_city');
    var state = course.getText('custrecord_golfschmoozer_course_state');
    var postalCode = course.getValue('custrecord_golfschmoozer_course_postal');
    var country = course.getText('custrecord_golfschmoozer_course_country');
    var fullAddress = address + ', ' + city + ', ' + state + ' ' + postalCode + ', ' + country;
    fullAddress = fullAddress.replace(/\s/g, '+');
    var response = https.get({
        url:"https://maps.googleapis.com/maps/api/geocode/json?address=" + fullAddress
    });
    var responseJson = JSON.parse(response.body);
    if (responseJson.status != 'OK') {
       // window.alert('You have entered an invalid address. Please enter a valid address.');
        return false;
    }
    var lat = responseJson.results[0].geometry.location.lat;
    var long = responseJson.results[0].geometry.location.lng;
    course.setValue({
        fieldId: 'custrecord_golfschmoozer_course_lat',
        value: lat
    });
    course.setValue({
        fieldId: 'custrecord_golfschmoozer_course_long',
        value: long
    });
    return true;
}
