<?php
function generer_vague_steps($couleur1 = "#555555") {
    ?>
    
    <svg id="waveSvg" viewBox="0 0 900 900" class="vague" xmlns="http://www.w3.org/2000/svg">
        <path id="wave"
              d="M0 497L39 497L39 501L78 501L78 511L117 511L117 509L157 509L157 523L196 523L196 494L235 494L235 511L274 511L274 521L313 521L313 498L352 498L352 503L391 503L391 525L430 525L430 502L470 502L470 522L509 522L509 494L548 494L548 499L587 499L587 503L626 503L626 496L665 496L665 515L704 515L704 522L743 522L743 506L783 506L783 512L822 512L822 508L861 508L861 511L900 511L900 520L900 601L900 601L861 601L861 601L822 601L822 601L783 601L783 601L743 601L743 601L704 601L704 601L665 601L665 601L626 601L626 601L587 601L587 601L548 601L548 601L509 601L509 601L470 601L470 601L430 601L430 601L391 601L391 601L352 601L352 601L313 601L313 601L274 601L274 601L235 601L235 601L196 601L196 601L157 601L157 601L117 601L117 601L78 601L78 601L39 601L39 601L0 601Z"
              fill="<?= $couleur1 ?>">
        </path>
    </svg>

<script>
    function updateViewBox() {
        const svg = document.getElementById("waveSvg");

        const width = window.innerWidth;

        const minWidth = 432;
        const maxWidth = 1280;
        const minHeight = 600;
        const maxHeight = 900;

        let newHeight;

        if (width <= minWidth) {
            newHeight = maxHeight;
        } else if (width >= maxWidth) {
            newHeight = minHeight;
        } else {
            const t = (width - minWidth) / (maxWidth - minWidth);
            newHeight = maxHeight - t * (maxHeight - minHeight);
        }

        svg.setAttribute("viewBox", `0 0 900 ${newHeight}`);
    }

    updateViewBox();
    window.addEventListener("resize", updateViewBox);
    </script>

    <?php
}
?>
