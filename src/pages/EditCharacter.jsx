import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function EditCharacter() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("characters")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setErrorMessage(error.message);
      } else {
        setCharacter(data);
      }

      setLoading(false);
    };

    fetchCharacter();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name")?.trim();
    const age = Number(formData.get("age"));
    const characterType = formData.get("character_type");

    if (!name || !Number.isInteger(age) || age < 1 || age > 120) {
      setErrorMessage("Please enter a valid name and age.");
      return;
    }



    const { error } = await supabase
      .from("characters")
      .update({
        name,
        age,
        character_type: characterType
      })
      .eq("id", id);

    if (error) {
      setErrorMessage(error.message);
    } else {
      navigate("/CharacterGallery");
    }
  };

  const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this character?");

        if (!confirmDelete) return;

        const { error } = await supabase
            .from("characters")
            .delete()
            .eq("id", id);
        if (error) {
            console.error("Error deleting character:", error.message);
        } else {
            console.log("Character deleted successfully!");
            navigate("/");
        }
    };

  if (loading) {
    return <p>Loading character...</p>;
  }

  if (!character) {
    return <p>{errorMessage || "Character not found."}</p>;
  }

  return (
    <div className="main-div">
        <Navbar/>

      <div className="right-side">
        <div className='home-topText'>
            <span className='heading-txt' id="characterHd-txt">Make edits for: {character.name}</span>
        </div>

        <div className="character-creation">
            <form key={id} onSubmit={handleSubmit}>
            
            <div className="form-item">
                <span className="formItem-txt" >Name</span>
                <input type="text" placeholder="Enter Name" required name="name" defaultValue={character.name}/>
            </div>

            <div className="form-item">
                <span className="formItem-txt" >Age</span>
                <input type="number" placeholder="Enter Age" min="1" max="120" required name="age" defaultValue={character.age}/>
            </div>

            <div className="form-item">
                <span className="formItem-txt">Body Style</span>
                <select name="character_type" defaultValue={character.character_type}>
                    <option value="spongebob">Spongebob</option>
                    <option value="patrick">Patrick</option>
                    <option value="squidward">Squidward</option>
                    <option value="plankton">Plankton</option>
                    <option value="sandy">Sandy</option>
                    <option value="krabs">Mr. Krabs</option>
                    <option value="pearl">Pearl</option>
                    <option value="puffs">Mrs. Puffs</option>
                    <option value="larry">Larry</option>
                </select>
            </div>

            <button type="submit" className="submit-button">Save Changes</button>
            <button className="submit-button" onClick={handleDelete}>Delete Character</button>

            {errorMessage && <p>{errorMessage}</p>}
        </form>
        </div>

        

      </div>

      
    </div>
  );
}