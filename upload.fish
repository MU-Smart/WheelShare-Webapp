#!/usr/bin/env fish

# Set variables for project directory and server path
set project_dir "./"
set server_path "~/dev/mypathweb/static/"

# Build project
cd $project_dir
npm run build

# Copy files to server
set_color yellow
echo "Copying files to server..."
set_color normal
rsync -avz --delete -e "ssh -o StrictHostKeyChecking=no" build/ raychov@mypathweb.csi.miamioh.edu:$server_path

# Print success message
set_color green
echo "Files copied to server successfully!"
set_color normal
