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
				buttonContent = '<a class="group_btn '+buttonFile+'" id="'+buttonContorlDiv+'" href="#" style="z-index:99;border:none; position:absolute; left:'+buttonLeft+'px; top:'+buttonTop+'px; width:'+buttonWidth+'px; height:'+buttonHeight+'px;"><img style="border:none;" src="'+buttonFileName+'"/></a>';
				$('div#'+divGroupName).append(buttonContent);

				clickBindAction(j, divGroupName, buttonFile, buttonContorlDiv);
				
			}
		}
		function clickBindAction(count, divGroupNameA, buttonFileA, buttonContorlDivA){
			$('div#'+divGroupNameA+' a.'+buttonFileA).bind('click', function(){
				thisA = $(this);
				currentType = thisA.attr('id');
				if($('div#'+currentType).is(":visible") == true){
					$('div#'+divGroupNameA+' a.group_btn').show();
					$('div#'+divGroupNameA+' div.sub_iframe').hide();
				}else{
					$('div#'+divGroupNameA+' a.group_btn').hide();
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
		var subFolderNum = [];
		var subFolderRoot = [];
		var iframeRoot = [];
		for(var k=0;k<tempArray.length;k++){

			
			subFolder[k] = tempArray[k][0].split("/");
			subFolderNum[k] = subFolder[k].length-1;
			subFolderRoot[k] = '';
			iframeRoot[k] = '';
			
			if(subFolderNum[k]==1){
				iframeRoot[k] = subFolder[k][a]+'/';
			}
			for(var a=0;a<subFolderNum[k];a++){
				if(a<subFolderNum[k]-1){
					iframeRoot[k] = iframeRoot[k]+subFolder[k][a]+'/';
				}
				subFolderRoot[k] = subFolderRoot[k]+subFolder[k][a]+'/';
			}
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
			if(subFolderNum[k]==3){
				var re = new RegExp('../../../../common/',"g");
				var re2 = new RegExp('../../../PAGE',"g");
			}else if(subFolderNum[k]==2){
				var re = new RegExp('../../../common/',"g");
				var re2 = new RegExp('../../PAGE',"g");
			}else{
				var re = new RegExp('../../common/',"g");
				var re2 = new RegExp('../PAGE',"g");
			}
			
			var re3 = new RegExp("'../PAGE","g");
			$.get( tempArray[Num][0], function( data ) {
				
				data = data.replace(/images/g, subFolderRoot[Num]+'images')
				.replace(/"js/g, '"'+subFolder[Num][0]+'/js')
				.replace(re, '../common/')
				.replace(re2, iframeRoot[Num]+'PAGE')
				.replace(re3, "'"+iframeRoot[Num]+'PAGE')
				.replace(/obj_1024, obj_1536, obj_2048/g, 'obj_1024');
				//.replace(/src="/g, 'src="'+subFolder[Num][0]+'/')
				//.replace(/voice/g, subFolder[Num][0]+'/voice')
				
				//.replace('<script src="'+subFolder[Num][0]+'/jquery-1.10.2.js"></script>', '');
				console.log(subFolder[Num][0]);
				console.log(subFolderRoot[Num]);
				console.log(iframeRoot[Num]);
				$("body").animate({ display: 'block' }, 500, function(){
				
					$('div#iframe_'+Num).html(data);
					$("body").animate({ display: 'block' }, 500, function(){
						ProcessingData();
						if($('div#bg_1024').size()>0){
							$('div#bg_1024').show();
						}
					});
				});
			},'html');
		}
	}
}

/*

*/
})()