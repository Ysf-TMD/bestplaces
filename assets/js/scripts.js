function setSearchValue(tag) {
    document.getElementById('searchInput').value = tag;
}
$(document).ready(function() {
    function formatState (state) {
        if (!state.id) {
            return state.text;
        }
        var $state = $(
            '<p class="justify-content-between"><img src="' + $(state.element).data('image') + '" class="img-flag me-1" width="16" height="15"/> ' + state.text + '</p>'
        );
        return $state;
    }

    $('#languageSelect').select2({
        templateResult: formatState,
        templateSelection: formatState,
        minimumResultsForSearch: -1
    });
});
document.addEventListener("DOMContentLoaded", function () {
    let scrollToTopBtn = document.getElementById("scrollToTop");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) { // Affiche le bouton après 300px de scroll
            scrollToTopBtn.classList.add("show");
        } else {
            scrollToTopBtn.classList.remove("show");
        }
    });

    scrollToTopBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});

function animateCard(card) {
    let counter = { value: 0 };
    let targetValue = card.getAttribute("data-target"); // Récupère la valeur cible

    // Animation d'apparition de la carte
    gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
    });

    // Animation du compteur
    gsap.to(counter, {
        value: targetValue,
        duration: 6,
        ease: "power2.out",
        onUpdate: function() {
            card.querySelector(".percentage").innerText = Math.floor(counter.value) + "%";
        }
    });
}

// Intersection Observer pour détecter le scroll
let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCard(entry.target);
            observer.unobserve(entry.target); // Arrête d'observer après l'animation
        }
    });
}, { threshold: 0.5 }); // Déclenche l'animation quand 50% de la carte est visible

// Cible toutes les cartes
document.querySelectorAll(".cardCalc").forEach(card => observer.observe(card));
$(document).ready(function () {
    $(".dropdown-menu").each(function () {
        const $menu = $(this);
        const $links = $menu.find(".dropDownLink");
        const $items = $menu.find(".itemDiv");

        // Vérifier qu'il y a bien le même nombre d'éléments
        if ($links.length !== $items.length) {
            console.warn("Mismatch entre dropDownLink et itemDiv dans un menu !");
        }

        // Associer chaque lien avec son item correspondant
        $links.each(function (index) {
            $(this).attr("data-index", index);
            const $matchingItem = $items.eq(index);
            if ($matchingItem.length) {
                $matchingItem.attr("data-index-div", index);
            }
        });

        // Cacher toutes les sections sauf la première
        $items.hide();
        $items.first().show();

        // Gestion du hover
        $links.hover(
            function () {
                const index = $(this).attr("data-index");
                $items.hide();
                $items.filter(`[data-index-div='${index}']`).show();
            },
            function () {
                // Optionnel : remettre le premier élément
                $items.hide();
                $items.first().show();
            }
        );
    });


    $(".dropdownToggle").on("click", function () {
        $(this).find("i").toggleClass("up");
    });


    $(document).on("click", function (event) {
        if (!$(event.target).closest(".dropdown").length) {
            $(".dropdownToggle i").removeClass("up");
        }
    });



    $(".dropdownToggle").on("click", function () {
        $(this).find("i").toggleClass("up");
    });


    $(document).on("click", function (event) {
        if (!$(event.target).closest(".dropdown").length) {
            $(".dropdownToggle i").removeClass("up");
        }
    });


    $(".dropdownToggle").hover(
        function () {
            $(this).find(".rotate-icon").addClass("up");
        },
        function () {

            if (!$(this).hasClass("clicked")) {
                $(this).find(".rotate-icon").removeClass("up");
            }
        }
    );

    // Click outside to close
    $(document).on("click", function (event) {
        if (!$(event.target).closest(".dropdown").length) {
            $(".dropdown-toggle").removeClass("clicked");
            $(".rotate-icon").removeClass("up");
        }
    });

    let currentIndex = 0;
    const $carousel = $(".Carousel");
    const $cards = $(".Card");
    const totalCards = $cards.length;

    function moveNext() {
        currentIndex = (currentIndex + 1) % totalCards;
        let translateX = -currentIndex * 100 + "%";
        $cards.each(function(index) {
            $(this).css("transform", "translateX(" + translateX + ")");
        });
    }
    setInterval(moveNext, 5000);




    //rotate icone
    $('.dropdownToggle').on('click', function (e) {
        let $icon = $(this).find('.rotate-icon');

        // Vérifier si le menu est ouvert par Bootstrap
        let isOpen = $(this).next('.dropdown-menu').hasClass('show');

        // Réinitialiser toutes les icônes
        $('.rotate-icon').removeClass('rotate');

        // Appliquer la rotation seulement si le menu va s'ouvrir
        if (!isOpen) {
            $icon.addClass('rotate');
        }
    });

    // Fermer le dropdown lorsque l'on clique ailleurs
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.nav-item.dropdown').length) {
            $('.rotate-icon').removeClass('rotate');
        }
    });

});