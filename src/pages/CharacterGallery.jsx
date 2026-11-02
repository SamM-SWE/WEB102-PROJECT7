import React from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import { useEffect, useState } from 'react';
import { supabase } from "../supabaseClient";

export default function CharacterGallery() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      const { data, error } = await supabase
        .from("characters")
        .select("*");

      if (error) {
        console.error(error.message);
      } else {
        setCharacters(data);
      }

      setLoading(false);
    };

    fetchCharacters();
  }, []);




  return (
    <div className='main-div'>
        <Navbar/>

        <div className='right-side'>
            <div className='home-topText'>
                    <span className='heading-txt' id="characterHd-txt">Bikini Bottom Gallery</span>
            </div>


            <div className="gallery">
              {loading ? (
                <p>Loading Characters</p>
              ) : (
                characters.map((character) => (
                  <Card
                    key={character.id}
                    id={character.id}
                    name={character.name}
                    age={character.age}
                    characterType={character.character_type}
                  />
                ))
            )}
                
            </div>
        </div>
    </div>
  )
}
