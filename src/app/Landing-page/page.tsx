export default function Home() {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {/* Hero Section */}
        <section className="text-center px-6 py-20">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            Welcome to <span className="text-blue-600">Your Brand</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Build modern web experiences with speed and efficiency.
          </p>
          <a href="#features">
            <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
              Get Started
            </button>
          </a>
        </section>
  
        {/* Features Section */}
        <section id="features" className="max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 text-center py-10">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">🚀 Fast Performance</h2>
            <p className="text-gray-600 mt-2">Optimized for speed and efficiency.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">💡 Easy to Use</h2>
            <p className="text-gray-600 mt-2">Simple and intuitive user experience.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">🔒 Secure</h2>
            <p className="text-gray-600 mt-2">Built with best security practices.</p>
          </div>
        </section>
  
        {/* Call to Action */}
        <section className="py-10 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Start your journey today!</h2>
          <button className="mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition">
            Sign Up
          </button>
        </section>
      </main>
    );
  }
  