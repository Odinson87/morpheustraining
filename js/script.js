$(function(){
    getExternal();
    ready();
});

function getExternal(){
	$('section[data-get]').each(function(ks,s){
	  if( $(s).attr('data-get') != null ){
		$.ajax({ 
		  url : $(s).attr('data-get'),
		  context : $(s),
		  beforeSend : function(){
		    var sctrl = $('<div>').addClass('sctrl');
			    sctrl.append( $('<div>').addClass('min').click(function(){ btnToggle($(this)); toggleSiblings($(this));}) );
			    sctrl.append( $('<div>').addClass('close').click(function(){ removeSection($(this)); }) );
		        sctrl.append( $('<div>').addClass('clearFloat') );
			
			var loading = $('<div>').addClass('loading');
			    loading.append( $('<div>').addClass('loadingImg') );
		        loading.append( $('<div>').addClass('loadingTxt').text('loading...') );
		        loading.append( $('<div>').addClass('clearFloat') );
			
			$(s).append(sctrl);
			//$(s).append( $('<h4>').text('Loading...') );
			$(s).append(loading);
		  }
		})
		.done(function(data, textStatus, jqXHR){
		    //console.log('status: ' + textStatus);
		    //console.log(jqXHR);
		    //console.log(data);
			//$(this).append( $('<div>').text('done') );
			populateSection( $(this),data );
    		$(this).find('.loading').remove();
			
			var intro = data.match(/class="intro"/);
			if(intro.length == 0){
			}
			    $(this).find('.container.hidden').removeClass('hidden');
			
			if($(this).hasClass('hidden')){
			    $(this).removeClass('hidden');
			}
		})
		.fail(function( jqXHR, textStatus, error ) {
		    //console.log('status: ' + textStatus);
		    //console.log(jqXHR);
		    //console.log(error);
			$(this).find('.loading').remove();
			$(this).append( $('<div>').text('failed: ' + textStatus) );
			$(this).append( $('<div>').text('failed: ' + error) );
			
		});
	  }
	});
}

// <<<==== On Page Load ====>>>
function ready(){
     //console.log('init...');
	
	// add revealIcon button to images
	$('section .image').each(function(k,v){
	    if($(v).find('.revealIcon').length == 0){
			var revealIcon = $('<div>').addClass('revealIcon hidden').text('reveal image +');
			$(v).prepend(revealIcon);
			$(v).click(function(){ revealImage($(this)); });
		}
	});
	
	// on image load check if image is cropped, if so show revealIcon button
	$('img').load(function(){
		if( $(this).parent().hasClass('image') ){
			imageCropped($(this));
		}
	});
	$('img').each(function(){
		if( $(this).parent().hasClass('image') ){
			imageCropped($(this));
		}
	});
	
	// add read more button to items with read_more class
	$('.read_more').each(function(){
		    var rmt = $('<div>').addClass('rmt').text('read more +').click(function(){ rmtBtn($(this)); });
    	    $(this).prepend($('<br>'));
			$(this).children().toggleClass('hidden');
		    $(this).prepend(rmt);
	});
	
	// set tiles
	$('.tiles').addClass('w');
	
    // add show/hide description button to items div with a heading
	$('.itemsTitle').each(function(){
	    if($(this).parents('.items').first().find('.rm').length == 0){    
			var rmBtn = $('<div>').addClass('rm btn d');//.click(function(){ $(this).toggleClass('u d').parents('.items').find('.item').toggleClass('hidden'); });
		    $(this).prepend(rmBtn);
			
			toggleItems( $(this) );
			$(this).click(function(){ 
			    $(this).find('.rm').toggleClass('u d');
				toggleItems( $(this) );
			});
		}
	});
	
	// add show/hide description button to item titles/links
	$('.description').each(function(){
        var descBtn = $('<div>').addClass('desc btn i')
		    descBtn.click(function(){ 
			    $(this).siblings('.description').toggleClass('hidden');
				$(this).parent().find('.image > img').each(function(){ imageCropped($(this)); });
			});

		if($(this).parent().find('h4').length > 0){
		    $(this).parent().find('h4').first().addClass();
		}
	    
		
		$(this).parents('.item').first().prepend(descBtn);
		$(this).toggleClass('hidden');
		
		
	});

	// convert items to tiles // <<<==== write tile toggle function so user can choose layout
	$('.items .item').each(function(){
		//if($(this).find('.description').length > 0){
		//    var descBtn = $('<div>').addClass('desc btn i').click(function(){ $(this).siblings('.description').toggleClass('hidden'); });
		//    $(this).prepend(descBtn);
		//	$(this).find('.description').toggleClass('hidden');			
		//}
		
		if( $(this).parents('.tiles').length > 0 ){
		    
			if( !$(this).parent().hasClass('tile') ){
		        $(this).wrap('<div class="tile"></div>')
			}
		}

	});
	
	// window resize
	$(window).resize(function(){
		$('section .image .revealIcon').each(function(k,v){
			imageCropped($(v));
		});
		fixMainNav();
	});
	
	// window scroll - fix top bar
	$(window).scroll(function(){
        fixMainNav();
	    b2t();
    });	
    
	// hide back to top if necessary
    b2t();
    
    // bind submit buttons
    bindForms();    
	
	// sort comments
	//var commentsEl = $('.items.comments');
	//if( commentsEl.length > 0){
	// $.each(commentsEl,function(){sortElements($(this),'dateDesc')});
	//}
	
    // sort items
	var itemSet = $('.items[data-sort]');
	if( itemSet.length > 0){
	 $.each(itemSet,function(){sortElements($(this))});
	}
	
	//construct contents links
	getContents('init');
	getContents();	

}


function bindForms(){
    $('input[type="submit"]').click(function(e){
        e.preventDefault();
        submitForm($(this).parent());
    });
}

function submitForm(el){

    if(el.find('input[type="file"]').length > 0){
        var fileData = el.find('input[type="file"]').prop("files")[0];
        if(fileData){
            //console.log(fileData);
            uploadFile(el);
        }
    }
}

// upload
function uploadFile(el){
    //get file data
    var fileInput = el.find('input[type="file"]');
    var file_data = fileInput.prop("files")[0];
    console.log(file_data);
    var form_data = new FormData();
    form_data.append('file', file_data);
    form_data.append('fileType',fileInput.attr('data-fileType'));
    
    //run upload.php
   $.ajax({
            type: 'POST',
            url: 'upload.php',
            context : el,
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            beforeSend : function(){
                var el = $(this);
                var loading = $('<div>').addClass('loading');
                    loading.append( $('<div>').addClass('loadingImg') );
                    loading.append( $('<div>').addClass('loadingTxt').text('loading...') );
                    loading.append( $('<div>').addClass('clearFloat') );

                el.append(loading);
                el.append( $('<div>').addClass('resetFormBtn').text('reset').click(function(){ el[0].reset() }) );
		    }
            
        })
        .done(function(data, textStatus, jqXHR){
            var el = $(this);
            el.find('.loading').remove();
            el.append( $('<div>').addClass('tmp_msg').text(data) );
            
            setTimeout(function(){
                //el[0].reset();
                //$('.tmp_msg').fadeOut(1000, function(){ $(this).remove(); });
            },2000);
            
        })
        .fail(function( jqXHR, textStatus, error ) {
            //console.log('status: ' + textStatus);
            //console.log(jqXHR);
            //console.log(error);
            $(this).find('.loading').remove();
            $(this).append( $('<div>').click(function(){ $(this).remove() }).text('failed: ' + textStatus + ' : ' + error) );
            
        });
}


function OnProgress(event, position, total, percentComplete)
{
    //Progress bar
    $('#progressbox').show();
    $('#progressbar').width(percentComplete + '%') //update progressbar percent complete
    $('#statustxt').html(percentComplete + '%'); //update status text
    if(percentComplete>50)
        {
            $('#statustxt').css('color','#000'); //change status text to white after 50%
        }
}

// toggle tiles/items
function toggleItems(el){
	var isTiles = el.parent().find('.tiles');	
	if(isTiles.length > 0){
		isTiles.toggleClass('hidden');
	} else {
		el.parents('.items').first().find('.item').toggleClass('hidden'); 
	}
}

// toggle siblings/section content (excluding title and sctrl)
function toggleSiblings(el){
    var firstH = el.parents('section').find(':header').first();
	if(firstH.length > 0){
	    var sSiblings = firstH.nextAll();
	} else {
	    var sSiblings = el.next().nextAll();
	}	
	
	sSiblings.toggleClass('hidden');
}

// remove section from dom
function removeSection(el){
    el.parents('section').remove();
}


//toggle reveal of cropped images
function revealImage(el){
	el.toggleClass('noMaxHeight');
	var icon = el.find('.revealIcon');
	//console.log(icon);
	var ri = 'reveal image +';
	var hi = 'hide image -';
	if(icon.text() == ri){
		newText = hi;
	} else{
		newText = ri;
	}
	icon.text(newText);
	imageCropped(el.find('img'));
}

// read more text button (show hide content)
function rmtBtn(el){
    el.siblings().toggleClass('hidden');
	var rm = 'read more +';
	var sl = 'show less -';
	if(el.text() == rm){
		newText = sl;
	} else{
		newText = rm;
	}
    el.text(newText);
}


// check if image cropped
function imageCropped(el){
	el = el.parent();
	var imgH = el.find('img').height();
	var imageH = el.height();
	var revealIcon = el.find('.revealIcon');
	// !el.hasClass('noMaxHeight')
	if( imageH = 250 ){
	    if(imageH < imgH-30){
		    tarClass(revealIcon,'show');
        } else if(imageH >= imgH-30){
		    tarClass(revealIcon,'hide');
	    }
	}

	//console.log('imgH: ' + imgH);
	//console.log('imageH: ' + imageH);
}

// redraw image elements
function redrawImages(){
	var redraw = [];
	$('.image').each(function(){redraw.push(this);});
	$('img').each(function(){redraw.push(this);});
	//console.log(redraw);
	$.each(redraw,function(){
	    //console.log(this);
        var redraw = this.offsetHeight;
	    //console.log('height: ' + $(this).height());
	});
}

// toggle/add/remove class to element
// el: element, a: action, c: class
function tarClass(el,a,c){
	if(el != undefined){
		if(c == undefined){
			c = 'hidden' 
		}
		if(a == undefined){
			el.toggleClass(c);
		} else if(a == 'show' || a == 'remove'){
			el.removeClass(c);
		} else if(a == 'hide' || a == 'add'){
			el.addClass(c);
		}
	}
}

// swap buttons
function btnToggle(el){
//console.log(el);
	var btns = {'keys':['l','r','u','d','up','dn','max','min'],
	            'l':'r','r':'l','u':'d','d':'u',
				'up':'dn','dn':'up','max':'min','min':'max'
				}
	
	$.each(btns.keys,function(k,v){
        if(el.hasClass(v)){
		    //console.log('has: ' + v + ', swap for: ' + char[v]);
			el.toggleClass(btns[v] + ' ' + v);
			return false;
		}
	});
}


// fix navigation bar to top on scroll
function fixMainNav(){
	var st = $(document).scrollTop();
	var nav = $('nav.main'); 
	var banner = $('.topBar .banner');
	var extra = 0; 
	
	if(banner == undefined){
		var h = 169;
	} else {
		var h = banner.height();
	}
	
	if( $('.pageState').css('z-index') == 2 ){
	    extra = 20;
	}

	if(st > h){
		nav.addClass('fixed')
		$('section').first().css({'margin-top': nav.height()+ extra +'px'});
	} else if(st <= h){
		nav.removeClass('fixed')
		$('section').first().css({'margin-top': 0 + extra + 'px'});
	}
}

// hide back to top if necessary
function b2t(){
    var st = $(document).scrollTop();
	if( st > 600 ){
		if( $('.b2t').hasClass('hidden') ){
			$('.b2t').removeClass('hidden');
        	//console.log('b2t revealed');
		}
	} else {
		if( !$('.b2t').hasClass('hidden') ){
			$('.b2t').addClass('hidden');
        	//console.log('b2t hidden');
		}
	}
}

// contents
function getContents(a){
	if(a == 'init'){
	    //console.log('init_contents');
		appData = {
			'c':{
				'titles':[],
				'count':0,
				'scrolled':0
			}
		}
		
		if($('nav.contents').length > 0){
    	    //console.log('construct_contents_wrap');
		    $('nav.contents').wrap('<div class="contents_wrap hidden"></div>');
			var xBtn = $('<div>').addClass('xBtn').click(function(){ toggle_contents(); });
			$('nav.contents').prepend(xBtn);
			
			var contentsBtn = $('<a>').addClass('contentsBtn').click(function(){ toggle_contents(); });
			$('nav.main').append(contentsBtn);
		}
		
	} else {
	    //console.log('getContents');
        if($('nav.contents a').length > 0){
		    $('nav.contents a').each(function(){
			    var href = $(this).attr('href');
				if(href == '#'){
				    href = '.page'
				}
				$(this).attr({'data-href': href}).click(function(){scroll_nudge({'el':$(this)});});
				$(this).removeAttr('href');
			});
		}        
		
		$(':header').each(function(){
			appData.c.titles.push(this);
		});
		
		$.each(appData.c.titles,function(k,v){
			//build link item
			appData.c.count++;
			var hID = 'h' + appData.c.count;
			var tier = $(v).prop('tagName').replace(/h/i,'');
				
			$(v).attr('id',hID);
			var item = $('<a>');
				item.attr({'data-href':'#'+hID});
				item.addClass('t'+tier);
				item.text($(v).text());
				item.click(function(){				
				    scroll_nudge({'el':$(this)}); 
				});
			$('nav.contents').append(item);
		});
	
	}
}

function toggle_contents(){
    /*console.log('t_contents');
	if( $('.contents_wrap').hasClass('panelhidden') ){
	    var st = $(window).scrollTop();
        console.log('show contents - st: ' + st);
        console.log('topbar - offset: ');
		console.log($('.contents_wrap').offset());
	
        var ftop = $('.contents_wrap').offset().top;
        $('.contents_wrap').removeClass('panelhidden');
	
	} else {
        $('.contents_wrap').addClass('panelhidden');
	}*/
    $('.contents_wrap').toggleClass('hidden');
	
}

function populateSection(el,data){
   if(el != null && el != undefined && data != null && data != undefined){
    //console.log('populate');
	   // current scripts on page
	   var pageScripts = [];
	   $('head > script').each(function(ks,s){ 
	       pageScripts.push( $(s).attr('src') ); 
	   });
	   // current css on page
	   var pageCss = [];
	   $('head > link').each(function(kc,c){ 
		   pageCss.push( $(c).attr('href') ); 
	   });
       
	   // new scripts from extra page/content
	   var newScripts = [];
	   $(data).filter('script').each(function(ks,s){ 
	       newScripts.push( $(s).attr('src') ); 
	       //console.log($(s).attr('src'));
	   });
	  
	   // new css from extra page/content
	   var newCss = [];
	   $(data).filter('link').each(function(kc,c){ 
		   newCss.push( $(c).attr('href') ); 
	   });
	   
	   // location and file name of extra page/content
	   var location = el.data('get').split('/');
	   var file = location.pop();
	   var location = location.join('/');
	   
	   
	   
	   // add only new css links to page
	   $.each(newCss,function(kc,c){
	       if($.inArray(c,pageCss) == -1){
			   $('head').append( $('<link>').attr({'type':'text/css','rel':'stylesheet','href': location + '/' + c}) );
		   } else {
		       //console.log('css already loaded');
		   }
	   });
	   	   
	   // contents of section from extra page/content
	   var newSection = $(data).filter('section').first();
	   el.append(newSection.find(':header').first());
	   
	   newSection.find('img').each(function(ki,i){
	       $(i).attr('src', location + '/' + $(i).attr('src'));
	       //console.log($(i).attr('src'));
	   });
	  
	  
	  // set data type
	  if(newSection.attr('data-type') != undefined){
	      el.attr('data-type',newSection.attr('data-type'));
	  }
	  // add new content
	  //el.append(newSection.find('.intro').first());
	  el.append( $('<div>').addClass('container hidden').append(newSection.children()) );
	  
	  // add only new script tags to page
	  $.each(newScripts,function(ks,src){
	      if($.inArray(src,pageScripts) == -1){
		      var s= document.createElement('script');
				s.type= 'text/javascript';
				s.src= location + '/' + src;
				document.getElementsByTagName('head')[0].appendChild(s);
		      //$('head').append( $('<script>').attr({'type':'text/javascript','src': location + '/' + src}) );
		  } else {
		      //console.log('script already loaded');
		  }
	   }); 
   }
}

function sortElements(el){
  // remove clearFloat element
  var clearFloat = el.children('.clearFloat').length;
  if(clearFloat == 1){
      el.children('.clearFloat').remove();
  }
  // get array of list items 
  var elArr = el.children();
  

  
  var orderBy = el.data('sort');
  // sort list items
  elArr.sort(function(a,b){
	if(orderBy == 'az' || orderBy == 'za' ){
	    var tA = $(a).text().trim();
	    var tB = $(b).text().trim();
		if (orderBy == 'az'){
		  return tA > tB;
		} else {
		  return tA < tB;
		}
	}
	if(orderBy == 'random'){
		// Get a random number between 0 and 10
		var temp = parseInt( Math.random()*10 );
		// Get 1 or 0, whether temp is odd or even
		var isOddOrEven = temp%2;
		// Get +1 or -1, whether temp greater or smaller than 5
		var isPosOrNeg = temp>5 ? 1 : -1;
		// Return -1, 0, or +1
		return( isOddOrEven*isPosOrNeg );
	}
	if(orderBy == 'dateAsc' || orderBy == 'dateDesc'){
	    // get dates and split on /
		var str1 = $(a).find('p.date').text();
		var str2 = $(b).find('p.date').text();
		if( str1 != undefined && str2 != undefined){
			var arr1 = str1.split('/');
			var arr2 = str2.split('/');
			// get milliseconds from 1970
			var ms1 = new Date( arr1[2],arr1[1],arr1[0] ).getTime();
			var ms2 = new Date( arr2[2],arr2[1],arr2[0] ).getTime();
			if(orderBy == 'dateAsc'){
				return ms1 - ms2;
			}
			if(orderBy == 'dateDesc'){
				return ms2 - ms1;
			}
		} else { return false;}
	}
  })
  // append list items to ul
  .appendTo(el);
  
  // add clearFloat element
  if(clearFloat == 1){
      el.append( $('<div>').addClass('clearFloat') );
  }
}

// get current time/date in ms
function now(){
    var d = new Date();
    return d.getTime();
}

// get all key names of an object
function getKeys(obj){
   var keys = [];
   for(var key in obj){
      keys.push(key);
   }
   return keys;
}

// nudge page  by n (if element provide use offset as scroll position)
function scroll_nudge(p){
//p:{'el':'','n':''} object can have elements and specified nudge amount
	//console.log('scroll_nudge');
	if(p != undefined){		
	    var st = 0;
		if(p.el != undefined){
			if(p.el.attr('data-href')){
				var heading = $( p.el.attr('data-href') );
				//console.log(heading);
				st = heading.offset().top;
			} else {
    			st = p.el.offset().top;
			}
		}
		
		var n = $('nav.main').height() + 20;
		//console.log(n);
		if(p.n != undefined){
		    st = st - p.n;
		} else { 
		    st = st - n;
		}
		
		smoothScroll( st );
	}
}

function smoothScroll(n) {
//console.log(n);
	if( n != undefined ){ 
		$('html, body').animate({
			scrollTop: n
		}, 1000);
		return false;
	}
}


