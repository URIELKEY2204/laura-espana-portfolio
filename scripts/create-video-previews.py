#!/usr/bin/env python3
"""Generate muted 2-second looping MP4 thumbnails from the beginning of each project video."""
from pathlib import Path
import subprocess

repo = Path(__file__).resolve().parent.parent
src = repo / "public" / "videos" / "projects"
dst = repo / "public" / "videos" / "previews"
dst.mkdir(parents=True, exist_ok=True)
for original in sorted(src.glob("*.mp4")):
    preview = dst / original.name
    command = [
        "ffmpeg", "-nostdin", "-hide_banner", "-loglevel", "error", "-y",
        "-i", str(original), "-t", "2", "-an",
        "-vf", "fps=24,scale=360:640:flags=lanczos,format=yuv420p",
        "-c:v", "libx264", "-preset", "medium", "-crf", "29",
        "-profile:v", "main", "-level", "3.0",
        "-movflags", "+faststart", "-sn", "-dn", str(preview),
    ]
    subprocess.run(command, check=True)
    print(f"{original.name}: {preview.stat().st_size // 1024} KiB (no audio)")
