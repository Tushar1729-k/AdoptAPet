# # Sets up a python and node.js environment
# FROM python:3.8-slim-buster

# # Creates the docker directory
# COPY . /app
# RUN ls
# WORKDIR /app

# # Installs python packages
# RUN pip install -r ./requirements.txt

# # Need to write npm run build
# # RUN cd ../frontend && npm install && npm run build

# # Exposes port 5000 which Flask app will use to the container so that later it can be mapped with the system's port
# EXPOSE 5000

# COPY . /app

# # Runs <python main.py> when we start our terminal
# ENTRYPOINT [ "python" ]
# CMD [ "./main.py" ]

FROM python
# ENV DEBIAN_FRONTEND=noninteractive

# RUN apt-get update -y
# RUN apt-get install -y python3
# RUN apt-get install -y python3-pip python3-dev build-essential vim
# RUN apt-get install -y libmysqlclient-dev libpq-dev postgresql
# RUN apt-get -y install nginx

COPY . usr/src/backend
COPY requirements.txt usr/src/backend/requirements.txt

WORKDIR /usr/src/backend

RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt
RUN pip3 install psycopg2

EXPOSE 80
EXPOSE 5000

# RUN chmod +x ./main.py
# ENTRYPOINT [ "python3" ]
# ENTRYPOINT [ "/bin/sh" ] for command line interface - something like this /bin/sh ?
# CMD [ "./main.py" ]
# CMD [ "flask", "run", "--host", "0.0.0.0", "-p", "5000" ]
ENTRYPOINT python main.py