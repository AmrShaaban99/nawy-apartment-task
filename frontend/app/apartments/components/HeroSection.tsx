import React from 'react'

const HeroSection = () => {
  return (
      <div className="relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-80 h-80 bg-gradient-to-br from-rose-200/30 to-amber-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-40 left-20 w-60 h-60 bg-gradient-to-br from-stone-200/40 to-rose-200/40 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-1/3 w-40 h-40 bg-gradient-to-br from-amber-200/30 to-stone-200/30 rounded-full blur-xl"></div>
        </div>

        <div className="relative bg-gradient-to-br from-stone-800 via-stone-700 to-stone-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
                  MODERN{' '}
                  <span className="block font-extrabold bg-gradient-to-r from-rose-400 via-amber-300 to-amber-400 bg-clip-text text-transparent animate-gradient-x">
                  APARTMENT
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-stone-300 font-light leading-relaxed">
                  Beautiful designs
                </p>
              </div>
              
              <div className="relative">
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default HeroSection