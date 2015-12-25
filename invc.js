#!/usr/bin/env node
var program = require('commander');
var colors = require('colors');
var Parse = require('parse/node');
var ParseSettings = require('./settings');

// Set up commander options for command line commands 
program
.version('0.0.1')
.option('-t, --task [task description]', 'Add the message for the completed task.')
.option('-c, --client [client]', 'The client for which the task has just been completed.')
.option('-h, --hours <n>', 'Number of hours spent on task.', parseInt)
.option('-m, --minutes <n>', 'Number of minutes spent on task.', parseInt)
.option('--fetch [id]', 'Fetch information for particular invoiced item')
.option('--get [client]', 'Get all the invoiced items for a client')
.parse(process.argv);

// Declare colors for the terminal
colors.setTheme({
	error: ['black', 'bgRed'],
	hint: ['black', 'bgYellow'],
	success: ['black', 'bgGreen']
});

// Show an error if some arg is not set
// @Param: name of arg which was not set
function showError(name){
	console.log('[ Error ]'.error, "You are missing "+name+".");
	console.log('[ Hint ]'.hint,'Proper usage:', '$ invc -t "<task desc>" -c "<client>" -h 2 -m 30'.yellow);
	process.exit(1);
}

// When fetching info for a specific item
if(program.fetch){
	console.log('[ Fetching ]'.success, "Looking up item with ID", colors.underline(program.fetch));
	var query = new Parse.Query("Invoices");
	query.equalTo("objectId", program.fetch);
	query.find({
	  success: function(found) {
	  	if(found.length == 1){
	  		console.log('[ Task ]'.hint, found[0].get("task"));
	  		console.log('[ Client ]'.hint, found[0].get("client"));
	  		console.log('[ Hours ]'.hint, found[0].get("hours"));
	  		console.log('[ Minutes ]'.hint, found[0].get("minutes"));
	  	}else{
	  		console.log('[ Error ]'.error, "Could not find entry for ID", program.fetch);
	  	}
	  }
	});
// When fetching info for a specific item
}else if(program.get){
	console.log('[ Getting ]'.success, "Looking up items with client", colors.underline(program.get));
	var query = new Parse.Query("Invoices");
	query.equalTo("client", program.get);
	query.equalTo("invoiced", false);
	query.find({
	  success: function(found) {
	  	if(found.length >= 1){
	  		var minutes = 0;
	  		var hours = 0;
			for (var i = 0; i < found.length; i++) {
				var object = found[i];
				var count = i + 1;
				minutes += object.get("minutes");
				hours += object.get("hours");
		  		console.log(colors.black.bgYellow('[ Item '+count+' ]'), object.get("task")+
		  			' → '+ object.get("hours")+' hours and '+ object.get("minutes") + ' minutes.');
		  	}
		  	// Count up total hours and minutes for client:
		  	hours = hours + parseInt(minutes / 60);
		  	minutes = minutes % 60;
		  	console.log('[ Uninvoiced ]'.hint, hours, 'hours and', minutes, 'minutes');
	  	}else{
	  		console.log('[ Error ]'.error, "Could not find entries for client", program.get);
	  	}
	  }
	});
// When adding a new item to the invoice
}else{ 
	// Check to see if all args are set
	if (!program.task) showError('task');
	if (!program.client) showError('client');
	if (program.hours == undefined && program.minutes == undefined) showError('hours and minutes');
	if (program.minutes > 60 || program.minutes < 0) showError('minutes should be < 60');
	if (program.hours < 0) showError('hours should be > 0');

	// Add invoice item when hour and minutes are set
	if (program.hours != undefined || program.minutes != undefined) {
		console.log('[ %s ]'.success, program.client, 'Adding task...');

		// Just make sure that the hours / minutes aren't undefined:
		var hours, minutes;

		if(program.hours == undefined)
			hours = 0;
		else
			hours = program.hours;
		if(program.minutes == undefined)
			minutes = 0;
		else
			minutes = program.minutes;


		// Add the current content over to an `invoices` Parse table
		var Invoices = Parse.Object.extend("Invoices");
		var invoices = new Invoices();

		invoices.set("task", program.task);
		invoices.set("client", program.client);
		invoices.set("hours", hours);
		invoices.set("minutes", minutes);
		invoices.set("invoiced", false);

		invoices.save(null, {
			success: function(invoices) {
				console.log('[ %s ]'.success, program.client, 'Task added with ID ' + invoices.id);
			},
			error: function(invoices, error) {
				console.log('[ Error ]'.error, 'Failed to create new object, with error code: ' + error.message);
			}
		});
	}
}
