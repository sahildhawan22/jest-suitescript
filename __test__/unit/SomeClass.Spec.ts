//https://stackoverflow.com/questions/32805559/typescript-es6-import-module-file-is-not-a-module-error
import SomeClass from "../../src/TypeScript/SomeClass";

jest.mock("SomeClass");
const mockedSomeClass = SomeClass as jest.Mocked<typeof SomeClass>;
const mMock = jest.fn();
//@ts-ignore
mockedSomeClass.mockImplementation(() => {
    return {m: mMock}
});

const some = new SomeClass();
some.m("a", "b");
console.log("Calls to m:", mMock.mock.calls);