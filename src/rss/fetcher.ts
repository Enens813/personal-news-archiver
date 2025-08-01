import Parser from 'rss-parser'
import { PrismaClient } from '@prisma/client'
import { Prisma } from '@prisma/client'
const prisma = new PrismaClient()
const parser = new Parser()

const rssFeeds: { url: string; category: string }[] = [
  { url: "https://feeds.bbci.co.uk/news/rss.xml", category: "bbc-general" },
  { url: "https://feeds.bbci.co.uk/news/world/rss.xml", category: "bbc-world" },
  { url: "https://feeds.bbci.co.uk/news/business/rss.xml", category: "bbc-business" },
  { url: "https://feeds.bbci.co.uk/news/politics/rss.xml", category: "bbc-politics" },
  { url: "https://feeds.bbci.co.uk/news/science_and_environment/rss.xml", category: "bbc-science" },
  { url: "https://feeds.bbci.co.uk/news/technology/rss.xml", category: "bbc-tech" },
  { url: "https://www.aljazeera.com/xml/rss/all.xml", category: "aljazeera-all" },
  { url: "https://www.yna.co.kr/rss/news.xml", category: "yonhap-all" },
  { url: "https://www.yna.co.kr/rss/politics.xml", category: "yonhap-politics" },
  { url: "https://www.yna.co.kr/rss/economy.xml", category: "yonhap-economy" },
  { url: "https://www.yna.co.kr/rss/market.xml", category: "yonhap-market" },
  { url: "https://www.yna.co.kr/rss/industry.xml", category: "yonhap-industry" },
  { url: "https://www.yna.co.kr/rss/society.xml", category: "yonhap-society" },
  { url: "https://www.yna.co.kr/rss/local.xml", category: "yonhap-local" },
  { url: "https://www.mk.co.kr/rss/30100041/", category: "mk-economy" },
  { url: "https://www.mk.co.kr/rss/50100032/", category: "mk-business" },
  { url: "https://www.mk.co.kr/rss/50200011/", category: "mk-stock" },
  { url: "https://www.mk.co.kr/rss/50300009/", category: "mk-realestate" },
];

export async function fetchAndStoreFeeds() {
  for (const feed of rssFeeds) {
    const parsed = await parser.parseURL(feed.url)
    for (const item of parsed.items) {
      try {
        await prisma.newsItem.create({
          data: {
            title: item.title ?? '',
            link: item.link ?? '',
            published: new Date(item.pubDate ?? new Date()),
            summary: item.contentSnippet ?? '',
            category: feed.category,
          },
        })
        console.log(`[+] Saved: ${item.title}`)
      } catch (err: unknown) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          if (err.code !== 'P2002') {
          console.error('[!] Insert error:', err)
          }
        } else {        // P2002는 Prisma의 고유 오류로, Unique Constraint Violation 오류
          console.error('[!] Unknown error:', err)
        }
      }
    }
  }
}
