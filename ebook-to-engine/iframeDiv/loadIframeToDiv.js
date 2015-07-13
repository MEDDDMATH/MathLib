 ;(function (){
addIframeDiv(window.br_iframe_arr);
if(window.mask_button_arr != undefined){
	addPopupMaskButton(window.mask_button_arr);
}

function addIframeDiv(tempArray){

	for(var i=0;i<tempArray.length;i++){

			
			
			// check is mask popup
			if(tempArray[i][5] != undefined){
				var divType = tempArray[i][5];
			}
			if((tempArray[i][5] != undefined)&&(divType == 'mask')&&($('div#mask').size() == 0)){
				divMaskContent = '<div id="mask"></div><div id="mask_close"><a href="#" onclick="closeFrame();return false;">[X]</a></div>';
				$("body").append(divMaskContent);
			}
			
			
			getDataToDiv(i, tempArray[i][5], tempArray)
				
	}
}
function getDataToDiv(Num, divType, tempArray){
	
	var subFolder = tempArray[Num][0].split("/");
	var divLeft = tempArray[Num][1];
	var divTop = tempArray[Num][2];
	var divWidth = tempArray[Num][3];
	var divHeight = tempArray[Num][4];
	var re = new RegExp('"'+subFolder[Num][0]+'/"',"g");
	$.get( tempArray[Num][0], function( data ) {
						
				data = data.replace(/src="/g, 'src="'+subFolder[0]+'/')
				.replace(/voice/g, subFolder[0]+'/voice')			
				.replace(/'images/g, '\''+subFolder[0]+'/images')
				.replace(/"images/g, '"'+subFolder[0]+'/images')
				.replace(re, '""')
				.replace('<script src="'+subFolder[0]+'/jquery-1.10.2.js"></script>', '');
				
				if((divType != undefined)&&(divType == 'mask')){
					divContent = '<div id="iframe_'+Num+'" class="layer_mask" style="border:none; overflow:hidden; position:fixed; left:10px; top:20px; width:'+divWidth+'px; height:'+divHeight+'px;"></div>';
				}else{
					divContent = '<div id="iframe_'+Num+'" style="border:none; position:absolute; left:'+divLeft+'px; top:'+divTop+'px; width:'+divWidth+'px; height:'+divHeight+'px;"></div>';
				}
				$("body").append(divContent);
				$("body").animate({ display: 'block' }, 500, function(){
					
					$('#iframe_'+Num).html(data);
				});
			
			
	},'html');
}
function addPopupMaskButton(tempBtnArray){
	copyData = window.br_iframe_arr;
	scriptCallFrame = "<style>#mask {position: fixed;top: 0px;left: 0px;width: 100%;height: 100%;background-color: #000;opacity: 0.3;z-index: 200;display: none;}";
	scriptCallFrame += "#mask_close {position: fixed;top: 28px;left: 10px;font-size: 15px;font-weight: bold;color: #fff;z-index: 2001;display: none;}";
	scriptCallFrame += "#mask_close a {	color: #000;text-decoration: none;}";
	scriptCallFrame += "div.layer_mask {display: none;background-color: #fff;z-index: 202;padding-top: 10px;}</style>";
	scriptCallFrame += "<script>function callFrame(popupDiv) {$('#mask').show();$('#mask_close').show();$('div.layer_mask').hide();popupDiv.show();}function closeFrame() {stopAnimation();$('div.layer_mask').hide();$('#mask_close').hide();$('#mask').hide();}</script>";
	$("body").append(scriptCallFrame);
	for(var a=0;a<tempBtnArray.length;a++){
		var subBtnFolder = copyData[tempBtnArray[a][0]][0].split("/");
		divMaskButton = '<a href="#" style="border:none; position:absolute; left:'+tempBtnArray[a][1]+'px; top:'+tempBtnArray[a][2]+'px; width:45px; height:55px;" id="action_iframe_'+tempBtnArray[a][0]+'"><img src="'+subBtnFolder[0]+'/images/ICON_ANI.png"></a>';
		$(divMaskButton).appendTo('body');
		
		buttonBind(tempBtnArray[a][0]);
		
	}
}
function buttonBind(handleIframeNum){
	$('a#action_iframe_'+handleIframeNum).bind('click', function(){
		
		$('div#mask_close').css('left', ($('div#iframe_'+handleIframeNum).width()-23)+'px');
		callFrame($('div#iframe_'+handleIframeNum));
		return false;
	});
}
})()