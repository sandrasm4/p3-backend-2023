import { Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";

const router = Router();

  router.get("/", async (req, res) => {
    const result = await prisma.menu.findMany({});
    res.status(200).json({ menus: result, ok: true });
  });


  router.get( "/:id", errorChecked(async (req, res) => {
    const { id } = req.params;
    const menu = await prisma.menu.findUniqueOrThrow({
      where: { id: Number(id) },
    });
      res.status(200).json(menu);
    })
  );

  router.post("/", errorChecked(async (req, res) => {
      const newMenu = await prisma.menu.create({ data: req.body });
      res.status(200).json({ newMenu, ok: true });
    })
  );
  
  router.delete("/:id", errorChecked(async (req, res) => {
    const { id } = req.params;
    const deletedMenu = await prisma.menu.delete({
        where: { id: Number(id) },
      });
      res.status(200).json(deletedMenu);
    })
  );

  router.put( "/:id", errorChecked(async (req, res) => {
    const { id } = req.params;
    const updatedMenu = await prisma.menu.update({
        where: { id: Number(id) },
        data: req.body,
      });
      res.status(200).json(updatedMenu);
    })
  );

export default router;