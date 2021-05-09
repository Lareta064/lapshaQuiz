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

	for(let i = 0 ; i < 7 ; i++){
		const plate = document.querySelector(`.plate-${i+1}`);
		const nxtPlate = document.querySelector(`.plate-${i+2}`);
		const prvPlate = document.querySelector(`.plate-${i}`);

		const inputs = plate.querySelectorAll(`input`);
		const next = plate.querySelector(`button.next-btn`);
		const back = plate.querySelector(`button.back-btn`);

		if(next){
			next.onclick = () => {
				
				if(next.innerText === `Далее`){
					plate.classList.remove(`plate--active`);
					nxtPlate.classList.add(`plate--active`);
				}
				else if(next.innerText === `Рассчитать`){
					const name = plate.querySelector(`input[name="userName"]`);
					const phone = plate.querySelector(`input[name="userPhone"]`);
					
					if(name.value.trim().length !== 0 &&
					phone.value.length === 16){
						plate.classList.remove(`plate--active`);

						document.querySelector(`.plate-success`)
						.classList.add(`plate--active`);
						
					// REQUEST!
					}
				}
			}
		}
		
		if(back){
			back.onclick = () => {
				plate.classList.remove(`plate--active`);
				prvPlate.classList.add(`plate--active`);
			}
		}

		inputs.forEach(input => {
			
			// If this is a radio button
			if(input.type === `radio`){
				// Add listener on each input
				input.onclick = function(event){
					// Clear the active selection, set clicked as new active, show the "Next" btn
						plate.querySelector(`label.active`)?.classList.remove(`active`);
						this.closest(`label`).classList.add(`active`)
						next.classList.add(`next-btn--active`);
				}
			}
			// If this is a text input field
			else if(input.type === `text`){
				next.classList.add(`next-btn--active`);
			}})
	}
})
