import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SquidwardIMG from '../assets/squidwardIMG.png'
import PlanktonIMG from '../assets/planktonIMG.png'
import SandyIMG from '../assets/sandyIMG.png'
import KrabsIMG from '../assets/krabsIMG.png'
import PuffsIMG from '../assets/puffsIMG.png'
import PearlIMG from '../assets/pearlIMG.png'
import LarryIMG from '../assets/larryIMG.png'

export default function Card(props) {
    const [propImg, setPropImg] = useState("")
    const navigate = useNavigate();


    useEffect(() => {
        if (props.characterType == "spongebob") {
            setPropImg("https://www.freeiconspng.com/uploads/spongebob-png-0.png")
        } else if (props.characterType == "patrick") {
            setPropImg("https://www.freeiconspng.com/uploads/old-patrick-star-cartoon-characters-spongebob-png-27.png")
        } else if (props.characterType == "squidward") {
            setPropImg(SquidwardIMG)
        } else if (props.characterType == "plankton") {
            setPropImg(PlanktonIMG)
        } else if (props.characterType == "sandy") {
            setPropImg(SandyIMG)
        } else if (props.characterType == "krabs") {
            setPropImg(KrabsIMG)
        } else if (props.characterType == "pearl") {
            setPropImg(PearlIMG)
        } else if (props.characterType == "puffs") {
            setPropImg(PuffsIMG)
        } else if (props.characterType == "larry") {
            setPropImg(LarryIMG)
        }
    })

    return (
        <div className="card">
            <img src={propImg} className='card-img'/>
            <span className="detail-txt">Name: {props.name}</span>
            <span className="detail-txt">Age: {props.age}</span>
            <span className="detail-txt">Body: {props.characterType}</span>
            <button className="card-button" onClick={() => navigate(`/EditCharacter/${props.id}`)} >Edit Character</button>
        </div>
    )
}
