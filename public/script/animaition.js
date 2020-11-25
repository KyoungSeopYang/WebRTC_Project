
$(document).ready(function(){ 
    $(".toppen").click(function() {
        $(this).parent().find(".subpen").slideDown('fast').show();                   //subnav가 내려옴.
        $(this).hover(function() { 
}, function(){ 
    $(this).parent().find(".subpen").slideUp('fast');                 //subnav에서 마우스 벗어났을 시 원위치시킴 
    }); });

}); 

$(document).ready(function () {
    $("#div_menu>li").each(function () {
        $(this).click(function () {
            $(this).addClass("selected");                      //클릭된 부분을 상단에 정의된 CCS인 selected클래스로 적용
            $(this).siblings().removeClass("selected");  //siblings:형제요소들,    removeClass:선택된 클래스의 특성을 없앰
        });
    });
});

$(document).ready(function () {
    $(".toppen li").each(function () {
        $(this).click(function () {
            $(this).addClass("selectedpen");                      //클릭된 부분을 상단에 정의된 CCS인 selected클래스로 적용
            $(this).siblings().removeClass("selectedpen");  //siblings:형제요소들,    removeClass:선택된 클래스의 특성을 없앰
        });
    });
});