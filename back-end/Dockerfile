# Sets up a python and linux environment
FROM python:3.8-slim-buster

# Creates the docker directory
COPY . /app
RUN ls
WORKDIR /app

# Installs python packages
RUN pip install -r ./backend/requirements.txt
RUN pip3 install psycopg2

# Need to write npm run build
RUN cd ./frontend && npm install && npm run build

# Exposes port 5000 which Flask app will use to the container so that later it can be mapped with the system's port
EXPOSE 5000

COPY . /app

# Runs <python main.py> when we start our terminal
ENTRYPOINT [ "python" ]
CMD [ "./backend/main.py" ]