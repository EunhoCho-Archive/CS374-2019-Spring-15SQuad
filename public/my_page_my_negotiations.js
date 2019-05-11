$(document).ready(function() {
    let config = {
        apiKey: "AIzaSyAJYY0Az45sH0Sw6jAz3JvR4yjJBIMtbzU",
        authDomain: "squad-67b43.firebaseapp.com",
        databaseURL: "https://squad-67b43.firebaseio.com/",
    };
    firebase.initializeApp(config);
    let database = firebase.database();

    // Show all entries from Firebase
	show_all_entries = function(){
		return database.ref("/Negotiations/").once("value", function(snapshot) {
			var my_value = snapshot.val();
			if(my_value == null){
				return;
			}

			var key_list = Object.keys(my_value);
			for(var i=0; i<key_list.length; i++){
				var entry = my_value[key_list[i]];
				if (((entry.madeBy === "Me") || (entry.to === "Me"))
					&& entry.status != null) {
					let new_container = document.createElement('div');
					new_container.className = "ui container segment";

					let new_col_grid = document.createElement('div');
					new_col_grid.className = "ui stackable center aligned grid";
					new_container.appendChild(new_col_grid);

					let new_middle_row = document.createElement('div');
					new_middle_row.className = "middle aligned row";
					new_col_grid.appendChild(new_middle_row);

					// 1. Arrow icon
					let arrow_icon = document.createElement('div');
					arrow_icon.className = "one wide column";
					if (entry.madeBy === "Me")
						arrow_icon.innerHTML = "<h2><i class=\"icon sign-out\"></i></h2>";
					else
						arrow_icon.innerHTML = "<h2><i class=\"icon sign-in\"></i></h2>";
					new_middle_row.appendChild(arrow_icon);

					// 2. Status
					let status = document.createElement('div');
					status.className = "two wide column";
					status.innerHTML = "<h2>" + entry.status + "</h2>";
					new_middle_row.appendChild(status);

					// 3. Other Store
					let other = document.createElement('div');
					other.className = "three wide column";
					if (entry.madeBy === "Me")
						other.innerHTML = "<h2>" + entry.from + "</h2>";
					else
						other.innerHTML = "<h2>" + entry.to + "</h2>";
					new_middle_row.appendChild(other);


					// 4. Period
					let period= document.createElement('div');
					period.className = "three wide column";

					let start_date = entry.start.split('-');
					let start = document.createElement('h2');
					start.innerHTML = start_date[0] + ". " + start_date[1] + ". " + start_date[2];
					start.className = "elem";
					period.appendChild(start);

					let end_date = entry.end.split('-');
					let end = document.createElement('h2');
        			end.innerHTML = " ~ " + end_date[0] + ". " + end_date[1] + ". " + end_date[2];
        			end.className = "elem"
        			period.appendChild(end);

        			new_middle_row.appendChild(period);


        			// 5. Day and time
					let day_and_time = document.createElement('div');
					day_and_time.className = "three wide column";

					snapshot.child(key_list[i]).child('time').forEach(function(data){
						let new_time = document.createElement('h2');
		        		new_time.innerHTML = data.val().day+"."+data.val().start+"~"+data.val().end;
		        		new_time.className = "elem";
		        		day_and_time.appendChild(new_time);
					});
					new_middle_row.appendChild(day_and_time);

        			$(".twelve.wide.column").append(new_container);
				}
			}
		});
	}

	show_all_entries();

    
});