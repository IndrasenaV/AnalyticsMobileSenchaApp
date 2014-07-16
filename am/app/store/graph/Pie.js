Ext.define('AM.store.graph.Pie', {
	extend : 'Ext.data.JsonStore',
	requires : [ 'Ext.data.JsonStore' ],
	proxy : {
		type : 'memory'
	},
	fields : [ {
		name : 'name',
		type : 'string'
	}, {
		name : 'data',
		type : 'number'
	}
	]
});