const icon = document.getElementsByClassName('icon')[0]
const menu = document.getElementsByClassName('menu-list')[0]
const navbar = document.querySelector(".navbar");
const mlogo = document.querySelector(".mlogo");


icon.addEventListener('click',function(){
    if(icon.classList.contains('ativo')){
        icon.setAttribute('class','icon')
        menu.setAttribute('class','menu-list')
    }
    else{
        icon.setAttribute('class','icon ativo')
        menu.setAttribute('class','menu-list ativo')
    }
})
window.onscroll = ()=>{
    this.scrollY > 20 ? navbar.classList.add("sticky") : navbar.classList.remove("sticky");
    this.scrollY > 20 ? mlogo.classList.add("sticky") : mlogo.classList.remove("sticky");
}
//https://cdnjs.com/libraries/typed.js/2.0.11
var typed = new Typed(".typing-2", {
    strings: ["Dev", "Estudante", "Esforçado", "Brasileiro"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
})



//particulas

particlesJS("bg", {
    "particles":{
        "number":{
            "value":80,
            "density":{
                "enable":true,
                "value_area":800
            }
        },
        "color":{
            "value":"#ffffff"
        },
        "shape":{
            "type":"circle",
            "stroke":{
                "width":0,
                "color":"#000000"
            },
            "polygon":{
                "nb_sides":5
            },
            "image":{
                "src":"img/github.svg",
                "width":100,
                "height":100
            }
        },
        "opacity":{
            "value":0.5,
            "random":false,
            "anim":{
                "enable":false,
                "speed":1,
                "opacity_min":0.1,
                "sync":false
            }
        },
        "size":{
            "value":3,
            "random":true,
            "anim":{
                "enable":false,
                "speed":40,
                "size_min":0.1,
                "sync":false
            }
        },
        "line_linked":{
            "enable":true,
            "distance":150,
            "color":"#ffffff",
            "opacity":0.4,
            "width":1
        },
        "move":{
            "enable":true,
            "speed":6,
            "direction":"none",
            "random":false,
            "straight":false,
            "out_mode":"out",
            "bounce":false,
            "attract":{
                "enable":false,
                "rotateX":600,
                "rotateY":1200
            }
        }
    },
    "interactivity":{
        "detect_on":"canvas",
        "events":{
            "onhover":{
                "enable":true,
                "mode":"repulse"
            },
            "onclick":{
                "enable":true,
                "mode":"push"},
                "resize":true
            },
            "modes":{
                "grab":{
                    "distance":400,
                    "line_linked":{
                        "opacity":1
                    }
                },
                "bubble":{
                    "distance":400,
                    "size":40,
                    "duration":2,
                    "opacity":8,
                    "speed":3
                },
                "repulse":{
                    "distance":200,
                    "duration":0.4
                },
                "push":{
                    "particles_nb":4
                },
                "remove":{
                    "particles_nb":2
                }
            }
        },
        "retina_detect":true
    });

//carousel

    const carousel = document.querySelector(".carousel"),
    firstImg = carousel.querySelectorAll("img")[0],
    arrowIcons = document.querySelectorAll(".wrapper i");
    
    let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;
    
    const showHideIcons = () => {
        // showing and hiding prev/next icon according to carousel scroll left value
        let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
        arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
        arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
    }
    
    arrowIcons.forEach(icon => {
        icon.addEventListener("click", () => {
            let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
            // if clicked icon is left, reduce width value from the carousel scroll left else add to it
            carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
            setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
        });
    });
    
    const autoSlide = () => {
        // if there is no image left to scroll then return from here
        if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;
    
        positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
        let firstImgWidth = firstImg.clientWidth + 14;
        // getting difference value that needs to add or reduce from carousel left to take middle img center
        let valDifference = firstImgWidth - positionDiff;
    
        if(carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
            return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
        }
        // if user is scrolling to the left
        carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    
    const dragStart = (e) => {
        // updatating global variables value on mouse down event
        isDragStart = true;
        prevPageX = e.pageX || e.touches[0].pageX;
        prevScrollLeft = carousel.scrollLeft;
    }
    
    const dragging = (e) => {
        // scrolling images/carousel to left according to mouse pointer
        if(!isDragStart) return;
        e.preventDefault();
        isDragging = true;
        carousel.classList.add("dragging");
        positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
        carousel.scrollLeft = prevScrollLeft - positionDiff;
        showHideIcons();
    }
    
    const dragStop = () => {
        isDragStart = false;
        carousel.classList.remove("dragging");
    
        if(!isDragging) return;
        isDragging = false;
        autoSlide();
    }
    
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("touchstart", dragStart);
    
    document.addEventListener("mousemove", dragging);
    carousel.addEventListener("touchmove", dragging);
    
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("touchend", dragStop);

//Formulário

class FormSubmit {
    constructor(settings) {
      this.settings = settings;
      this.form = document.querySelector(settings.form);
      this.formButton = document.querySelector(settings.button);
      if (this.form) {
        this.url = this.form.getAttribute("action");
      }
      this.sendForm = this.sendForm.bind(this);
    }
  
    displaySuccess() {
      this.form.innerHTML = this.settings.success;
    }
  
    displayError() {
      this.form.innerHTML = this.settings.error;
    }
  
    getFormObject() {
      const formObject = {};
      const fields = this.form.querySelectorAll("[name]");
      fields.forEach((field) => {
        formObject[field.getAttribute("name")] = field.value;
      });
      return formObject;
    }
  
    onSubmission(event) {
      event.preventDefault();
      event.target.disabled = true;
      event.target.innerText = "Enviando...";
    }
  
    async sendForm(event) {
      try {
        this.onSubmission(event);
        await fetch(this.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(this.getFormObject()),
        });
        this.displaySuccess();
      } catch (error) {
        this.displayError();
        throw new Error(error);
      }
    }
  
    init() {
      if (this.form) this.formButton.addEventListener("click", this.sendForm);
      return this;
    }
  }
  
  const formSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
    success: "<h1 class='success'>Mensagem enviada!</h1>",
    error: "<h1 class='error'>Não foi possível enviar sua mensagem.</h1>",
  });
  formSubmit.init();