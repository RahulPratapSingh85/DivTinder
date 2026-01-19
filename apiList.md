## DevTinder APIs


## authRouter
-post/signup
-post/login
-post/logout

## profileRouter
-GET/profile/view
-patch/profile/edit
-PATCH/profile/password

## connectionRequestRouter
-post/request/send/intereted/:userId
-post/request/send/ignore/:userId
-post/request/review/accepted/:requestId
-post/request/review/rejected/:requestId

## userRouter
-GET/user./connection
-GET/user/request
-GET/user/feed-get you the profiles of other users on platform

## status: ignore, interested, accepted, rejected
