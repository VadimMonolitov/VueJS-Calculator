import { defineStore } from 'pinia';

export const useHistoryStore = defineStore('history', {
    state: () => ({
        history: [],
    }),
    actions: {
        addToHistory(expression, result) {
            const currentDate = new Date();
            const day = String(currentDate.getDate());
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const year = String(currentDate.getFullYear()).slice(-2);
            const hours = String(currentDate.getHours());
            const minutes = String(currentDate.getMinutes());
            const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;
            
            this.history.push({
                operation: `${expression}=`,
                result: `${result}`,
                date: formattedDate
            });
        },
        clearHistory() {
            this.history = [];
        }
    },
});
