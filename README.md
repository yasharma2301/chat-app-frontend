# Let's Chat
### - Realtime chat application built with MERN stack and Socket.io
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)

##### Deployed at: https://letss-chatt.netlify.app/
##### Backend Repository: https://github.com/yasharma2301/chat-app-backend

### Application Supports:
1. User Auth
2. Send 1 to 1 chats
3. Create group chats
4. Add/remove users from group, rename groups
5. Search for users to start chat with
6. Realtime notifications

## Screenshots
Chatpage:
![chatpage-lets-chat](https://user-images.githubusercontent.com/58696571/168414737-57c91dbf-d281-4955-bcea-34c646abc97f.png)

User Auth:
![signup-lets-chat](https://user-images.githubusercontent.com/58696571/168414744-01d5a4e3-40b9-493b-8f0c-4df70ed72a01.png)

Group Modal:
![update-group-lets-chat](https://user-images.githubusercontent.com/58696571/168414747-a4a1444d-d403-41ea-929d-17d62a5f084b.png)

Search Users:
![search-users-lets-chat](https://user-images.githubusercontent.com/58696571/168414750-4bdd91e2-13ed-4d3d-9204-54e394f57e27.png)

### Further Improvements:
1. Persist notifcation in database, current version implemented using socket.io
2. Delete chat deatils after a particular amount of time if all users have left the group
3. Change group admin functionality
4. Send media messages
5. Host images using [multer](https://www.npmjs.com/package/multer), currently using (cloudinary) a 3rd party cloud service
6. Voice calls

## Installation

```sh
https://github.com/yasharma2301/chat-app-frontend.git
npm install
npm start
```
Open http://localhost:3000 to view it in the browser.