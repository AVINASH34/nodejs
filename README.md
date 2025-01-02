
```markdown
### **1. Node.js Application**

We'll build a simple REST API using Express.js.

#### `index.js`
```javascript
// Import dependencies
const express = require('express');

// Initialize the app
const app = express();
const PORT = process.env.PORT || 3000;

// Create a simple route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Node.js Dockerized App!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

#### `package.json`
```json
{
  "name": "dockerized-node-app",
  "version": "1.0.0",
  "description": "A simple Node.js app to demonstrate Dockerization.",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

---

### **2. Dockerization**

#### `Dockerfile`
```dockerfile
# Use the official Node.js 18 base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Expose the app port
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]
```

#### `.dockerignore`
```plaintext
node_modules
npm-debug.log
```

---

### **3. Build and Run with Docker**

#### Step 1: Build the Docker Image
```bash
docker build -t dockerized-node-app .
```

#### Step 2: Run the Docker Container
```bash
docker run -p 3000:3000 dockerized-node-app
```

---

### **4. Access the App**

Open your browser or use `curl` to access the app at `http://localhost:3000`. You should see the JSON response:

```json
{
  "message": "Welcome to the Node.js Dockerized App!"
}
```

To make your Node.js application accessible from any IP address (`0.0.0.0`), you need to ensure the Express server listens on `0.0.0.0` instead of the default `localhost`.

Here’s how to modify the code to achieve that:

---

### **Updated Code**

#### `index.js`
```javascript
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Create a simple route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Node.js Dockerized App, accessible from any IP!' });
});

// Start the server and bind to 0.0.0.0
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
```

---

### **Run in Docker**

When using Docker, the container already binds the application to `0.0.0.0` inside the container. You expose the service to your host machine or other devices via port mapping.

---

Let’s upgrade the app to serve a beautiful webpage instead of a simple JSON response. We’ll use **HTML, CSS, and a bit of JavaScript** to create a visually appealing page.

---

### **Updated Application**

#### `index.js`
```javascript
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
```

---

### **Frontend Files**

#### Directory Structure:
```
public/
├── index.html
├── styles.css
└── script.js
```

---

#### `public/index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Welcome to the Dockerized Node.js App</h1>
        <p>This is a beautiful webpage served by a Node.js server, running inside a Docker container.</p>
        <button id="action-button">Click Me!</button>
        <p id="output-message" class="hidden"></p>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

---

#### `public/styles.css`
```css
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background: linear-gradient(to right, #4facfe, #00f2fe);
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.container {
    text-align: center;
    background: rgba(0, 0, 0, 0.5);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

h1 {
    margin-bottom: 10px;
    font-size: 2.5em;
}

p {
    margin-bottom: 20px;
    font-size: 1.2em;
}

button {
    padding: 10px 20px;
    font-size: 1em;
    color: #4facfe;
    background: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
}

button:hover {
    background: #f0f0f0;
}

.hidden {
    display: none;
}
```

---

#### `public/script.js`
```javascript
document.getElementById('action-button').addEventListener('click', () => {
    const message = document.getElementById('output-message');
    message.textContent = 'Thanks for clicking the button!';
    message.classList.remove('hidden');
});
```

---

### **Dockerization**

The `Dockerfile` does not need any changes. You can rebuild and run the container as before:

#### Rebuild and Run:
```bash
docker build -t dockerized-node-app .
docker run -p 3000:3000 dockerized-node-app
```

---

### **Access the App**

Open your browser and navigate to `http://<host-ip>:3000`. You’ll see a beautifully styled webpage with a button that shows a message when clicked.

