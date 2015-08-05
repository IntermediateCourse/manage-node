$(function(){
	//选择控件
	var _searchType = ['会计姓名','会计电话','公司名称','公司税号'];
	$('.select-options li').each(function(i,item){
		var name = item.innertText||item.textContent;
		$(item).click(function(e){
			$('#searchType').val(i);
			$('.select-value').html(name);
		})
	});
	//给日期绑定日期控件
	$('.date').datepicker({
		autoclose:true
	});

	//表单的提交
	$('.search-form').submit(function(e) {
		e.preventDefault();
		var _startDate =  $('#start-date').val(),
			_endDate = $('#end-date').val(),
			_searchType = $('#searchType').val(),
			_queryString = $('#queryString').val();
		var _err = vaildate(_startDate,_endDate);
		if(!_err){
			alert('开始时间不能大于结束时间');
			return;
		}
		var option = {
			startDate:_startDate,
			endDate:_endDate,
			searchType:_searchType,
			queryString:_queryString
		}
		getCompanyData(option);
	});

	//表单提交数据的验证
	function vaildate (_startDate,_endDate){
		if(_startDate&&_endDate){
			_startDate = new Date(_startDate);
			_endDate = new Date(_endDate);
			if(_startDate > _endDate){
				return false;
			}
		}
		return true
	}

	//获取公司的数据信息
	function getCompanyData(option){
		var option = option || {};
		$.get('/company/',{},function(json){
			if(json.success){
				console.log(json.data);
			}
		})
	};
	getCompanyData();
	//observerTable();
})



function observerTable(){
	var data = [];


	Object.observe(data,function(changes){
		changes.forEach(function(item){
			console.log(item.type);
			console.log(item.name);
			console.log(item.oldValue);
			console.log(item.object);
		})
	})

	data.push(1);

	//data[0] = 2;

	console.log(data);
}