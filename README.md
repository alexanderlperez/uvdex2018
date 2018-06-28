
#Saxon Health


##System Requirements
1. PHP (Version 7.0.0+)
2. Composer
3. Git
4. NPM
5. Mysql (Version 5.6.35)
6. 1 GB Ram(at least)
7. Apache Web Server(Version 2.4)



## Framework Used
1. Laravel 5.5.26 for PHP
2. React for frontend

## Project Setup
1. Git clone the repository.
2. Run composer install to load PHP dependencies to root of project folder.

    ```shell
    composer install
    ```
3. Run npm install to load Node dependencies to root of project folder.

    ```shell
    npm install
    ```
4. Create a .env file to the root of the project folder if not created by copying the .env.example file.
5. Setup the configuration of app environment as local, database connection and other settings in .env file.
6. Setup virtual host and point the document location to public folder.
7. Turn on mod_rewrite engine for apache.
8. Setup database by running migration command

    ```shell
    php artisan migrate
    ```
9. Set some default users by running seed command

    ```shell
    php artisan db:seed
    ```  
10. Create the symbolic link for storage

    ```shell
     php artisan storage:link
    ```  

##Folder Structure
```
.
+-- app
+-- bootstrap
+-- config
+-- database
+-- public
|	+-- css
|	+-- js
|	+-- fonts
|	+-- img
+-- resources
|	+-- assets
|	+-- lang
|	+-- views
+-- routes
|	+-- routes
+-- storage
+-- tests
+-- vendor
```
