import cv2
import os
import numpy as np
from PIL import Image

video_map = {
    "burger": "uploaded_videos/Assembling_gourmet_burger_animation_1080p_20261023003513.mp4",
    "pizza": "uploaded_videos/Tomato_sauce_spreading_on_pizza_20261023003524.mp4",
    "biryani": "uploaded_videos/Making_chicken_biryani_animation_1080p_20261023003515.mp4",
    "pasta": "uploaded_videos/3D_pasta_assembly_animation_1080p_20261023003510.mp4"
}

os.makedirs("public/frames", exist_ok=True)
os.makedirs("public/images/dishes", exist_ok=True)
os.makedirs("public/videos", exist_ok=True)

def remove_watermark(frame):
    h, w = frame.shape[:2]
    # Watermark is in the bottom right corner: x: 88%-95%, y: 78%-90%
    y1, y2 = int(h * 0.78), int(h * 0.92)
    x1, x2 = int(w * 0.88), int(w * 0.95)
    
    roi = frame[y1:y2, x1:x2]
    gray = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)
    # Brightness threshold for watermark diamond
    _, thresh = cv2.threshold(gray, 65, 255, cv2.THRESH_BINARY)
    kernel = np.ones((5, 5), np.uint8)
    thresh = cv2.dilate(thresh, kernel, iterations=2)
    
    mask = np.zeros((h, w), dtype=np.uint8)
    mask[y1:y2, x1:x2] = thresh
    
    # Inpaint
    cleaned = cv2.inpaint(frame, mask, inpaintRadius=5, flags=cv2.INPAINT_TELEA)
    return cleaned

step = 4 # 240 / 4 = 60 frames per dish

for dish_key, video_path in video_map.items():
    if not os.path.exists(video_path):
        print(f"File not found: {video_path}")
        continue
    
    # Copy video to public/videos/ for cinema player
    import shutil
    target_vid = f"public/videos/{dish_key}_animation.mp4"
    if not os.path.exists(target_vid):
        shutil.copyfile(video_path, target_vid)
        print(f"Copied {video_path} to {target_vid}")
        
    out_dir = f"public/frames/{dish_key}"
    os.makedirs(out_dir, exist_ok=True)
    
    cap = cv2.VideoCapture(video_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    print(f"Processing {dish_key} ({total_frames} frames)...")
    
    frame_idx = 0
    saved_count = 0
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break
            
        if frame_idx % step == 0:
            # Clean watermark
            clean_frame = remove_watermark(frame)
            
            # Resize to 1280x720
            resized = cv2.resize(clean_frame, (1280, 720), interpolation=cv2.INTER_AREA)
            
            # Convert BGR to RGB
            rgb = cv2.cvtColor(resized, cv2.COLOR_BGR2RGB)
            pil_img = Image.fromarray(rgb)
            
            fname = f"{out_dir}/frame_{saved_count:03d}.webp"
            pil_img.save(fname, format="WEBP", quality=82, method=3)
            
            # Save hero image at frame ~ 210-220
            if frame_idx == 212:
                hero_path = f"public/images/dishes/{dish_key}_hero.webp"
                pil_img.save(hero_path, format="WEBP", quality=90, method=4)
                
            saved_count += 1
            
        frame_idx += 1
        
    cap.release()
    print(f"Done {dish_key}: saved {saved_count} frames.")

print("All asset processing finished!")
