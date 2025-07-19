@echo off
title Portfolio Development Server

echo Starting Portfolio Website Development Servers...
echo.

start "Frontend Server" cmd /k "cd frontend && npm start"
timeout /t 3 /nobreak >nul

start "Backend Server" cmd /k "cd backend && venv\Scripts\activate && python app.py"

echo.
echo Both servers are starting...
echo Frontend: http://localhost:3000
echo Backend: http://localhost:5000
echo.
pause
