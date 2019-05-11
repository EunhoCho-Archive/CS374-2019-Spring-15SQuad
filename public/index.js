$(document).ready(function() {

	console.log("hello");
    
    let config = {
        apiKey: "AIzaSyAJYY0Az45sH0Sw6jAz3JvR4yjJBIMtbzU",
        authDomain: "squad-67b43.firebaseapp.com",
        databaseURL: "https://squad-67b43.firebaseio.com/",
    };
    firebase.initializeApp(config);
    let database = firebase.database();

    // Show all entries from Firebase
	function show_all_entries(){
		return database.ref("/Offers/").once("value", function(snapshot) {
			var my_value = snapshot.val();
			if(my_value == null){
				return;
			}

			var key_list = Object.keys(my_value);
			for(var i=0; i<key_list.length; i++){
				var entry = my_value[key_list[i]];

				let new_container = document.createElement('div');
				new_container.className = "ui container segment offer";
				new_container.setAttribute('id', key_list[i]);

				let new_three_col_grid = document.createElement('div');
				new_three_col_grid.className = "ui three column stackable center aligned grid";
				new_container.appendChild(new_three_col_grid);

				let new_middle_row = document.createElement('div');
				new_middle_row.className = "middle aligned row";
				new_three_col_grid.appendChild(new_middle_row);

				let store = document.createElement('div');
				store.className = "column";
				store.innerHTML = "<h2>" + entry.user + "</h2>";
				new_middle_row.appendChild(store);

				let period= document.createElement('div');
				period.className = "column";
				let start_date = entry.start.split('-');
				let end_date = entry.end.split('-');
        		period.innerHTML = "<h2>" + start_date[0] + ". " + start_date[1] + ". " + start_date[2] + " ~ " + end_date[0] + ". " + end_date[1] + ". " + end_date[2] + "</h2>";
        		new_middle_row.appendChild(period);

				let day_and_time = document.createElement('div');
				day_and_time.className = "column";

				snapshot.child(key_list[i]).child('time').forEach(function(data){
					let new_time = document.createElement('h2');
		        	console.log(data.val().day+"."+data.val().start+"~"+data.val().end);
		        	new_time.innerHTML = data.val().day+"."+data.val().start+"~"+data.val().end;
		        	new_time.className = "elem";
		        	day_and_time.appendChild(new_time);
				});
		        
		        new_middle_row.appendChild(day_and_time);

        		$(".twelve.wide.column").append(new_container);
				//console.log(entry);
				
			}
		}).then(function (){
			document.getElementById('loader').remove();
		});
	}

	$(document).on('click', '.offer', function(){
		let offerid = $(this).id;
		sessionStorage.setItem('offerid', offerid);
		location.href = '/detail.html';
	});

	function add_links(){
		let mainTable = document.getElementById('mainTable');
		for(let i = 1; i < mainTable.childNodes.length; i++){
			let targetOffer = mainTable.childNodes[i];

		}
	}

	show_all_entries();

    
});