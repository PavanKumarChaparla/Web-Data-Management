<html lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
		<title>Message Board Registration</title>
	</head>
	<body>
		<div style="text-align: center;">
			<form  method="POST" style="text-align: center;">
				<label><b>Enter Details Of New User</b></label><br/>
                <label><b> Full Name: </b><input type="text" name="fullname"/></label><br/>
                <label><b>  Username: </b><input type="text" name="username"/></label><br/>
                <label><b>   Password: </b><input type="password" name="password"/></label><br/>
                <label><b>    Email-Id: </b><input type="text" name="email"/></label><br/>
				<input type="submit" value="Submit" name="Submit"/><br/><br/>
			</form>
		</div>
<?php
session_start();
if(isset($_POST["Submit"])) {
	try {
        $dbh = new PDO("mysql:host=127.0.0.1:3306;dbname=album","root","",array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
		$dbh->beginTransaction();
        $stmt = $dbh->prepare('select * from users');
        $stmt->execute();
        print "<pre>";
        $newUser = true;
        while ($row = $stmt->fetch()) {
            if($_POST["username"] == $row[0] || $_POST["email"] == $row[3])
            {
                $newUser = false;
            }
        }
        if($newUser){
            $tmpfname = tempnam("./tmp", "FOO");
            print($tmpfname);
            unlink($tmpfname);
            $directory = basename($tmpfname,'.tmp');         // $file is set to "index.php"
            mkdir($directory);
            $dbh->exec('insert into users values("'.$_POST["username"].'","' . md5($_POST["password"]) . '","'.$_POST["fullname"].'","'.$_POST["email"].'","'.$directory.'")')
                    or die(print_r($dbh->errorInfo(), true));
            $dbh->commit();
            $_SESSION['user'] = $_POST["username"];
			header("location: album.php");
			print "<b>Success!!<b>";
        }else{
            print_r("This user already exists! Please create a new User");
        }
	} catch (PDOException $e) {
		print "Error!: " . $e->getMessage() . "<br/>";
		header("Location:album.php");
		die();
	}
}
?>
	</body>
</html>