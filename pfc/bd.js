    var db;
	function init() {
	db = openDatabase("DB Incidencias", "0.1", "Database Prueba", 200000);
				if (db) {
					// Database opened
					db.transaction( function(tx) {
						tx.executeSql("CREATE TABLE IF NOT EXISTS " + 
						" incidencias(id integer primary key autoincrement, name text, categoria text)")
					});
				}

			}

	function showIncidencias(incidencias) {
		var place = document.getElementById("usersDiv");
		if (place.getElementsByTagName("ul").length > 0 )
			place.removeChild(place.getElementsByTagName("ul")[0]);
		var list = document.createElement("ul");

		for ( var i = 0; i < users.length; i++) {
			var item = document.createElement("li");
			item.innerHTML += "<b>userId:</b>" + users[i][0] + " <b>userName:</b>"
					+ users[i][1] + " <b>password:</b>" + users[i][2] +
					"<button onclick='removeUser("+ users[i][0]+")'>Remove</button>";
			list.appendChild(item);
		}
		place.appendChild(list);
	}

	function listUsers() {
		db.transaction( function(tx) {
			tx.executeSql("SELECT * FROM incidencias", [],
				function(tx, result){
					var output = [];
					for(var i=0; i < result.rows.length; i++) {
						output.push([result.rows.item(i)['userid'],
								result.rows.item(i)['username'],
								result.rows.item(i)['password']]);
					}

					showUsers(output);

				});
		});
	}

	function addDB(id, name, categoria, ubicacion, fecha, comentario, riesgo, resuelto, foto) {
				db.transaction( function(tx) {
					tx.executeSql("INSERT INTO incidencias(id, name, categoria, ubicacion, fecha, comentario, riesgo, resuelto, foto) VALUES(?,?)", [id, name, categoria, ubicacion, fecha, comentario, riesgo, resuelto, foto]);
				});
				}

	function removeUser(userId) {
		db.transaction(function(tx) {
			tx.executeSql("DELETE FROM usuarios WHERE userId=?",[userId], listUsers);
		})
	}

/*
<div id="newuser">
	Crear nuevo usuario<br/>
	Usuario: <input type="text" id="username"/><br/>
	Password: <input type="password" id="password"/><br/>
	<button onclick="addUser(username.value, password.value)">Add User</button>
</div>
*/