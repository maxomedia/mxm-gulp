var modules = [
	'./m1',
	'./m2',
	'./m3',
	'./m4',
	'./m5',
	'./m6'
];

var async = [];

for(var i = 0; i < modules.length; i++) {
	if (typeof modules[i] === 'function'){}
}

console.log(modules);