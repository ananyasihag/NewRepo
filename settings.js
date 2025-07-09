window.onload = () => {
	const form = document.querySelector('#settings');

	chrome.storage.local.get(null, (result) => {
		for ( let field in result) {
			const input = form.elements.namedItem(field);

			if(input) {
				input.value = result[field];
			}
		}
	});

	form.addEventListener('submit', (data) => {
		data.preventDefault();

		const formData = new FormData(form);
		const saveData = {};

		for ( const [key, val] of formData){
			console.log(key);
			console.log(val);
			saveData[key] = val;
		};

		chrome.storage.local.set(saveData, () => {
			alert('Data has been saved locally.');
		});
	});

}