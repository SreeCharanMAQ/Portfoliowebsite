#!/usr/bin/env python3
"""
Create frontend images table and populate with hackathon main images
"""
import sqlite3
import os

def create_frontend_images_table():
    # Database path
    db_path = os.path.join(os.path.dirname(__file__), 'database', 'portfolio.db')
    
    try:
        # Connect to database
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Create frontend_images table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS frontend_images (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                hackathon_id INTEGER NOT NULL,
                main_image_url TEXT NOT NULL,
                alt_text TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (hackathon_id) REFERENCES hackathons (id) ON DELETE CASCADE,
                UNIQUE(hackathon_id)
            )
        ''')
        
        # Mapping of hackathon IDs to their image folders
        image_mappings = [
            (3, '/photo/devfest/main.jpg', 'DevFest Jalandhar 2024 Winner'),
            (5, '/photo/arena/main.jpg', 'Arena Hackathon 2024'),
            (6, '/photo/code-a-haunt/main.jpg', 'Code-a-Haunt Halloween Hackathon'),
            (7, '/photo/code-of-duty/main.jpg', 'Code of Duty Gaming Hackathon'),
            (8, '/photo/codingblockslpu/main.jpg', 'CodingBlocks LPU Hackathon'),
            (9, '/photo/microsoft/main.jpg', 'Microsoft Azure Hackathon 2024'),
            (10, '/photo/other/main.jpg', 'Open Source Innovation Challenge')
        ]
        
        # Insert image mappings
        for hackathon_id, image_url, alt_text in image_mappings:
            cursor.execute('''
                INSERT OR REPLACE INTO frontend_images (hackathon_id, main_image_url, alt_text)
                VALUES (?, ?, ?)
            ''', (hackathon_id, image_url, alt_text))
            print(f"Added image mapping for hackathon {hackathon_id}: {image_url}")
        
        # Commit changes
        conn.commit()
        
        # Verify the insertions
        cursor.execute('SELECT COUNT(*) FROM frontend_images')
        count = cursor.fetchone()[0]
        print(f"\nSuccessfully created frontend_images table with {count} entries")
        
        # Show all mappings
        cursor.execute('''
            SELECT fi.hackathon_id, h.title, fi.main_image_url, fi.alt_text
            FROM frontend_images fi
            JOIN hackathons h ON fi.hackathon_id = h.id
            ORDER BY fi.hackathon_id
        ''')
        
        print("\nImage mappings:")
        for row in cursor.fetchall():
            print(f"ID {row[0]}: {row[1]} → {row[2]}")
        
        conn.close()
        return True
        
    except sqlite3.Error as e:
        print(f"Database error: {e}")
        return False
    except Exception as e:
        print(f"Error: {e}")
        return False

if __name__ == "__main__":
    create_frontend_images_table()
