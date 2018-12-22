[stArtRef.io](https://startref.io/)
# Why make it?

I wrote about it on [Medium](https://medium.com/thelostcreatives/startrefio-d1781777dbb1)

Some of the art I was able to make with it: [Instagram](https://www.instagram.com/explore/tags/startrefio/)


## Frontend
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). <br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Backend
Firebase services are being used.
  - real-time database
  - auth
  - hosting
  
Photos are from [Unsplash](https://unsplash.com/) and Instagram [@startrefio](https://www.instagram.com/startrefio/) through https://startref-backend.herokuapp.com/random-photos and https://startref-backend.herokuapp.com/scribbles api endpoints. It does not save image files, it stores image urls instead. <br>

The reason why the scribble image has a twitter url is because after the image is posted on instagram, its also shared to tumblr then an [IFTTT](https://ifttt.com/) applet is used to send it to twitter. The twitter api is then used to get the url from twitter and store it in the firebase real-time database. This way, it takes less time to share all the scribbles to the three social platforms. <br>

Unsplash data is stored only if the user saves a Ref Set (3 random photos).