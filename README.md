# How to Use Pemilu Backend Using Postman

Steps to use authorization on postman:

1. Login first and get the token
2. Click the Authorization tab
3. Choose type "Bearer Token" on the left side
4. Insert the token to Token coloumn on the right side

## LIST OF CONTENT
1. [AUTH](#AUTH)
2. [USER](#USER)
3. [ARTICLES](#ARTICLES)
4. [PASLON](#PASLON)
5. [PARTAI](#PARTAI)
6. [VOTE](#VOTE)
7. [NOTE](#NOTE)

## **AUTH**
1. Register Admin
* Url : http://localhost:5000/api/v1/admin/register
* Method : `POST`
* Json body example :

        {
            "name" : "Slamet Wilujeng",
            "address" : "Desa Kokoyashi no 3 Pulau Cocoon",
            "gender" : "male",
            "username" : "Eslamet",
            "password" : "akusukapisang"
        }

*  Form-data body example :
```
    name        = Slamet Wilujeng,
    address     = Desa Kokoyashi no 3 Pulau Cocoon
    gender      = male
    username    = Eslamet
    password    = akusukapisang
```

2. Register User
* Url : http://localhost:5000/api/v1/user/register
* Method : `POST`
* Json body example :

        {
            "name" : "Slamet Wilujeng",
            "address" : "Desa Kokoyashi no 3 Pulau Cocoon",
            "gender" : "male",
            "username" : "Eslamet",
            "password" : "akusukapisang"
        }

*  Form-data body example :
```
    name        = Slamet Wilujeng,
    address     = Desa Kokoyashi no 3 Pulau Cocoon
    gender      = male
    username    = Eslamet
    password    = akusukapisang
```

3. Login
* Url       : http://localhost:5000/api/v1/login
* Method    : `POST`
* Json body example :

        {
            "username" : "Eslamet",
            "password" : "akusukapisang"
        }
*  Form-data body example :
```
    username    = Eslamet
    password    = akusukapisang
```

note: you will receive token that you can use to do authorization with

## **USER**

1. Getting all user (required admin authorizaton)
* Url       : http://localhost:5000/api/v1/user
* Method    : `GET`
  
2. Getting a user (required admin authorizaton)
* Url       : http://localhost:5000/api/v1/user/{user-id}
* Method    : `GET`

3. Getting personal information (required authorizaton)
* Url       : http://localhost:5000/api/v1/user-current
* Method    : `GET`
  
4. Updating personal information (required authorization)
* Url       : http://localhost:5000/api/v1/user-current
* Method    : `PATCH`
* Json body example :

        {
            "name" : "Slamet Wilujeng",
            "address" : "Desa Kokoyashi no 3 Pulau Cocoon",
            "gender" : "male"
        }

*  Form-data body example :
```
    name        = Slamet Wilujeng,
    address     = Desa Kokoyashi no 3 Pulau Cocoon
    gender      = male
```

5. Update a user (required admin authorizaton)  
* Url       : http://localhost:5000/api/v1/user/{user-id}
* Method    : `PATCH`
* Json body example :

        {
            "name" : "Slamet Wilujeng",
            "address" : "Desa Kokoyashi no 3 Pulau Cocoon",
            "gender" : "male"
        }

*  Form-data body example :
```
    name        = Slamet Wilujeng,
    address     = Desa Kokoyashi no 3 Pulau Cocoon
    gender      = male
```

6. Delete a user (required admin authorization)
* Url       : http://localhost:5000/api/v1/user/{user-id}
* Method    : `DELETE`

## **ARTICLES**

1. Getting all articles (no authorization)
* Url       : http://localhost:5000/api/v1/articles
* Method    : `GET`
  
2. Getting a article (no authorization)
* Url       : http://localhost:5000/api/v1/articles/{article-id}
* Method    : `GET`

3. Getting all articles cards (no authorization)
* Url       : http://localhost:5000/api/v1/articles-card
* Method    : `GET`
  
4. Getting a article card (no authorization)
* Url       : http://localhost:5000/api/v1/articles-card/{article-id}
* Method    : `GET`

5. Create a article (required admin authorizaton)
* Url       : http://localhost:5000/api/v1/articles/
* Method    : `POST`
* Form-data body example :
```
    title       = Paslon *** Tertangkap Kamera Sedang Membeli Body Pillow Bergambar Miku
    description = Paslon *** Tertangkap Kamera Sedang Membeli Body Pillow Bergambar Miku
    image       = miku.png
```

6. Update a article (required admin authorizaton)  
* Url       : http://localhost:5000/api/v1/articles/{article-id}
* Method    : `PATCH`
* Form-data body example :
```
    title       = Paslon *** Tertangkap Kamera Sedang Membeli Body Pillow Bergambar Miku
    description = Paslon *** Tertangkap Kamera Sedang Membeli Body Pillow Bergambar Miku
    image       = miku.png
```

7. Delete a article (required admin authorization)
* Url       : http://localhost:5000/api/v1/articles/{article-id}
* Method    : `DELETE`

note : you can use article card for the homepage

## **PASLON**

1. Getting all paslon (no authorization)
* Url       : http://localhost:5000/api/v1/paslon
* Method    : `GET`
  
2. Getting a paslon (no authorization)
* Url       : http://localhost:5000/api/v1/paslon/{paslon-id}
* Method    : `GET`

3. Create a paslon (required admin authorizaton)
* Url       : http://localhost:5000/api/v1/paslon
* Method    : `POST`
* Form-data body example :
````
    name          = Slamet Wilujeng
    visionMission = Menghilangkan pinjol dari dumbways
    image         = slamet.png
````
4. Update a paslon (required admin authorizaton)
* Url       : http://localhost:5000/api/v1/paslon/{paslon-id}
* Method    : `PATCH`
* Form-data body example :
```
    name          = New Neo Slamet Wilujeng
    visionMission = Menghilangkan pinjol dari dumbways dan ****
    image         = slamet.png
```
5. Delete a paslon (required admin authorization)
* Url       : http://localhost:5000/api/v1/paslon/{paslon-id}
* Method    : `DELETE`

## **PARTAI**

1. Getting all partai (no authorization)
* Url       : http://localhost:5000/api/v1/partai
* Method    : `GET`
  
2. Getting a partai (no authorization)
* Url       : http://localhost:5000/api/v1/partai/{partai-id}
* Method    : `GET`

3. Create a partai (required admin authorizaton)
* Url       : http://localhost:5000/api/v1/partai
* Method    : `POST`
* Form-data body example :
```
    name            = PBG
    partyLeader     = Slamet Wilujeng
    visionMission   = Menghijaukan bumi
    address         = Hutan Jaya
    image           = slamet.png
    paslonId        = 1
```
4. Update a partai (required admin authorizaton)
* Url       : http://localhost:5000/api/v1/partai/{partai-id}
* Method    : `PATCH`
* Form-data body example :
```
    name            = PBG
    partyLeader     = Slamet Wilujeng
    visionMission   = Menghijaukan bumi
    address         = Hutan Jaya
    image           = slamet.png
    paslonId        = 1
```
5. Delete a partai (required admin authorization)
* Url       : http://localhost:5000/api/v1/partai/{partai-id}
* Method    : `DELETE`

## **VOTE**

1. Getting all voters data (required admin authorization)
* Url       : http://localhost:5000/api/v1/vote
* Method    : `GET`

2. Getting a voter data (required admin authorization)
* Url       : http://localhost:5000/api/v1/vote/{vote-id}
* Method    : `GET`

2. Voting (required authorization)
* Url       : http://localhost:5000/api/v1/vote/
* Method    : `POST`
* Json body example :

        {
            "paslonNumber" : 1
        }
* Form-data body example :
```
    paslonNumber = 1
```

#### NOTE
* you can update everything or just update the part that you need, no need to reupload image.
* user and admin can do voting