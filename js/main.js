
$(document).ready(function(){
	// маска для телефона
	$(".phone").mask("+7(999)999-99-99");
	$.fn.setCursorPosition = function (pos) {
		if ($(this).get(0).setSelectionRange) {
			$(this).get(0).setSelectionRange(pos, pos);
		} else if ($(this).get(0).createTextRange) {
			var range = $(this).get(0).createTextRange();
			range.collapse(true);
			range.moveEnd('character', pos);
			range.moveStart('character', pos);
			range.select();
		}
	};
	$('input.phone').click(function () {
		$(this).setCursorPosition(3); // set position number
	});
	/* COUNTER PLATE #3*/
	const counterDecreaseBtn = document.querySelector('#decrease-btn');
	const counterIncreaseBtn = document.querySelector('#increase-btn');
	const counterValueInput = document.querySelector('#counter-value');
	counterDecreaseBtn.addEventListener('click', function(){
		counterValueInput.value++
		
	});
	counterIncreaseBtn.addEventListener('click', function(){
		if( counterValueInput.value <=1){
			counterValueInput.value = 1;	
		}else{
			counterValueInput.value--
		}
	});
	counterValueInput.addEventListener('input', function(){
		if(this.value <1){this.value = 1}
	})
})
