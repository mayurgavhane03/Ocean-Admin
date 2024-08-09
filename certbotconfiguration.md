https://chatgpt.com/share/06f57ee6-7a36-4ce4-8b0e-da7ce9494c9a


Step 1: Validate Configuration
After applying these changes, you should validate the configuration:

bash
Copy code
sudo nginx -t
If everything is correct, you should see:

bash
Copy code
nginx: configuration file /etc/nginx/nginx.conf test is successful
Step 2: Restart Nginx
If the configuration test passes, restart Nginx to apply the changes:

bash
Copy code
sudo systemctl restart nginx
Step 3: Run Certbot
Now, you can proceed to obtain an SSL certificate using Certbot:

bash
Copy code
sudo certbot --nginx -d backend.oceanofmovies.tech
This command will automatically configure your Nginx server to use SSL. If everything is set up correctly, your site should now be accessible via HTTPS.