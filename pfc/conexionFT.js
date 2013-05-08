//Conexión a la Base de datos de Fusion Tables
function initialize() {
        var query = "SELECT * FROM " +
            '1YmoDEWT2ILAil9-Kn-Ft0ZO_M-p9DbfmJBcARvY';
        var encodedQuery = encodeURIComponent(query);

        // Construct the URL
        var url = ['https://www.googleapis.com/fusiontables/v1/query'];
        url.push('?sql=' + encodedQuery);
        url.push('&key=AIzaSyBgd9Y7lbq0hiYoWzXFpsw84KyMrRKexyE');
        url.push('&callback=?');

        // Send the JSONP request using jQuery
        $.ajax({
          url: url.join(''),
          dataType: 'jsonp',
          success: function (data) {
            var rows = data['rows'];
            var ftData = document.getElementById('article-3');
			var dataElement = document.createElement('ul');
            for (var i in rows) {
              var id = rows[i][0];
              var name = rows[i][1];
              var categoria = rows[i][3];
			  var ubicacion = rows[i][2];
              var fecha = rows[i][4];
              var comentario = rows[i][5];
			  var riesgo = rows[i][6];
              var resuelto = rows[i][7];
			  var foto = rows[i][8];
				
              
              var liElement = document.createElement('li');
              liElement.innerHTML = 'ID <strong>' + id + '</strong></br>' 
			  + 'name <small>' + name + '</small>' 
			  + 'Categoria <small>' + categoria + '</small>'
			  + 'ubicacion <small>' + ubicacion + '</small>' 
			  + 'fecha <small>' + fecha + '</small>' 
			  + 'comentario <small>' + comentario + '</small>' 
			  + 'riesgo <small>' + riesgo + '</small>' 
			  + 'resuelto <small>' + resuelto + '</small>' 
			  + 'foto <small>' + foto + '</small>' 
			  ;

              dataElement.appendChild(liElement);
              //dataElement.appendChild(fechaElement);
              //dataElement.appendChild(categoriaElement);
              
            }
			ftData.appendChild(dataElement);
          }
        });
      }