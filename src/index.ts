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
                    "fileContent": {
                        displayName: "File Content",
                        type: "string"
                    },
                    "line": {
                        displayName: "Line",
                        type: "string"
                    }
                },
                methods: {
                    "getLines": {
                        displayName: "Get Lines",
                        type: "read",
                        inputs: [ "fileContent" ],
                        outputs: [ "line" ]
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
            try {
                const buff = Buffer.from(properties["fileContent"].toString(), 'base64');
                const str = buff.toString('utf-8');
                postResult({
                    "line": str
                });
                resolve();
            } catch (e) {
                reject(e);
            }        
    });
}