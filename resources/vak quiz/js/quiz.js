$(function(){
	// create object;
	var quizObj = {
	  'itemSets':{'k':[]},    
	  'settings':{
		'submit':'all',
		'scrambleAll':true,
		'review':'one',
		'reviewAnswers':'all',
		'retry':true,
		'retryLimit':'none',
        'results':['email']
	  },
      'metadata':{
          'uuid':'',
          'started':'',
          'completed':''
      },
      'modals':{
        'incompleteQuestions':{
            'message':'Some questions have not been completed.<br>Please go back and ensure you have answered all questions.',
            'btns':['Ok','Go to question']
        },
        'sendResults':{
            'title':'Send Your Results',
            'fields':[
                {'name':'Your Name','el':'input','type':'text','mandatory':true},
                {'name':'Your Email Address','el':'input','type':'text','mandatory':true},
                {'name':'Send me a copy','el':'input','type':'checkbox'}
            ],
            'btns':['Send Results']
        }
      },
	  'settingfn':{
		'scramble':function(obj){
		  //console.log('scramble');
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
		},
        'labelQuestions':function(){
            var questions = $('.question');
            var crumbs = $('.questions').find('.crumbs');
            if(crumbs.length === 0){
                crumbs = $('<div>').addClass('crumbs');
            } else {
                crumbs.empty();
            }
            
            
            $.each(questions,function(k,q){
                //console.log($(this).find('h4 .questionId'));
                //crumb
                var qId = $(q).attr('data-id');
                if(qId !== null){
                    crumbs.append( $('<div>').addClass('crumb').attr('data-id',qId) );
                }
                var qIdEl = $(q).find('h4 .questionId');
                if(qIdEl.find('.completed').length == 0){
                    qIdEl.find('.completed').remove();
                }
                qIdEl.text( (k+1)+' of '+questions.length+'.');
            });
            
            $('.questions').prepend( crumbs );
            crumbs.append( $('<div>').addClass('clearFloat') );
            if( !$('section .intro').hasClass('hidden') ){
                crumbs.addClass('hidden');
            }
        },
        'getEndpoint':function(){
            var root = window.location.href.split('/');

            root.splice(-1);
            var resourceRoot = root.join('/');

            root.splice(-(root.length-3));            
            var siteRoot = root.join('/');
            
            $.getJSON(resourceRoot+'/js/lrs_endpoint.json').done(function(data){
                quizObj.settings.lrs_endpoint = data.lrs_endpoint.replace('<root>',siteRoot);
                //console.log(quizObj.settings.lrs_endpoint);
            })
        },
        'getUUID':function(){
            return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            )
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
		    qNav.find('.submit').removeClass('hidden');
            
		  } else if(quizObj.settings.submit == 'none'){
		    qNav.find('.prevBtn').addClass('hidden');
		    qNav.find('.nextBtn').addClass('hidden');
		    qNav.addClass('hidden');
		  } else {
		    
            if( prevQ.length == 0 ){
		  	  qNav.find('.prevBtn').addClass('hidden');
		    } else {
		  	  qNav.find('.prevBtn').removeClass('hidden');
            }
            
		    if( nextQ.length == 0 ){
			  qNav.find('.nextBtn').addClass('hidden');
			  qNav.find('.submitBtn').removeClass('hidden').off("click").click(function(){ quizObj.fn.submitAll(); });
		    }
		    if( nextQ.length > 0 ){
			  qNav.find('.nextBtn').removeClass('hidden');
			  qNav.find('.submitBtn').addClass('hidden');
		    }
		  }
		  
		},
        'buildModal':function(modalObj){
            var blackOut = $('<div>').addClass('blackOut');
            var modal = $('<div>').addClass('modal');
            var modalWrap = $('<div>').addClass('modalWrap');
            
            if(typeof modalObj.title !== 'undefined'){
                modalWrap.append( $('<h4>').text(modalObj.title) );
            }
            
            if(typeof modalObj.message !== 'undefined'){
                modalWrap.append( $('<div>').addClass('message').html(modalObj.message) );
            }
            
            if(typeof modalObj.fields !== 'undefined'){
                $.each(modalObj.fields,function(fk,fieldObj){
                    var fieldWrap = $('<div>').addClass('fieldWrap');
                    var label = $('<label>').attr('for',fieldObj.name).text(fieldObj.name);
                    var field = $('<'+fieldObj.el+'>').attr({'name':fieldObj.name,'type':fieldObj.type});

                    if(typeof fieldObj.mandatory !== 'undefined'){
                        label.append('*');
                        field.attr('required',true);
                    }

                    fieldWrap.append(label);
                    fieldWrap.append(field);
                    modalWrap.append(fieldWrap);
                });
            }
            
            if(typeof modalObj.btns !== 'undefined'){
                $.each(modalObj.btns,function(bk,btnText){
                    var btn = $('<div>').addClass('btn small center').text(btnText);
                    if(btnText === 'Ok'){
                        btn.click(function(){
                            quizObj.quizEl.find('.blackOut').remove();
                        });
                    }
                    if(btnText === 'Go to question'){
                        btn.click(function(){
                            quizObj.quizEl.find('.blackOut').remove();
                            quizObj.fn.goFirstIncomplete();
                        });
                    }
                    if(btnText === 'Send Results'){
                        btn.click(function(){
                            quizObj.fn.sendResults();
                        });
                    }
                    modalWrap.append(btn);
                });
            }
            
            modal.append( $('<div>').addClass('xBtn').click(function(){ quizObj.quizEl.find('.blackOut').remove(); }) );
            modal.append(modalWrap);
            blackOut.append(modal);
            quizObj.quizEl.append(blackOut);
            
        }
	  },
	  'fn':{
      'modal':function(modalName){
          if(typeof quizObj.modals[modalName] !== 'undefined'){
              quizObj.setupfn.buildModal(quizObj.modals[modalName]);
          }
      },
      'message':function(el,msg){
          el.append( $('<div>').addClass('message').html(msg) );
          setTimeout(function(){
              el.find('.message').fadeOut(1000,function(){ $(this).remove(); });
          },3000);
      },
      'markComplete':function(el){
          var qIdEl = el.find('h4 .questionId');
          var qId = el.attr('data-id');
          var crumb = $('.questions .crumbs .crumb[data-id="'+ qId +'"]');
          if(qIdEl.find('.completed').length == 0){
              qIdEl.append( $('<div>').addClass('completed').text('Completed') );
              crumb.addClass('completed');
          }
      },
      'goFirstIncomplete':function(){
          var questions = quizObj.quizEl.find('.question');
          var incomplete;
          $.each(questions,function(){
             if($(this).find('.questionId .completed').length == 0){
                 incomplete = $(this);
                 return false;
             } 
          });
          questions.addClass('hidden');
          incomplete.removeClass('hidden');
          incomplete.parent().find('.crumb').removeClass('current');
          incomplete.parent().find('.crumbs .crumb[data-id="'+ incomplete.attr('data-id') +'"]').addClass('current');
      },
	  'updown':function (el){

		var itemSet = el.parents('.items');
		var itemSetName = itemSet.attr('data-title');
		var itemTitle = el.parent().parent().attr('data-title');
		var itemCategory = el.parent().parent().attr('data-category');
		
        quizObj.itemSets[itemSetName].answer.timestamp = new Date().toISOString();
		
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
		  //console.log('disno pplike');
		}
        
        // mark as answered
        quizObj.fn.markComplete(el.parents('.question'));
        
		// auto submit on completing question
        var upOrDn = null;
        if(itemSet.hasClass('updownUP')){
            upOrDn = 'up';
        } else if(itemSet.hasClass('updownDN')){
            upOrDn = 'dn';
        }
        var up = itemSet.find('.dgreen');
        var down = itemSet.find('.dred');
        if( (up.length > 0 || upOrDn === 'dn') && (down.length > 0 || upOrDn === 'up')){
            if(quizObj.settings.submit == 'none'){
			    quizObj.fn.autoSubmit(itemSet);
		    }
            quizObj.fn.markComplete(el.parents('.question'));
		}
	  },
	  'traverse':function(el){
		var btn = el.text();
        var question = el.parents('.question');
        var crumbs = quizObj.quizEl.find('.crumbs');
		crumbs.children().removeClass('current');
        question.toggleClass('hidden');
		
        if(btn == 'previous'){
		  if(question.prev('.question').length > 0){
			question.prev('.question').toggleClass('hidden');
            crumbs.find('.crumb[data-id="'+ question.prev('.question').attr('data-id') +'"]').addClass('current');
		  } else {
			$('.results').first().toggleClass('hidden');
		  }
		} else if(btn == 'next' || btn == 'submit'){
		  if(question.next('.question').length > 0){
			question.next('.question').toggleClass('hidden');
            crumbs.find('.crumb[data-id="'+ question.next('.question').attr('data-id') +'"]').addClass('current');

		  } else if(question.parent().next('.results').length > 0){
			question.parent().next('.results').toggleClass('hidden');
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
         var complete = true;
		 $.each(quizObj.itemSets.k,function(isk,itemSetName){
             var itemSet = $('.items[data-title="' + itemSetName + '"]');
		     if(itemSet.parents('.question').find('.questionId .completed').length > 0){
                 quizObj.fn.submit(itemSet);
             } else {
                 complete = false;
             }
		 });
         
         if(complete){
		     quizObj.fn.calcResult();
         } else {
             quizObj.fn.modal('incompleteQuestions');
         }
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
                    rCat.find('.category[data-title="' + c + '"] .score').text('You scored : '+ quizObj.results.categories[c].score);
                    rCat.append( rCat.find('.category[data-title="' + c + '"]' ) );
                });
            } else {
                var showArr = show.split(',');
                //console.log(showArr);
                if(showArr.length === 1){
                    rCat.find('.result').not('[data-title="'+ showArr[0] +'"]').addClass('hidden');
                }
                    
                $.each(showArr,function(sk,sv){
                    if(sv == 'most'){
                        var c = quizObj.results.categories.k[0];
                    } else if (sv == 'least'){
                        var c = quizObj.results.categories.k[quizObj.results.categories.k.length-1];
                    }
                    rCat.find('.category[data-title="' + c + '"]' ).removeClass('hidden');
                    rCat.find('.result[data-title="'+ sv +'"]').append( rCat.find('.category[data-title="' + c + '"]' ) );                    
                });
            }
		 }
		 
		 var scoreDiv = $('.result[data-title="score"]');
		 if(scoreDiv.length > 0){
		   scoreDiv.append($('<div>').attr('data-title',"your score").text(quizObj.results.score));
		 }
         
         quizObj.metadata.completed = new Date().toISOString();
		 
		 // hide all questions
		 $('.question').addClass('hidden');
         quizObj.quizEl.find('.crumb').removeClass('current');
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
          quizObj.quizEl.find('.crumb').first().addClass('current');
		}
        if(typeof scroll_nudge != 'undefined'){  
		  scroll_nudge( {'el':$('.question').first().parents('section') } );
        }
	  },
	  'reset':function(){
		// reset each answer
        //console.log(quizObj);
        if(quizObj.settings.scrambleAll){
            quizObj.settingfn.scramble($('.questions'));
        }
        

		$.each(quizObj.itemSets.k,function(isk,itemSetName){
		  if (itemSetName != null){				  
			var answer_type = quizObj.itemSets[itemSetName].answer.type;
			if(answer_type != null){
			  var fncName = 'reset'+ answer_type.charAt(0).toUpperCase() + answer_type.slice(1);
			  //console.log(fncName);
			  if(quizObj.fn[fncName]){
                //console.log(itemSetName);
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
              settings = settings.split(',');
		  if( $.inArray(settings,'scramble') ){
			quizObj.settingfn.scramble(itemSetObj);
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
        quizObj.settingfn.labelQuestions();
		
	  },
	  'resetOrder':function(itemSetName){
	    quizObj.itemSets[itemSetName].answer.a = [];
	  },
      'resetUpdownUP':function(itemSetName){
        quizObj.fn.resetUpdown(itemSetName);  
      },
      'resetUpdownDn':function(itemSetName){
        quizObj.fn.resetUpdown(itemSetName);  
      },
	  'resetUpdown':function(itemSetName){
	    var answer = quizObj.itemSets[itemSetName].answer;
		answer.up = '';
		answer.down = '';
      	var itemSetObj = $(quizObj.itemSets[itemSetName].obj);
        //console.log(itemSetObj);
	    itemSetObj.find('.upBtn').each(function(){ 
		  $(this).removeClass('dgreen');
          var events = $._data($(this)[0],'events');
          var addClick;
          if(events === undefined){
              addClick = true;
          } else if( typeof events.click === 'undefined'){
              addClick = true;
          }
		  if(addClick){
		    $(this).on('click',function(){quizObj.fn.updown($(this));}); 
		  }
		});
	    itemSetObj.find('.dnBtn').each(function(){ 
		  $(this).removeClass('dred');
          var events = $._data($(this)[0],'events');
          var addClick;
          if(events === undefined){
              addClick = true;
          } else if( typeof events.click === 'undefined'){
              addClick = true;
          }
		  if(addClick){
  		    $(this).on('click',function(){quizObj.fn.updown($(this));}); 
	      }
		});
	  },
      'getResults':function(){          
          var resultsObj = quizObj.results;
              resultsObj['questions'] = {};
              resultsObj['completion'] = true;
          $.each(quizObj.itemSets.k,function(arrK,itemSetK){
              var qObj = quizObj.itemSets[itemSetK];
              delete qObj.obj;
              delete qObj.settings;
              for(prop in qObj.answer){
                  if(qObj.answer[prop] === null || qObj.answer[prop] === ''){
                      delete qObj.answer[prop];
                  }
              }
              
              if(typeof qObj.categories !== 'undefined'){
                  delete qObj.categories.k;
              }
              resultsObj.questions[itemSetK] = qObj;
          });
          //console.log(resultsObj);
          return resultsObj;
      },
      'sendResults':function(){
          var err = '';
          var valid = true;
          var modal = $('.modal');
          var mail_content = $('.results').clone();
              mail_content.find('nav').remove();
              mail_content.find('.category[data-title]').each(function(){
                  $(this).addClass( $(this).attr('data-title').toLowerCase() );
              });
          var dataObj = {
              'statement':{
                  'id': quizObj.metadata.uuid,
                  'timestamp': quizObj.metadata.completed,
                  'actor':{
                      'name':initCap(modal.find('input[name="Your Name"]').val()),
                      'mbox': 'mailto:' + modal.find('input[name="Your Email Address"]').val().toLowerCase(),
                      'objectType':'Agent'
                  },
                  'verb':{
                      'id':'http://activitystrea.ms/schema/1.0/complete',
                      'display':{'en-US':'completed'}
                  },
                  'object':{
                      'id':window.location.href,
                      'definition':{'en-US':'Vak Quiz'}
                  },
                  'result':quizObj.fn.getResults(),
              },
              'copy': modal.find('input[name="Send me a copy"]')[0].checked,
              'results_mail' : mail_content[0].outerHTML
          };
          //console.log(dataObj);
          //console.log( dataObj.statement.actor.mbox)
          
          if( !isValid(dataObj.statement.actor.mbox,'email') ){              
              valid = false;
              err = err+'<p>Invalid Email Address</p>';
          }
          
          if( typeof quizObj.settings.lrs_endpoint !== 'undefined' 
              && dataObj.statement.actor.name !== ''
              && dataObj.statement.actor.mbox !== 'mailto:'
              && valid === true
           ){
              
              $.ajax({
                  url: quizObj.settings.lrs_endpoint,
                  method:'POST',
                  dataType:'json',
                  data: dataObj,
                  context: modal,
                  beforeSend:function(){
                      modal.find('.modalWrap').first().append($('<div>').addClass('loading'));
                  }
              }).done(function(data,textStatus,jqXHR){
                  //console.log(data);
                  //$(this).find('.loading').removeClass('loading').html(data);
                  $(this).find('.loading').remove();
                  if(typeof data.status != 'undefined' && data.status === 'success'){
                      quizObj.fn.message( $(this).find('.modalWrap'), 'Success!');
                      setTimeout(function(){
                        quizObj.quizEl.find('.blackOut').remove();
                      },3000);
                  } else {
                      var message;
                      if (typeof data.status !== 'undefined' && typeof data.msg !== 'undefined'){
                          message = 'Error: '+ data.msg;
                      } else {
                          message = 'Something went wrong!'
                      }
                      quizObj.fn.message( $(this).find('.modalWrap'), message);
                  }
                  console.log(data);
              }).fail(function(jqXHR,textStatus,err){
                  console.log(err);
              });
          } else {
              if(dataObj.statement.actor.name === ''){
                  err = err + '<p>Please enter your name</p>'; 
              }
              
              if(dataObj.statement.actor.mbox === 'mailto:'){
                  err = err + '<p>Please enter your email address</p>'; 
              }
              
              if(typeof quizObj.settings.lrs_endpoint === 'undefined'){
                  err = err + '<p>no endpoint set</p>';
              }
              console.log(err);
              quizObj.fn.message(modal.find('.modalWrap'),err);
          }
      }
	}    			  
  };
	//console.log(quizObj);
	
	var quiz = $('section[data-type="quiz"]');
    quizObj['quizEl'] = quiz;
	var elements = quiz.find('*');
	elements.each(function(){
	  if($(this).hasClass('sortable')){
		//console.log(this);
		$(this).sortable();
	  }
	  if($(this).hasClass('startBtn')){
		$(this).click(function(kb,btn){ 
		  quiz.find('.intro').addClass('hidden');			  
		  quiz.find('.crumbs').removeClass('hidden');
          quiz.find('.crumbs .crumb').first().addClass('current');
		  quiz.find('.question').first().removeClass('hidden');
  		  quizObj.metadata.uuid = quizObj.settingfn.getUUID();
  		  quizObj.metadata.started = new Date().toISOString();
		}); 	
	  }
      if( $(this).is('img') && $(this).attr('src') === 'img/quizImage.jpg' ){
          getImgMeta('img/quizImage.jpg').done(function(size){
              //console.log(size);
              size['ratio'] = size.w/size.h;
              size['newH'] = 100;
              size['newW'] = Math.floor(100*size.ratio);
              //console.log($(this));
              $('img[src="img/quizImage.jpg"]').attr({'width':size.newW,'height':size.newH});
          })
      }
	});
	
    if(quizObj.settings.scrambleAll){
        quizObj.settingfn.scramble($('.questions'));
    }
    quizObj.settingfn.labelQuestions();
    
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
		  itemSetName = parseInt($(itemSet).parent().data('id'));
		  $(itemSet).attr('data-title',itemSetName);
		}
		
		quizObj.itemSets.k.push(itemSetName);

		quizObj.itemSets[itemSetName] = {'obj':'','settings':[]};
		quizObj.itemSets[itemSetName]['obj'] = itemSet;
        
        var questionId = $(itemSet).parent().find('h4 .questionId').text();
        var questionText = $(itemSet).parent().find('h4').text();
            questionText = questionText.replace(questionId,'');
            questionId = $(itemSet).parent().data('id');
            
        quizObj.itemSets[itemSetName]['questionId'] = questionId;
        quizObj.itemSets[itemSetName]['question'] = questionText.trim();
		
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
		if($(itemSet).hasClass('updown') || $(itemSet).hasClass('updownUP') || $(itemSet).hasClass('updownDN')){
          
            var upOrDn = null;
            if($(itemSet).hasClass('updownUP')){
                upOrDn = 'up';
            } else if($(itemSet).hasClass('updownDN')) {
                upOrDn = 'dn';
            }

            quizObj.itemSets[itemSetName]['answer'] = {'type':'updown','up':'','down':''};
            var updownBtns = $('<div>').addClass('updownBtns');

            if(upOrDn === null || upOrDn === 'up'){
                updownBtns.append( $('<a>').addClass('upBtn green').text('like').on('click',function(){ quizObj.fn.updown($(this)); }) );
            }

            if(upOrDn === null || upOrDn === 'dn'){
                updownBtns.append( $('<a>').addClass('dnBtn red').text('dislike').on('click',function(){ quizObj.fn.updown($(this)); }) );
            }

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
			  //quizObj.itemSets[itemSetName]['settings'][s] = true; 
			  quizObj.itemSets[itemSetName].settings.push(s);
			  if(quizObj.settingfn[s] != null){
				quizObj.settingfn[s]($(itemSet));
			  }
			});
		}

		
	});
	quizObj.itemSets.k.sort(
        function (a, b) {
            if (a < b) return -1;  // any negative number works
            if (a > b) return 1;   // any positive number works
            return 0; // equal values MUST yield zero
        }
    );

	// setup results
	var qResults = quiz.find('.results');
		qResults.addClass('hidden');
		quizObj.results = {};
        if( typeof quizObj.settings.results === 'undefined' ){
		    quizObj.settings.results = [];
		}
        
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
     
    // add email button
	if($.inArray('email',quizObj.settings.results) > -1){
	    rNav.append( $('<a>').addClass('emailBtn').text('Submit Results').click(function(){ quizObj.fn.modal('sendResults'); }) );
	}
    
	 rNav.append( $('<div>').addClass('clearFloat') );
	 qResults.append(rNav);
     qResults.prepend($('<div>').addClass('resultMessage').text('Done!'));
		
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
    
    quizObj.settingfn.getEndpoint();
    //console.log(quizObj);
});


function getImgMeta(url){
  var r = $.Deferred();

  $('<img/>').attr('src', url).load(function(){
     var s = {w:this.width, h:this.height};
     r.resolve(s)
  });
  return r;
}


function isValid(value,type){
    if(type === 'email'){
        var mail_match = value.match(/.*@.*\..*/);
        if(mail_match != null){
            return true;
        } else {
            return false;
        }
    }
}

function initCap(str){
    //return str.charAt(0).toUpperCase() + str.slice(1);
  return str.toLowerCase().replace(/(?:^|\s)[a-z]/g, function (m) {
      return m.toUpperCase();
   });
}

/*function smoothScroll(n) {
	if( n != undefined ){ 
		$('html, body').animate({
			scrollTop: n
		}, 1000);
		return false;
	}
}*/