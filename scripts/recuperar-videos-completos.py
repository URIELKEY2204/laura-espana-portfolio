#!/usr/bin/env python3
"""Recuperación reanudable de seis videos desde el sitio anterior.

- Compara Content-Length real y tamaño local para impedir MP4 truncados.
- Reanuda bytes con HTTP Range (sin reescribir ni eliminar el origen).
- Valida duración al convertir a 720x1280.
- No despliega ni modifica ninguna página pública.
"""
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.parse import quote
from urllib.request import Request,urlopen
import subprocess,time, json
ROOT=Path(__file__).resolve().parent.parent
CACHE=ROOT/'.media-source'
OUT=ROOT/'public/videos/projects'
CACHE.mkdir(exist_ok=True)
OUT.mkdir(parents=True,exist_ok=True)
PAIRS=[
 ('Alejandro Direccionario.mp4','alejandro-direccionario.mp4'),
 ('Camargo Fix Financiado.mp4','camargo-fix-financiado.mp4'),
 ('reels semana rosa.mp4','reels-semana-rosa.mp4'),
 ('Noticias 1era Semana Marzo.mp4','noticias-marzo.mp4'),
 ('Extraxtor de Jugo.mp4','extractor-de-jugo.mp4'),
 ('Recap Aniversario.mp4','recap-aniversario.mp4')]
BASE='https://snazzy-manatee-de4ef3.netlify.app/videos/projects/'
def duration(path):
 return float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','default=nw=1:nk=1',str(path)],text=True,timeout=15).strip())
def get(pair):
 old,new=pair; url=BASE+quote(old);path=CACHE/new
 with urlopen(Request(url,method='HEAD'),timeout=18) as r: expected=int(r.headers['Content-Length'])
 for attempt in range(1,31):
  size=path.stat().st_size if path.exists() else 0
  if size == expected: print('COMPLETE_SOURCE',new,size,flush=True); return path,new
  if size>expected: path.unlink();size=0
  req=Request(url,headers={'Range':f'bytes={size}-','User-Agent':'Mozilla/5.0'})
  try:
   with urlopen(req,timeout=45) as r:
    code=r.status
    if size and code != 206: raise ValueError(f'Range response {code}; refusing to append')
    with open(path,'ab' if size else 'wb') as f:
     while True:
      b=r.read(1024*1024)
      if not b:break
      f.write(b)
   print('PART',new,path.stat().st_size,'EXPECTED',expected,flush=True)
  except Exception as e:
   print('RETRY',new,attempt,'HAVE',path.stat().st_size if path.exists() else 0,'ERROR',str(e)[:100],flush=True)
   time.sleep(min(attempt,6))
 raise RuntimeError('Incomplete after retries: '+new)
def convert(item):
 path,name=item;target=OUT/name
 original_duration=duration(path)
 if target.exists():
  try:
   target_duration=duration(target)
   if abs(target_duration-original_duration)<1.6:
    print('VALID_PREVIOUS_OUTPUT',name,target.stat().st_size,flush=True)
    return dict(name=name,seconds=round(target_duration,2),bytes=target.stat().st_size)
  except Exception:pass
  target.unlink()
 print('ENCODING',name,flush=True)
 cmd=['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(path),'-map','0:v:0','-map','0:a:0?','-vf','scale=720:1280:flags=lanczos,setsar=1','-c:v','libx264','-preset','veryfast','-crf','27','-maxrate','1800k','-bufsize','3600k','-pix_fmt','yuv420p','-c:a','aac','-b:a','96k','-movflags','+faststart',str(target)]
 subprocess.run(cmd,check=True,timeout=300)
 final=duration(target)
 if abs(final-original_duration)>1.6:
  target.unlink(missing_ok=True)
  raise ValueError(f'Duration mismatch: {name} {original_duration:.2f} vs {final:.2f}')
 print('VALID_OUTPUT',name,round(final,2),target.stat().st_size,flush=True)
 return dict(name=name,seconds=round(final,2),bytes=target.stat().st_size)
def main():
 results=[]
 with ThreadPoolExecutor(max_workers=4) as exe:
  fut=[exe.submit(get,p) for p in PAIRS]
  for f in as_completed(fut):
   try:results.append(convert(f.result()))
   except Exception as e:print('FAILED',repr(e),flush=True)
 (ROOT/'docs/video-migration-validated.json').write_text(json.dumps(results,ensure_ascii=False,indent=2)+'\n')
 print('FINISHED_VERIFIED',len(results),'/',len(PAIRS),'BYTES',sum(r['bytes'] for r in results),flush=True)
if __name__=='__main__':main()
