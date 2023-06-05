import { PrismaClient } from "@prisma/client";

export default { };

const prisma = new PrismaClient();

const n1 = await prisma.nevera.create({ 
    data: { id: 127 }
});
console.log(`Create nevera with id ${n1.id}`);

const m1 = await prisma.menu.create({ 
    data: {semana: 39}
});
console.log(`Create menu for week W${m1.semana}`);

const p1 = await prisma.plato.create({ 
    data: { nombre: "Crema de Verduras", menuId: m1.id, fecha: "2024-01-01T00:00:00.000Z"},
});

const i1 = await prisma.ingrediente.create({ 
    data: { neveraId: n1.id, fechaCaducidad: "2024-01-01T00:00:00.000Z", nombre: "Manzana", cantidadEnNevera: 4},
});
console.log(`Create ingredient ${i1.nombre} with id ${i1.id}`);

const ip1 = await prisma.ingredientePlato.create({ 
    data: { ingredienteId: i1.id, platoId: p1.id},
});
console.log(`Create ingredientPlato with  ingredienteId ${ip1.ingredienteId} and with platoId ${ip1.platoId}`);




