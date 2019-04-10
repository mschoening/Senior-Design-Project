<!DOCTYPE html>
<html>
    <head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="Scripts/jquery.flickry.min.js"></script>	
        <link rel="stylesheet" href="Styles/jquery.flickry.css" />
        <link rel="stylesheet" href="Styles/flickry_style.css" />
    </head>
    <body>
        <h1>Database Error:</h1>
        <p>Failed to connect to the database!</p>
        <p><?php echo $error_message; ?></p>
        <br>

        <!-- will try to reload last page -->
        <form method="post">
            <input type="submit" value="Try Again?">
        </form>
    </body>
</html>