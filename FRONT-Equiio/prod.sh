ng build --prod
cd dist/front-equiio
zip front.zip -r *
scp front.zip root@207.154.228.121:/home/milou/app/public
