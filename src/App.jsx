import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import Home from './pages/Home'
import CharacterCreation from './pages/CharacterCreation'
import CharacterGallery from './pages/CharacterGallery'
import EditCharacter from './pages/EditCharacter'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />}/>
        <Route path='/CharacterCreation' element={<CharacterCreation />} />
        <Route path='/CharacterGallery' element={<CharacterGallery />} />
        <Route path='/EditCharacter/:id' element={<EditCharacter />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
