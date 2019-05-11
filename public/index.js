$(document).ready(function() {
   
    let config = {
        apiKey: "AIzaSyAJYY0Az45sH0Sw6jAz3JvR4yjJBIMtbzU",
        authDomain: "squad-67b43.firebaseapp.com",
        databaseURL: "https://squad-67b43.firebaseio.com/",
    };
    firebase.initializeApp(config);
    let database = firebase.database();

    show_nth_page = function(n){ /* n is active page number */
    	return database.ref("/Offers/").once("value", function(snapshot) {

	    	var value = snapshot.val();
			if(value == null){
				return;
			}
			var key_list = Object.keys(value);

	    	var bottom = key_list.length-5-(4*n);
	    	if(bottom < -1){
	    		bottom = -1;
	    	}


	    	let entries_div = document.createElement('div');
	    	entries_div.className = "entries";
	    	$("#table_header").after(entries_div);


	    	for(var i=(key_list.length-1-(4*n)); i>bottom; i--){
				var entry = value[key_list[i]];

				let new_container = document.createElement('div');
				new_container.className = "ui container segment";
				entries_div.appendChild(new_container);

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
		        	//console.log(data.val().day+"."+data.val().start+"~"+data.val().end);
		        	new_time.innerHTML = data.val().day+"."+data.val().start+"~"+data.val().end;
		        	new_time.className = "elem";
		        	day_and_time.appendChild(new_time);
				});
		        
		        new_middle_row.appendChild(day_and_time);
				//console.log(entry);	
			}

			/* Implementing Paging */
			let center_div = document.createElement('div');
			center_div.className = "center-div";
			entries_div.appendChild(center_div);

			let pagination = document.createElement('div');
			pagination.className = "ui pagination menu";
			center_div.appendChild(pagination);
				

			for(var i=0; i<(key_list.length/4); i++){
				//console.log(i+"th page button is made");
				if(i==n)
					$(".ui.pagination.menu").append("<a id='page"+i+"' class='active item'>"+(i+1)+"</a>");
				else
					$(".ui.pagination.menu").append("<a id='page"+i+"' class='item'>"+(i+1)+"</a>");
				$("#page"+i).on("click",function(){
					if(this.getAttribute("class")!="active item"){
						//console.log("clicked not-active item");
						/* removing all entries */
						$(".entries").remove();
						//console.log(this.getAttribute("id")[4]);
						show_nth_page(this.getAttribute("id")[4]);
					}	
				});	
			}
		});
    }

	show_nth_page(0);
});