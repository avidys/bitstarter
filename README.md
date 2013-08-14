# git workflow

local 
- dev 
- staging + tag s1.0

github
- dev
- staging
- prod + tag v1.0

heroku
- staging
- prod

# developing
1. dev commit
2. local test
3. push github dev (saving/history)
...

#Staging
4. branch -b staging or checkout staging
4.1. merge dev
  git checkout staging
  git merge dev
  git push github staging
  git push staging-heroku staging:master

4.2 tag -a Cx.y-r01-2013.06.12
5. local test, change + commit
...
6. push github + heroku
7. heroku test, local change + commit + push
...

# deploy
8. checkout prod 
9. merge staging
  git checkout master
  git merge staging
  git push production-heroku master:master

10. tag -a/-s Vx.y-2013.06.14 -m
11. push github prod + heroku, push github --tags
    git push staging-heroku staging:master # push again to Heroku
12. local checkout dev
13. merge staging 
14. goto 1

 
 

