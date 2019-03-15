

// obj={
//     per:{
//         funB:function(param1,param2){
//
//             console.log(this.v);
//             console.log(param1);
//             console.log(param2);
//         },
//         v:'per的value'
//     },
//     v:'obj的value',
//     a:function(param){
//         this.per.funB.bind(this,param)('调用时传参');
//     }
// }
// obj.a('绑定时传参');


// obj={
//     per:{
//         funB:function(){
//             console.log(this.v);
//         },
//         v:'per的value'
//     },
//     v:'obj的value',
// }
// obj.per.funB.();

function bind(){

}