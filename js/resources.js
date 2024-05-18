$(function(){
    
    $('body').attr('bgcolor','white');

	var auth_panel = $('<div>');
	    auth_panel.addClass('auth_panel');
		auth_panel.css({
		    'width':'280px',
			'margin':'20px auto',
			'padding':'20px',
			'background-color':'#ccc',
			'border-radius':'4px',
			'font-family':'Arial',
			'text-align':'center',
			'z-index':100
		});
	    
		auth_panel.append( $('<h4>').text('Enter Authorisation Code').css('margin','0px 0px 10px 0px') );
	    
		auth_panel.append(
		    $('<input>').attr({'type':'text'})
			.addClass('auth_code')
			.css({'margin':'0px 0px 10px 0px','padding':'5px','font-size':'1.2em','width':'206px','border-color':'transparent'})
		    .focus(function(){			    
				if($(this).val() == 'incorrect, try again'){
				    $(this).val('');
				}
			}).keyup(function(event){
				if(event.keyCode == 13){
				    var str = $(this).val();
			        auth(str);
				}
			})
		);
	    
		var auth_btn = $('<a>').addClass('auth_btn').text('continue');
		    auth_btn.css({'display':'block','margin':'0px auto 20px auto','padding':'10px','width':'200px','background-color':'#009900','border-radius':'4px','font-weight':'bold','color':'white','cursor':'pointer'});
		    auth_btn.click(function(){
                var str = $('.auth_panel input.auth_code').val();
			    auth(str);
			});
		auth_panel.append(auth_btn);	
		auth_panel.append( $('<img>').addClass('code_logo').attr({'src':'../../img/morpheus_logo_185px.png','width':'185','height':'135'}) );
	
    hideResource();	
	
	$('body').append(auth_panel);

});

function hideResource(){
    var module_selector = getModuleSelector();
    //console.log(module_selector);
    $(module_selector).wrap('<div class="hideWrap" style="display:none"></div>');
}

function showResource(){
    var module_selector = getModuleSelector();
    $(module_selector).unwrap().find('.cs-slide-container > div').css('transform','translate(0px,0px)');
    //$(window).trigger('resize');
}


function getModuleSelector(){
    
    var module_selector;
    var module_selectors = ['.framewrap','div#preso'];
    var set = false;
    var timedOut = false;
    setTimeout(function(){ timedOut = true; },20000);

    while(!set && !timedOut){
        $.each(module_selectors,function(k,v){
            var moduleEl = $(v);
            if(moduleEl.length > 0){
                module_selector = v;
                set = true;
                return false;
            }
        });

    }
    /*
    setTimeout(function(){
        var set = false;
        $.each(module_selectors,function(k,v){
            var moduleEl = $(v);
            console.log(moduleEl.length);
            console.log(set);
            if(moduleEl.length > 0){
                module_selector = v;
                set = true;
                return false;
            }
        });
        
        if(!set){
            module_selector = getModuleSelector();
        }
    
    },1000);
    */
    return module_selector;
    
}

function auth(str){
    var e_module_title = $('title').text();
	//console.log(e_module_title);
	var module_list = {
      "Credo Claims Consumer Questionnaire Knowledge" : "bananas",
      "Management Competency Training Programme Effective Objective Assessment Constructive Feedback & One to Ones POL" : "quiztime",
      "Management Competency Training Programme Performance Coaching POL":"majestic",
      "WEB Establishing The Initial Position POL" : "bigbang",
      "Phone Prospecting POL" : "bullion",
      "Sales Meeting - Start POL" : "drama",
      "Sales Meeting - Middle POL" : "greece",
      "Sales Meeting - End POL" : "aristotle",
      "Presentation Skills" : "breathe",
      "Setting Goals and SMART Objectives" : "tothemoon",
      "The Consultative Influencer Module 1" : "timepiece",
      "The Consultative Influencer Module 2" : "spiral",
      "The Consultative Influencer Module 3" : "tophat",
      "The Consultative Influencer Module 4" : "mindful",
      "The Performance Review Meeting" : "racecar",
      "HR Absence Policy Quiz Challenge" : "human",
      "HR Disciplinary, Conduct & Capability Quiz Challenge" : "human",
      "HR Grievance Policy Quiz Challenge" : "human",
      "Recruiting Effectively & Quiz Challenge" : "human",
      "ILM 3 Award Module 1 Understanding Leadership" : "leaders",
      "Interpersonal Communications Skills" : "interact",
	  'old':{
	    'Management T&C Programme Effective & Objective Assessment POL - OLD' : 'quiztime',
	    'Management T&C Programme Feedback POL - OLD ' : 'swans',
	    'Management T&C Programme Performance Coaching POL - OLD' : 'majestic'
	  }
	}
	
	if(e_module_title == undefined || e_module_title == ''){
        var pw = 'bananas';
	} else {
	    var pw = module_list[e_module_title]
	}
	
    if (str == pw){
        showResource();
   		$('.auth_panel').remove();

    } else {
	    $('input.auth_code').css({'border':'1px solid red'}).val('incorrect, try again');
	}
}

