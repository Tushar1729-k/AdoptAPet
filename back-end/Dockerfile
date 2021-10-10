# Sets up a python and node.js environment
FROM nikolaik/python-nodejs

# Creates the docker directory
COPY . /app
RUN ls
WORKDIR /app

# Installs python packages
RUN pip install -r ./requirements.txt

# Need to write npm run build
# RUN cd ../frontend && npm install && npm run build

# Exposes port 5000 which Flask app will use to the container so that later it can be mapped with the system's port
EXPOSE 5000

COPY . /app

# Runs <python main.py> when we start our terminal
ENTRYPOINT [ "python" ]
CMD [ "./main.py" ]
