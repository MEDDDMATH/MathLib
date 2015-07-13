 ;(function (){
addStepGroup(window.step_group_arr);
function addStepGroup(tempGpArray){
	for(var i=0;i<tempGpArray.length;i++){
		var divGroupLeft = tempGpArray[i][1];
		var divGroupTop = tempGpArray[i][2];
		var divGroupWidth = tempGpArray[i][3];
		var divGroupHeight = tempGpArray[i][4];
		var divGroupName = tempGpArray[i][0];
		
		if($('div#'+divGroupName).size() == 0){
			divGroupContent = '<div id="'+divGroupName+'" style="border:none; position:absolute; left:'+divGroupLeft+'px; top:'+divGroupTop+'px; width:'+divGroupWidth+'px; height:'+divGroupHeight+'px;"></div>';
			$("body").append(divGroupContent);
		}
	}
	addStepButton(window.step_button_arr);
	function addStepButton(tempBtnArray){
		for(var j=0;j<tempBtnArray.length;j++){
			//[["ICON_STEP",6,162,'step_group_0']
			var buttonLeft = tempBtnArray[j][1];
			var buttonTop = tempBtnArray[j][2];
			var buttonWidth = 55;
			var buttonHeight = 65;
			var buttonFile = tempBtnArray[j][0];
			var buttonFileName = tempBtnArray[j][0]+'.png';
			var divGroupName = tempBtnArray[j][3];
			var buttonContorlDiv = 'iframe_'+j;
			
			if($('div#'+divGroupName+' a.'+buttonFile).size() == 0){
				buttonContent = '<a class="'+buttonFile+'" id="'+buttonContorlDiv+'" href="#" style="border:none; position:absolute; left:'+buttonLeft+'px; top:'+buttonTop+'px; width:'+buttonWidth+'px; height:'+buttonHeight+'px;"><img style="border:none;" src="'+buttonFileName+'"/></a>';
				$('div#'+divGroupName).append(buttonContent);

				clickBindAction(j, divGroupName, buttonFile, buttonContorlDiv);
				
			}
		}
		function clickBindAction(count, divGroupNameA, buttonFileA, buttonContorlDivA){
			$('div#'+divGroupNameA+' a.'+buttonFileA).bind('click', function(){
				thisA = $(this);
				currentType = thisA.attr('id');
				if($('div#'+currentType).is(":visible") == true){
					$('div#'+divGroupNameA+' a').show();
					$('div#'+divGroupNameA+' div.sub_iframe').hide();
				}else{
					$('div#'+divGroupNameA+' a').hide();
					$('div#'+divGroupNameA+' div.sub_iframe').hide();
					thisA.show();
					$('div#'+divGroupNameA+' div#'+currentType).show();
				}
				return false;
			});
		}
	}
	addIframeStep(window.step_iframe_arr);
	function addIframeStep(tempArray){
		var subFolder = [];
		for(var k=0;k<tempArray.length;k++){

			
			subFolder[k] = tempArray[k][0].split("/");
			var divLeft = tempArray[k][1];
			var divTop = tempArray[k][2];
			var divWidth = tempArray[k][3];
			var divHeight = tempArray[k][4];
			var divGroupName = tempArray[k][5];
			divContent = '<div id="iframe_'+k+'" class="sub_iframe" style="display:none;border:none; position:absolute; left:'+divLeft+'px; top:'+divTop+'px; width:'+divWidth+'px; height:'+divHeight+'px;"></div>';
			$('div#'+divGroupName).append(divContent);
			getIframeData(k);
			
		}
		
		function getIframeData(Num){
			
			$.get( tempArray[Num][0], function( data ) {
				
				data = data.replace(/images/g, subFolder[Num][0]+'/images')
				.replace(/"js/g, '"'+subFolder[Num][0]+'/js');
				//.replace(/src="/g, 'src="'+subFolder[Num][0]+'/')
				//.replace(/voice/g, subFolder[Num][0]+'/voice')
				
				//.replace('<script src="'+subFolder[Num][0]+'/jquery-1.10.2.js"></script>', '');
		
				$("body").animate({ display: 'block' }, 500, function(){
					$('div#iframe_'+Num).html(data);
					$("body").animate({ display: 'block' }, 500, function(){
						ProcessingData();
					});
				});
			},'html');
		}
	}
}

/*

*/
})()