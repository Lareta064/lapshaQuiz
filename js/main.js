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

	const answers = {};

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

					// On click save answer into a global variable
					answers[`${plate.querySelector(`p`).innerText}`] = 
					`${plate.querySelector(`label.active`)? 
					plate.querySelector(`label.active`).querySelector(`input`).value:
					plate.querySelector(`input`).value}`
					
					
				}
				else if(next.innerText === `Рассчитать`){
					const nameElem = plate.querySelector(`input[name="userName"]`);
					const phoneElem = plate.querySelector(`input[name="userPhone"]`);

					const name = nameElem.value.trim();
					const phone = phoneElem.value;

					if(name.length !== 0 &&
					phone.length === 16){
						plate.classList.remove(`plate--active`);

						document.querySelector(`.plate-success`)
						.classList.add(`plate--active`);
						
						answers[`Имя`] = name;
						answers[`Телефон`] = phone;

						sendRequest(`https://www.thunderclient.io/welcome`, answers)
					
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

function sendRequest(linkAdress, data){
	const req = new XMLHttpRequest();
	req.open(`POST`, linkAdress, true);
	req.setRequestHeader(`Content-type`, `application/x-www-form-urlencoded`);

	let body = ``;
	for(let i in data){
		body += `${i}=${data[i]}&`;
	}
	console.log(body);
	req.send(body);
}
