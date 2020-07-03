﻿class Server {

	/**********************************/
	/********Vlad Tolmachev***********/
	/**********2020******************/

	/*Class for Tolmasoft Engine 3.1.1*/
	/*Use for multirequest AJAX*/

	constructor(input_data, loader_movie, stage_movie){
		
		this.arr = input_data;
		this.mc = loader_movie;//гифка загрузчика (надо обязательно исключить все нажатия)
		this.root = stage_movie;//рабочая сцена

		this.mts = ['getToken', 'getLinks', 'getUI', 'getGT', 'getFT', 'getLT', 'getLcsI', 'getW', 'getML', 'getBS', 'getWeap', 'getDon', 'getBon', 'getWrs', 'shmon', 'gtP', 'snatWear', 'odetWear', 'buyWear', 'getBonus', 'udarBoss', 'buyWeap', 'goFight', 'getSB', 'startMG', 'setMG', 'newName', 'updateWork', 'takeWork', 'buyE', 'goQuest', 'getLI', 'getAch', 'getMandat', 'upMandat', 'nullMandat', 'getHobo', 'obmenVal', 'getTop20', 'exitFight', 'buyToy', 'sPod', 'gPod', 'getSnow', 'setNY', 'updTree', 'buySnow', 'getToys'];
		this.scriptURL = this.arr[3]+'/universal.php';//ссылка на сервер
		this.errors = ['Undefined function'];//ошибки

		this.i = 0;
		this.reqs =[];
		this.thisReq = {};
		this.json = {};
		this.wait = false;//чтобы случайно не закончить запрос
		this.parameters = '';
		this.token = '';//ВАЖНО! Нужно доработать безопасность.
		this.MSS = new XMLHttpRequest();//хаваем память. КОСТЫЛЬ?
	}

	php(method, yourParameters, onC, onE){
		this.reqs.push({"m":method, "p":yourParameters, "c":onC, "e":onE});
		this.nextReq();
	}

	nextReq(){
		if(this.wait || this.reqs.length <= 0)return;//тут же если что завершаем

		this.thisReq = this.reqs.shift();
		this.loadReq(this.thisReq['m'], this.thisReq['p']);
	}
		
	loadReq(method, yourParameters){//запрос
		if(this.mts.indexOf(method) == -1){
			json['text'] = btoa(this.errors[0]+' "'+method+'"');
			this.onError();//Вызываем окно типа "Ошибка сервера"
			return;
		}

		this.MSS = new XMLHttpRequest();//жрем клиентскую оперативу. КОСТЫЛЬ!
			
        this.parameters = JSON.stringify(yourParameters);//доп параметры
        
        this.MSSURL = this.scriptURL+ "?h=" + CryptoJS.MD5(Math.floor(Math.random() * 1000000).toString());//формируем уникальную ссылку

        this.MSSparams = 'method='+this.mts.indexOf(method)+'&params='+btoa(btoa(this.parameters))+'&token='+this.token+'&uid='+this.arr[1];//кодируем параметры (оч тупо, надо чот придумать получше)
        if(this.mts.indexOf(method) == 0)this.MSSparams += '&auth='+this.arr[2];//это если надо получить первичный или повторный токен

        this.MSS.open("POST", this.MSSURL, true);//открыли сокет

		this.MSS.setRequestHeader("Content-type", "application/x-www-form-urlencoded");//ВАЖНО! без этого не будет передаваться тело запроса
		
		this.MSS.send(this.MSSparams);//закрыли сокет

		this.MSS.addEventListener("loadend", () => { this.completeRequest(this.MSS);}); //КОСТЫЛЬ. Иначе не будет видеть тело запроса
    }
		
	completeRequest(e){
		if(this.MSS.readyState === 4 && this.MSS.status === 200) {    
			try{
				this.json = JSON.parse(this.MSS.responseText.toString().replace('', ''));
			}
			catch(e){
				this.json['status'] = 'error';
				this.json['text'] = '';
			}
    	}else{
    		this.json['status'] = 'error';
			this.json['text'] = '';
    	}

    	console.log(this.json);
			
		this.json['status'] == "error"?this.onError():this.onComplete();

		this.nextReq();
	}		
	
	onError(){
		if(Boolean(this.thisReq['e']))this.thisReq['e'](json);
	}
	onComplete(){
		if(Boolean(this.thisReq['c']))this.thisReq['c'](json);
	}
		

}