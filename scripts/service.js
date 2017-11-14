function animImage(MyImage, src) {
    MyImage.src = src;
}

function overPDA(pda){
	TweenLite.to(pda, 0.25, {top: 475, left: 515, width: 75, height: 62, ease:Back.easeOut} );
}
function outPDA(pda){
	TweenLite.to(pda, 0.25, {top: 479, left: 520, width: 65, height: 54} );
}

function overUbezh(ubezh){
    TweenLite.to(ubezh, 0.25, {top: 415, left: 379, width: 87, height: 58, ease:Back.easeOut} );
}
function outUbezh(ubezh){
    TweenLite.to(ubezh, 0.25, {top: 420, left: 482, width: 77, height: 51} );
}

function createTopSlot(){
	var upperDiv = document.createElement('div');
	upperDiv.style = {'position':absolute, 'cursor':'pointer', 'z-index':'2'};

    var bg = document.createElement('img');
    bg.src = "../images/slot_top.png";
    bg.className = "locked";

    var def_photo = document.createElement('img');
    def_photo.src = "../images/top_def.png";
    def_photo.className = "top_mask";

    var level = document.createElement('div');
    level.className = "top_slot_level";

    var name = document.createElement('div');
    name.className = "top_slot_name";

    upperDiv.appendChild(bg);
    upperDiv.appendChild(top_mask);
    upperDiv.appendChild(level);
    upperDiv.appendChild(name);

    return upperDiv;
}