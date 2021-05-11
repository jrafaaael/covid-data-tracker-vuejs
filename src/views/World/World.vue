<template>
    <main>
        <div class="title-container">
            <h2 class="title">World</h2>
            <icon name="worldwide"></icon>
        </div>
        <div class="last-update">
            <skeleton v-if="loading" width="250px"></skeleton>
            <p v-else class="date">
                Last update:
                <span>{{ moment(globalData.updated).fromNow() }}</span>
            </p>
        </div>
        <section class="card-container">
            <info-card
                title="Cases"
                :data="[
                    { title: 'Total', value: globalData.cases },
                    { title: 'New', value: globalData.todayCases },
                ]"
                boxColor="#C2D1FF"
                :loading="loading"
            >
            </info-card>
            <info-card
                title="Deaths"
                :data="[
                    { title: 'Total', value: globalData.deaths },
                    { title: 'New', value: globalData.todayDeaths },
                ]"
                boxColor="#FFE8E1"
                :loading="loading"
            >
            </info-card>
            <info-card 
                title="Vaccine doses coverage"
                :data="[
                    { title: 'Total', value: lastVaccineUpdate },
                ]"
                boxColor="#BFFFBE"
                :loading="loading"
            >
                <progress-bar
                    :value="vaccinatedPercentage"
                ></progress-bar>
            </info-card>
            <info-card 
                title="Other"
                :data="[
                    { title: 'Recovered', value: globalData.recovered },
                    { title: 'Active', value: globalData.active },
                ]"
                boxColor="#E8B5FF"
                :loading="loading"
            >
            </info-card>
        </section>
    </main>
</template>

<script>
import Skeleton from "primevue/skeleton/sfc";
import ProgressBar from "primevue/progressbar/sfc";
import Icon from "@/components/Icon";
import InfoCard from "@/components/InfoCard";
import axios from "axios";
import moment from "moment";

export default {
    components: {
        Skeleton,
        ProgressBar,
        Icon,
        InfoCard,
    },
    data() {
        return {
            globalData: {},
            lastVaccineUpdate: 0,
        };
    },
    created() {
        Promise.all([
            axios.get("https://corona.lmao.ninja/v3/covid-19/all"),
            axios.get("https://corona.lmao.ninja/v3/covid-19/vaccine/coverage"),
        ]).then((values) => {
            const [{ data: data }, { data: vaccine }] = values;
            this.globalData = data;
            this.lastVaccineUpdate = [...Object.values(vaccine)].pop();
        });
    },
    computed: {
        loading() {
            return Object.values(this.globalData).length ? false : true;
        },
        vaccinatedPercentage() {
            return Math.floor((this.lastVaccineUpdate / this.globalData.population) * 100);
        },
        moment: () => moment,
    },
};
</script>

<style scoped>
main {
    max-width: 900px;
    margin: 1rem auto 0 auto;
    padding-bottom: 1rem;
}

.title-container,
.last-update {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

.title {
    font-size: 2.15rem;
}

svg {
    width: 30px;
    height: 30px;
}

.last-update {
    margin: 0.25rem 0 1.5rem 0;
}

.date {
    text-align: center;
}

.date span {
    font-weight: 700;
}

.card-container {
    width: 100%;
    max-width: 650px;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
}

.card:nth-child(1) {
    background-color: #a5bafd;
}

.card:nth-child(2) {
    background-color: #ffd4c5;
}

.card:nth-child(3) {
    background-color: #a4dba3;
}

.card:nth-child(4) {
    background-color: #c494db;
}
</style>
