const getThisYear = param => {
	var date = new Date();
	$(param).append(date.getFullYear());
};
