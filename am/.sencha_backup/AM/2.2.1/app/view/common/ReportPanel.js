Ext.define('AM.view.common.ReportPanel',
		{
			extend : 'Ext.Panel',
			alias : 'widget.common_reportPanel',
			requires : ['AM.view.graph.Line',
			            'AM.view.graph.HorizontalBar',
			            'AM.view.graph.VerticalBar',
			            'AM.view.map.GMapPanel'],
			
			initialize : function(){
				this.callParent(arguments);
				this.panelConfig = this.config.panelConfig;
				this.on('painted', this.loadMetaData,this);
			},
			loadMetaData : function(){
				this.reportIdentifier = {};
				this.reportIdentifier.configId = this.panelConfig.configId;
				this.reportIdentifier.reportId = this.panelConfig.reportId;
				ajaxService.processRequest("report","getReportMetaData",{
					loadMaskMessage : 'Loading meta data.....',
					loadMaskEl :  this.getEl == undefined ? Ext.getBody():this.getEl(),
					args : this.reportIdentifier,
					success : this.afterDataLoad,
					scope : this
				});
			},
			afterDataLoad : function(data){
				var reportType = data.reportType;
				if( this.tempGraphCount != undefined){
					tempGraphCount = this.tempGraphCount;
				}
				tempGraphCount++;
				switch( tempGraphCount ){
					case 1 : this.loadLineGraphData();break;
					case 2 : this.loadPieGraphData();break;
					case 3 : this.loadHorizontalBarData();break;
					case 4 : this.loadMapHeatData();break;
					default : this.loadMapHeatData();break;
					
				}
			},
			loadLineGraphData : function(){
				ajaxService.processRequest("report","getReportData",{
					loadMaskMessage : 'Loading chart data.....',
					loadMaskEl :  this.getEl == undefined ? Ext.getBody():this.getEl(),
					args : this.reportIdentifier,
					success : this.afterLineGraphDataLoad,
					scope : this
				});
			},
			afterLineGraphDataLoad : function(data){
				this.title = data.title;
				this.add( {
					xtype : 'graph_line',
					config : data
				} );
			},
			loadPieGraphData : function(){
				ajaxService.processRequest("report","getPieData",{
					loadMaskMessage : 'Loading chart data.....',
					loadMaskEl :  this.getEl == undefined ? Ext.getBody():this.getEl(),
					args : this.reportIdentifier,
					success : this.afterPieGraphDataLoad,
					scope : this
				});
			},
			afterPieGraphDataLoad : function(data){
				this.title = data.title;
				this.add( {
					xtype : 'graph_pi',
					config : data
				} );
			},
			loadHorizontalBarData : function(){
				ajaxService.processRequest("report", "getHorizontalBarData",{
					loadMaskMessage : 'Loading chart data.....',
					loadMaskEl :  this.getEl == undefined ? Ext.getBody():this.getEl(),
					args : this.reportIdentifier,
					success : this.afterHorizontalBarDataLoad,
					scope : this
				});
			},
			afterHorizontalBarDataLoad : function(data){
				this.title = data.title;
				this.add( {
					xtype : 'graph_horizontalBar',
					config : data
				} );
			},
			loadVerticalBarData : function(){
				ajaxService.processRequest("report","getVerticalBarData",{
					loadMaskMessage : 'Loading chart data.....',
					loadMaskEl :  this.getEl == undefined ? Ext.getBody():this.getEl(),
					args : this.reportIdentifier,
					success : this.afterVerticalBarDataLoad,
					scope : this
				});
			},
			afterVerticalBarDataLoad : function(data){
				this.title = data.title;
				this.add( {
					xtype : 'graph_verticalBar',
					config : data
				} );
			},
			loadMapHeatData : function(){
				ajaxService.processRequest("location","getSiteAccessGeoData",{
					loadMaskMessage : 'Loading chart data.....',
					loadMaskEl :  this.getEl == undefined ? Ext.getBody():this.getEl(),
					args : this.reportIdentifier,
					success : this.afterMapHeatDataLoad,
					scope : this
				});
			},
			afterMapHeatDataLoad : function(data){
				this.title = data.title;
				this.add( {
					xtype : 'gmappanel',
					config : data
				} );
			}
		});