@echo off
cd /d "%~dp0"
echo Starting local preview at http://localhost:8000  (close this window to stop)
start "" http://localhost:8000/index.html
where py >/dev/null 2>/dev/null && (py -m http.server 8000 & goto :eof)
where python >/dev/null 2>/dev/null && (python -m http.server 8000 & goto :eof)
where npx >/dev/null 2>/dev/null && (npx --yes serve -l 8000 & goto :eof)
echo Could not find Python or Node. Install Python from python.org, then run this again.
pause
