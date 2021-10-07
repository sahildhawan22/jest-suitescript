import { sum } from "../../src/TypeScript/calculator";

test("Should sum numbers correctly", () => {
    expect(sum(1,2,3)).toBe(6);
});

//=======================================================================//
const filterFn = jest.fn();
filterFn.mockReturnValueOnce(10).mockReturnValueOnce(100);
const result = [11,12].map(num => filterFn(num));
console.log(result);

let fn = (num) => num === 11 ? true : false;
//console.log([11,12].filter(num => fn(num)))
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