"use client";
import {useEffect,useMemo,useRef,useState} from "react";
import photos from "../data/foodPhotos.json";
type Brand = "Todos" | "Lali's" | "Café Roma";
export default function FoodGallery(){
 const [brand,setBrand]=useState<Brand>("Todos");
 const [selected,setSelected]=useState<string|null>(null);
 const modal=useRef<HTMLDialogElement>(null);
 const visible=useMemo(()=>photos.filter(p=>brand==="Todos"||p.brand===brand),[brand]);
 const active=photos.find(p=>p.id===selected);
 useEffect(()=>{if (active && !modal.current?.open) modal.current?.showModal(); else if (!active && modal.current?.open) modal.current?.close();},[active]);
 return <div className="food-gallery">
  <div className="food-gallery-controls" aria-label="Filtrar fotografías">
   {(["Todos","Lali's","Café Roma"] as Brand[]).map(b=><button type="button" key={b} className={brand===b?"food-filter selected":"food-filter"} aria-pressed={brand===b} onClick={()=>{setBrand(b);setSelected(null)}}>{b}</button>)}
  </div>
  <p className="food-count" aria-live="polite">{visible.length} fotografías</p>
  <div className="food-grid">{visible.map((p,i)=><button className="food-tile" type="button" key={p.id} onClick={()=>setSelected(p.id)} aria-label={"Ampliar fotografía de "+p.brand+", imagen "+(i+1)}><img src={p.src} alt={"Fotografía gastronómica para "+p.brand} loading="lazy" decoding="async"/><span>{p.brand}</span></button>)}</div>
  <dialog ref={modal} className="food-lightbox" aria-label={active?"Fotografía de "+active.brand:"Visor de fotografías"} onClose={()=>setSelected(null)} onClick={event=>{if(event.target===event.currentTarget)modal.current?.close()}}><button className="food-close" type="button" aria-label="Cerrar fotografía" onClick={()=>modal.current?.close()}>Cerrar ×</button>{active&&<img src={active.src} alt={"Fotografía gastronómica de "+active.brand}/>}</dialog>
 </div>
}
