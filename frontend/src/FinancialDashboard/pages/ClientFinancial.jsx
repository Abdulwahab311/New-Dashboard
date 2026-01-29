import React, { useState } from 'react'
import Cards from '../components/dashboard/Cards'
import Analytics from "../components/dashboard/Analytic"

const FinancialDashboard = () => {
  const [timePeriod, setTimePeriod] = useState('LAST 3 MONTHS')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const timePeriods = [
    'LAST 3 MONTHS',
    'LAST 6 MONTHS',
    'LAST 12 MONTHS',
    'THIS YEAR',
    'ALL TIME'
  ]

  return (
    <>
      {/* Main Section */}
      <div className='bg-[#181C3A] w-full min-h-screen'>
        {/* Header with Time Period Selector */}
        <div className='flex justify-between items-center  '>
          <div className='relative'>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className='flex items-center gap-2  text-white px-4 py-2 rounded-lg  transition-colors'
            >
              <span className='font-semibold'>{timePeriod}</span>
              <svg 
                className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className='absolute top-full left-0 mt-2 bg-[#1E2449] rounded-lg shadow-xl min-w-[180px] z-50'>
                {timePeriods.map((period) => (
                  <button
                    key={period}
                    onClick={() => {
                      setTimePeriod(period)
                      setIsDropdownOpen(false)
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-[#252B5C] transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      timePeriod === period ? 'bg-[#252B5C] text-blue-400' : 'text-white'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Optional: Add filters or search on the right side */}
          <div className='flex items-center gap-3'>
            <button className='text-gray-400 hover:text-white transition-colors'>
              <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        <div className='mt-1.5'>
          <div className='grid grid-cols-12 gap-2'>
            {/* Cards full width */}
            <div className='col-span-12 px-1.5'>
              <Cards timePeriod={timePeriod} />
            </div>

            {/* Analytics full width but inside 3 cards */}
            <div className='col-span-12 pb-5 px-5'>
              <Analytics timePeriod={timePeriod} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FinancialDashboard