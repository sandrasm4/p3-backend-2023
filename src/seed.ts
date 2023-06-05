import { PrismaClient } from "@prisma/client";

export default { };

const prisma = new PrismaClient();

const n1 = await prisma.nevera.create({ 
    data: { id: 2}
});
console.log(`Create nevera with id ${n1.id}`);



const i1 = await prisma.ingrediente.create({ 
    data: { neveraId: n1.id, fechaCaducidad: "1970-01-01T00:00:00.000Z", nombre: "Zanahoria", cantidadEnNevera: 3},
});
console.log(`Create ingredient ${i1.nombre} with id ${i1.id}`);

