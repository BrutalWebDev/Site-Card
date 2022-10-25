$(document).ready(function(){
    $('.nav__burger').click(function(event){
        $('.nav__burger,.nav__menu').toggleClass('_burger');
        $('body').toggleClass('_lock');
    });

      
      
    let animItems = document.querySelectorAll('._anim');
    
    if (animItems.length > 0) {
        window.addEventListener('scroll', animOnScroll);
        function animOnScroll(params) {
            for (let i = 0; i < animItems.length; i++){
                const animItem = animItems[i];
                const animItemHeight = animItem.offsetHeight;
                const animItemOffset = offset(animItem).top;
                const animStart = 50; //при достижении 1/4 высоты

                let animItemPoint = window.innerHeight - animItemHeight / animStart;

                if (animItemHeight > window.innerHeight) { //если высота обьекта выше высоты окна браузера
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;
                }

                if ((window.pageYOffset > animItemOffset - animItemPoint) && window.pageYOffset < (animItemOffset + animItemHeight)){
                    animItem.classList.add('_active');
                } else {
                    if (!animItem.classList.contains('_no-repeat')){
                        animItem.classList.remove('_active');
                    }
                }
            }
        }
    
        function offset(el) {
            const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return { top: rect.top + scrollTop, left :rect.left + scrollLeft }
        }
        animOnScroll();
    }

    const parallax = document.querySelector('.parallax');

    if (parallax) {
        const content = document.querySelector('.parallax__container');
        const computer = document.querySelector('.images-parallax__computer');
        const phone = document.querySelector('.images-parallax__phone');
        const human = document.querySelector('.images-parallax__human');
        const grek1 = document.querySelector('.content__parallax-grek');

        const forComputer = 10;
        const forPhone = 20;
        const forHuman = 40;

        const speed = 0.05;

        let positionX = 0, positionY = 0;
        let coordXprocent = 0, coordYprocent = 0;

        function setMouseParallaxStyle() {
            const distX = coordXprocent - positionX;
            const distY = coordYprocent - positionY;

            positionX = positionX + (distX * speed);
            positionY = positionY + (distY * speed);

            human.style.cssText = `transform: translate(`+(positionX / forHuman)+`%,`+(positionY / forHuman)+`%);`;
            phone.style.cssText = `transform: translate(`+(positionX / forPhone)+`%,`+(positionY / forPhone)+`%);`;
            computer.style.cssText = `transform: translate(`+(positionX / forComputer)+`%,`+(positionY / forComputer)+`%);`;
            
            requestAnimationFrame(setMouseParallaxStyle);

        }
        setMouseParallaxStyle();

        parallax.addEventListener("mousemove", function (e) {
            const parallaxWidth = parallax.offsetWidth;
            const parallaxHeight = parallax.offsetHeight;

            const coordX = e.pageX - parallaxWidth / 2;
            const coordY = e.pageY - parallaxHeight / 2;

            coordXprocent = coordX / parallaxWidth * 100;
            coordYprocent = coordY / parallaxHeight * 100;
        });

        let thresholdSets = [];
        for (let i = 0; i <= 1.0; i += 0.005) {
            thresholdSets.push(i);
        }
        const callbaсk = function (entries, obsercer) {
            const scrollTopProcent = window.pageYOffset / parallax.offsetHeight * 100;
            setParallaxItemStyle(scrollTopProcent);
        };

        const observer = new IntersectionObserver(callbaсk, {
            threshold: thresholdSets
        });

        observer.observe(document.querySelector('.content'));

        function setParallaxItemStyle(scrollTopProcent) {
            content.style.cssText = `transform: translate(0%,-`+(scrollTopProcent / 9)+`%);`;
            phone.parentElement.style.cssText = `transform: translate(0%,-`+(scrollTopProcent / 6)+`%);`;
            computer.parentElement.style.cssText = `transform: translate(0%,-`+(scrollTopProcent / 3)+`%);`;
            human.parentElement.style.cssText = `transform: translate(0%,-`+(scrollTopProcent / 5)+`%);`;
        }
    }

    $('.slider').slick({
        arrows: true,
        dots: true,
        adaptiveHeight: true,
        slidesToShow: 3,
        asNavFor: ".sliderbig",
        autoplay: true,
        autoplaySpeed: 2000,
        responsive:[
            {
            breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
            breakpoint: 500,
                settings: {
                    slidesToShow: 1
                }
            }
        ]

        
    });
    $('.sliderbig').slick({
        arrows: false,
        fade: true,
        asNavFor: ".slider"
    });

    VanillaTilt.init(document.querySelectorAll(".card__item"), {
		max: 25,
		speed: 400
	});

    let inputs = document.querySelectorAll('input[type="tel"]');
    let im = new Inputmask('+7 (999) 999-99-99');
    im.mask(inputs);

    $('body').on('input', '.form__name-input', function(){
        this.value = this.value.replace(/[^a-zа-яё\s]/gi, '');
    });

    $('.form__submit').on('click', function(e){
        e.preventDefault();
        
        if(phone.length < 17){
            $('.form__submit').css('color', '#3cff00');
        } else $('.form__submit').css('color', '#ff6060'); 
        
    });

    const formImage = document.getElementById('form-image');
    const formPreview = document.getElementById('form-preview');

    formImage.addEventListener('change', () => {
        uploadFile(formImage.files[0]);
    });

    function uploadFile(file) {
        if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
            alert('Access only image');
            formImage.value = '';
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            alert ('The file can be no larger than 5 MB.');
            return;
        }

        let reader = new FileReader();
        reader.onload = function (e) {
            formPreview.innerHTML = `<img src="`+(e.target.result)+`" alt="Photo">`;
        }
        reader.onerror = function (e) {
            alert ('Error');
        }
        reader.readAsDataURL(file);
    }
});