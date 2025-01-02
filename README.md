
### Steps to Run the App

1. Clone the repository:
   ```bash
   git clone https://github.com/AVINASH34/nodejs.git
   cd nodejs
   ```

2. Build the Docker image:
   ```bash
   docker build -t dockerized-node-app .
   ```

3. Run the Docker container:
   ```bash
   docker run -dp 3000:3000 dockerized-node-app
   ```

4. Access the app in your browser at `http://<host-ip>:3000`.

---

## 4. Project Structure

```
dockerized-node-app/
├── public/               # Frontend files
│   ├── index.html        # Main HTML file
│   ├── styles.css        # Stylesheet
│   └── script.js         # JavaScript for interactivity
├── index.js              # Node.js backend
├── package.json          # Node.js project metadata
├── Dockerfile            # Docker image instructions
└── .dockerignore         # Files to ignore in Docker build
```

