import prisma from "./prisma-client.js";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await prisma.link.findMany({});
    res.status(200).json({ links: result });
  } catch (e) {
    res.status(500).send({ type: e.constructor.name, message: e.toString() });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const link = await prisma.link.findUnique({
      where: { id: Number(id) },
    });
    if (link === null) return res.status(404).json({error: `Forum with ID ${id} not found`})
    res.status(200).json(link);
  } catch (e) {
    res.status(500).send({ type: e.constructor.name, message: e.toString() });
  }
});

export default router;
