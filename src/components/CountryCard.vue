<template>
    <div class="card">
        <div class="header">
            <div class="flag-container">
                <img
                    :src="
                        `https://hatscripts.github.io/circle-flags/flags/${country.countryInfo.iso2.toLowerCase()}.svg`
                    "
                    :alt="`${country.country} flag`"
                    class="flag"
                />
            </div>
            <div class="country-name-container">
                <h4 class="country-name">
                    {{ country.country }}
                </h4>
            </div>
        </div>
        <div class="body"></div>
    </div>
</template>

<script>
export default {
    name: "CountryCard",
    props: {
        country: Object,
    },
};
</script>

<style scoped>
.card {
    min-width: 225px;
    padding: 1rem;
    background-color: var(--secondary-color);
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    transition: box-shadow 250ms ease;
}

.card:hover {
    box-shadow: 0px 0px 0px 1.25px #333;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.flag {
    width: 35px;
}
</style>
