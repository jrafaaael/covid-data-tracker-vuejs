<template>
    <div>This is the page of the country {{ $route.params.country }}</div>
</template>

<script>
import axios from "axios";

export default {
    methods: {
        getCodeAndCountryName(country) {
            return country.split('_');
        },
        getCountryData(country) {
            const [code, name] = this.getCodeAndCountryName(country);
            Promise.any([
                axios.get(
                    `https://corona.lmao.ninja/v3/covid-19/countries/${code}`
                ),
                axios.get(
                    `https://corona.lmao.ninja/v3/covid-19/countries/${name}`
                ),
            ])
            .then((value) => console.log(value))
            .catch((e) => this.$router.push('/404'));
        }
    },
    beforeRouteUpdate(to, _) {
        this.getCountryData(to.params.country);
    },
    created() {
        this.getCountryData(this.$route.params.country);
    },
};
</script>

<style></style>
