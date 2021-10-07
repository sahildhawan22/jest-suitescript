import defaultExport, {foo, bar} from "../../src/TypeScript/partial_mock";

jest.mock("../../src/TypeScript/partial_mock", () => {
    const originalModule = jest.requireActual("../../src/TypeScript/partial_mock");

    return {
        __esModule: true,
        ...originalModule,
        default: jest.fn(() => 'mocked baz'),
        foo: 'mocked foo',
    };
});

test("Should do a partial mock", () => {
    const defaultExportResult = defaultExport();
    expect(defaultExportResult).toBe("mocked baz");
    expect(defaultExport).toHaveBeenCalled();

    expect(foo).toBe("mocked foo");
    expect(bar()).toBe("bar");
})