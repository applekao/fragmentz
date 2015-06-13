//----------Over_All-----------//

var Mode = 0;


(function($) {
	
  
     $.fn.lyhucTouchPad = function(options) {
		 //鼠标X位置
		var element=$(this);
		var draging = false;
		var touchPageWrapper=$("#" + element[0].id + "Wrapper");
		var touchPageContent=$("#"+element[0].id+"  ."+element[0].id+"Content");
		
		var marginleft=0;//父面板位置
		var touchPageContentWidth=touchPageContent.width();
		var startLeft,endLeft; 
		var startX,startY;  
		var point={X:0,Y:0};
		var currentIndex=0;
		var direction=0;
		
		var pageCount=touchPageContent.size();
		//touchPageWrapper.width((pageCount+1)*touchPageContentWidth);
		//touchPageWrapper.width(400%);

		 var defaults = {
			align:'center',
			pager:'#pager',
			showmousePoint:true
		};
		
		var options = $.extend(defaults, options);

		 //初始化
		(function init(){
						
			if(options.align=='center')
			{
				marginleft=($(window).width()-element.width())/2;
				element.css("left",marginleft);
				$(options.pager).css("width",marginleft);
			}
			if(options.align=='right')element.css("right",0);
			startLeft=0;
			
			
			for(var i=0;i<pageCount;i++)
			{
				if(i==0)
					$(options.pager+">div").before("<a href='#' class='current'> </a>");
				else
					$(options.pager+">div").before("<a href='#' class='point'> </a>");
			}
			
		})();
			
		clearEvent = function(){
			
		}
		
		startDrag = function(event)
		{

            if(Mode==0){

			if(event.target.id == "NoSign"){
		    NoHeadPhone();
			}
			var offset = $(this).offset();   
			startLeft = offset.left;
			//startX = event.pageX;
			//startX = StartX;
			//console.log(startX);
			$(this)
			.stop(true, false)
			//.mousemove(moveDrag)
			.touchmove(moveDrag)
			.css('cursor','move'); 
			;
		   }
		}
		
		/*
		* div随鼠标移动，由startDrag开启，由enddrag结束
		*/
		var moveDrag = function(event){
            
            if(Mode==0){
            if(P5touchmove == true){
			movepx= CurrentX-StartX;
			endLeft= startLeft+movepx;
			
			direction=0;
			if(movepx>0 && movepx>=(windowWidth/6))
				direction=1;
			else if (movepx<0 && Math.abs(movepx)>=(windowWidth/6))
				direction=-1;
			//$(this).css("left", endLeft-marginleft );
			this.style.left = endLeft-marginleft + "px";
	     	}
	        }
		}
		
		var endDrag = function(event){
			if(Mode==0){
				$(touchPageWrapper)
				    //.unbind("mousemove",moveDrag)
					//.unbind("touchmove",moveDrag)
					.css('cursor','auto'); 
				if(direction==1)
					currentIndex++
				else if(direction==-1)
					currentIndex--;
				
				if(currentIndex==1 && (direction==1)) currentIndex=0;
				if((Math.abs(currentIndex)+1)>=pageCount && (direction==-1)){currentIndex=(-pageCount+1);}
				
				$(touchPageWrapper).animate({ left: currentIndex*touchPageContentWidth }, 400);
	
				var currentA=$(options.pager+" a");
				$(currentA).attr("class","");
				$(currentA).eq(Math.abs(currentIndex)).attr("class","current");
				//console.log(currentIndex);
                
                if(currentIndex == 0){
                   $(".IntroPoint").css("background-color","#EEE");
                   Point1.style.backgroundColor = "#AAA";
                   user_head.style.opacity = 0;
                   headphoneOut.style.backgroundPositionY="18px";
                   headphoneIn.style.backgroundPositionY="18px";
                   cellphoneOut.style.backgroundPositionY="18px";
                   cellphoneIn.style.backgroundPositionY="18px";
                }
                else if(currentIndex == -1){
                   $(".IntroPoint").css("background-color","#EEE");
                   Point2.style.backgroundColor = "#AAA";
                   user_head.style.opacity = 1;
                   headphoneOut.style.backgroundPositionY="0px";
                   headphoneIn.style.backgroundPositionY="0px";
                   cellphoneOut.style.backgroundPositionY="0px";
                   cellphoneIn.style.backgroundPositionY="0px";
                }
                else if(currentIndex == -2){
                   $("#toMain").click();
                   $("#Result").click();
                   Mode = 1;
                   setTimeout("DemoBackground()",1200);
                   console.log("Going For Main!");
                }

				direction=0;
			}
		}

				
		//初始化事件
		return this.each(function(){
				var obj = $(this);
				
				// obj.bind("mousemove",function(e){
				// 	point.X = e.pageX;
				// 	point.Y = e.pageY;
					
				// }).bind("mouseup",endDrag);
				
				// $(touchPageWrapper).bind("mousedown",startDrag)
				// .bind("click",clearEvent)
				// .bind("mouseup",endDrag).bind("mouseout",endDrag);

				//-------touch---------//

				// obj.bind("touchmove",function(e){
				// 	point.X = event.targetTouches[0].pageX;
				// 	//console.log(point.X);
				// 	point.Y = event.targetTouches[0].pageY;
				// }).bind("touchend",endDrag);
					
				$(touchPageWrapper).bind("touchstart",startDrag)
				//.bind("touch",clearEvent)
				.bind("touchend",endDrag).bind("touchend",endDrag);

			
			});

    };
	

})(jQuery);




// 0 for Intro;
// 1 for Main_Example
// 2 for Main_Using

//-----------p5_touch----------//

var CurrentX=0;// CurrentY=0;
var StartX=0;
var movepx;
var P5touchmove = false;

function setup(){
noCanvas();
}

function DemoBackground(){
	//CloseBackground.style.backgroundImage = "url('../www/images/info_desk.jpg')";
	CloseBackground.style.opacity = 5;
}




