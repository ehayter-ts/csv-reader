metadata={systemName:"csvreader",displayName:"CSV Reader Broker",description:"A broker that reads a CSV file and returns each line as a list."},ondescribe=async function({configuration:e}){postSchema({objects:{lines:{displayName:"Lines",description:"Describes all lines in a CSV file",properties:{file:{displayName:"File",type:"attachment"},line:{displayName:"Line",type:"string"}},methods:{getLines:{displayName:"Get Lines",type:"read",inputs:["file"],outputs:["line"]}}}}})},onexecute=async function({objectName:e,methodName:t,parameters:i,properties:a,configuration:s,schema:n}){switch(e){case"lines":await async function(e,t){switch(e){case"getLines":await function(e){return new Promise((t,i)=>{try{postResult({line:e.file.filename,file:e.file}),t()}catch(e){i(e)}})}(t);break;default:throw new Error("The method "+e+" is not supported.")}}(t,a);break;default:throw new Error("The object "+e+" is not supported.")}};
//# sourceMappingURL=index.js.map
