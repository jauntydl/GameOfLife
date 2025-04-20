Prerequisites :
  1. node.js (v22.6.0 or later) - https://nodejs.org/en/download/package-manager
  2. Docker Desktop (v27.2.0 or later) - https://www.docker.com/get-started/


Instructions to run the app locally :

  Python FastAPI
    1. open terminal in project root folter '/'
    2. type "cd API" to move into API folder
    3. type "docker compose up --build" to host API on your local machine
      * Ensure the Docker Daemon is running in the background (open Docker desktop)
      * API uses port 7777, if the port is taken, please make sure to free the port before running the API
      * Once API is running, you can visit http://localhost:7777/docs to see its documentation
      * API needs to be running for the app to be functional

  Next.js (WebApp)
    1. open terminal in project root folter '/'
    2. run "npm install" 
      - try "npm install -f" if installation fails due to legacy-peer-dependancy issue

    3. After installation is complete, run "npm run dev"

  once API and WebApp are both running,
  open a browser and go to : http://localhost:7777/ to open the app.
