#!/bin/bash

echo "Setting up Portfolio Website..."
echo

echo "Installing frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "Failed to install frontend dependencies"
    exit 1
fi

echo
echo "Installing backend dependencies..."
cd ../backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
if [ $? -ne 0 ]; then
    echo "Failed to install backend dependencies"
    exit 1
fi

echo
echo "Creating environment file..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "Please update the .env file with your email configuration"
fi

echo
echo "Setup complete!"
echo
echo "To start the application:"
echo "1. Frontend: cd frontend && npm start"
echo "2. Backend: cd backend && source venv/bin/activate && python app.py"
echo
