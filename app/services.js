App.Services = (function(lng, app, undefined) {
	
	var fusionTables = function(){
		lng.Service.get('https://www.googleapis.com/fusiontables/v1/query',{
			query: '?sql=SELECT * FROM 1YmoDEWT2ILAil9-Kn-Ft0ZO_M-p9DbfmJBcARvY',
			key: '&key=AIzaSyBgd9Y7lbq0hiYoWzXFpsw84KyMrRKexyE',
			callback: '?'
		},
		);
	}
    return {
		fusionTables: fusionTables
    }

})(LUNGO, App);