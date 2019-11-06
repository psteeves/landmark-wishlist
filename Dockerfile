FROM ubuntu
EXPOSE 5000

ENV LC_ALL=C.UTF-8 LANG=C.UTF-8

RUN apt-get update \
	&& DEBIAN_FRONTEND=noninteractive apt-get install -y -qq \
        python3.7 \
	python3-pip \
	&& rm -rf /var/lib/apt/lists/*

WORKDIR /srv/app/

COPY requirements.txt /srv/app/

RUN pip3 install --requirement requirements.txt --no-cache-dir

COPY *.py .env /srv/app/

CMD ["python3", "app.py"]
