const PRName = function () {
	let ID = '';
	// let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	const characters = '0123456789';
	for ( let i = 0; i < 6; i++ ) {
		ID += characters.charAt(Math.floor(Math.random() * 10));
	}
	return 'PR-'+ID;
};

console.log(PRName()); 
