"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const proto_loader_1 = require("@grpc/proto-loader");
const grpc_js_1 = require("@grpc/grpc-js");
const packageDefinition = (0, proto_loader_1.loadSync)("message.proto");
const protoDescriptor = (0, grpc_js_1.loadPackageDefinition)(packageDefinition);
const persons = [];
const handler = {
    AddPerson: (call, callback) => {
        const name = call.request.name;
        const age = call.request.age;
        const person = { name, age };
        persons.push(person);
        callback(null, person);
    },
    GetPersonByName: (call, callback) => {
        const name = call.request.name;
        const person = persons.find((p) => p.name === name);
        callback(null, person);
    }
};
const server = new grpc_js_1.Server();
server.addService((protoDescriptor.AddressBookService).service, handler);
server.bindAsync('0.0.0.0:50051', grpc_js_1.ServerCredentials.createInsecure(), () => {
    server.start();
});
