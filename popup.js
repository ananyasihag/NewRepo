document.querySelector('#auto-fill').addEventListener('click', () => {
	chrome.tabs.query({active:true, currentWindow:true}, (tabs) => {
		chrome.scripting.executeScript({
			target: {tabId: tabs[0].id},
			func: () => {
				//select all the form fields
				chrome.storage.local.get(null, (result) => {
					document.querySelectorAll('input, textarea, select').forEach((field) => {
						for(m in matches){
							if(match(m, field) === true){
								field.value = result[m];
								break;
							}
						}
					});
				});

				const matches = {
					'fullname': ['fullname', 'name', 'full_name'],
					'fname': ['fname', 'firstname', 'f_name', 'first_name'],
					'lname': ['lname', 'lastname', 'l_name', 'last_name'],
					'phone': ['mobile', 'phone', 'mobilenum', 'contact', 'tel', 'telephone', 'tele'],
					'email': ['email', 'e-mail', 'e_mail', 'mailid', 'emailid'],
					'password': ['pwd', 'password', 'pword', 'pass-word', 'user_password', 'user-password', 'user_session_password'],
					'card': ['cardnbr', 'card', 'debit_card', 'credit_card', 'cardinfo', 'debitcard', 'creditcard'],
					'address': ['address', 'addr', 'addressline1', 'addressline2'],
					'city': ['city', 'place'],
					'state': ['state', 'statename', 'state_name'],
					'country': ['country', 'countryname', 'country_name']
				}

				function match(key, field) {
					const keys = matches[key];
					const name = field.name?.toLowerCase() || '';
					const id = field.id?.toLowerCase() || '';
					const placeholder = field.placeholder?.toLowerCase() || '';
					for( k in keys){
						//console.log(keys[k]);
						if(keys[k] === name || keys[k] === id || keys[k] === placeholder){
							return true;
						}
					}
					return false;
				}
			}
		});
	});
	
});

document.querySelector('#contrast').addEventListener('change', (event) => {
		chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
			chrome.scripting.executeScript({
				target: {tabId: tabs[0].id},
				func: (isChecked) => {
					if(isChecked){
						document.body.style.filter = 'contrast(1.5)';
					} else {
						document.body.style.filter = '';
					}
				
				},
				args: [event.target.checked]
			});
		});
});
