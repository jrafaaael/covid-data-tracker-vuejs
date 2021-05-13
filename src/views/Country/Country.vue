<template>
    <main>
        <div class="title-container">
            <skeleton v-if="loading" width="50%" height="40px" style="margin: .25rem"></skeleton>
            <h2 v-else class="title">
                {{ countryData.country }}
            </h2>
            <skeleton v-if="loading" shape="circle" size="30px"></skeleton>
            <img
                v-else
                :src="
                    `https://hatscripts.github.io/circle-flags/flags/${countryData.countryInfo.iso2.toLowerCase()}.svg`
                "
                alt=""
            />
        </div>
        <div class="last-update">
            <skeleton v-if="loading" width="250px"></skeleton>
            <p v-else class="date">
                Last update:
                <span>{{ moment(countryData.updated).fromNow() }}</span>
            </p>
        </div>
        <section class="card-container">
            <info-card
                title="Cases"
                :data="[
                    { title: 'Total', value: countryData.cases },
                    { title: 'New', value: countryData.todayCases },
                ]"
                boxColor="#C2D1FF"
                :loading="loading"
            >
            </info-card>
            <info-card
                title="Deaths"
                :data="[
                    { title: 'Total', value: countryData.deaths },
                    { title: 'New', value: countryData.todayDeaths },
                ]"
                boxColor="#FFE8E1"
                :loading="loading"
            >
            </info-card>
            <info-card
                title="Vaccine doses coverage"
                :data="[
                    { title: 'Total', value: lastVaccineUpdate },
                    {title: 'Population', value: countryData.population}
                ]"
                boxColor="#BFFFBE"
                :loading="loading"
            >
                <progress-bar :value="vaccinatedPercentage">
                </progress-bar>
            </info-card>
            <info-card
                title="Other"
                :data="[
                    { title: 'Recovered', value: countryData.recovered },
                    { title: 'Active', value: countryData.active },
                ]"
                boxColor="#E8B5FF"
                :loading="loading"
            >
            </info-card>
        </section>
    </main>
</template>

<script>
import ProgressBar from "primevue/progressbar/sfc";
import Skeleton from "primevue/skeleton/sfc";
import InfoCard from "@/components/InfoCard";
import axios from "axios";
import moment from "moment";

export default {
    components: {
        ProgressBar,
        Skeleton,
        InfoCard,
    },
    data() {
        return {
            country: "",
            countryData: {},
            lastVaccineUpdate: 0,
        };
    },
    methods: {
        getCountryData() {
            const [code, name] = this.getCodeAndCountryName;
            Promise.any([
                axios.get(
                    `https://corona.lmao.ninja/v3/covid-19/countries/${code}`
                ),
                axios.get(
                    `https://corona.lmao.ninja/v3/covid-19/countries/${name}`
                ),
            ])
                .then((value) => {
                    if(
                        code.toLowerCase() !== value.data.countryInfo.iso2.toLowerCase() ||
                        ! name.includes(value.data.country)
                    ) throw new Error();
                    this.countryData = value.data;
                })
                .catch((_) => this.$router.push("/404")); // 
        },
        getVaccinationsData() {
            const [code, name] = this.getCodeAndCountryName;
            Promise.any([
                axios.get(
                    `https://corona.lmao.ninja/v3/covid-19/vaccine/coverage/countries/${code}`
                ),
                axios.get(
                    `https://corona.lmao.ninja/v3/covid-19/vaccine/coverage/countries/${name}`
                ),
            ])
                .then((value) => {
                    this.lastVaccineUpdate = [
                        ...Object.values(value.data.timeline),
                    ].pop();
                })
                .catch((e) => {
                    console.log(e);
                    this.lastVaccineUpdate = 0;
                });
        },
    },
    beforeRouteUpdate(to, _) {
        this.country = to.params.country;
        this.getCountryData();
        this.getVaccinationsData();
    },
    created() {
        this.country = this.$route.params.country;
        this.getCountryData();
        this.getVaccinationsData();
    },
    computed: {
        getCodeAndCountryName() {
            return this.country.split("_");
        },
        loading() {
            return Object.values(this.countryData).length ? false : true;
        },
        vaccinatedPercentage() {
            return Math.floor((this.lastVaccineUpdate / this.countryData.population) * 100) > 0 ?
                Math.floor((this.lastVaccineUpdate / this.countryData.population) * 100) :
                (this.lastVaccineUpdate / this.countryData.population) * 100;
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

img {
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
