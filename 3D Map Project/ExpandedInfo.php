<?php
require("Model/Desc_DB.php");

function string_list($array) //formats array into English sentence list
{
    //Pre:  $array is an array object
    //Post: returns a string of $array elements
    //      if $array is empty, then returns NULL

    if (!empty($array))
    {
        $string = '';
        $count = count($array);

        /* concatenate all mosque names into one string */
        for ($index = 0; $index < $count; $index++)
        {
            $prepend = '';  //will be prepended to mosque name

            if ($index > 0) //if mosque needs delimiter
            {
                if ($count > 2) //if list needs commas
                {
                    $prepend .= ', ';
                }

                if ($index == $count - 1) //if last mosque in list
                {
                    $prepend .= 'and ';
                }
            }

            $string .= $prepend . $array[$index];
        }

        return $string;
    }
    
    return NULL;
}

$id = filter_input(INPUT_GET, 'id');
$id = htmlspecialchars($id);

if ($id == NULL)
{
    $mosque = NULL;
}
else
{
    $mosque = get_mosque($id);
}

if ($mosque != NULL)
{
    /* grab the initial mosque fields from the queried array */
    $name           = $mosque['name'];
    $address        = $mosque['address'];
    $phone_num      = $mosque['phoneNum'];
    $website        = $mosque['website'];
    $ethnicity      = $mosque['ethnicity'];
    $denomination   = $mosque['denomination'];
    $incorp_date    = $mosque['incorpDate'];
    $open_date      = $mosque['openDate'];
    $reloc_date     = $mosque['relocDate'];
    $diss_date      = $mosque['dissDate'];
    $full_desc      = $mosque['fullDesc'];
    $history        = $mosque['history'];
    $album_id       = $mosque['albumId'];
	$f_book     	= $mosque['fBook'];
	$insta	        = $mosque['insta'];
	$lara	        = $mosque['lara'];
	$f_members      = $mosque['fMembers'];

    /* reformat dates for easier reading */

    /* process 'precedes' and 'succedes' fields */
    $prec_arry = get_preceding_mosque_names($id);
    $precedes = string_list($prec_arry);
    
    $succ_arry = get_succeeding_mosque_names($id);
    $succedes = string_list($succ_arry);
}

?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <!-- enable RWD -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- jQuery library-->
        <script src='http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.5/jquery-ui.min.js'></script>
        <script type="text/javascript" src="js/jquery-1.11.2.min.js"></script>  
        <script type="text/javascript" src="js/jquery-ui.min.js"></script>
        <link rel="stylesheet" type="text/css" href="Styles/styleExpandedInfo.css" />  
        <link href='http://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
    </head>
<?php if ($mosque == NULL): ?>
    <body>
        <p>
            Oops! Something went wrong!
            You should not be able to see this text under normal circumstances.
            Please close out of this window and try again!
        </p>
    </body>
<?php else: ?>
    <body>

        <!-- Name -->
        <?php if ($name): ?>
        <h1 id="name"><?php echo $name; ?></h1>
        <?php endif; ?>

        <!-- Incorporation Date -->
        <?php if ($incorp_date): ?>
        <h3 id="incorpDt">Incorporated: <?php echo $incorp_date; ?></h3>
        <?php endif; ?>

        <!-- Opening Date -->
        <?php if ($open_date): ?>
        <h3 id="openDt">Opened: <?php echo $open_date; ?></h3>
        <?php endif; ?>

        <!-- Relocation Date -->
        <?php if ($reloc_date): ?>  
        <h3 id="relocDt">Relocated: <?php echo $reloc_date; ?></h3>
        <?php endif; ?>

        <!-- Dissolution Date -->
        <?php if ($diss_date): ?>
        <h3 id="dissDt">Dissolved: <?php echo $diss_date; ?></h3>
        <?php endif; ?>

        <!-- Address -->
        <?php if ($address): ?>
        <h3 id="addr">Address: <?php echo $address; ?></h3>
        <?php endif; ?>

        <!-- Phone Number -->
        <?php if ($phone_num): ?>
        <h3 id="phoneNum">Phone Number: <?php echo $phone_num; ?></h3>
        <?php endif; ?>

        <!-- Website -->
        <?php if ($website): ?>
        <h3 id="web">Website: <?php echo $website; ?></h3>
        <?php endif; ?>
		
		<!-- Facebook Page -->
        <?php if ($f_book): ?>
        <h3 id="web">Facebook Page: <?php echo $f_book; ?></h3>
        <?php endif; ?>
		
		<!-- Instagram Page -->
        <?php if ($insta): ?>
        <h3 id="web">Instagram Page: <?php echo $insta; ?></h3>
        <?php endif; ?>
		
		<!-- LARA Link -->
        <?php if ($lara): ?>
        <h3 id="web">LARA Link: <?php echo $lara; ?></h3>
        <?php endif; ?>

        <!-- Ethnicity -->
        <?php if ($ethnicity): ?>
        <h3 id="ethnic"> Primary Ethnicity: <?php echo $ethnicity; ?></h3>
        <?php endif; ?>

        <!-- Denomination -->
        <?php if ($denomination): ?>
        <h3 id="denom"> Denomination: <?php echo $denomination; ?></h3>
        <?php endif; ?>

        <!-- Preceded By -->
        <?php if ($precedes): ?>
        <h3 id="prec">Preceded by: <?php echo $precedes; ?></h3>
        <?php endif; ?>

        <!-- Succeded By -->
        <?php if ($succedes): ?>
        <h3 id="succ">Succeded by: <?php echo $succedes; ?></h3>
        <?php endif; ?>
		
		<!-- Founding Members -->		
		<?php if ($f_members): ?>
        <h3 id="succ">Founding Members: <?php echo $f_members; ?></h3>
        <?php endif; ?>

        <!-- Full Description -->
        <?php if ($full_desc): ?>
        <br><h2 id="desc">Description:</h2>
        <p><?php echo $full_desc; ?></p>
        <?php endif; ?>

        <!-- History -->
        <?php if ($history): ?>
        <br><h2 id="hist">History:</h2>
        <p><?php echo $history; ?></p>
        <?php endif; ?>

        <!-- Photo Gallery -->
        <?php if ($album_id): ?>
        
        <!-- set photoset id variable -->
        <script type="text/javascript">
            var photo_id = "<?php echo $album_id ?>";
        </script>

        <!-- start niceGallery scripts --> 
        <script type="text/javascript" src="js/custom.js"></script>  
        <script type="text/javascript" src="js/FlickrAPI.js"></script>
        <script type="text/javascript" src="js/Flickr.Gallery.js"></script>
        <link rel="stylesheet" type="text/css" href="gallery.css" />
        <!-- end niceGallery scripts -->
        
        <h3 id="photo"> Tap Photos to View Larger Size</h3>

        <div class="content"> 
    	<!-- gallery STRUCTURE -->
    	<div class="niceGallery" id="gallery">
        <!-- HERE IS PLACE FOR PHOTOS -->
    	</div>
	    <!-- end gallery STRUCTURE --> 
        </div>

        <?php endif; ?>
    </body>
<?php endif; ?>
</html>