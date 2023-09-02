const storyTimeline = gsap.timeline();

gsap.set('section.scene',  {opacity: 0});
gsap.set('section.scene img', {x: (index) => {
    //by how much to shift the starting position of the image
    return (index / 3) * 200 + 350 + 'vh';
}});
gsap.set('section.house', { opacity: 0 });
    
storyTimeline
    .to('header', {opacity: 0, delay: 3})
    .addLabel('startScene')
    .to('section.scene', {opacity: 1}, 'startScene')
    .to('section.scene img', {x: '0vh', duration: 10, ease: 'linear'}, 'startScene')
    .addLabel('endScene')
    .to('section.scene', {opacity: 0}, 'endScene')
    .to('section.house', {opacity: 1}, 'endScene')


storyTimeline.pause();

let update, animationDone = false;
let progressDisplay = document.querySelector('.progress');

document.addEventListener('scroll', () => {
    let pixels = window.scrollY;
    let time = pixels / 300;
    cancelAnimationFrame(update);
    let progress = Math.ceil(storyTimeline.progress() * 100);

    update = requestAnimationFrame(()  => {
        storyTimeline.seek(time);
        console.log({progress});
        
        if(progress < 100) {
            progressDisplay.innerText = progress + '%';
        } else {
            progressDisplay.innerText = 100 + '%';
            if(!animationDone) {
                animationDone = true;
                let flashTimeline = gsap.timeline({
                    repeat: 4
                });
    
                flashTimeline
                    .set('.progress', {opacity: 0})
                    .to('.progress', {opacity: 1, duration: 0.5})
                    .to('.progress', {opacity: 0, duration: 0.5})
            }
            
        }
    })

    
})

const eyesTimeline = gsap.timeline({
    repeat: -1
});

const eyeballs = document.querySelectorAll('path#ball,path#ball_2,path#ball_3,path#ball_4,path#ball_5');

eyesTimeline
    .set(eyeballs, { y: 0 })
    .set(eyeballs, { y: -0.01})
    .to(eyeballs, { y: 7, duration: 0.25, delay: 2, stagger: 0.25 })
    .to(eyeballs, { y: 0, delay: 4 })

const hatTimeline = gsap.timeline({
    repeat: -1,
    repeatDelay: 4
});
const hat = document.querySelector('g#hat');

hatTimeline
    .set(hat, {y: 0})
    .to(hat, { y: -50, duration: 0.25, delay: 0.2 })
    .to(hat, { y: 0, duration: 0.75, delay: 0.2 })

const handsTimeline = gsap.timeline({
    repeat: -1,
    repeatDelay: 5
});

const hands = document.querySelectorAll('g#right-arm, g#left-arm');

handsTimeline
    .set(hands, {rotation: 0})
    .to(hands, {
        rotation: (index) => {
            if(index == 0) {
                return -10;
            } else {
                return 10;
            }
        }, 
        stagger: 2,
        duration: 0.2
    })
    .to(hands, {rotation: 0, stagger: 2, duration: 0.2, delay: 2})


const tvTimeline = gsap.timeline({
    repeat: -1,
    repeatDelay: 5
});

const tvLight = document.querySelector('#tv-light');

tvTimeline
    .set(tvLight, {opacity: 0.25})
    .to(tvLight, { opacity: 1, duration: 1, delay: 1})
    .to(tvLight, { opacity: 0.25 })


const hoverLabel = document.querySelector('div.label');
const links = document.querySelectorAll('svg a');

links.forEach(link => {
    link.addEventListener('mouseenter', (e) => {
        const linkLabel = e.target.dataset?.label;
        hoverLabel.innerText = linkLabel;
        hoverLabel.style.visibility = 'visible';
        gsap.to(links, { opacity: 0 });
        gsap.to(link, { opacity: 1 })
    });

    link.addEventListener('mouseleave', (e) => {
        hoverLabel.style.visibility = 'hidden';
        hoverLabel.innerText = '';
        gsap.to(links, { opacity: 1 })
    });
});

document.addEventListener('mousemove', (e) => {
    hoverLabel.style.top = e.clientY + 'px';
    hoverLabel.style.left = e.clientX + 'px';
})