<template>
    <div class="container">
        <div class="header">header</div>
        <div class="container">
            <slot></slot>
        </div>
        <div class="footer">footer</div>
    </div>
</template>

<script>
export default {
    name: 'my-test'
}
</script>

<style scoped lang="less">

</style>
