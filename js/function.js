	$(document).ready(function(){
		
		$.getJSON("data.json", function(result){ // get data dựa vào file json

	  	$.each(result.items, function(i, field){  
	    	price = field.price; // lấy giá 

	    	//thêm dấu chấm vào giá, ví dụ 10000 => 10.000
	    	var price = price.toLocaleString(
				  undefined, { minimumFractionDigits: 0 }
				);					

	    	//get giá trị dự vào file json
	    	img_url = field.img;
	    	title = field.title;
	    	author = field.author;
	    	rating = field.rating;	    	
	    	description = field.desc;
	    	category = field.category;

	    	//gắn giá trị vào thẻ html tương ứng
	    	img_html = '<a href="javascript:void(0)"><img src="images/books/'+ img_url +'" alt="'+ title +'"></a>';
	    	title_html = '<h2><a href="javascript:void(0)">'+ title +'</a></h2>';
	    	author_html = '<p class="author">'+ author +'</p>';
	    	rating_html = '<div class="rating">'+ display_rating(eval(rating)) +'</div>';
	    	price_html = '<p class="price">'+ price  +'₫</p>';
	    	description_html = '<div class = "description" style = "display:none">'+ description +'</div>';

	    	html = '<div class="book-item book-'+ category +' all">'+ img_html + title_html + author_html + rating_html + price_html + description_html +'</div>';

	    	//hiển thị danh sách ra bên ngoài
	    	$("#list-book").append(html);

	    });

	    //Xử lý tab
	    $(".tab-wrapper nav.tab a").click(function(){
	    	//Gan attribute [filter] vao bien filter
	    	filter = $(this).attr("filter");
	    	//An tat ca sach di
	    	$(".book-item").hide();
	    	//Hien lai nhung sach co class la .book-item.book-filter
	    	$(".book-item." + filter).show();
	    	//Xoá class active trên tất cả các link trong tab
	    	$(".tab-wrapper nav.tab a").removeClass("active");
	    	//Thêm lại class active vào trong link vừa được click
	    	$(this).addClass("active");

	    });

	    // Mo popup
			// Bat su kien click vao the <a> trong .book-item
	    $('.book-item a').click(function() {
	    	// Load data cua item do su dung doan html tuong ung
				//Lấy vị trí  của thẻ a
	    	position = $(this).text();

	    	if(position == "")
	    	{
	    		//Click vào ảnh
	    		book_item = $(this).parent(); //set vị trí hiện tại là <div class="book-item">
	    	} else {
	    		//Cick vào tiêu đề
	    		book_item = $(this).parent().parent(); //set vị trí hiện tại là <div class="book-item">	    		    		
	    	}

	    	// Lấy data dựa và attribute
	    	title = book_item.find("h2 a").text();
    		price = book_item.find("p.price").text();
    		author = book_item.find("p.author").text();
    		rating = book_item.find("div.rating").html();
    		img = book_item.find("a img").attr("src");
    		description = book_item.find("div.description").html();	

	    	//Gắn data và popup
	    	$(".popup .left-content img").attr("src", img);
    		$(".popup .left-content p.price").html( price);

    		$(".popup .right-content h2 a").html(title);
    		$(".popup .right-content div.rating").html(rating);
    		$(".popup .right-content p.description").html(description);
    		
				// Them class .active vao .popup
				$('.popup').addClass('active');
				// Them class .hidden-overflow vao <body>
				$('body').addClass('hidden-overflow');
			});
		});

	});

	

	//Tat popup
	// Bat su kien click vao #close-popup
	$('#close-popup').click(function() {
		// Xoa class .active trong .popup
		$('.popup').removeClass('active');
		// Xoa class .hidden-overflow trong the <body>
		$('body').removeClass('hidden-overflow');
		// Xoa data trong popup nay
	});


	// An hien menu
	//Bat su kien click vao the #btn-menu		
	$('#btn-menu').click(function() {
		//Them class .show-menu vao #header
		$('#header').toggleClass('show-menu');
	});


	//hiển thi số ngôi sao dựa vào số rating
	function display_rating(rating){
		html_rating = '';

		rating_tmp = 5 - rating; //lấy tổng số ngôi sao màu trắng

		//hiển thị ngôi sao màu vàng
		for(i = 0; i < rating; i++){
			html_rating += '<img src="images/star.png">';
		}

		//hiển thị ngôi sao màu trắng
		if(rating_tmp != 0)
		{
			for(i = 0; i < rating_tmp; i++){
				html_rating += '<img src="images/star-white.png">';
			}
			html_rating += '';
		}

		return html_rating;
	}