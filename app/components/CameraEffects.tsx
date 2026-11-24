"use client";
import {useEffect,useState} from "react";

export function ApertureIcon({className=""}:{className?:string}){
 return <svg className={className} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m7.5 3 7.6 8.4M16.5 3l-3.5 10.8M22 12l-11.1 2.4M16.5 21l-7.6-8.4M7.5 21l3.5-10.8M2 12l11.1-2.4"/></svg>;
}
const KEY="laura-camera-sound";
function enabled(){try{return sessionStorage.getItem(KEY)==="on";}catch{return false;}}
function playShutter(){try{const audio=new Audio("/audio/shutter.wav");audio.volume=.28;void audio.play().catch(()=>{});}catch{}}
export function CameraSoundToggle(){
 const [on,setOn]=useState(false);
 useEffect(()=>{setOn(enabled());},[]);
 return <button className="camera-sound-toggle" type="button" aria-pressed={on} onClick={()=>{const next=!on;try{sessionStorage.setItem(KEY,next?"on":"off");}catch{}setOn(next);if(next)playShutter();}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z"/>{on?<><path d="M16 8a6 6 0 0 1 0 8"/><path d="M19 5a10 10 0 0 1 0 14"/></>:<path d="m16 9 5 6m0-6-5 6"/>}</svg>{on?"Sonido activado":"Activar sonido"}</button>;
}
export default function CameraEffects(){
 useEffect(()=>{
  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
  function click(e:MouseEvent){
   const target=e.target instanceof Element?e.target.closest<HTMLElement>(".btn,.nav-cta,.nav-links a,.mobile-menu nav a,.service-preview-next,.service-open,.contact-email,.hero-actions .text-link"):null;
   if(!target||target.matches(":disabled,[aria-disabled=true]"))return;
   if(enabled())playShutter();
   if(!reduced.matches){target.classList.remove("camera-shot");void target.offsetWidth;target.classList.add("camera-shot");window.setTimeout(()=>target.classList.remove("camera-shot"),260);}
  }
  document.addEventListener("click",click,true);
  return ()=>document.removeEventListener("click",click,true);
 },[]);
 return null;
}
