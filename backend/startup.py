#!/usr/bin/env python3
"""
Startup script for Portfolio Backend
Initializes database and starts the Flask application
"""

import os
import sys
from database.init_db import create_database, seed_sample_data, DATABASE_PATH

def setup_database():
    """Setup database if it doesn't exist"""
    if not os.path.exists(DATABASE_PATH):
        print("Database not found. Creating new database...")
        create_database()
        seed_sample_data()
        print("Database setup complete!")
    else:
        print("Database already exists at:", DATABASE_PATH)

def main():
    """Main startup function"""
    print("=== Portfolio Backend Startup ===")
    
    # Setup database
    setup_database()
    
    # Import and run the Flask app
    try:
        from app import app
        print("Starting Flask application...")
        
        # Get configuration from environment
        port = int(os.getenv('PORT', 5000))
        debug = os.getenv('FLASK_ENV') == 'development'
        
        print(f"Server starting on port {port}")
        print(f"Debug mode: {debug}")
        print(f"API Base URL: http://localhost:{port}/api")
        
        app.run(
            host='0.0.0.0',
            port=port,
            debug=debug
        )
        
    except ImportError as e:
        print(f"Error importing Flask app: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"Error starting application: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
