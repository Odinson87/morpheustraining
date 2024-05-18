$(function(){
	// create object;
	var quizObj = {
	  'itemSets':{'k':[]},    
	  'settings':{
		'submit':'none',
		'scrambleAll':true,
		'review':'one',
		'reviewAnswers':'all',
		'retry':true,
		'retryLimit':'none'
	  },
	  'settingfn':{
		'scramble':function(obj){
		  // get array of list items 
		  var objArr = obj.children();
		  // randomise list items
		  objArr.sort(function(a,b){
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
		  .appendTo(obj);          
		}
	  },
	  'setupfn':{
	    'buildQnav':function(){
		  var qNav = $('<nav>').addClass('qNav');
		  qNav.append( $('<a>').addClass('prevBtn').text('previous').click(function(){ quizObj.fn.traverse($(this)); }) );
		  qNav.append( $('<a>').addClass('nextBtn').text('next').click(function(){ quizObj.fn.traverse($(this)); }) );
		  qNav.append( $('<a>').addClass('submitBtn').text('submit').click(function(){ quizObj.fn.submit($(this)); }) );
		  qNav.append( $('<div>').addClass('clearFloat') );
		  return qNav;
		},
		'setQnavBtns':function(qNav,itemSet){
		  // find previous & next questions (if exist)
		  var prevQ = itemSet.parent('.question').prev('.question');
		  var nextQ = itemSet.parent('.question').next('.question');
		
		  // set qNav buttons
		  if(quizObj.settings.submit == 'one'){
		    qNav.find('.prevBtn').addClass('hidden');
		    qNav.find('.nextBtn').addClass('hidden');
		  } else if(quizObj.settings.submit == 'none'){
		    qNav.find('.prevBtn').addClass('hidden');
		    qNav.find('.nextBtn').addClass('hidden');
		    qNav.addClass('hidden');
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
		  quizObj.itemSets[itemSetName].answer.down = itemTitle;
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
		// auto submit on completing question
		if(quizObj.settings.submit == 'none'){
		  var up = itemSet.find('.dgreen');
		  var down = itemSet.find('.dred');
		  if( up.length > 0 && down.length > 0){
			quizObj.fn.autoSubmit(itemSet);
		  }
		}
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
		  
		  if(quizObj.settings.submit == 'one' || quizObj.settings.submit == 'none'){
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
		var reviewAnswers = quizObj.settings.reviewAnswers;
		itemSetChildren.each(function(ck,cv){
          if( reviewAnswers == 'all'){
		    if(itemSetObj.score.a[ck] == 'correct'){
			  $(cv).append( $('<div>').addClass('indicator correct hidden') );
		    } else if(itemSetObj.score.a[ck] == 'incorrect'){
			  $(cv).append( $('<div>').addClass('indicator incorrect hidden') );
		    }
		  }
		});
	  },
	  'submitUpdown':function(itemSetName){
		//console.log('updown questions auto tally preset categories via the up/down btns');
	  },
	  'autoSubmit':function(itemSet){
		 var submitBtn = itemSet.parents('.question').find('.submitBtn');
			setTimeout(function(){ 
			  quizObj.fn.submit(submitBtn); 
			}, 1000);
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
		 // show results
		 $('.results').removeClass('hidden');
	  },
	  'review':function(){
		$('.submitBtn').addClass('hidden');	
		$('.qNav').removeClass('hidden');	
		$('.indicator').removeClass('hidden');
		$('.upBtn').off('click');			
		$('.dnBtn').off('click');			
		if(quizObj.settings.review == 'all'){
		  $('.prevBtn').addClass('hidden');
		  $('.nextBtn').addClass('hidden');
		  $('.question').removeClass('hidden');
		  
		} else {
		  $('.prevBtn').removeClass('hidden');
		  $('.nextBtn').removeClass('hidden');
		  $('.results').addClass('hidden');
		  $('.question').first().removeClass('hidden');
		}
		scroll_nudge( {'el':$('.question').first().parents('section') } );
	  },
	  'reset':function(){
		// reset each answer
		$.each(quizObj.itemSets.k,function(isk,itemSetName){
		  if (itemSetName != null){				  
			var answer_type = quizObj.itemSets[itemSetName].answer.type;
			if(answer_type != null){
			  var fncName = 'reset'+ answer_type.charAt(0).toUpperCase() + answer_type.slice(1);
			  //console.log(fncName);
			  if(quizObj.fn[fncName]){
			    quizObj.fn[fncName](itemSetName);
			  }
			}
		  }
		  
		  var itemSetObj = $(quizObj.itemSets[itemSetName].obj);
		  // remove review indicators
		  var indicators = itemSetObj.find('.indicator');
		  if(indicators.length > 0){
		    $.each(indicators,function(){
			  $(this).remove();
			});
		  }
		  
		  // scramble options again, if has setting
		  var settings = itemSetObj.data('settings');
		  if( settings != null){
		    var scramble = settings.match('scramble');
			if(scramble > -1){
			  quizObj.settingfn.scramble(itemSetObj);
			}
		  }
		  
		  //reset qNav
		  var qNav = itemSetObj.parents('.question').find('.qNav');
		  quizObj.setupfn.setQnavBtns(qNav,itemSetObj);
		  
		});
		
		// reset main score
		quizObj.results.score = 0;
		
	    // reset category placement/visibility and results scores
		var rCat = $('.results[data-type="categories"]');
		if(rCat.length > 0){
		  rCat.find('.category').each(function(){
		    rCat.append( $(this).addClass('hidden') );
		  });
		  
		  $.each(quizObj.results.categories.k,function(kc,c){
		    quizObj.results.categories[c].score = 0;
		  });
		}
		
		// hide all questions and results, start from beginning
		$('.question').addClass('hidden');
		$('.results').addClass('hidden');
		
		if( $('.intro').length == 1 ){
		  $('.intro').removeClass('hidden');
		} else {
		  $('.question').first().removeClass('hidden');
		}
		
	  },
	  'resetOrder':function(itemSetName){
	    quizObj.itemSets[itemSetName].answer.a = [];
	  },
	  'resetUpdown':function(itemSetName){
	    var answer = quizObj.itemSets[itemSetName].answer;
		answer.up = '';
		answer.down = '';
      	var itemSetObj = $(quizObj.itemSets[itemSetName].obj); 
	    itemSetObj.find('.upBtn').each(function(){ $(this).removeClass('dgreen').click(function(){quizObj.fn.updown($(this));}); });
	    itemSetObj.find('.dnBtn').each(function(){ $(this).removeClass('dred').click(function(){quizObj.fn.updown($(this));}); });
	  
	  }
	}    			  
  };
	console.log(quizObj);
	
	var quiz = $('section[data-type="quiz"]');
	var elements = quiz.find('*');
	elements.each(function(){
	  if ($(this).hasClass('sortable')){
		//console.log(this);
		$(this).sortable();
	  }
	  if($(this).hasClass('startBtn')){
		$(this).click(function(kb,btn){ 
		  quiz.find('.intro').addClass('hidden');			  
		  quiz.find('.question').first().removeClass('hidden');			  
		}); 	
	  }
	});
	
	var quizItems = quiz.find('.items');
	quizItems.each(function(isk,itemSet){
		
		if(quiz.find('.intro').length > 0){
		  $(itemSet).parent('.question').addClass('hidden');
		} else {
		  if(isk != 0){
			$(itemSet).parent('.question').addClass('hidden');
		  }
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
		
		
		//create nav buttons
		var qNav = quizObj.setupfn.buildQnav();		
		
		// set qNav buttons
		quizObj.setupfn.setQnavBtns(qNav,$(itemSet));
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
			}	);
		}

		
	});
	
	// setup results
	var qResults = quiz.find('.results');
		qResults.addClass('hidden');
		quizObj.results = {};
		quizObj.settings.results = [];
		
		qResults.find('.result').each(function(){
		   var rTitle = $(this).attr('data-title');
		   if(rTitle != null){
			 quizObj.settings.results.push(rTitle)
		   }
		});
    // create results navigation
	 var rNav = $('<nav>').addClass('rNav');
	 // add review button if enabled
	 if(quizObj.settings.review != 'none'){
	   rNav.append( $('<a>').addClass('reviewBtn').text('review answers').click(function(){ quizObj.fn.review(); }) );
	 }
	 // add retry button if enabled
	 if(quizObj.settings.retry == true){
	   rNav.append( $('<a>').addClass('retryBtn').text('try again').click(function(){ quizObj.fn.reset(); }) );
	 }
	 rNav.append( $('<div>').addClass('clearFloat') );
	 qResults.append(rNav);
		
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

/*function smoothScroll(n) {
	if( n != undefined ){ 
		$('html, body').animate({
			scrollTop: n
		}, 1000);
		return false;
	}
}*/