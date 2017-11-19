default:
	pipenv run flask run --host=0.0.0.0 --port=5001 &
	node_modules/.bin/gulp watch
thumbs:
	pipenv run python update_thumbs.py
	mogrify -fuzz 10% -trim +repage static/thumbs/*
deps:
	npm install
	pipenv update
production:
	git fetch
	git reset --hard origin/master
	make deps
	gulp build
	pipenv run supervisorctl reread
	pipenv run supervisorctl restart all
