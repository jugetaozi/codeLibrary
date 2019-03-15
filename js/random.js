function randomPassword(num) {
    var arr=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
    var str='';
    for (var i = 0; i <num; i++) {
        var a=Math.random();
        if(a>=0.5){
            str+=arr[Math.floor(Math.random()*26)];
        }else{
            str+=Math.floor(Math.random()*10)
        }

    }
    console.log(str);
}
randomPassword(9);



// var text={"1":"a","2":"b","3":"c","4":"d","5":"e","6":"f","7":"g","8":"h","9":"i","10":"j","11":"k","12":"l","13":"m","14":"n","15":"o","16":"p","17":"l","18":"m","19":"n","2":"","2":"","2":"","2":"","2":"","2":"","2":""};
