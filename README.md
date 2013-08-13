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

1. dev commit
2. local test
3. push github dev (saving/history)
...
4. branch -b staging or checkout staging
4.1. merge dev
4.2 tag -a Cx.y-r01-2013.06.12
5. local test, change + commit
...
6. push github + heroku
7. heroku test, local change + commit + push
...
8. checkout prod 
9. merge staging
10. tag -a/-s Vx.y-2013.06.14 -m
11. push github prod + heroku, push github --tags

12. local checkout dev
13. merge staging 
14. goto 1

 
# 

