const slideContainer = document.querySelector('.slide-block');

//For the ad template 
const adTemplate = document.querySelector('#ad-template');
const imageTag = adTemplate.content.querySelector("img");

//For event list
const eventTemplate = document.querySelector('#list-events');
const eventList = eventTemplate.content.querySelector('.event-list');
const eventBlock = document.querySelector('.event-block');

// For the teams template
const teamTemplate = document.querySelector('#teams-template');
const eventName = teamTemplate.content.querySelector("h2");
const teamSlide = teamTemplate.content.querySelector(".slide");

// For the person template
const personTemplate = document.querySelector('#person-template');
const paras = personTemplate.content.querySelectorAll("p");

//loadbar
const loadbar = document.querySelector('.loadbar');

var contHeight;
var bannerData;
var eventHeight;
var teamData;
var slides;
var currentlyVisibleSlide = 0,prev=-1,curr=0;
const timePerSlide = 1000;
var eventArray = Array();

// To see if both Ads and team data have loaded, if count == 2 , start animation
var count = 0;

fetch("banners.json")
.then(response => {
	return response.json();
})
.then( array => {
	bannerData = array;
	generateAdSlides();
})
.catch( error => {
	console.log("error",error);
});


fetch("teams.json")
.then(response => {
	return response.json();
})
.then( array => {
	teamData = array;
	generateTeamSlides();
});


function generateTeamSlides() {
	teamData.forEach( event => {
		eventName.textContent = event.name;
		eventArray.push(event.name);
		eventList.children[1].textContent = event.name;
		var eventClone = document.importNode(eventTemplate.content,true);
		var teamClone = document.importNode(teamTemplate.content, true);

		event.people.forEach(person => {
			paras[0].textContent = person.name;
			paras[1].textContent = person.excelid;
			var personClone = document.importNode(personTemplate.content, true);
			teamClone.querySelector(".card-cntr").appendChild(personClone);
		});

		slideContainer.appendChild(teamClone);
		eventBlock.appendChild(eventClone);
	});

	count += 1;
	contHeight = eventBlock.offsetHeight;
	if(eventBlock.children.length>0)
		eventHeight = eventBlock.children[0].offsetHeight;
	if (count == 2) {
		animateSlides();		
	}

}


function generateAdSlides() {
	bannerData.forEach( b => {
		imageTag.src = b.url;
		var clone = document.importNode(adTemplate.content, true);
		slideContainer.appendChild(clone);
	});

	count += 1;

	if (count == 2) {
		animateSlides();	
	}
}

function animateSlides() {
	var adSlides = Array.from(document.querySelectorAll(".ads"));
	// alert(adSlides.length);
	var teamSlides = Array.from(document.querySelectorAll(".teams"));
	// alert(teamSlides.length);
	slides = shuffle(adSlides,teamSlides);
	slides[0].style.opacity = 1;
	setTimeout( _ => {
		switchSlide();
	}, timePerSlide);
    
}

function switchSlide() {
	slides[currentlyVisibleSlide].style.opacity = 0;
	currentlyVisibleSlide += 1;

	if (currentlyVisibleSlide == slides.length) {
		currentlyVisibleSlide = 0;
	}
	if(slides[currentlyVisibleSlide].children.length>1){
		var name = slides[currentlyVisibleSlide].children[0].innerHTML;
		curr = eventArray.indexOf(name);
		if(prev!=-1){
			eventBlock.children[prev+1].classList.remove('highlight');		
			var elemntScroll = eventBlock.children[curr+1].offsetTop;
			var contScroll = eventBlock.scrollTop;
			if(contScroll>elemntScroll)
				eventBlock.scrollTop = 0;
			if(elemntScroll>contHeight)
				eventBlock.scrollTop = elemntScroll-contHeight+2*eventHeight;			
		}
		
			
		// console.log();
		eventBlock.children[curr+1].classList.add('highlight');
		prev = curr;
		console.log(eventBlock.offsetHeight);
		console.log(eventBlock.children[curr+1].offsetTop);

	}	
	slides[currentlyVisibleSlide].style.opacity = 1;
	setTimeout( _ => {
		switchSlide();
	}, timePerSlide);

}

function shuffle(adSlides,teamSlides){
	var count=0;
	var adLength = adSlides.length,teamLength = teamSlides.length;
	var iter = adLength>teamLength? adLength:teamLength;
	var adPos = 0,teamPos=0;
	var slideArr = Array();
	while(count<iter){
		slideArr.push(adSlides[adPos++]);
		slideArr.push(teamSlides[teamPos++]);
		if(adPos==adLength)
			adPos = 0;
		if(teamPos==teamLength)
			teamPos = 0;
		count++;
	}
	alert(slideArr.length);
	return slideArr;
}