import { useEffect, useState } from 'react'

const CATEGORIES = [
  'general',
  'business',
  'technology',
  'sports',
  'health',
  'science',
  'entertainment',
]

export default function NewsFeature() {
  const [category, setCategory] = useState('technology')
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchNews = async (category: string) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/newsapi?q=${category}`)
      if (!res.ok) throw new Error('Failed to fetch news')
      const data = await res.json()
      setNews(data.articles || [])
    } catch (err: any) {
      setError(err.message || 'Error loading news')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews(category)
  }, [category])

  return (
    <section className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-black dark:text-white">News</h2>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded dark:bg-gray-700 dark:text-white"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="text-gray-500 dark:text-gray-400">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-4 md:grid-cols-2">
        {news.map((article: any, index: number) => (
          <a
            key={index}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 border rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <h3 className="text-lg font-semibold text-black dark:text-white">
              {article.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {article.source?.name} – {new Date(article.publishedAt).toLocaleDateString()}
            </p>
            <p className="mt-2 text-gray-800 dark:text-gray-300 line-clamp-3">{article.description}</p>
          </a>
        ))}
      </div>
    </section>
  )
}
