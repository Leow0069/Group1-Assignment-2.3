const appCode = require("./index");
afterEach(()=>{
    jest.clearAllMocks();
})

const mockFn = jest.fn();

// Mock closeConnections() to test processRequest()
describe("processRequest function", () => {

    it("should throw error when mocking closeConnections() to return false", () => {
        appCode.closeConnections = jest.fn().mockReturnValue(false);
        expect(() => {
            appCode.processRequest(mockFn)
        }).toThrow("Internal server error");
        expect(appCode.closeConnections).toHaveBeenCalled(); 
    })

    it("should run as intended when mocking closeConnections() to return true", () => {
        appCode.closeConnections = jest.fn().mockReturnValue(true);
        expect(appCode.processRequest(mockFn)).toBe("ok");
        expect(appCode.closeConnections).toHaveBeenCalled();    
    })

/* Alternative using jest.spyOn() which also works:
    it("should run as intended when mocking closeConnections() to return true", () => {
        appCode.closeConnections = jest.fn().mockReturnValue(true);
        const spy = jest.spyOn(appCode, 'closeConnections');
        const process = appCode.processRequest(mockFn);
        expect(spy).toHaveBeenCalled();
        expect(process).toBe("ok");
        spy.mockRestore();      
    })
*/
}) 

// Mock processRequest() to test handleRequest()
describe("handleRequest function", () => {

    it("should throw error if username is undefined", () => {
        appCode.processRequest = jest.fn().mockReturnValue("ok");
        expect(() => {
            appCode.handleRequest(mockFn, undefined);
        }).toThrow("username is undefined");
        expect(appCode.processRequest).not.toHaveBeenCalled();
    })

    it("should run as intended if username is defined", () => {
        appCode.processRequest = jest.fn().mockReturnValue("ok");
        expect(appCode.handleRequest(mockFn, !undefined)).toBe("ok");
        expect(appCode.processRequest).toHaveBeenCalled();
    })

/* Alternative using jest.spyOn() which also works:
    it("should run as intended if username is defined", () => {
    appCode.processRequest = jest.fn().mockReturnValue("ok");
    const spy = jest.spyOn(appCode, 'processRequest');
    const handle = appCode.handleRequest(mockFn, !undefined);
    expect(spy).toHaveBeenCalled();
    expect(handle).toBe("ok");
    spy.mockRestore();
    })
*/
})