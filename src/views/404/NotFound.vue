<template>
    <main>
        <section class="not-found-container">
            <icon :name="`peep-${randomNumber}`"></icon>
            <div class="description">
                <h1 class="title" title="404">404</h1>
                <p>Page Not Found</p>
            </div>
        </section>
    </main>
</template>

<script>
import Icon from "@/components/Icon";

export default {
    components: {
        Icon,
    },
    computed: {
        randomNumber: () => Math.floor(Math.random() * 8) + 1,
    },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Fira+Mono:400");

main {
    width: 100%;
    min-height: calc(100vh - 10vh);
    font-family: "Fira Mono", monospace;
    display: flex;
    justify-content: center;
    align-items: center;
}

.not-found-container {
    width: 100%;
    max-width: 610px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    place-items: center;
}

svg {
    width: 300px;
    height: 300px;
}

.description {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.title {
    color: #333;
    font-size: 96px;
    letter-spacing: -7px;
    animation: glitch 1s linear infinite;
}

p {
    font-size: 2rem;
}

@keyframes glitch {
    2%,
    64% {
        transform: translate(2px, 0) skew(0deg);
    }
    4%,
    60% {
        transform: translate(-2px, 0) skew(0deg);
    }
    62% {
        transform: translate(0, 0) skew(5deg);
    }
}

.title:before,
.title:after {
    content: attr(title);
    position: absolute;
    left: 0;
}

.title:before {
    animation: glitchTop 1s linear infinite;
    clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
    -webkit-clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
}

@keyframes glitchTop {
    2%,
    64% {
        transform: translate(2px, -2px);
    }
    4%,
    60% {
        transform: translate(-2px, 2px);
    }
    62% {
        transform: translate(13px, -1px) skew(-13deg);
    }
}

.title:after {
    animation: glitchBotom 1.5s linear infinite;
    clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
    -webkit-clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
}

@keyframes glitchBotom {
    2%,
    64% {
        transform: translate(-2px, 0);
    }
    4%,
    60% {
        transform: translate(-2px, 0);
    }
    62% {
        transform: translate(-22px, 5px) skew(21deg);
    }
}

@media all and (min-width: 610px) {
    .title {
        align-self: start;
    }
}
</style>
