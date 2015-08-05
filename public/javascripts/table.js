
var listNumber = 5; //每行显示的个数
var showPages = 5; //显示的行数
function tableComponent(){
	








}


//生成页码
function makePagenation(countNum,cureentPage){

	var pageNum = Math.ceil(countNum/listNumber);// pageNum 是获得页码总数
	var percentPage = Math.floor(showPages/2);
	if(cureentPage-percentPage<=0){
		

	}else if(countNum-cureentPage<=percentPage){


	}else {


	}
}

