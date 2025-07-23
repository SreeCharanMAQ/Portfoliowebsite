#!/usr/bin/env python3
"""
Create placeholder images for projects
"""
import os
from PIL import Image, ImageDraw, ImageFont

def create_placeholder_image(project_name, category, output_path, width=400, height=300):
    """Create a placeholder image for a project"""
    try:
        # Create image with a gradient background
        img = Image.new('RGB', (width, height), color=(70, 130, 180))
        draw = ImageDraw.Draw(img)
        
        # Add colored overlay based on category
        colors = {
            'AI/ML': (76, 175, 80),      # Green
            'Healthcare': (244, 67, 54),  # Red
            'AgriTech': (139, 195, 74),   # Light Green
        }
        
        overlay_color = colors.get(category, (96, 125, 139))  # Default blue-grey
        draw.rectangle([0, 0, width, height], fill=overlay_color)
        
        # Add semi-transparent overlay
        overlay = Image.new('RGBA', (width, height), (255, 255, 255, 50))
        img = Image.alpha_composite(img.convert('RGBA'), overlay).convert('RGB')
        draw = ImageDraw.Draw(img)
        
        # Try to load a font, fall back to default if not available
        try:
            font_large = ImageFont.truetype("arial.ttf", 32)
            font_small = ImageFont.truetype("arial.ttf", 18)
        except:
            font_large = ImageFont.load_default()
            font_small = ImageFont.load_default()
        
        # Add project name
        text_width = draw.textlength(project_name, font=font_large)
        x = (width - text_width) // 2
        y = height // 2 - 30
        
        # Add text shadow
        draw.text((x+2, y+2), project_name, font=font_large, fill=(0, 0, 0, 128))
        draw.text((x, y), project_name, font=font_large, fill='white')
        
        # Add category
        cat_width = draw.textlength(category, font=font_small)
        cat_x = (width - cat_width) // 2
        cat_y = y + 50
        
        draw.text((cat_x+1, cat_y+1), category, font=font_small, fill=(0, 0, 0, 128))
        draw.text((cat_x, cat_y), category, font=font_small, fill='white')
        
        # Save image
        img.save(output_path, 'JPEG', quality=85)
        print(f"✅ Created: {output_path}")
        return True
        
    except Exception as e:
        print(f"❌ Error creating {output_path}: {e}")
        return False

def create_all_project_images():
    """Create placeholder images for all projects"""
    projects = [
        ('Study Buddy', 'AI/ML', 'study-buddy'),
        ('Health Buddy', 'Healthcare', 'health-buddy'),
        ('Agriculture Buddy', 'AgriTech', 'agriculture-buddy'),
        ('SmartPredict', 'AI/ML', 'smart-predict'),
        ('VisionAI', 'AI/ML', 'vision-ai')
    ]
    
    base_path = os.path.join('..', 'frontend', 'public', 'project')
    
    for project_name, category, folder_name in projects:
        output_path = os.path.join(base_path, folder_name, 'main.jpg')
        create_placeholder_image(project_name, category, output_path)

if __name__ == "__main__":
    create_all_project_images()
