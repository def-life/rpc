import { loadSync } from "@grpc/proto-loader"
import { Server, ServerCredentials, ServiceClientConstructor, loadPackageDefinition } from "@grpc/grpc-js"
import { ProtoGrpcType } from "./proto/message";
import { AddressBookServiceHandlers } from "./proto/AddressBookService";


const packageDefinition = loadSync("message.proto")
const protoDescriptor = (loadPackageDefinition(packageDefinition) as unknown) as ProtoGrpcType;

const persons: any[] = []

const handler: AddressBookServiceHandlers = {
    AddPerson: (call, callback) => {
        const name = call.request.name;
        const age = call.request.age;
        const person = { name, age }
        persons.push(person)
        callback(null, person)
    },
    GetPersonByName: (call, callback) => {
        const name = call.request.name;
        const person = persons.find((p) => p.name === name)
        callback(null, person)
    }
}






const server = new Server();
server.addService(protoDescriptor.AddressBookService.service, handler)
server.bindAsync('0.0.0.0:50051', ServerCredentials.createInsecure(), () => {
    server.start();
});