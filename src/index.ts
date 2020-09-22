import '@k2oss/k2-broker-core';

metadata = {
    systemName: "csvreader",
    displayName: "CSV Reader Broker",
    description: "A broker that reads a CSV file and returns each line as a list."
};

ondescribe = async function({configuration}): Promise<void> {
    postSchema({
        objects: {
            "lines": {
                displayName: "Lines",
                description: "Describes all lines in a CSV file",
                properties: {
                    "file": {
                        displayName: "File",
                        type: "string"
                    },
                    "line": {
                        displayName: "Line",
                        type: "string"
                    },
                    "output": {
                        displayName: "Output File",
                        type: "attachment"
                    },
                },
                methods: {
                    "getLines": {
                        displayName: "Get Lines",
                        type: "read",
                        inputs: [ "file" ],
                        outputs: [ "line", "output" ]
                    }
                }
            }
        }
    });
}

onexecute = async function({objectName, methodName, parameters, properties, configuration, schema}): Promise<void> {
    switch (objectName)
    {
        case "lines": await onexecuteSplit(methodName, properties); break;
        default: throw new Error("The object " + objectName + " is not supported.");
    }
}

async function onexecuteSplit(methodName: string, properties: SingleRecord): Promise<void> {
    switch (methodName)
    {
        case "getLines": await onexecuteLinesSplit(properties); break;
        default: throw new Error("The method " + methodName + " is not supported.");
    }
}

function onexecuteLinesSplit(properties: SingleRecord): Promise<void> {
    return new Promise<void>((resolve, reject) =>
    {
        // var xhr = new XMLHttpRequest();
        // xhr.onreadystatechange = function() {
            try {
                postResult({
                    "line": properties["file"],
                    "output": properties["file"]
                });
                resolve();
            } catch (e) {
                reject(e);
            }        
        // if(typeof properties["id"] !== "number") throw new Error("properties[\"id\"] is not of type number");
        // xhr.open("GET", 'https://jsonplaceholder.typicode.com/todos/' + encodeURIComponent(properties["id"]));
        // xhr.setRequestHeader('test', 'test value');
        // xhr.send();
    });
}