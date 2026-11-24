"use client";

import {useState} from "react";
import photos from "../data/foodPhotos.json";

const featured = ["L019", "R001", "L029", "R106", "L001"]
  .map(id => photos.find(photo => photo.id === id))
  .filter((photo): photo is (typeof photos)[number] => Boolean(photo));

export default function FoodHeroCarousel(){
  const [index,setIndex]=useState(0);
  const photo=featured[index];
  const move=(delta:number)=>setIndex(current=>(current+delta+featured.length)%featured.length);
  return <div className="food-hero-carousel" role="region" aria-roledescription="carrusel" aria-label="Selección de fotografías gastronómicas">
    <div className="food-hero-slide" aria-live="polite">
      <img key={photo.id} src={photo.src} alt={"Fotografía gastronómica para "+photo.brand} fetchPriority={index===0?"high":"auto"} decoding="async"/>
    </div>
    <div className="food-hero-controls">
      <div className="food-hero-caption"><span>{photo.brand}</span><span aria-live="polite">{String(index+1).padStart(2,"0")} / {String(featured.length).padStart(2,"0")}</span></div>
      <div className="food-hero-arrows">
        <button type="button" onClick={()=>move(-1)} aria-label="Fotografía anterior"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M19 12H5m7 7-7-7 7-7"/></svg></button>
        <button type="button" onClick={()=>move(1)} aria-label="Fotografía siguiente"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 12h14m-7-7 7 7-7 7"/></svg></button>
      </div>
    </div>
  </div>;
}
