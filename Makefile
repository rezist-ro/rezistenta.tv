default:
	pipenv run flask run --host=0.0.0.0 --port=5001
thumbs:
	pipenv run python update_thumbs.py
	mogrify -fuzz 10% -trim +repage static/thumbs/*
deps:
	pipenv update
production:
	git fetch
	git reset --hard origin/master
	make deps
	pipenv run supervisorctl reread
	pipenv run supervisorctl restart all
