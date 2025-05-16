import { useState } from 'react'
import { useGetQuoteBySymbolQuery } from '@services/financeApi'

export default function FinanceFeature() {
  const [symbol, setSymbol] = useState('AAPL')
  const { data, error, isLoading } = useGetQuoteBySymbolQuery(symbol)

  return (
    <section className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-black dark:text-white">Finance</h2>
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="Enter stock symbol (e.g. AAPL)"
          className="p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
      </div>

      {isLoading && <p className="text-gray-600 dark:text-gray-400">Loading stock data...</p>}
      {error && <p className="text-red-600 dark:text-red-400">Failed to fetch data.</p>}

      {data && (
        <div className="grid grid-cols-2 gap-4 text-black dark:text-white">
          <div className="p-4 rounded bg-gray-100 dark:bg-gray-700">
            <p className="font-semibold">Current Price</p>
            <p className="text-2xl font-bold">${data.c}</p>
          </div>
          <div className="p-4 rounded bg-gray-100 dark:bg-gray-700">
            <p className="font-semibold">High Today</p>
            <p className="text-xl">${data.h}</p>
          </div>
          <div className="p-4 rounded bg-gray-100 dark:bg-gray-700">
            <p className="font-semibold">Low Today</p>
            <p className="text-xl">${data.l}</p>
          </div>
          <div className="p-4 rounded bg-gray-100 dark:bg-gray-700">
            <p className="font-semibold">Open Price</p>
            <p className="text-xl">${data.o}</p>
          </div>
          <div className="p-4 rounded bg-gray-100 dark:bg-gray-700 col-span-2">
            <p className="font-semibold">Previous Close</p>
            <p className="text-xl">${data.pc}</p>
            <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
              Updated at: {new Date(data.t * 1000).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
