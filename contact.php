<!DOCTYPE html>
<html>
    <head>
        <title>Morpheus Training - Contact Us</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <?php require 'head.html'; ?>
		<?php 
		    require '../db/mimis.php';
			echo '<script async defer src="http://maps.googleapis.com/maps/api/js?key='.gMapToken().'&callback=initMaps"></script>';

	    ?>
		<script type="text/javascript" src="js/hmu.js"></script>
	</head>
    <body>
	<div class="page">
        <?php require 'topBar.html'; ?>
		
		<div class="content">
        <section class="border1">
			<h2>Contact Us</h2>
			<div class="image">
			    <img alt="icons: contact methods" src="img/contact_720.jpg">
			</div>
			<div class="clearFloat"></div>
		</section>
		
		<section class="border1">
            <div class="items contacts">
			    <div class="item contactInfo" data-who="General"></div>
			    <div class="item contactInfo" data-who="Ian Crawford"></div>
    		    <div class="clearFloat"></div>
			</div>
		</section>
				
	    </div>
    <?php require 'footer.html'; ?>    
    </body>
</html>