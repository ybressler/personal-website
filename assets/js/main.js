document.addEventListener(
    "DOMContentLoaded",
    function() {
        new SweetScroll({});
        particlesJS(
            "sparkly-header",
            {
                particles: {
                    number: {
                        value: 160,
                        density: {
                            enable: !0,
                            value_area: 500
                        }
                    },
                    color: {
                        value: "#ffffff"
                    },
                    shape: {
                        type: "circle",
                        stroke: {
                            width: 0,
                            color: "#000000"
                        },
                        polygon: {
                            nb_sides: 5
                        },
                        image: {
                            src: "img/github.svg",
                            width: 100,
                            height: 100
                        }
                    },
                    opacity: {
                        value: 1,
                        random: !0,
                        anim: {
                            enable: !0,
                            speed: 1,
                            opacity_min: 0,
                            sync: !1
                        }
                    },
                    size: {
                        value: 3,
                        random: !0,
                        anim: {
                            enable: !1,
                            speed: 4,
                            size_min: .3,
                            sync: !1
                        }
                    },
                    line_linked: {
                        enable: !1,
                        distance: 150,
                        color: "#ffffff",
                        opacity: .4,
                        width: 1
                    },
                    move: {
                        enable: !0,
                        speed: 1,
                        direction: "none",
                        random: !0,
                        straight: !1,
                        out_mode: "out",
                        bounce: !1,
                        attract: {
                            enable: !1,
                            rotateX: 600,
                            rotateY: 600
                        }
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: {
                            enable: !1,
                            mode: "bubble"
                        },
                        onclick: {
                            enable: !1,
                            mode: "repulse"
                        },
                        resize: !0
                    },
                    modes: {
                        grab: {
                            distance: 400,
                            line_linked: {
                                opacity: 1
                            }
                        },
                        bubble: {
                            distance: 250,
                            size: 0,
                            duration: 2,
                            opacity: 0,
                            speed: 3
                        },
                        repulse: {
                            distance: 400,
                            duration: .4
                        },
                        push: {
                            particles_nb: 4
                        },
                        remove: {
                            particles_nb: 2
                        }
                    }
                },
                retina_detect: !0
            })
    },
    !1
);

$('section#sparkly-header .headshot').sparkleHover({
      colors : ['#5B6989', "#B1ACA3",'#D17C68', '#1F2A36'],
      num_sprites: 20,
      lifespan: 1000,
      radius: 500,
      sprite_size: 10,
      shape: 'circle',
    });

$('section#sparkly-header .site-title').sparkleHover({
      colors : ['#297E97', "#2EB8D5",'#36BEC1'],
      num_sprites: 22,
      lifespan: 3000,
      radius: 500,
      sprite_size: 40,
      shape: 'circle',
    });

$('section#sparkly-header .site-description').sparkleHover();


$('section#sparkly-header a.down').sparkleHover({
      colors : ['#9DA0A5', "#B4B7BA",'#5D636A', '#297E97'],
      num_sprites: 20,
      lifespan: 1000,
      radius: 200,
      sprite_size: 5,
      shape: 'circle',
    });
