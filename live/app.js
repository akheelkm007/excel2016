const slideContainer = document.querySelector('.slide-cntr');

//For the ad template 
const adTemplate = document.querySelector('#ad-template');
const imageTag = adTemplate.content.querySelector("img");

// For the teams template
const teamTemplate = document.querySelector('#teams-template');
const eventName = teamTemplate.content.querySelector("h2");
const teamSlide = teamTemplate.content.querySelector(".slide");

// For the person template
const personTemplate = document.querySelector('#person-template');
const paras = personTemplate.content.querySelectorAll("p");
	

var bannerData;
var teamData;
var slides;
var currentlyVisibleSlide = 0;
const timePerSlide = 500;

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
})
.catch( error => {
	console.log("error",error);
});


function generateTeamSlides() {
	teamData.forEach( event => {
		eventName.textContent = event.name;
		var teamClone = document.importNode(teamTemplate.content, true);

		event.people.forEach(person => {
			paras[0].textContent = person.name;
			paras[1].textContent = person.excelid;
			var personClone = document.importNode(personTemplate.content, true);
			teamClone.querySelector(".card-cntr").appendChild(personClone);
		});

		slideContainer.appendChild(teamClone);

	});

	count += 1;

	if (count == 2) {
		animateSlides();		
	}

}


function generateAdSlides() {
	bannerData.forEach( b => {
		imageTag.src = b.url;
		var clone = document.importNode(adTemplate.content, true);
		slideContainer.appendChild(clone)
	});

	count += 1;

	if (count == 2) {
		animateSlides();		
	}
}

function animateSlides() {
	slides = Array.from(document.querySelectorAll(".slide"));
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

	slides[currentlyVisibleSlide].style.opacity = 1;

	setTimeout( _ => {
		switchSlide();
	}, timePerSlide);

}