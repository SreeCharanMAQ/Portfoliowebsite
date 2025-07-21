import sqlite3

# Connect to database
conn = sqlite3.connect('portfolio.db')
cursor = conn.cursor()

# ID to remove
hackathon_id = 4

print(f"Removing hackathon ID {hackathon_id} (Smart Device Platform Hackathon)...")

# Remove related data first (due to foreign key constraints)
cursor.execute('DELETE FROM project_gallery WHERE hackathon_id = ?', (hackathon_id,))
cursor.execute('DELETE FROM team_members WHERE hackathon_id = ?', (hackathon_id,))
cursor.execute('DELETE FROM project_features WHERE hackathon_id = ?', (hackathon_id,))
cursor.execute('DELETE FROM project_timeline WHERE hackathon_id = ?', (hackathon_id,))
cursor.execute('DELETE FROM recognition WHERE hackathon_id = ?', (hackathon_id,))

# Remove the hackathon itself
cursor.execute('DELETE FROM hackathons WHERE id = ?', (hackathon_id,))

print(f"Hackathon ID {hackathon_id} and all related data removed successfully!")

# Commit changes and close connection
conn.commit()
conn.close()

print("Hackathon removal completed!")
