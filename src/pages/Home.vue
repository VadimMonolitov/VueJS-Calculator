<template>
    <div>
        <router-link to="/calculator" class="main__btn">Перейти к калькулятору</router-link>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

.main__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 284px;
    height: 50px;
    border-radius: 10px;
    background-color: black;
    color: white;
    font-size: 14px;
    font-weight: bold;
    text-decoration: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>