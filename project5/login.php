<html>
	<head>
		<title>Login-Message Board</title>
	</head>
	<body>
		<form method="POST">
			Username: <input type="text" name="user"/>
			</br></br>
			Password: <input type="password" name="pass"/>
			</br></br>
			<input type="submit" name="login" value="Login"/>
            <input type="submit" name="register" value="Register"/>
		</form>
	</body>
	<?php
		session_start();
		if(isset($_GET["logout"])){
			session_destroy();
			header("location: login.php");
		}
		if(isset($_POST["login"])) {	
			$pass = md5($_POST["pass"]);
			$user = $_POST["user"];
			try {
			  $dbh = new PDO("mysql:host=127.0.0.1:3306;dbname=album","root","",array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
			  $stmt = $dbh->prepare('select username from users where password=:pass and username=:user');
			  $stmt->bindParam(':pass', $pass); 
			  $stmt->bindParam(':user', $user);
			  $stmt->execute();
			  $count = $stmt->rowCount();
			  if($count==0){
				  print "<b>Error: Username/Password is incorrect</b>";
			  } else{
				  $_SESSION['user'] = $user;
				  header("location: album.php");
				  print "<b>Success!!<b>";
			  }
			} catch (PDOException $e) {
			  print "Error!: " . $e->getMessage() . "<br/>";
			  die();
			}
		}
        if(isset($_POST["register"])) {	
			session_destroy();
			header("location: register.php");
		}
	?>
</html>