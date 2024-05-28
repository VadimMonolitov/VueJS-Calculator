<template>
    <div class="main">
        <router-link class="backToCalc" to="/calculator">
            <div class="arrow"></div> История вычислений
        </router-link>
        <div class="historyContainer">
            <div class="historyCalc" v-for="calc in calcHistory">
                <div class="operation">
                    {{ calc.operation }}<span style="color: orange">{{ calc.result }}</span></div>
                <div class="date">{{ calc.date }}</div>
            </div>
        </div>
        <button class="clear__btn" @click="clearHistory" v-if="calcHistory.length > 0">Очистить</button>
    </div>
</template>

<script>
import { useHistoryStore } from '@/stores/history';

export default {
    computed: {
        calcHistory() {
            const historyStore = useHistoryStore();
            return historyStore.history;
        }
    },
    methods: {
        clearHistory() {
            const historyStore = useHistoryStore();
            historyStore.clearHistory();
        }
    }
};
</script>

<style lang="scss" scoped>
.main {
    flex-direction: column;
    padding-bottom: 20px;
    align-items: center;
    border: 1px solid black;
    height: 561px;
    padding: 20px;
    border-radius: 20px;
    max-width: 400px;
    margin: auto;
    margin-top: 10px;
}

.backToCalc {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
    color: #000000;
    text-decoration: none;
    padding-left: 10px;
}

.arrow {
    width: 10px;
    height: 10px;
    border-top: 2px solid #000000;
    border-right: 2px solid #000000;
    margin-right: 7px;
    margin-bottom: 1px;
    transform: rotate(-135deg);
}

.historyCalc {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #E3E3E3;
    padding: 10px;
    font-size: 20px;
}

.historyContainer {
    max-height: 475px;
    overflow-y: auto;
}

.operation {
    word-break: break-all;
}

.date {
    font-size: 14px;
    color: #928585;
}

.clear__btn {
    appearance: none;
    border: 0;
    border-radius: 5px;
    background: orange;
    color: #fff;
    padding: 8px 16px;
    font-size: 16px;
    cursor: pointer;
}
</style>