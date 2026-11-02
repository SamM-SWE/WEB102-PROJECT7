import { useNavigate } from 'react-router-dom'


export default function Navbar() {

    const navigate = useNavigate();

  return (
    <div className='navbar'>
        <div className='button-container'>
            <button className='menu-button' onClick={() => navigate("/")}>Home</button>
            <button className='menu-button' onClick={() => navigate("/CharacterCreation")}>New Character</button>
            <button className='menu-button' onClick={() => navigate("/CharacterGallery")}>Character Gallery</button>
        </div>
    </div>
  )
}
