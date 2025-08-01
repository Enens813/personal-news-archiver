import express from 'express'
import newsRoutes from './routes/news.js'
import { fetchAndStoreFeeds } from './rss/fetcher.js'

const app = express()
const PORT = 3000

app.use(express.json())
app.use('/news', newsRoutes)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
  fetchAndStoreFeeds() // First-time run
  setInterval(fetchAndStoreFeeds, 5 * 60 * 1000) // Every 5 min
})
