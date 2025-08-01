import express from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const router = express.Router()

// GET /news?category=bbc&seen=false&liked=true
router.get('/', async (req, res) => {
  const { category, seen, liked } = req.query

  const filters: any = {}
  if (category) filters.category = category
  if (seen !== undefined) filters.seen = seen === 'true'
  if (liked !== undefined) filters.liked = liked === 'true'

  const news = await prisma.newsItem.findMany({
    where: filters,
    orderBy: { published: 'desc' },
    take: 100,
  })

  res.json(news)
})

// PUT /news/:id/seen
router.put('/:id/seen', async (req, res) => {
  const updated = await prisma.newsItem.update({
    where: { id: Number(req.params.id) },
    data: { seen: true },
  })
  res.json(updated)
})

// PUT /news/:id/like
router.put('/:id/like', async (req, res) => {
  const updated = await prisma.newsItem.update({
    where: { id: Number(req.params.id) },
    data: { liked: true },
  })
  res.json(updated)
})

export default router
