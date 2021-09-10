/*
    In a typical API Application, there are usually request handling layer and service processing layer (followed by database layer which is omitted here).
    The functions defined in this JS file are simulation of those layers.

    handleRequest() should always handle request related matter, such as whether a request is valid.
    processRequest() should always handle process related matter, such as business logics and the data to return.

    Think about these questions:
    1. What do I test against for the respective function? (Defining testing objective)
    2. Do I have to mock any function or module?
    3. If the scope of my testing objective is too big, how can I break it down to smaller units?

    Read the comments of each function to understand the purpose of the function.
*/

// Takes two arguments - a function to be invoked later on if username is not undefined.
// After ensuring username is given, invoke processRequest() 
function handleRequest(requestFn, username){
    if(!username){
        throw new Error("username is undefined");
    }

    processRequest(requestFn); 
}

// In a typical request processing, there will be integration points where connections are opened. 
// We will call closeConnections() everytime the given process is ended.
// Sometimes connections are unable to close due to various reasons. In this case, we won't go into the details of the reason.
function processRequest(requestFn){
    requestFn();
    if(closeConnections())
        return "ok";
    else
        throw new Error("Internal server error");
}

// This function currently always return true. You may consider mocking this function to return false to simulate a close connection error scenario.
function closeConnections(){
    return true;
}
