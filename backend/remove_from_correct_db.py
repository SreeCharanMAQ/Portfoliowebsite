import sqlite3
import os

# Use the correct database path
DATABASE_PATH = os.path.join('database', 'portfolio.db')

# Connect to database
conn = sqlite3.connect(DATABASE_PATH)
cursor = conn.cursor()

# IDs to remove
hackathon_ids = [1, 2, 4]

for hackathon_id in hackathon_ids:
    print(f"Removing hackathon ID {hackathon_id} from correct database...")
    
    # Remove related data first (due to foreign key constraints)
    cursor.execute('DELETE FROM project_gallery WHERE hackathon_id = ?', (hackathon_id,))
    cursor.execute('DELETE FROM team_members WHERE hackathon_id = ?', (hackathon_id,))
    cursor.execute('DELETE FROM project_features WHERE hackathon_id = ?', (hackathon_id,))
    cursor.execute('DELETE FROM project_timeline WHERE hackathon_id = ?', (hackathon_id,))
    cursor.execute('DELETE FROM recognition WHERE hackathon_id = ?', (hackathon_id,))
    
    # Remove the hackathon itself
    cursor.execute('DELETE FROM hackathons WHERE id = ?', (hackathon_id,))
    
    print(f"Hackathon ID {hackathon_id} removed successfully!")

# Commit changes and close connection
conn.commit()
conn.close()

print("All specified hackathons removed from the correct database!")
