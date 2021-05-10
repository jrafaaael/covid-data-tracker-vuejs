<template>
    <main>
        <data-table
            :value="countriesData"
            responsiveLayout="scroll"
            class="p-datatable-sm"
            :paginator="true"
            :rows="rows"
            paginatorTemplate="PrevPageLink PageLinks NextPageLink"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
            :resizableColumns="true"
            columnResizeMode="expand"
            :loading="loading"
        >
            <column field="country" header="Country" :sortable="true">
                <template v-if="!loading" #body="slotProps">
                    <img
                        v-if="slotProps.data.countryInfo.iso2"
                        :src="
                            `https://hatscripts.github.io/circle-flags/flags/${slotProps.data.countryInfo.iso2.toLowerCase()}.svg`
                        "
                        @error="
                            changeSrc($event, slotProps.data.countryInfo.flag)
                        "
                        :alt="`${slotProps.data.country} flag`"
                    />
                    <router-link
                        :to="{
                            path: `/country/${slotProps.data.countryInfo.iso2}_${slotProps.data.country}`,
                        }"
                        class="underline"
                    >
                        <span>
                            {{ slotProps.data.country }}
                        </span>
                        <icon name="arrow-link"></icon>
                    </router-link>
                </template>
            </column>
            <column
                field="cases"
                header="Total Cases"
                :sortable="true"
            ></column>
            <column
                field="todayCases"
                header="New Cases"
                :sortable="true"
            ></column>
            <column field="active" header="Active" :sortable="true"></column>
            <column
                field="critical"
                header="Critical"
                :sortable="true"
            ></column>
            <column
                field="recovered"
                header="Recovered"
                :sortable="true"
            ></column>
        </data-table>
    </main>
</template>

<script>
import DataTable from "primevue/datatable/sfc";
import Column from "primevue/column/sfc";
import Icon from "@/components/Icon";
import axios from "axios";

export default {
    components: {
        DataTable,
        Column,
        Icon,
    },
    data() {
        return {
            countriesData: [],
            viewportHeigth: window.innerHeight,
        };
    },
    methods: {
        changeSrc(e, flag) {
            e.target.src = flag;
            e.target.classList.add("alt-img");
        },
        handleResize() {
            this.viewportHeigth = window.innerHeight;
        },
    },
    async created() {
        try {
            const res = axios.get(
                "https://corona.lmao.ninja/v3/covid-19/countries"
            );
            this.countriesData = (await res).data;
        } catch (error) {
            console.log(error);
        }
    },
    mounted() {
        window.addEventListener("resize", this.handleResize);
    },
    unmounted() {
        window.removeEventListener("resize", this.handleResize);
    },
    computed: {
        loading() {
            return this.countriesData.length > 0 ? false : true;
        },
        rows() {
            return Math.floor(
                (this.viewportHeigth -
                    60 -
                    52 -
                    20 -
                    (10 * this.viewportHeigth) / 100) /
                ((36 + 50) / 2)
            );
        },
    },
};
</script>

<style scoped>
img {
    width: 20px;
    height: 20px;
    margin-right: 1rem;
    vertical-align: text-bottom;
}

img,
svg {
    display: inline !important;
}

a {
    --line: #646b8c;
    --color: #2b3044;
    text-decoration: none;
    color: var(--color);
    position: relative;
    width: 140px;
    margin: 16px 0;
}
a span {
    background-image: linear-gradient(0deg, var(--line) 0%, var(--line) 100%);
    background-position: 100% 100%;
    background-repeat: no-repeat;
    background-size: var(--background-size, 100%) 1px;
    transition: background-size 0.2s linear var(--background-delay, 0.15s);
    font-size: 16px;
    line-height: 20px;
    transform: translateZ(0);
}
a svg {
    vertical-align: top;
    display: inline;
    line-height: 1;
    width: 13px;
    height: 20px;
    position: relative;
    left: -2px;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1px;
    stroke: var(--line);
    stroke-dasharray: 7.95 30;
    stroke-dashoffset: var(--stroke-dashoffset, 46);
    transition: stroke-dashoffset var(--stroke-duration, 0.15s)
        var(--stroke-easing, linear) var(--stroke-delay, 0s);
}
a:hover {
    --background-size: 0%;
    --background-delay: 0s;
    --stroke-dashoffset: 26;
    --stroke-duration: 0.3s;
    --stroke-easing: cubic-bezier(0.3, 1.5, 0.5, 1);
    --stroke-delay: 0.195s;
}

@media only screen and (hover: none) and (pointer: coarse) {
    a {
        --background-size: 0%;
        --background-delay: 0s;
        --stroke-dashoffset: 26;
        --stroke-duration: 0.3s;
        --stroke-easing: cubic-bezier(0.3, 1.5, 0.5, 1);
        --stroke-delay: 0.195s;
    }
}
</style>
