var sortedDepartmentList;
var currentPage = 1;
var buttonLimitPerPage = 16;
var sortedDepartmentListSize = 0;

$(document).ready(function()
{
		
		// load xml
        $.get('departments.xml', function(d){
	
		//sort xml
		sortedDepartmentList = $(d).find("department").get().sort(function(a,b){
	     	var a = $(a).find("title").text();
	     	var b = $(b).find("title").text();
	     	return a < b ? -1 : a == b ? 0 : 1;
	    })

		sortedDepartmentListSize = sortedDepartmentList.length;

	  	BuildPage(0,buttonLimitPerPage);
	
		//var justNextHtml = '<br><section><button class="btn btn-default btn-lg" onclick="NextPage()">Next</button></section>';
		
		PageStatusBar();
		
    });

});

function NextPage()
{
	currentPage++;

	var endPos = currentPage * buttonLimitPerPage;
	var startPos =  (endPos - buttonLimitPerPage) ;

	this.$("dl").empty();
	
	BuildPage(startPos, endPos );
	
};

function GetDepartmentsCount()
{
	alert('Total number of departments: ' + jQuery(sortedDepartmentList).size()  );
};

function getTitle(pos)
{
	var temp = sortedDepartmentList[pos].getElementsByTagName('title');
	return  temp.item('title').textContent;
};

function getZone(pos)
{
	var temp = sortedDepartmentList[pos].getElementsByTagName('zone')
	return temp.item('zone').textContent;
};

function getCode(pos)
{
	var temp = sortedDepartmentList[pos].getElementsByTagName('code')
	return temp.item('code').textContent;
};
function getBgColor(pos)
{
	var temp = sortedDepartmentList[pos].getElementsByTagName('bgColor')
	return temp.item('bgColor').textContent;
};


function PrevPage()
{
	currentPage--;

	this.$("dl").empty();
	
	var endPos = currentPage * buttonLimitPerPage;
	BuildPage(endPos- buttonLimitPerPage, endPos);

	
};


function BuildPage(startPos, endPos)
{

	var curIndex = startPos;
	var arrayEndPos = endPos ;

	var buttonsAdded =0;

	try
	{
		for (i = curIndex; i < arrayEndPos; i++)
		{

			var title = getTitle(i);
		    var zone = getZone(i);
	        var code = getCode(i);
	        var bgColor = getBgColor(i);

			var html = '<div class ="col-md-3 col-sm-6">';
			html += '<a href="#"><table id="buildButton" style="border-left: 2px solid #' + bgColor + '; border-bottom: 5px solid #' + bgColor + ';" cellpadding="5" width="100%" cellspacing="0" bgcolor="#' + bgColor + '"">'; 
			html += '<td width="60%" bgcolor="#FFFFFF" id="buildButtonText"><font size="2" face="verdana">' + title + '</font></td>';
			html += '<td bgcolor="#' + bgColor + '"><font size="1" face="lato">' + zone +'</font></td>';
			html += '<td bgcolor="#' + bgColor + '"><font size="1" face="lato">Gate<br>' + code +'</font></td>';
			html += '</table></a><br>';
				
	        $('dl').append($(html));
			
	        curIndex++;
			buttonsAdded ++;

	    };
	}
	catch(e)	
	{
	}

	PageStatusBar();
	
	$('#pageNavButtons').empty();
	
	if (currentPage==1)
    {
    	var prevJustNextHtml = '<section><br><button class="btn btn-default btn-lg" onclick="NextPage()">Next</button></section>';
	    $('#pageNavButtons').append($(prevJustNextHtml));
		
	}
	else if (currentPage>1)
    {
		
		if (buttonsAdded == buttonLimitPerPage)
		{
			var bothButtonsHTML = '<section><br><button class="btn btn-default btn-lg" onclick="PrevPage()">Prev Page</button> <button class="btn btn-default btn-lg" onclick="NextPage()">Next Page</button></section>';
		    $('#pageNavButtons').append($(bothButtonsHTML));

		}
		else
		{
		
			var bothButtonsHTML = '<section><br><button class="btn btn-default btn-lg" onclick="PrevPage()">Prev Page</button> </section>';
		    $('#pageNavButtons').append($(bothButtonsHTML));
		}
	}

};
function PageStatusBar()
{
	$('#pageStatus').empty();
	var pageStatusHTML = '<section><font size="2" face="verdana">Page ' + currentPage + ' of ' + Math.round(sortedDepartmentListSize / buttonLimitPerPage) + '</font></section>';
    $('#pageStatus').append($(pageStatusHTML));

};

