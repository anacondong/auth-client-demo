# How to start

auth-server should be ready on Docker
 
npm install

npm start

# Test data

username:jdoe

password:jdoe

And

username:alice

password:alice

# Fixing CORS

Select Your Realm:
On the left-hand side, select the realm you are working with, e.g., quickstart.

Navigate to Clients:

Click on Clients in the left-hand menu.
Select the client you are configuring, e.g., authz-servlet.
Configure CORS Settings for the Client:

Settings Tab:
Valid Redirect URIs:
Add http://localhost:3000/* (assuming your React app runs on port 3000).
Web Origins:
Add http://localhost:3000 (or the appropriate URL if different)
