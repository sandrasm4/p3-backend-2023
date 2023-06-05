import { Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
      const result = await prisma.menu.findMany({});
      res.status(200).json({ menus: result, ok: true });
    } catch (e) {
      res.status(500).json({
        type: e.constructor.name,
        message: e.toString(),
      });
    }
  });

  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const menu = await prisma.menu.findUnique({
        where: { id: Number(id) },
      });
      if (menu === null) {
        return res.status(404).json({
          error: `Menu with ID ${id} not found`,
        });
      }
      res.status(200).json(menu);
    } catch (e) {
      res.status(500).json({
        type: e.constructor.name,
        message: e.toString(),
      });
    }
  });

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