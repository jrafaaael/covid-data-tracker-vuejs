<template>
    <div class="card">
        <div class="card-header">
            <h4 class="title">
                {{ title }}
            </h4>
        </div>
        <div class="card-body">
            <slot>
            </slot>
            <div class="boxes-container">
                <div
                    class="box"
                    v-for="item in data"
                    :key="item.value"
                    :style="{ backgroundColor: boxColor }"
                >
                    <h5 class="title">
                        {{ item.title }}
                    </h5>
                    <skeleton v-if="loading" width="50%"></skeleton>
                    <p v-else class="value">
                        {{ item.value }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Skeleton from "primevue/skeleton/sfc";

export default {
    name: "InfoCard",
    props: {
        title: String,
        data: Array,
        boxColor: String,
        loading: Boolean,
    },
    components: {
        Skeleton,
    },
};
</script>

<style scoped>
.card {
    width: 100%;
    min-height: 175px;
    padding: 1rem;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.title {
    text-align: center;
    font-size: 1.25rem;
}

.card-body {
    height: 100%;
    margin-top: .5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem
}

.card-body .boxes-container {
    height: 100%;
    display: flex;
    place-items: center;
    gap: 0.75rem;
}

.box {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.box .title {
    font-size: 1.1rem;
    margin-bottom: 0.35rem;
}
</style>
