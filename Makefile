default:
	make server &
	make client

client:
	node_modules/.bin/gulp watch

server:
	flask run --host=0.0.0.0 --port=5001

thumbs:
	python update_thumbs.py
	mogrify -fuzz 10% -trim +repage static/thumbs/*

deps:
	npm install
	pipenv update

production:
	git fetch
	git reset --hard origin/master
	make deps
	node_modules/.bin/gulp build
	supervisorctl reread
	supervisorctl restart all
	curl \
		-X DELETE "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE}/purge_cache" \
	 	-H "X-Auth-Email: ${CLOUDFLARE_EMAIL}" \
		-H "X-Auth-Key: ${CLOUDFLARE_APIKEY}" \
		-H "Content-Type: application/json" \
		--data '{"purge_everything":true}'
