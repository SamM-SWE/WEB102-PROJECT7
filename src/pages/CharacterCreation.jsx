import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Navbar

from "../components/Navbar"
export default function CharacterCreation() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [buttonActive, isButtonActive] = useState(true)
    const [relocate, setRelocate] = useState(false)

    const handleSubmit = async (e) => {
        setMessage("Creating Character")
        isButtonActive(false)
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const form = e.currentTarget;

        const name = formData.get("name").trim();
        const age = Number(formData.get("age"));
        const characterType = formData.get("character_type");

        if (!name || !Number.isInteger(age) || age < 1) {
        setMessage("Please enter a valid name and age.");
        return;
        }

        setLoading(true);
        setMessage("");

        const { error } = await supabase
        .from("characters")
        .insert({
            name: name,
            age: age,
            character_type: characterType
        });

        if (error) {
        console.error(error.message);
        setMessage("Error creating character.");
        } else {
        setMessage("Character created successfully!");
        setRelocate(true)
        form.reset();
        }

        setLoading(false);
    }



    return (
        <div className="main-div">
            {relocate && <Navigate to="/CharacterGallery" replace />}
            
            <Navbar/>

            <div className="right-side">
                <div className='home-topText'>
                    <span className='heading-txt' id="characterHd-txt">Create a new character</span>
                </div>

                <div className="character-creation">
                    <form onSubmit={handleSubmit}>

                        <div className="form-item">
                            <span className="formItem-txt" >Name</span>
                            <input type="text" placeholder="Enter Name" required name="name"/>
                        </div>

                        <div className="form-item">
                            <span className="formItem-txt" >Age</span>
                            <input type="number" placeholder="Enter Age" min="1" max="120" required name="age"/>
                        </div>

                        <div className="form-item">
                            <span className="formItem-txt">Body Style</span>
                            <select name="character_type">
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

                        {buttonActive ? (
                            <button type="submit" className="submit-button">Create Character!</button>
                            ) : (
                            <span className="desc-txt">{message}</span>
                        )}



                    </form>
                </div>
            </div>
        </div>
    )
}
