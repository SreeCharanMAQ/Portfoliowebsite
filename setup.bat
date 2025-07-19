@echo off
echo Setting up Portfolio Website...
echo.

echo Installing frontend dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo Failed to install frontend dependencies
    pause
    exit /b 1
)

echo.
echo Installing backend dependencies...
cd ..\backend
python -m venv venv
call venv\Scripts\activate.bat
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo Failed to install backend dependencies
    pause
    exit /b 1
)

echo.
echo Creating environment file...
if not exist .env (
    copy .env.example .env
    echo Please update the .env file with your email configuration
)

echo.
echo Setup complete!
echo.
echo To start the application:
echo 1. Frontend: cd frontend && npm start
echo 2. Backend: cd backend && venv\Scripts\activate && python app.py
echo.
pause
