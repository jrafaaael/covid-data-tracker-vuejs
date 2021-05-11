<template>
    <nav>
        <router-link :to="{ name: 'Home' }">
            <icon name="home-lg-alt"></icon>
        </router-link>
        <router-link :to="{ name: 'World' }">
            <icon name="globe-americas-solid"></icon>
        </router-link>
        <label class="select">
            <select
                v-model="selectedCountry"
                id="country"
                required
                :disabled="loading"
                @change="changeRoute"
            >
                <option value="" disabled selected>Select a country</option>
                <option
                    v-for="(country, code) in countries"
                    :key="country"
                    :value="`${code}_${country}`"
                >
                    {{ country }}
                </option>
            </select>
            <icon name="arrow-down"></icon>
        </label>
        <a href="#" class="external repo" target="_blank">
            <icon name="github"></icon>
        </a>
        <a href="#" class="external api" target="_blank">
            <icon name="brackets-curly"></icon>
        </a>
    </nav>
</template>

<script>
import Icon from "./Icon";
import axios from "axios";

export default {
    name: "Navbar",
    components: {
        Icon,
    },
    data() {
        return {
            countries: null,
            selectedCountry: "",
        };
    },
    methods: {
        changeRoute() {
            this.$router.push({
                path: `/country/${this.selectedCountry}`
            });
        }
    },
    async created() {
        try {
            const res = axios.get('https://raw.githubusercontent.com/hampusborgos/country-flags/master/countries.json');
            this.countries = (await res).data
        } catch (error) {
            console.log(error);
        }
    },
    computed: {
        loading() {
            return this.countries ? false : true;
        }
    }
};
</script>

<style scoped>
nav {
    width: 100%;
    max-width: 500px;
    height: 10vh;
    margin: auto;
    padding: 0 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: clamp(0.25rem, 2.5vw, 1rem);
}

a {
    padding: 0.35rem;
    border-radius: 3.5px;
    color: var(--primary-font-color);
    display: inline-block;
}

a:hover,
a:focus {
    background-color: #e9ecef;
    color: var(--tertiary-color); 
}

a:hover svg,
a:focus svg {
    fill: var(--tertiary-color);
}

svg {
    width: 20px;
    height: 20px;
    fill: var(--primary-font-color);
}
</style>
