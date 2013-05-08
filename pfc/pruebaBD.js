    var db;
    function init() {
        db = openDatabase("DB Incidencias", "0.1", "Database Prueba", 200000);
        if (db) {
            // Database opened
			db.transaction( function(tx) {
				tx.executeSql("CREATE TABLE IF NOT EXISTS incidencias(id integer primary key autoincrement, name text, categoria text, ubicacion text, fecha date, comentario text, riesgo integer, resuelto integer, foto text)")
			});
        }

		listIncidencias();

    }

	function showIncidencias(incidencias) {
		var place = document.getElementById("incidenciasDiv");
		if (place.getElementsByTagName("ul").length > 0 )
			place.removeChild(place.getElementsByTagName("ul")[0]);
		var list = document.createElement("ul");

		for ( var i = 0; i < incidencias.length; i++) {
			var item = document.createElement("li");
					item.innerHTML += "<b>userId:</b>" + incidencias[i][0] + " <b>Nombre:</b>"
					+ incidencias[i][1] + " <b>Categoria:</b>" + incidencias[i][2] +
					"<button onclick='removeIncidencia("+ incidencias[i][0]+")'>Remove</button>";
			list.appendChild(item);
		}
		place.appendChild(list);
	}

	function listIncidencias() {
		db.transaction( function(tx) {
			tx.executeSql("SELECT * FROM incidencias", [],
				function(tx, result){
					var output = [];
					for(var i=0; i < result.rows.length; i++) {
						output.push([result.rows.item(i)['id'],
								result.rows.item(i)['name'],
								result.rows.item(i)['categoria']]);
					}

					showIncidencias(output);

				});
		});
	}

	function addIncidencia(name, categoria, ubicacion, fecha, comentario, riesgo, resuelto, foto) {
		db.transaction( function(tx) {
			tx.executeSql("INSERT INTO incidencias(name, categoria, ubicacion, fecha, comentario, riesgo, resuelto, foto) VALUES(?,?,?,?,?,?,?,?,?)", [name, categoria, ubicacion, fecha, comentario, riesgo, resuelto, foto]);
		});
		//listIncidencias();
	}

	function removeIncidencia(id) {
		db.transaction(function(tx) {
			tx.executeSql("DELETE FROM incidencias WHERE id=?",[id], listIncidencias);
		})
	}
