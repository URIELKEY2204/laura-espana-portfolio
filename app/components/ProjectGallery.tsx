"use client";

import { useMemo, useState } from "react";
import { Category, filters, projects } from "../data/projects";
import ProjectVideo from "./ProjectVideo";

export default function ProjectGallery({ full = false }: { full?: boolean }) {
  const [filter, setFilter] = useState<Category>("Todos");
  const visible = useMemo(() => {
    const data = full ? projects : projects.slice(0, 3);
    return filter === "Todos" ? data : data.filter((p) => p.category === filter);
  }, [filter, full]);
  return (
    <>
      {full && <div className="filters" aria-label="Filtrar proyectos">
        {filters.map(f => <button key={f} className={filter===f?"filter active":"filter"}
          onClick={()=>setFilter(f)} aria-pressed={filter===f}>
          {f}<span>{f==="Todos"?String(projects.length).padStart(2,"0"):String(projects.filter(p=>p.category===f).length).padStart(2,"0")}</span>
        </button>)}
      </div>}
      {full&&<p className="project-result-count" aria-live="polite">{visible.length} trabajos</p>}
      <div className={"project-grid project-grid-vertical"+(full?" project-grid-full":"")}>
        {visible.map((p, idx) => <article className="project" key={p.title}>
          <div className="project-media">
            <ProjectVideo project={p} />
            <span className="media-type">{p.category}</span>
          </div>
          <div className="project-meta">
            <div><p className="project-client">{p.client}</p><h3>{p.title}</h3><p>{p.description}</p></div>
            <span className="project-number">{String(idx+1).padStart(2,"0")}</span>
          </div>
        </article>)}
      </div>
      {!full && <div className="portfolio-more">
        <div><span className="asterisk">✳</span><h3>Tu marca puede ser la siguiente.</h3>
          <p>Conoce más proyectos y encuentra ideas para mostrar lo mejor de tu negocio.</p></div>
        <a className="btn btn-outline" href="/portafolio/">Explorar más proyectos <span>↗</span></a>
      </div>}
    </>
  );
}
