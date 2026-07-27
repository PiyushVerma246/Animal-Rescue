@echo off
TITLE AniCure AI Service — CLIP Embedding Server

echo.
echo ====================================================
echo   AniCure AI Service — CLIP Embedding Server
echo ====================================================
echo.

:: Create virtual environment if it doesn't exist
if not exist venv (
    echo [SETUP] Creating Python virtual environment...
    python -m venv venv
    if errorlevel 1 (
        echo [ERROR] Failed to create virtual environment.
        echo         Make sure Python 3.9+ is installed and on your PATH.
        pause
        exit /b 1
    )
    echo [SETUP] Virtual environment created.
)

:: Activate the virtual environment
echo [SETUP] Activating virtual environment...
call venv\Scripts\activate.bat

:: Install / upgrade dependencies
echo [SETUP] Installing dependencies (first run downloads ~350MB CLIP model)...
pip install -r requirements.txt --quiet
if errorlevel 1 (
    echo [ERROR] Dependency installation failed. Check your internet connection.
    pause
    exit /b 1
)

echo.
echo [OK] Dependencies installed.
echo [OK] Starting CLIP embedding server on http://localhost:8000
echo [OK] Health check: http://localhost:8000/health
echo.

:: Start the Flask server
python app.py

pause
