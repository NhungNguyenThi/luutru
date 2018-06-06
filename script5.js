var array = [0, 1, 2, 3, 4, 5, 6, 7, 8]; //đây 
var options = [
	[0, 1, 2],
	[0, 3, 6],
	[0, 4, 8],
	[3, 4, 5],
	[6, 7, 8],
	[6, 4, 2],
	[1, 4, 7],
	[2, 5, 8]
];   //Các nước đi để thắng 
var first = [0, 2, 6, 8];  
var userChoice = "X";
var compChoice = "O";
var firstMove;
var playersTurn = false;
var squaresChosenByComputer = [];//cai nay de lam gi - Mảng chứa các index các ô đã chọn của Comp
var squaresChosenByPlayer = [];
var backgroundColor = $("#0").css("background-color");//mau cua cai nen nao v, .css chua hieu - Cú pháp $() là của JQuery,, vd bo thu coi co gi k 
//  --- Ko bỏ đc, ở dưới có dùng để resett màu Bỏ cũng hok sao, nó lấy giá trị màu của ô đầu tiên thôi,ok, trong file này không chỗ nào dùng đến, để cho vui, doi ti nha, co may cho k biet
var results = [0, 0];

function chooseXO() {
	//Ở đây là mới vô trận -- hết chỗ reset() rồi ak
	reset();
	userChoice = prompt("Do you want to be X or O?", "X");
	userChoice = userChoice.toUpperCase();
	if (!userChoice) { // if it's blank
		alert("You must type either 'X' or 'O'");
		chooseXO();
	} else if (userChoice !== null) {
		if (userChoice === "X") {
			compChoice = "O";
		} else if (userChoice === "O") {
			compChoice = "X";
		} else {
			alert("You must type either 'X' or 'O'");
			chooseXO();
		}
	}
}

// checks whether a potential move has already been taken
// who = commputer or player   &   val = square in question
//chỗ who vs val chi z- này là tham số truyền từ dưới lên, who là arr chứa indẽ các ô đã đánh, val là index ô vừa đánh
//Hàn này check xem ô vừa click có nằm trong danh sách ô đã cick chưa, nếu ô đã click rồi thì click nữa sẽ không thực hiện gì 

// === ko trả về true :)) để bên dưới xử lí.
//cái indexOf là gì  ? -- LÀ ột hàm của array trong JS, nhiệm vụ kiểm tra có giá trị trong arrya ko, nó sẽ trả về index nếu có, ngược lại trả
// về giá trị bất kỳ nhưng < 0--0 là ô đầu đúng hk -- Đúng vì mình set id của nó ứng với indẽ luôn.  
function checkMove(who, val) {
	if (who.indexOf(val) < 0) {
		return true;
	}
}

// removes a move from the array of potential squares
//di chuyển lần đi thôi hả ?? --  Ví dụ nếu val có giá trị 2 ứng với việc click vào ô thứ 3
// Nó sẽ check array là cái khai báo đầu tiên , tìm index của val trong array, dùng func slice để loại nó ra !?  
function removeOption(val) {
	array.splice(array.indexOf(val), 1);
}

// all purpose function checks a super array (sup) and 
// determines if it contains all the sub array (sub) items
// used here to check if any of the possible win sequences are contained in the moves made already

//sao dùng sp vs sub chi z?u
//Muốn biết phải xem nó nằm ở đâu, truyền vào 2 arr, sup là arr ứng với mảng những indẽ của ô đã click, sub là mảng option là mảng chứa vị trí
// 3 ô thẳng hàng ==> thắng. ==> Hàm này có tác dụng check xem khi một ô được click, khi đó mảng đã click đã cập nhât 
// Kiểm tra xem có tồn tại trong danh sách thắng không ==> có  ==> trả về true/ false để xử lí tiếp theo bên dưới.
//thay sup vs sub bằng cái khác thì có dc k á,  -- tất nhiên là đc, thay thì thay dồng loạt trong hàm này luôn. r OK chỗ này r ,đợi tí haha
function superbag(sup, sub) {
	sup.sort();
	sub.sort();
	var i, j;
	for (i = 0, j = 0; i < sup.length && j < sub.length;) {
		if (sup[i] < sub[j]) {
			++i;
		} else if (sup[i] == sub[j]) {
			++i;
			++j;
		} else {
			// sub[j] not in sup, so sub not subbag
			return false;
		}
	}
	// make sure there are no elements left in sub
	return j == sub.length; // if j === sub.length, then return true
}

// resets the master array, squares already chosen, message area, x's and o's displayed and any background color changes
//phải reset khi chơi x 1 bàn k ?? hok hiểu lắm 
//nó tự động reset khi 1 bàn chơi đã chơi x á, phải v k    --- Check xem nó dùng ở đâu nữa 
//Chức năng trong đây là khởi tạo lại toàn bộ giá trị mặc định, bao gồm array chứa các ô chưa click, bla bla 
function reset() {
	array = [0, 1, 2, 3, 4, 5, 6, 7, 8];
	squaresChosenByComputer = [];
	squaresChosenByPlayer = [];
	$("#message").html("");
	for (var i = 0; i < array.length; i++) {
		$("#" + i).html("");
		$("#" + i).css("background-color", backgroundColor);
	}
}

// changes background color of winning three
function showWinningThree(arg) {
	for (var i = 0; i < arg.length; i++) {
		$("#" + arg[i]).css("background-color", "#98A140");
	}
}

// this is the main function which determines if anyone has won and if not what happens next
function finished(who, arr) {
	if (arr.length >= 3) { // arr is either the computer or the player's chosen moves and 3 is the minimum # of moves to finish
		for (var i = 0; i < options.length; i++) {
			if (superbag(arr, options[i])) { // if there are three in a row

				setTimeout(function() { // the following won't happen for 1.2 seconds to give some delay to the visuals
					showWinningThree(options[i]);
					$("#message").html(who + " won!")
					if (who === "Computer") {
						results[0] = results[0] + 1;
						$("#computerResults").html("Computer: " + "<span id='number'>" + results[0] + "</span>");
					} else if (who === "You") {
						results[1] = results[1] + 1;
						$("#yourResults").html("You: " + "<span id='number'>" + results[1] + "</span>");
					}
				}, 1200);

				// delay the resetting by 4 seconds
				//Dùng ở đây khi có một người thằng, settimeout 3.5 giây sau đó reset 
				setTimeout(function() {
					reset();
				}, 3500);

				// computer always starts.  Delay the next move by 4 seconds
				if (who === "Computer" || who === "You") {
					setTimeout(function() {
						$(compFirstChoice()).html(compChoice);
					}, 4000);
					return;
				} else {
					playersTurn = true;
					return;
				}
			}
		}
	}
	// nobody won
	// Reset ở đây khi đánh hết 9 ô rồi mà hok ai thắng :3
	if (array.length === 0) { //  if the array of possible choices is zero
		setTimeout(function() {
			reset();
		}, 3500);; // delay the reset by 3 seconds

		if (who === "Computer") {
			$("#message").html("No Winner.<br>Computer's turn.");
			setTimeout(function() {
				$(compFirstChoice()).html(compChoice);
			}, 4000);
		} else {
			setTimeout(function() {
				playersTurn = true;
			}, 900);
			$("#message").html("No Winner.<br>It's your turn.");
		}
	}
	// game still in play, nobody has won yet
	else {
		if (who === "You") {
			setTimeout(function() {
				compMove();
			}, 500);
		} else {
			setTimeout(function() {
				playersTurn = true;
			}, 500);
			return;
		}
	}
}

//  Computer's very first move (if it goes first) - chooses a corner to start from
//vd ở đây để ngta chọn ng chơi thì dc k, không để là computer chơi trc á -- đc, thay đổi tí logic bên html 

function compFirstChoice() {
	firstMove = first[Math.floor(Math.random() * first.length)]; // chooses a random CORNER to start from
	squaresChosenByComputer.push(firstMove);
	removeOption(firstMove);
	$("#" + firstMove).html(compChoice);
	playersTurn = true;
}

function whoStart(){
	//Muốn giao diện hiện sao, ?? cứ để v đi, bỏ âm thanh khi thắng luôn đi cho ngắn
	reset();
	userChoice = prompt("Do you want to be X or O?", "X");
	userChoice = userChoice.toUpperCase();
	if (!userChoice) { // if it's blank
		alert("You must type either 'X' or 'O'");
		chooseXO();
	} else if (userChoice !== null) {
		if (userChoice === "X") {
			compChoice = "O";
		} else if (userChoice === "O") {
			compChoice = "X";
		} else {
			alert("You must type either 'X' or 'O'");
			chooseXO();
		}
	}
	whoFirst = prompt("Who first: 1 - You, 2-Computer", "1");//prompt ? -- Hiện thông báo yêu cầu nhập vào giá trị, với 1 là gợi ý
	if(whoFirst == "2"){
		compFirstChoice();
	}else if(whoFirst == "1"){
		playersTurn = true;
	}else{
			alert("You must type either '1' or '2'");
			whoStart();
		}
}
// Computer's other move options
function compMove() {
	var possibles = [];
	if (playersTurn === false) {

		console.log("computer's turn");
		for (var i = 0; i < options.length; i++) {
			for (var j = 0; j < squaresChosenByComputer.length; j++) {
				if (options[i].indexOf(squaresChosenByComputer[j]) > 0) {
					possibles = options[i].filter(function(value) {
						return value !== squaresChosenByComputer[j];
					});
				}
				// if the 3 in a row sequence being looked at still has two squares that 
				// the computer hasn't picked yet
				if (j === squaresChosenByComputer.length - 1 && possibles.length === 2) {
					for (var k = 0; k < possibles.length; k++) {
						if (checkMove(squaresChosenByPlayer, possibles[k])) {
							if (checkMove(squaresChosenByComputer, possibles[k])) {
								// $.playSound("http://s1download-universal-soundbank.com/mp3/sounds/2040");
								$("#" + possibles[k]).html(compChoice);
								squaresChosenByComputer.push(possibles[k]);
								removeOption(possibles[k]);
								finished("Computer", squaresChosenByComputer);
								possibles.length = 0; // clear the array.  in benchmark testing this is the 2nd fastest method of clearing an array.
								return;
							}
						}
					}
				}
				// if the 3 in a row sequence being looked at only has one square the 
				// the computer hasn't picked yet				
				if (j === squaresChosenByComputer.length - 1 && possibles.length === 1) { // 
					if (checkMove(squaresChosenByPlayer, possibles[0])) {
						// $.playSound("http://s1download-universal-soundbank.com/mp3/sounds/2040");
						$("#" + possibles[0]).html(compChoice);
						squaresChosenByComputer.push(possibles[0]);
						removeOption(possibles[0]);
						finished("Computer", squaresChosenByComputer);
						possibles.length = 0;
						return;
					}
				}
			}
		}

		// otherwise, return a random selection
		console.log("random selection");
		var move = array[Math.floor(Math.random() * array.length)];
		//$.playSound("http://s1download-universal-soundbank.com/mp3/sounds/2040");
		$("#" + move).html(compChoice);
		squaresChosenByComputer.push(move);
		removeOption(move);
		finished("Computer", squaresChosenByComputer);
	}
}

function doTheFollowing(mark, choice, label, who) {
	$("#" + mark).html(choice);
	squaresChosenByComputer.push(update);
	removeOption(remove);
	finished(label, who);
}

//compFirstChoice();

// Player's move
var playersMove = function(squareClicked) {
	if (playersTurn === true) {
		if (checkMove(squaresChosenByPlayer, squareClicked)) {
			// $.playSound("http://s1download-universal-soundbank.com/mp3/sounds/2039");
			$("#" + squareClicked).html(userChoice);
			squaresChosenByPlayer.push(squareClicked);
			removeOption(squareClicked);
			playersTurn = false;
			finished("You", squaresChosenByPlayer);
		}
	}
}

$("#choice").click(function() {
	chooseXO();
});
$("#0").click(function() {
	playersMove(0);
});
$("#1").click(function() {
	playersMove(1);
});
$("#2").click(function() {
	playersMove(2);
});
$("#3").click(function() {
	playersMove(3);
});
$("#4").click(function() {
	playersMove(4);
});
$("#5").click(function() {
	playersMove(5);
});
$("#6").click(function() {
	playersMove(6);
});
$("#7").click(function() {
	playersMove(7);
});
$("#8").click(function() {
	playersMove(8);
});

/*
 * @author Alexander Manzyuk <admsev@gmail.com>
 * Copyright (c) 2012 Alexander Manzyuk - released under MIT License
 * https://github.com/admsev/jquery-play-sound
 **/
 //bỏ âm thah là bỏ ở đây luôn hả
// (function($) {
// 	$.extend({
// 		playSound: function() {
// 			return $(
// 				'<audio autoplay="autoplay" style="display:none;">' + '<source src="' + arguments[0] + '.mp3" />' + '<source src="' + arguments[0] + '.ogg" />' + '<embed src="' + arguments[0] + '.mp3" hidden="true" autostart="true" loop="false" class="playSound" />' + '</audio>'
// 			).appendTo('body');
// 		}
// 	});
// })(jQuery);

//nãy h tắt âm thanh nên t k xđinh dc kk
//t sẽ chia cho b Ng 1/4 lương tháng sau nha kk

// Bao trà sửa đc rồi :)))))))))))))))))))))))))))
//khoang hả off nhe
//chủ nhật tối Luân nó qua á
//bạn có đi dc hk
// Qua 11/6 t mới hđi đc còn đang viết report , c-h-ủ nhật thì cận ngày quá --à à
//v có gì để nói nó dời lại, nó hẹn t 2 3 tuần r mà chưa qua tới chỗ t luôn
// Có gì 2 người hẹn trước đi :)) Tuần sau t thảnh thơi mới đi chơi đc :))) 
//ok man
//khoang nhe
//trong task này: ngta yêu cầu là:
//1: tạo ra tic tac toe để chơi, vậy nó gồm mấy cái nào v, kiểu giống như mới làm thì có mấy nào để thực hiện chơi với máy thôi á ??
//2: reset lại khi game over: là t thấy r
//3: chọn X hay O: t cũng thấy r,
//có cái 1 á - Yêu câu vậy chắc là chơi với máy rồi, mình cũng làm rồi mà -- hiểu r á, ý nói mấy function trong toàn file này là cũng làm hết r
// bỏ ra yêu cầu 2-3 là còn lại 1 hả. uhm, 3 function chính là playMove (của ngừoi chơi), com...First(máy), finished(): check thắng 
//ok ok
//Vậy xem kỹ lại có gì thì nhắn qua, giờ t tắt nhe --ok ok arigatou