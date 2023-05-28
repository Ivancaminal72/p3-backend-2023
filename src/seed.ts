import { PrismaClient } from "@prisma/client";
import { loadCsvObject } from "./parse_csv.js";
import * as fs from 'fs';

const prisma = new PrismaClient();

await prisma.link.deleteMany({});
await prisma.system.deleteMany({});
await prisma.group.deleteMany({});

const data_inputs = fs.readFileSync('./data/inputs.csv', {encoding:'utf8', flag:'r'});
const data_outputs = fs.readFileSync('./data/outputs.csv', {encoding:'utf8', flag:'r'});

const inputs = loadCsvObject(data_inputs);
const outputs = loadCsvObject(data_outputs);

const systems_all = new Set([...[...new Set(outputs.map(item => item.system))],...[...new Set(inputs.map(item => item.system))]]);
const groups_all = new Set([...[...new Set(outputs.map(item => item.group))],...[...new Set(inputs.map(item => item.group))]]);

const systems = Array.from(systems_all).filter(n => n).sort();
const groups = Array.from(groups_all).filter(n => n).sort();

for (let system of systems){
    const system_db = await prisma.system.create({
        data: {
            system: system
        }
    })
}

console.log(`Loaded ${systems.length} systems. OK!`)

for (let group of groups){
    const system_db = await prisma.group.create({
        data: {
            group: group
        }
    })
}

console.log(`Loaded ${groups.length} groups. OK!`)

for (let input of inputs){
    if(input.link == undefined || input.link == '') continue;

    const system_ref = await prisma.system.findFirst({
        where: {system: input.system}
    })
    const group_ref = await prisma.group.findFirst({
        where: {group: input.group}
    })
    
    const link_db = await prisma.link.create({
        data: {
            link: input.link,
            new_in: input.new === '' ? null : parseInt(input.new) ,
            old_in: input.old === '' ? null : parseInt(input.old),
            systemId: system_ref.id,
            groupId: group_ref.id
        }
    })
}

console.log(`Loaded ${inputs.length-1} matrix inputs. OK!`)

for (let output of outputs){
    if(output.link == undefined || output.link == '') continue;

    const system_ref = await prisma.system.findFirst({
        where: {system: output.system}
    })
    const group_ref = await prisma.group.findFirst({
        where: {group: output.group}
    })

    const link_db = await prisma.link.create({
        data: {
            link: output.link,
            new_out: output.new === '' ? null : parseInt(output.new),
            old_out: output.old === '' ? null : parseInt(output.old),
            systemId: system_ref.id,
            groupId: group_ref.id
        }
    }) 
}

console.log(`Loaded ${outputs.length-1} matrix outputs. OK!`)