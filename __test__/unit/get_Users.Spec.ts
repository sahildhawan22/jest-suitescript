/* https://jestjs.io/docs/mock-functions#mocking-modules  */

import axios from 'axios';
import Users from '../../src/TypeScript/get_Users';

let mockedData = {data: [{name: "Bob"}] };
jest.mock('axios', () => {
    return {
        get: jest.fn().mockImplementation(() => Promise.resolve(mockedData))
    }
});

/* jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>; */

test('should fetch users', () => {
  const users = [{name: 'Bob'}];
  
  //const resp = {data: users};
  //https://stackoverflow.com/questions/51495473/typescript-and-jest-avoiding-type-errors-on-mocked-functions
  //mockedAxios.get.mockResolvedValue(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return Users.all().then(data => expect(data).toEqual(users));
});


//=======================================================================//
//unrelated but important
//===========================================================================//

//mockFn.mockResolvedValue(value)
//The above is syntactic sugar function for:
jest.fn().mockImplementation(() => Promise.resolve("<<value>>"));
//In turn above line is syntactic sugar for:
jest.fn(() => Promise.resolve("<<value>>"))

/* 
ab tak yeh samajh aaya... jest.mock is for mocking module jaise N/https.
Phir N/https ka jaise hai get function toh usko mock karenge hum jest.fn() se
*/