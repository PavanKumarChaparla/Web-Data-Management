<!DOCTYPE html>
<?php 
            error_reporting(E_ERROR | E_PARSE);
            $target_dir = "images/";
            $htmlUpload = "";
            if($_FILES){
                $target_file = $target_dir . basename($_FILES["image"]["name"]);
                $uploadOk = 1;
                $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
                if(isset($_POST["submit"])) {
                $check = getimagesize($_FILES["image"]["tmp_name"]);
                if($check !== false) {
                    $uploadOk = 1;
                } else {
                    echo "File is not an image.";
                    $uploadOk = 0;
                }
                }
                if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
                && $imageFileType != "gif" && $imageFileType!= "jfif" ) {
                echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
                $uploadOk = 0;
                }
                
                if ($uploadOk == 0) {
                echo "Sorry, your file was not uploaded.";
                } else {
                if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
                    $htmlUpload = '<h2 id="uploadHeader">Your Image Has been uploaded Succesfully</h2>';
                } else {
                    echo "Sorry, there was an error uploading your file.";
                }
                }
            }
?>
<html lang="en">
   <head>
      <meta charset="UTF-8">
      <title>PHOTO ALBUM</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   </head>
   <body>
        <h1 style="text-align:center"><a>PHOTO ALBUM</a></h1>
        <div class="upload_container">
            <br clear="all" />
            <div id='preview'></div>
            <form enctype="multipart/form-data" action="" method="post" class="change-pic">
            Upload a File:
            <input type="file" name="image" id="image">
            <input type="submit" name="submit" value="Start Upload">
            </form>
        </div>
        <p>
            <?php
                echo $htmlUpload;
            ?>
        </p>
        <div class="select_image" id="select-image" style="display: none">
            <img id="imageSelected" class="rounded text-center" src="" width="350" height="400" style="display: block;
                        margin-left: auto;
                        margin-right: auto;">
        </div>

        <div class="list_of_images">
        <h3>List Of Images in Images Folder. CLick on any Image to Display and Download!</h3>    
        <?php            
            $directory = "images";
            $exts = array('jpeg', 'jpg', 'gif', 'png');
            if (substr($directory, -1) == '/') {
                $directory = substr($directory, 0, -1);
            }
            $html = '';
            if (
                is_readable($directory)
                && (file_exists($directory) || is_dir($directory))
            ) {
                $directoryList = opendir($directory);
                while($file = readdir($directoryList)) {
                    if ($file != '.' && $file != '..') {
                        $path = $directory . '/' . $file;
                        if (is_readable($path)) {
                            if (is_file($path)) {
                                $html .= '<a href="' . $path . '" download> <p id='.$path.' onclick="displayImage(id)"><script type="text/javascript">
                                function displayImage(id){
                                    document.getElementById("select-image").style.display = "";
                                    document.getElementById("imageSelected").src = id;
                                    document.getElementById("uploadHeader").style.display = "none";
                                }
                                </script>' . $file . '</p> </a>';      
                            }
                        }
                    }
                }
                echo $html;
                closedir($directoryList);
            }
            ?>
        </div>
   </body>
</html>
