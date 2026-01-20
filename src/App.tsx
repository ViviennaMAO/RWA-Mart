import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Market } from './pages/Market'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-text-primary p-4 max-w-md mx-auto relative overflow-hidden">
        {/* Background Gradients */}
        <div className="fixed -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="fixed top-40 -right-20 w-64 h-64 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/market" element={<Market />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
