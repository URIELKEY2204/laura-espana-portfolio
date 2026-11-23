#!/usr/bin/env python3
"""Migrate the six original vertical 9:16 portfolio videos from their existing published URLs.
Outputs optimized 720x1280 H.264 web assets into the new website's public directory.
Never changes the old Netlify deployment.
"""
from concurrent.futures import ThreadPoolExecutor, as_completed
from urllib.parse import quote
from urllib.request import urlopen, Request
from pathlib import Path
import json,subprocess,os,time
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT/"public"/"videos"/"projects"
CACHE = ROOT/".media-source"
OUT.mkdir(parents=True, exist_ok=True)
CACHE.mkdir(parents=True, exist_ok=True)
ITEMS = [
("Alejandro Direccionario.mp4","alejandro-direccionario.mp4"),
("Camargo Fix Financiado.mp4","camargo-fix-financiado.mp4"),
("reels semana rosa.mp4","reels-semana-rosa.mp4"),
("Noticias 1era Semana Marzo.mp4","noticias-marzo.mp4"),
("Extraxtor de Jugo.mp4","extractor-de-jugo.mp4"),
("Recap Aniversario.mp4","recap-aniversario.mp4"),
]
BASE="https://snazzy-manatee-de4ef3.netlify.app/videos/projects/"
def fetch(item):
 original,new=item
 raw=CACHE/new
 url=BASE+quote(original)
 if not raw.exists() or raw.stat().st_size < 1_000_000:
  tmp=raw.with_suffix(".downloading")
  print("DOWNLOAD_START",original,flush=True)
  with urlopen(Request(url,headers={"User-Agent":"LauraMediaMigration/1.0"}),timeout=120) as f, tmp.open("wb") as g:
   while True:
    block=f.read(1024*1024)
    if not block:break
    g.write(block)
  tmp.replace(raw)
 print("DOWNLOADED",original,raw.stat().st_size,flush=True)
 return (original,new,raw)
def encode(item):
 original,new,raw=item
 target=OUT/new
 if target.exists() and target.stat().st_size>500_000:
  return {"name":new,"source_bytes":raw.stat().st_size,"web_bytes":target.stat().st_size,"status":"existing"}
 cmd=["ffmpeg","-y","-hide_banner","-loglevel","error","-i",str(raw),
      "-map","0:v:0","-map","0:a:0?","-vf","scale=720:1280:flags=lanczos,setsar=1",
      "-c:v","libx264","-preset","veryfast","-crf","27","-maxrate","1800k","-bufsize","3600k",
      "-pix_fmt","yuv420p","-c:a","aac","-b:a","96k","-movflags","+faststart",str(target)]
 print("TRANSCODE_START",new,flush=True)
 subprocess.run(cmd,check=True,timeout=240)
 probe=lambda filename: float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","default=nw=1:nk=1",str(filename)],text=True).strip())
 source_seconds, output_seconds=probe(raw),probe(target)
 if output_seconds < source_seconds-1.5:
  target.unlink(missing_ok=True)
  raise RuntimeError(f"Truncated video: source {source_seconds:.2f}s vs output {output_seconds:.2f}s")
 print("TRANSCODE_OK",new,target.stat().st_size,flush=True)
 return {"name":new,"source_bytes":raw.stat().st_size,"web_bytes":target.stat().st_size,"status":"created"}
def main():
 with ThreadPoolExecutor(max_workers=3) as pool:
  futures=[pool.submit(fetch,item) for item in ITEMS]
  fetched=[]
  for fut in as_completed(futures):
   try:fetched.append(fut.result())
   except Exception as e: print("DOWNLOAD_ERROR",repr(e),flush=True)
 results=[]
 for item in fetched:
  try:results.append(encode(item))
  except Exception as e:print("TRANSCODE_ERROR",item[1],repr(e),flush=True)
 (ROOT/"docs"/"video-migration-report.json").write_text(json.dumps(results,indent=2)+"\n")
 print("MIGRATION_FINISHED",len(results),"TOTAL_BYTES",sum(x["web_bytes"] for x in results),flush=True)
if __name__=="__main__":main()
