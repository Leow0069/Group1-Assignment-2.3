const appCode = require("./index");
afterEach(()=>{
    jest.clearAllMocks();
})

// Mock closeConnections() to test processRequest()
describe("processRequest function", () => {
    it("should throw error as we mock closeConnections() to return false", () => {
        appCode.closeConnections = jest.fn().mockReturnValue(false);
        const mockFn = jest.fn(requestfn => console.log(requestfn));
        expect(() => {
            appCode.processRequest(mockFn)
        }).toThrow("Internal server error")
    })
}) 