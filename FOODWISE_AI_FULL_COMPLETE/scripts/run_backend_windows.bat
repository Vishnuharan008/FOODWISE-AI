@echo off
cd /d "%~dp0..\backend"
if not exist ".venv\Scripts\python.exe" (
    echo Creating virtual environment...
    python -m venv .venv
)
call .venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
pause
