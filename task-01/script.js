alert("Use keyboard arrow keys or buttons to navigate!!");
var image = document.getElementById("dp");
var count = 0;
const pics = ["images/yadhu.jpg","images/hrishi.jpg","images/ani.jpg","images/hk.jpg"];
const names = ["Yadhukrishnan NP","Hrisheekesh G Nair","Aniketh Vijesh","Harikrishnan S"];
const col = ["rgb(105, 82, 56)","rgb(126, 136, 81)","rgb(81, 136, 100)","rgb(136, 81, 135)"]
function prev() {
    if (count) {
        count--;
        document.getElementById("dp").src = pics[count];
        document.getElementById("name").innerHTML=names[count];
        document.getElementById("name").style.color = col[count];
    }
}
function next() {
    if (count!=3) {
        count++;
        document.getElementById("dp").src = pics[count];
        document.getElementById("name").innerHTML=names[count];
        document.getElementById("name").style.color = col[count];
    }
}
document.addEventListener('keydown', (event) => {
    var name = event.key;
    if (name=="ArrowLeft") {
        prev();
    }
    if (name=="ArrowRight") {
        next();
    }
});


