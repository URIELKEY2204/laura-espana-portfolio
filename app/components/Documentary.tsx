"use client";

import { useState } from "react";
import { documentary } from "../data/projects";

export default function Documentary() {
 const [play, setPlay] = useState(false);
 return <section className="documentary-section" id="documental" aria-labelledby="doc-heading">
  <div className="wrap">
   <div className="section-head">
    <div><p className="eyebrow">02 / DOCUMENTAL</p><h2 id="doc-heading">Historias que van<br/><em>más allá de una marca.</em></h2></div>
    <p className="section-intro">Las historias que nos conectan también merecen una mirada cinematográfica. Conoce uno de mis trabajos de edición y postproducción documental.</p>
   </div>
   <div className="documentary-frame">
    {play ? <iframe title={documentary.title} src={"https://www.youtube-nocookie.com/embed/"+documentary.youtubeId+"?autoplay=1"} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /> :
    <button className="documentary-placeholder" onClick={()=>setPlay(true)} aria-label={"Reproducir documental: "+documentary.title}>
     <span className="documentary-play" aria-hidden="true">▶</span>
     <span>VER DOCUMENTAL</span>
    </button>}
   </div>
   <div className="documentary-caption"><div><p className="project-client">CINE / DOCUMENTAL</p><h3>{documentary.title}</h3><p>{documentary.description}</p></div><a href={documentary.watchUrl} target="_blank" rel="noopener noreferrer">Abrir en YouTube ↗</a></div>
   <p className="video-privacy">El documental se reproduce desde YouTube únicamente cuando eliges verlo.</p>
  </div>
 </section>;
}
