#!/usr/bin/env python3
"""
Add image_url column to hackathons table and populate with correct image paths
"""
import sqlite3
import os

def update_hackathon_images():
    # Database path
    db_path = os.path.join(os.path.dirname(__file__), 'database', 'portfolio.db')
    
    try:
        # Connect to database
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Add image_url column to hackathons table if it doesn't exist
        try:
            cursor.execute('ALTER TABLE hackathons ADD COLUMN image_url TEXT')
            print("Added image_url column to hackathons table")
        except sqlite3.OperationalError as e:
            if "duplicate column name" in str(e):
                print("image_url column already exists")
            else:
                raise e
        
        # Mapping of hackathon IDs to their image paths based on titles
        image_mappings = {
            3: '/photo/devfest/main.jpg',      # DevFest Jalandhar 2024 - Winner
            5: '/photo/arena/main.jpg',        # Arena Hackathon 2024
            6: '/photo/code-a-haunt/main.jpg', # Code-a-Haunt Halloween Hackathon
            7: '/photo/code-of-duty/main.jpg', # Code of Duty - Gaming Hackathon
            8: '/photo/codingblockslpu/main.jpg', # CodingBlocks LPU Hackathon
            9: '/photo/microsoft/main.jpg',    # Microsoft Azure Hackathon 2024
            10: '/photo/other/main.jpg'        # Open Source Innovation Challenge
        }
        
        # Update image URLs for each hackathon
        for hackathon_id, image_url in image_mappings.items():
            cursor.execute('''
                UPDATE hackathons 
                SET image_url = ? 
                WHERE id = ?
            ''', (image_url, hackathon_id))
            print(f"Updated hackathon {hackathon_id} with image: {image_url}")
        
        # Commit changes
        conn.commit()
        
        # Verify the updates
        cursor.execute('SELECT id, title, image_url FROM hackathons ORDER BY id')
        
        print("\nUpdated hackathons:")
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
    update_hackathon_images()
