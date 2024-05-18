<!DOCTYPE html>
<html>
    <head>
        <title>Morpheus Training - Leadership and Development Management</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <?php require 'head.html'; ?>
		<script type="text/javascript" src="js/jquery-ui.js"></script>
        <script type="text/javascript" src="js/jquery.ui.touch-punch.min.js"></script>
 	<style type="text/css">
	    *{margin:0;padding:0;}
		section[data-type="quiz"]{
		    /*margin:10px;
			padding:5px;*/
			border:solid 1px #ccc;
			font-family:'Arial',sans-serif;
		}
		
		/*ol{ padding-left:16px;}*/
		ol{ list-style-type:none;}
		
		.question,.results {margin:10px; border:solid 1px #ccc; border-radius:4px; padding:10px 0px;}
		.question > *, .results > *{margin:10px;}
    	.question > *:first-child, .results > *:first-child{margin-top:0px;} 
		.question > *:last-child, .results > *:last-child{margin-bottom:0px;} 
		.question .items > *{ position:relative; margin:10px 0px; padding:10px; border:solid 1px #ccc; border-radius:4px;}
		.results > *{padding:10px; border:solid 1px #ccc; border-radius:4px;}
		.result[data-title="score"] > div[data-title="your score"],
		.result[data-title="score"] > div[data-title="max score"]{display:inline; margin: 0px 5px; font-weight:bold;}
		
		.border1 > .question{margin:0px;}
		
		.sortable > * {background-color:#fff;}
		
        .updownBtns{width:66px;}
		.upBtn, .dnBtn{
		  float:left;
		  margin:5px 5px 0px 0px;
		  display:block;
		  width:28px;
		  height:28px;
		  border-radius:28px;
		  text-indent:-9999px;
		  background: url(img/likeDislike3.png) 0px 0px;
		  overflow:hidden;
		  cursor:pointer;
		}
		.dnBtn{background-position:-28px 0px;}
		
		.indicator{
		  position: absolute;
		  right:6px;
		  top:6px;
		  display:block;
		  width:28px;
		  height:28px;
		  background-image: url(img/correct-incorrect.png);
		  border-radius:28px;
		  overflow:hidden;
		}
		.indicator.correct{background-color:#99cc33; background-position: 0px 0px;}
		.indicator.incorrect{background-color:#e3131a; background-position: -28px 0px;}
		
		.qNav, .rNav{padding:7px 0px; border:none;}
		.qNav .prevBtn,
		.qNav .nextBtn,
		.qNav .submitBtn,
		.rNav .reviewBtn{
		  margin-right:5px;
		  padding:7px;
		  background-color:#ccc;
		  border-radius:4px;
		  font-weight:700;
		  color:#333;
		  cursor:pointer;
		}
		
		.qNav .prevBtn:hover,
		.qNav .nextBtn:hover,
		.qNav .submitBtn:hover{
		  background-color:#bbb;
		}
		
		.green{background-color:#99cc33;}
		.dgreen{background-color:#77b000; background-position:0 -28px;}
    	.red{background-color:#e3131a;}
    	.dred{background-color:#be0000; background-position:-28px -28px;}
		
		div.clearFloat{clear:both; padding:0; margin:0px; border:none;}
		.hidden{display:none;}

		
	</style>
	
	
	<script type="text/javascript">
		$(function(){
			// create object;
			var quizObj = {
			  'itemSets':{'k':[]},    
			  'settings':{
			    'submit':'one',
			    'scrambleAll':true,
				'review':'one'
			  },
			  'settingfn':{
			    'scramble':function(el){
                  // get array of list items 
                  var elArr = el.children();
                  // randomise list items
                  elArr.sort(function(a,b){
                    // Get a random number between 0 and 10
                    var temp = parseInt( Math.random()*10 );
                    // Get 1 or 0, whether temp is odd or even
                    var isOddOrEven = temp%2;
                    // Get +1 or -1, whether temp greater or smaller than 5
                    var isPosOrNeg = temp>5 ? 1 : -1;
                    // Return -1, 0, or +1
                    return( isOddOrEven*isPosOrNeg );
                  })
                  // append list items to ul
                  .appendTo(el);          
				}
			  },
			  'fn':{
			  'updown' : function (el){
			    var itemSet = el.parents('.items');
				var itemSetName = itemSet.attr('data-title');
				var itemTitle = el.parent().parent().attr('data-title');
				var itemCategory = el.parent().parent().attr('data-category');
				if(el.hasClass('upBtn')){
				  // set answer
				  quizObj.itemSets[itemSetName].answer.up = itemTitle;
				  //set category score
				  if( itemCategory != null){ quizObj.results.categories[itemCategory].score++; }
				  // remove other 'selected' (dgreen)
				  itemSet.find('.upBtn').each(function(){
				    var item = $(this).parent().parent();
				    if ($(this).hasClass('dgreen')){
				      $(this).removeClass('dgreen');
				  	  if( itemCategory != null){
					    quizObj.results.categories[item.attr('data-category')].score--;
					  }
					}
				  });
				  if(el.parent().find('.dnBtn').hasClass('dred')){
				    // swap selected option
					el.parent().find('.dnBtn').removeClass('dred');
				    //set category score
					if( itemCategory != null){
					  quizObj.results.categories[itemCategory].score++;
					}
				  }
				  el.addClass('dgreen');
				  //console.log('like');
				} else if (el.hasClass('dnBtn')){
                  // set answer
				  quizObj.itemSets[itemSetName].answer.up = itemTitle;
				  //set category score
				  if( itemCategory != null){ quizObj.results.categories[itemCategory].score--; }
				  // remove other 'selected' (dred)
				  itemSet.find('.dnBtn').each(function(){
				    var item = $(this).parent().parent();
				    if ($(this).hasClass('dred')){
				      $(this).removeClass('dred');
				  	  if( itemCategory != null){
					    quizObj.results.categories[item.attr('data-category')].score++;
					  }
					}
				  });
				  if(el.parent().find('.upBtn').hasClass('dgreen')){
				    // swap selected option
					el.parent().find('.upBtn').removeClass('dgreen');
				    //set category score
					if( itemCategory != null){
					  quizObj.results.categories[itemCategory].score--;
					}
				  }
				  el.addClass('dred');
				  //console.log('dislike');
				}
              },
			  'updownIncrement':function(el){
			    var itemSet = el.parents('.items');
				var itemSetName = itemSet.attr('data-title');
				var itemTitle = el.parent().parent().attr('data-title');
				var itemCategory = el.parent().parent().attr('data-category');
				var info = {
				  'upBtn':{'selector':'.upBtn','oppSelector':'.dnBtn','xColor':'dgreen','oppXcolor':'dred','name':'like'},
				  'dnBtn':{'selector':'.dnBtn','oppSelector':'.upBtn','xColor':'dred','oppXcolor':'dgreen','name':'dislike'}
				}
				var btn = {};
				
				if(el.hasClass('upBtn')){
                  btn = info.upBtn;
				} else if (el.hasClass('dnBtn')){
                  btn = info.dnBtn;
				}
				
				// set answer
				quizObj.itemSets[itemSetName].answer.up = itemTitle;
				//set category score
				if( itemCategory != null){ quizObj.results.categories[itemCategory].score++; }
				// remove other 'selected' (dgreen)
				itemSet.find(btn.selector).each(function(){
				  var item = $(this).parent().parent();
				  if ($(this).hasClass(btn.xColor)){
				    $(this).removeClass(btn.xColor);
					if( itemCategory != null){
				      quizObj.results.categories[item.attr('data-category')].score--;
					}
				  }
				});
				if(el.parent().find(btn.oppSelector).hasClass(btn.oppXcolor)){
				  // swap selected option
				  el.parent().find(btn.oppSelector).removeClass(btn.oppXcolor);
				  //set category score
				  if( itemCategory != null){
				    quizObj.results.categories[itemCategory].score++;
				  }
				}
				el.addClass(btn.xColor);
				//console.log(btn.name);
				
			  },
			  'traverse':function(el){
			    var btn = el.text();
				el.parents('.question').toggleClass('hidden');
				if(btn == 'previous'){
				  if(el.parents('.question').prev('.question').length > 0){
				    el.parents('.question').prev('.question').toggleClass('hidden');
				  } else {
				    $('.results').first().toggleClass('hidden');
				  }
				} else if(btn == 'next' || btn == 'submit'){
				  if(el.parents('.question').next('.question').length > 0){
				    el.parents('.question').next('.question').toggleClass('hidden');
				  } else if(el.parents('.question').next('.results').length > 0){
				    el.parents('.question').next('.results').toggleClass('hidden');
				  }
				}
              },
			  'submit':function(el){
				  var itemSetName = el.parents('.question').find('.items').attr('data-title');
				  if (itemSetName != null){				  
					var answer_type = quizObj.itemSets[itemSetName].answer.type;
					if(answer_type != null){
					  var fncName = 'submit'+ answer_type.charAt(0).toUpperCase() + answer_type.slice(1);
					  //console.log(fncName);
					  quizObj.fn[fncName](itemSetName);
					}
				  }
                  
				  if(quizObj.settings.submit == 'one'){
				    if(el.parents('.question').next('.question').length > 0){	
					  quizObj.fn.traverse(el);
				    } else {
				      quizObj.fn.calcResult();
				    }
				  }
			  },
			  'submitAll':function(){
			     $.each(quizObj.itemSets.k,function(isk,itemSetName){
                   quizObj.fn.submit($('.items[data-title="' + itemSetName + '"]'));
				 });
				 quizObj.fn.calcResult();
			  },
			  'submitOrder':function(itemSetName){
			    var itemSetChildren = $('.items[data-title="'+itemSetName+'"]').children();
				var itemSetObj = quizObj.itemSets[itemSetName];
				// store answer in quizObjs
				itemSetChildren.each(function(){
				  if($(this).text() != null){
				    quizObj.itemSets[itemSetName].answer.a.push($(this).text());
			      }
				});
				// collect correct incorrect answers
				itemSetObj.score={'a':[],'total':0, 'max':itemSetObj.order.length};
				$.each(itemSetObj.order,function(ik,iv){
				  if(iv == itemSetObj.answer.a[ik]){
				    itemSetObj.score.a.push('correct');
				  } else {
				    itemSetObj.score.a.push('incorrect');
				  }
				});
				// calculate points -- need to add in weighted points / points specified on answer item
				$.each(itemSetObj.score.a,function(ak,a){
				  var points = 0;
				  if (a == 'correct'){
				    points++;
				  }
				  itemSetObj.score.total = itemSetObj.score.total + points;
				});
				// add review correct/incorrect
				itemSetChildren.each(function(ck,cv){
				  if(itemSetObj.score.a[ck] == 'correct'){
				    $(cv).append( $('<div>').addClass('indicator correct hidden') );
				  } else if(itemSetObj.score.a[ck] == 'incorrect'){
				    $(cv).append( $('<div>').addClass('indicator incorrect hidden') );
				  }
				});
			  },
			  'submitUpdown':function(itemSetName){
			    //console.log('updown questions auto tally preset categories via the up/down btns');
			  },
			  'calcResult':function(){
			     quizObj.results.score = 0;
			     $.each(quizObj.itemSets.k,function(isk,itemSetName){
				   var itemSet = quizObj.itemSets[itemSetName];
				   var answer_type = itemSet.answer.type;
				   if(answer_type == 'order'){
				     quizObj.results.score = quizObj.results.score + itemSet.score.total;
				   }
				 });
				 var rCat = $('.results[data-type="categories"]');
				 if(rCat.length > 0){				   
				   quizObj.results.categories.k.sort(function(a,b){
                     a = quizObj.results.categories[a].score;
                     b = quizObj.results.categories[b].score;
					 return b-a;
                   });
				   var show = rCat.attr('data-show');
				   if(show == 'all'){
				     $.each(quizObj.results.categories.k,function(ck,c){ 
				       rCat.find('.category[data-title="' + c + '"]' ).removeClass('hidden');
				       rCat.append( rCat.find('.category[data-title="' + c + '"]' ) );
				     });
				   } else {
				     var showArr = show.split(',');
					 $.each(showArr,function(sk,sv){
					   if(sv == 'most'){
					     var c = quizObj.results.categories.k[0];
					   } else if (sv == 'least'){
					     var c = quizObj.results.categories.k[quizObj.results.categories.k.length-1];
					   }
				       rCat.find('.category[data-title="' + c + '"]' ).removeClass('hidden');
				       rCat.find('*[data-title="'+ sv +'"]').append( rCat.find('.category[data-title="' + c + '"]' ) );
				     });
				   }
				 }
				 
				 var scoreDiv = $('.result[data-title="score"]');
				 if(scoreDiv.length > 0){
				   scoreDiv.append($('<div>').attr('data-title',"your score").text(quizObj.results.score));
				 }
				 
				 // hide all questions
				 $('.question').addClass('hidden');
				 
				 // add review button if enabled
				 if(quizObj.settings.review != 'none'){
    	   		   var rNav = $('<nav>').addClass('rNav');
			       rNav.append( $('<a>').addClass('reviewBtn').text('review answers').click(function(){ quizObj.fn.review(); }) );
			       //rNav.append( $('<a>').addClass('nextBtn').text('next').click(function(){ quizObj.fn.traverse($(this)); }) );
			       //rNav.append( $('<a>').addClass('submitBtn').text('submit').click(function(){ quizObj.fn.submit($(this)); }) );
			       rNav.append( $('<div>').addClass('clearFloat') );
				   $('.results').append(rNav);
				 }
				 // show results
				 $('.results').removeClass('hidden');
			  },
			  'review':function(){
			    $('.submitBtn').addClass('hidden');	
                $('.indicator').removeClass('hidden');				
				if(quizObj.settings.review == 'all'){
				  $('.prevBtn').addClass('hidden');
				  $('.nextBtn').addClass('hidden');
				  $('.question').removeClass('hidden');
				  
				} else {
				  $('.prevBtn').removeClass('hidden');
				  $('.nextBtn').removeClass('hidden');
				  $('.question').first().removeClass('hidden');
				  $('.results').addClass('hidden');
				}
			  }
			}    			  
		  };
            //console.log(quizObj);
		    
			var quiz = $('section[data-type="quiz"]');
			var elements = quiz.find('*');
			elements.each(function(){
			  if ($(this).hasClass('sortable')){
			    //console.log(this);
			    $(this).sortable();
			  }
			});
			
			var quizItems = quiz.find('.items');
			quizItems.each(function(isk,itemSet){
			    
				if(isk != 0){
				  $(itemSet).parent('.question').addClass('hidden');
				}
				//console.log(itemSet);
			    // setup itemSets in quizObj
				var itemSetName; 
				if( $(itemSet).attr('data-title') != null ){
				  itemSetName = $(itemSet).attr('data-title');
                } else {
				  itemSetName = isk;
                  $(itemSet).attr('data-title',itemSetName);
				}
				
				quizObj.itemSets.k.push(itemSetName);

				quizObj.itemSets[itemSetName] = {'obj':'','settings':{}};
				quizObj.itemSets[itemSetName]['obj'] = itemSet;
				
				// set sortable type
				if($(itemSet).hasClass('sortable')){
				  quizObj.itemSets[itemSetName]['order']=[];
  				  quizObj.itemSets[itemSetName]['answer'] = {'type':'order','a':[]}
				  $(itemSet).children().each(function(){
				      if($(this).text() != null){
				        quizObj.itemSets[itemSetName].order.push($(this).text());
					  }
				  });
				}
				
				// set updown type
				if($(itemSet).hasClass('updown')){
				  quizObj.itemSets[itemSetName]['answer'] = {'type':'updown','up':'','down':''}
				  var updownBtns = $('<div>').addClass('updownBtns');
				  updownBtns.append( $('<a>').addClass('upBtn green').text('like').click(function(){ quizObj.fn.updown($(this)); }) );
				  updownBtns.append( $('<a>').addClass('dnBtn red').text('dislike').click(function(){ quizObj.fn.updown($(this)); }) );
				  updownBtns.append( $('<div>').addClass('clearFloat') );
				  $(itemSet).children().each(function(){
				    var txt = $(this).text();
				    $(this).attr('data-title',txt).append(updownBtns.clone(true,true));
				  });
				}
				
				
				//nav buttons
				var qNav = $('<nav>').addClass('qNav');
				qNav.append( $('<a>').addClass('prevBtn').text('previous').click(function(){ quizObj.fn.traverse($(this)); }) );
				qNav.append( $('<a>').addClass('nextBtn').text('next').click(function(){ quizObj.fn.traverse($(this)); }) );
				qNav.append( $('<a>').addClass('submitBtn').text('submit').click(function(){ quizObj.fn.submit($(this)); }) );
    			qNav.append( $('<div>').addClass('clearFloat') );
				var prevQ = $(itemSet).parent('.question').prev('.question');
				var nextQ = $(itemSet).parent('.question').next('.question');
				if(quizObj.settings.submit == 'one'){
				  qNav.find('.prevBtn').addClass('hidden');
				  qNav.find('.nextBtn').addClass('hidden');
				} else {
				  if( prevQ.length == 0 ){
				    qNav.find('.prevBtn').addClass('hidden');
				  }
				  if( nextQ.length == 0 ){
				    qNav.find('.nextBtn').addClass('hidden');
					qNav.find('.submitBtn').off("click").click(function(){ quizObj.fn.submitAll(); });
				  }
				  if( nextQ.length > 0 ){
				    qNav.find('.submitBtn').addClass('hidden');
				  }
				}
				$(itemSet).parents('.question').append(qNav.clone(true,true));
				
				
				
    			
				var items = $(itemSet).children();
				// add classes
				items.each(function(k,v){
				    //console.log($(v));
                    $(v).addClass('item');
				});
				
				//store element settings in object
			    if( $(itemSet).attr('data-settings') != null ){
			        //get settings
					var settings = $(itemSet).attr('data-settings');
					//check for settings for spaces, remove and continue
					var chk_spaces = settings.match(' ');
					//console.log(chk_spaces);
					if( chk_spaces != null ){
					  //console.log('ERROR: spaces found in settings attribute(s) : ' + chk_spaces.length );
					  //console.log('cont: spaces removed, then continued');
					  settings = settings.replace(' ','');
					}
					
					settings = settings.split(',');
					//console.log(settings);
					//run settings functions
					$.each(settings,function(sk,s){
					  quizObj.itemSets[itemSetName]['settings'][s] = true; 
					  if(quizObj.settingfn[s] != null){
					    quizObj.settingfn[s]($(itemSet));
					  }
					});
				}

				
			});
			
			// setup results
			var qResults = quiz.find('.results');
			    qResults.toggleClass('hidden');
			    quizObj.results = {};
			    quizObj.settings.results = [];
				
				qResults.find('.result').each(function(){
				   var rTitle = $(this).attr('data-title');
				   if(rTitle != null){
				     quizObj.settings.results.push(rTitle)
				   }
				});				
			// set categories in quizObj
			if(qResults.attr('data-type') != null){
			  if(qResults.attr('data-type') == 'categories'){
                quizObj.results.categories = {'k':[]};
			    qResults.find('.category').each(function(ck,c){
				  var c_title = $(c).attr('data-title');
				  if(c_title != null){
				    quizObj.results.categories.k.push(c_title);
				    quizObj.results.categories[c_title] = {'score':0};
					$(c).addClass('hidden');
				  }
				});
			  }
			}
		});		


	</script>	
	</head>
    <body>
	<div class="page">
        <?php require 'topBar.html'; ?>

		<div class="content">
		
		<nav class="contents">
			<strong>Contents:</strong>
            <a href="#" class="t1">Top</a>
        </nav>
		
		<section class="border1" data-type="quiz">
<div class="question">
    <h4>put the following options in the correct order</h4>
    <ol class="items sortable" data-title="set1" data-settings="scramble,tiles">
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
        <li>Four</li>
	</ol>
</div>
<div class="question">
    <h4>Like one, dislike one</h4>
    <ol class="items updown" data-title="set2" data-settings="tiles">
        <li data-category="blue">Blue</li>
        <li data-category="green">Green</li>
        <li data-category="red">Red</li>
        <li data-category="yellow">Yellow</li>
	</ol>
</div>

<div class="results" data-type="categories" data-show="most,least">
  <div class="result" data-title="score">You scored:</div>
  <div class="result" data-title="most">You are mostly:</div>
  <div class="result" data-title="least">You are least:</div>
  <div class="category" data-title="blue">
  The blue category
  </div>
  <div class="category" data-title="green">
  The green category
  </div>
  <div class="category" data-title="red">
  The red category
  </div>
  <div class="category" data-title="yellow">
  The yellow category
  </div>
</div>

</section>
		
        <section class="border1">
			<h2>Leadership and Management Development</h2>
			<div class="image">
			    <img alt="manager maninpulating digital people" src="img/managing_people_720.jpg">
			</div>
		
			<div class="items">
			    <?php require '7_key_elements.html'; ?>
			</div>

			<div class="clearFloat"></div>
		</section>
		
		<section class="border1">
			<h3>Leadership:</h3>
			<ul>
			    <li><b>To Lead:</b><br>Cause to go with by guiding or showing the way; direct the actions or opinions of others;</li>
			    <li><b>Leader:</b><br>A person followed by others</li>
			    <li><b>The Leadership Paradox:</b><br>Leading a team often means giving up power rather than accumulating it - the core issue for managing teams.</li>
			</ul>
			<p>
				Traditional leadership skills of control, focus, responsibility, motivation, all help achieve business goals.
			</p> 
			<p>
				A leader that can encourage independent thinking, innovation and team member accountability, will be more able to face the challenges of the modern business.
			</p>
			<p>Leaders can be developed, and are not just born into leadership.</p>
			<p class="note">
				Click on the link below to visit our sister company web site, where we employ specialists to develop your leaders.
			</p>
			<a href="http://www.pperformance.co.uk/ls.asp">Leadership Skills</a> 
		
    		<div class="clearFloat"></div>
		</section>
		
		<section class="border1">
			<h3>Leader as Performance Coach:</h4>
			<p>
			Create a coaching culture at work, through your managers, using challenging feedback, using and encouraging self-analysis, and motivating their teams to take greater responsibility in decision making when seeking to review and improve their own performance.
			</p>
			
			<p class="note">
			Click on the i buttons to read the module aims.
			</p>

			<!--div class="items">
				<div class="item">
					<h3>Aim</h3>
					<div class="description">
						<p>
						The overall aim of the training programme is:
						</p>
						<p>
						To provide the management team with the necessary skills to:
						</p>
						<ul>
							<li>
							evidence competency for identifying performance issues,
							</li>
							<li>
							develop skills of operational staff, that support quality operational goals and standards, and
							</li>
							<li>
							meet regulatory style Training & Competence framework requirements.
							</li>
						</ul>
					</div>
			    </div>
				<div class="item">
					<h3>Modules</h3>
					<div class="description">
						<p>
						The programme consists of the following modules:
						</p>
						<ol>
							<li>
								Planning & Performance Management Analysis
							</li>
							<li>
								Feedback
							</li>
							<li>
								Performance Coaching
							</li>
							<li>
							    Skills Coaching
							</li>
						</ol>
					</div>
			    </div>
				<div class="item">
					<h3>Format</h3>
					<div class="description">
						<p>
						The programme is constructed in a modular format, using a blended learning approach comprising of:
						</p>
						<ol>
							<li>
								Written Distant Learning Guides (DLGs) / Workbooks
							</li>
							<li>
								Proof of Learning via ELearning Tests or Case Study Assessments
							</li>
							<li>
								Workshops, including practical simulations and assessments
							</li>
							<li>
							    On the job live assessments, on completion of the programme
							</li>
							<li>
    							Certificate of Achievement on successful completion of the programme
							</li>
						</ol>
					</div>
			    </div>

			</div-->
			
			<div class="items">
				<!--h4 class="itemsTitle">Module Aims</h4-->
				<div class="item">
					<div class="icon">
					    <img src="img/lm/icons/figures_group_leader_ties.jpg">
					</div>
					<h3>Planning & Performance Management Analysis</h3>
					<div class="description">
						<div class="image"><img class="h500" src="img/lm/figures_group_leader_ties.jpg"></div>
						<h4>Module Aim:</h4>
						<p>
							To provide an overview of generic planning principles, and the key measures used in performance management.
						</p>
						<ol>
							<li>
								This module introduces the John Adair concept of taking a balanced approach to planning. 
							</li>
							<li>
								We establish the 5 key stage Performance Planning model, and relate this to the businesses strategic goals
							</li>
							<li>
								We explore SWOT analysis principles and the benefits for creating focused priorities, to construct SMART objectives to meet business planning goals
							</li>
						</ol>
					</div>
			    </div>
				<div class="item">
					<div class="icon">
					    <img src="img/lm/icons/figures_brain_inspection.jpg">
					</div>
					<h3>Effective & Objective Assessment</h3>
					<div class="description">
   						<div class="image"><img class="h500" src="img/lm/figures_brain_inspection.jpg"></div>
					    <h4>Module Aim:</h4>
						<p>
							To enable you to understand principles, concepts and techniques of effective & objective assessment to improve individual performance and competence.
						</p>
						<ol>
							<li>
								In this module we introduce and explore the use of the KASH model to identify performance causes, that could require training and coaching solutions
							</li>
							<li>
								We test the impact of objectivity when assessing performance, and explore the Can't or Won't Perform issues surrounding staff competence.							</li>
							</li>
						</ol>
					</div>
			    </div>
				<div class="item">
					<div class="icon">
					    <img src="img/lm/icons/figures_team_leader.jpg">
					</div>
					<h3>Feedback & One to Ones</h3>
					<div class="description">
						<div class="image"><img class="h500" src="img/lm/figures_team_leader.jpg"></div>
					    <p class="note">
						"No great manager or leader ever fell from heaven; it's learned not inherited."
						</p>
					    <h4>Module Aim:</h4>
						<p>
						To enable you to understand principles, concepts and techniques of feedback to improve individual performance and competence.
						</p>
						<ol>
							<li>
								In this module we introduce and define an effective feedback structure, together with techniques and ground rules for delivering effective feedback. 
							</li>
							<li>
								We link feedback to One to One performance reviews and work with a business's own assessment or performance appraisal tool.
							</li>
						</ol>
					</div>
			    </div>
				<div class="item">
					<div class="icon">
					    <img src="img/lm/icons/figures_help_potential.jpg">
					</div>				
					<h3>Performance Coaching</h3>
					<div class="description">
						<div class="image"><img class="h500" src="img/lm/figures_help_potential.jpg"></div>
						<p>
							Concepts, Principles and Techniques
						</p>
					    <h4>Module Aim:</h4>
						<p>
							To enable you to understand principles, concepts and techniques of performance coaching to improve individual performance and competence.
						</p>
						<ol>
							<li>
								In this module we introduce  and define a performance coaching structure, together with coaching concepts, principles and techniques for the leader to encourage staff to evaluate and plan improvement in their own performance
							</li>
						</ol>
					</div>
			    </div>
				<div class="item">
					<div class="icon">
					    <img src="img/lm/icons/learn_do_coach.jpg">
					</div>
					<h3>Skills Coaching</h3>
					<div class="description">
						<div class="image"><img class="h500" src="img/lm/learn_do_coach.jpg"></div>
						<p>
							Getting the Best from People
						</p>
					    <h4>Module Aim:</h4>
						<p>
							To enable you to understand principles, concepts and techniques of <i><b>skills</b></i> coaching to improve individual performance and competence.
						</p>
						<ol>
							<li>
								In this module we introduce and define a <i><b>skills</i></b> coaching structure and techniques to demonstrate structure and standards to staff for improving their performance.
							</li>
							<li>
								We use the skills coaching structure and feedback techniques to enable staff to evaluate and plan improvement in their own performance
							</li>
						</ol>
					</div>
			    </div>				
				<div class="clearFloat"></div>
			</div>
			
			<div class="clearFloat"></div>
        </section>

		<section class="border1">
			<h3>Management:</h4>
			<p>
			Today's environment requires businesses to be ready to meet any challenge that's thrown at them.
			</p>
			<p>
			Training the people, who make the business successful, is one of the most valuable investments that a business can make.
			</p>
			<p>
			Management Development has probably the highest return on any training investment.
			</p>
			<p class="note">
				Click on the link below to visit our sister company web site, where we employ specialists to develop your managers' core competencies, through accredited and company tailored programmes.
			</p>
			<a href="http://www.pperformance.co.uk/md.asp">Management Development</a> 

			<div class="clearFloat"></div>
        </section>
		
	    </div>
    <?php require 'footer.html'; ?>    
    </body>
</html>