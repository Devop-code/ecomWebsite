import { Route, BrowserRouter as Router,Routes } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import { ProductPage } from "./components/ProductPage"
import { MainContent } from "./components/MainContent"
import { TopSeller } from "./components/TopSeller"
import { PopularBlog } from "./components/PopularBlog"
export default function App(){
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          <Sidebar/>
          <div className="flex-1 flex">
            <div className="flex-1 min-w-0">
              <Routes>
                <Route path="/" element={<MainContent/>} />
                <Route path="/product/:id" element={<ProductPage/>}/>
              </Routes>
            </div>
            <div className="hidden xl:block w-[320px] p-6 space-y-6">
              <TopSeller/>
              <PopularBlog/>
            </div>
          </div>
        </div>
      </div>
    </Router>
  )
}
