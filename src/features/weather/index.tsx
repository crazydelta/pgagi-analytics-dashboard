import { useEffect, useState } from 'react'

const API_KEY = '85635a1c9b474bb382a72344251605' // Your WeatherAPI key

export default function WeatherFeature() {
  const [city, setCity] = useState('London')
  const [weather, setWeather] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchWeather = async (city: string) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      )
      if (!res.ok) throw new Error('City not found')
      const data = await res.json()
      setWeather(data)
    } catch (err: any) {
      setError(err.message || 'Error fetching weather')
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeather(city)
  }, [])

  const handleSearch = () => {
    if (city.trim() !== '') fetchWeather(city)
  }

  return (
    <section className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow space-y-4">
      <h2 className="text-2xl font-bold text-black dark:text-white">Weather</h2>

      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-2 border rounded dark:bg-gray-700 dark:text-white w-full"
          placeholder="Enter city name"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-gray-500 dark:text-gray-400">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {weather && (
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold text-black dark:text-white">
              {weather.location.name}, {weather.location.country}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {weather.current.condition.text}
            </p>
            <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              {weather.current.temp_c}°C
            </p>
          </div>
          <img src={weather.current.condition.icon} alt="Weather Icon" className="w-20 h-20" />
        </div>
      )}
    </section>
  )
}
