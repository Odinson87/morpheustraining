<!DOCTYPE html>
<html>
    <head>
        <title>Morpheus Training - Admin</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <?php require 'head.html'; ?>
        <?php require '../../db/mimis.php'; ?>
	</head>
    <body>
	<div class="page">
        <?php require 'topBar.html'; ?>
		
		<div class="content">
        <section class="border1">
			<h2>Edit</h2>
			<div class="items extraSpace">
				<h3 class="itemsTitle">Add Client Feedback</h3>
			    <div class="item">
					<div class="icon">
					    <img src="../img/ui_icons/user_input.png">
					</div>
    				<h3>Enter feedback details:</h3>
					<div class="item_content" data-type="add_comment">
					    <label for="person">Person:</label>
					    <input type="text" size="24" name="person">
   					    <label for="feedback">Feedback:</label>
					    <textarea rows="3" cols="28" name="feedback"></textarea>
					    <label for="dateTime">Date/Time:</label>
					    <input type="text" size="24" name="dateTime" value="dd/mm/yy 00:00:00">
					</div>
                	<a class="btn submit">
			           + Add Feedback
			        </a>					
				</div>
				<div class="clearFloat"></div>
			</div>	
			<div class="clearFloat"></div>
		</section>
		
				
	    </div>
    <?php require 'footer.html'; ?>    
    </body>
</html>