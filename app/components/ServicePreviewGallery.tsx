"use client";
import {useState,useEffect,useRef} from "react";
import type {PointerEvent} from "react";
import {projects,documentary} from "../data/projects";
import food from "../data/foodPhotos.json";
import {ApertureIcon} from "./CameraEffects";

type Frame={image:string;label:string;video?:string};
type Service={id:string;title:string;body:string;detail:string;href:string;frames:Frame[]};
const projectFrame=(p:typeof projects[number]):Frame=>({image:p.image,label:p.title,video:p.preview});
const event=projects.find(p=>p.category==="Eventos")!;
const services:Service[]=[
 {id:"gastronomia",title:"Gastronomía y producto",body:"Sesiones de fotografía para presentar productos, actualizar menús y preparar contenido para redes.",detail:"Restaurantes · Cafeterías · Retail",href:"/servicios/fotografia-gastronomica/",frames:["L019","R001","L029","R106"].map(id=>{const f=food.find(p=>p.id===id)!;return {image:f.src,label:f.brand};})},
 {id:"video",title:"Contenido comercial",body:"Producciones para lanzamientos, demostraciones, anuncios y necesidades de contenido recurrente.",detail:"Reels · Ads · Campañas",href:"/servicios/video-comercial/",frames:projects.slice(0,3).map(projectFrame)},
 {id:"cobertura",title:"Cobertura de marca",body:"Registro audiovisual de eventos, espacios y activaciones para comunicar lo que sucede en tu marca.",detail:"Eventos · Tiendas · Experiencias",href:"/#contacto",frames:[projectFrame(event),{image:"/images/previews/recap-02.webp",label:"Recap aniversario · Fotograma"},{image:"/images/previews/recap-03.webp",label:"Recap aniversario · Fotograma"}]},
 {id:"edicion",title:"Edición y postproducción",body:"Edición de material grabado para agencias, empresas y creadores que necesitan piezas listas para publicar.",detail:"Edición · Postproducción",href:"/servicios/edicion-video/",frames:[...projects.filter(p=>p.category==="Social").map(projectFrame),{image:"/images/documentary.jpg",label:documentary.title}]}
];
function ServicePreview({service,index}:{service:Service;index:number}){
 const [active,setActive]=useState(0);
 const [hover,setHover]=useState(false);
 const [playing,setPlaying]=useState(false);
 const [motion,setMotion]=useState(false);
 const [announce,setAnnounce]=useState("");
 const ref=useRef<HTMLDivElement>(null);
 const frame=service.frames[active];
 useEffect(()=>{
  const mq=window.matchMedia("(prefers-reduced-motion: reduce)");
  const update=()=>setMotion(!mq.matches);update();mq.addEventListener("change",update);
  return ()=>mq.removeEventListener("change",update);
 },[]);
 useEffect(()=>{
  const box=ref.current;
  if(!box)return;
  const observer=new IntersectionObserver(([e])=>{if(!e.isIntersecting){setHover(false);setPlaying(false);}}, {threshold:.1});
  observer.observe(box);
  const visibility=()=>{if(document.hidden){setHover(false);setPlaying(false);}};
  document.addEventListener("visibilitychange",visibility);
  return ()=>{observer.disconnect();document.removeEventListener("visibilitychange",visibility);};
 },[]);
 function scrub(e:PointerEvent<HTMLDivElement>){
  if(e.pointerType==="touch")return;
  const r=e.currentTarget.getBoundingClientRect();
  setHover(true);setActive(Math.max(0,Math.min(service.frames.length-1,Math.floor((e.clientX-r.left)/r.width*service.frames.length))));
 }
 function next(){
  const i=(active+1)%service.frames.length;
  setActive(i);setPlaying(true);setAnnounce(service.frames[i].label+", vista "+(i+1)+" de "+service.frames.length);
 }
 return <article className="service-preview-card" id={"servicio-"+service.id}>
  <div className="service-preview-media" ref={ref} onPointerMove={scrub} onPointerLeave={()=>{setHover(false);setPlaying(false);}}>
   {service.frames.map((f,i)=><img key={f.image} className={"service-preview-image"+(i===active?" is-current":"")} src={f.image} alt="" aria-hidden="true" loading="lazy" decoding="async"/>)}
   {motion&&(hover||playing)&&frame.video&&<video key={frame.video} src={frame.video} poster={frame.image} autoPlay loop muted playsInline preload="none" aria-hidden="true" tabIndex={-1} />}
   <span className="service-frame-corners" aria-hidden="true"/>
   <div className="service-frame-caption"><span>{frame.label}</span><span>{String(active+1).padStart(2,"0")} / {String(service.frames.length).padStart(2,"0")}</span></div>
   <div className="service-frame-progress" aria-hidden="true">{service.frames.map((_,i)=><span key={i} className={i===active?"is-current":""}/>)}</div>
  </div>
  <div className="service-preview-copy"><div className="service-preview-top"><span className="service-n">{String(index+1).padStart(2,"0")} /</span><button className="service-preview-next" type="button" aria-label={"Siguiente vista de "+service.title} onClick={next}><ApertureIcon/></button></div><h3>{service.title}</h3><p>{service.body}</p><span className="service-detail">{service.detail}</span><a className="service-open" href={service.href}>{service.id==="cobertura"?"Consultar cobertura":"Conocer servicio"} <span aria-hidden="true">↗</span></a><span className="sr-only" aria-live="polite">{announce}</span></div>
 </article>;
}
export default function ServicePreviewGallery(){
 return <><p className="service-gallery-hint"><span className="desktop-preview-hint">Desliza el cursor por las imágenes para explorar el portafolio.</span><span className="touch-preview-hint">Toca el diafragma de cada tarjeta para cambiar de vista.</span></p><div className="service-preview-grid">{services.map((s,i)=><ServicePreview key={s.id} service={s} index={i}/>)}</div></>;
}
