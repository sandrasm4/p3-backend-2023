import { PrismaClient } from "@prisma/client";

export default { };

const prisma = new PrismaClient();

const n1 = await prisma.nevera.create({ 
    data: { id: 54}
});
console.log(`Create nevera with id ${n1.id}`);

const m1 = await prisma.menu.create({ 
    data: {semana: 34}
});
console.log(`Create menu for week W${m1.semana}`);

const p1 = await prisma.plato.create({ 
    data: { nombre: "Pollo a la cerveza", menuId: m1.id, fecha: "2024-01-01T00:00:00.000Z"},
});

const i1 = await prisma.ingrediente.create({ 
    data: { neveraId: n1.id, fechaCaducidad: "2024-01-01T00:00:00.000Z", nombre: "Guisantes", cantidadEnNevera: 2},
});
console.log(`Create ingredient ${i1.nombre} with id ${i1.id}`);




