<template>
    <div id="app">
        <el-container>
            <el-header>
                <el-row>
                    <el-col :span="5">
                        <div class="grid-content bg-purple">
                            <p class="author" @click='toPage("/")'>晓刚</p>
                            <span @click='toPage("/")'>个人博客</span>
                        </div>
                    </el-col>
                    <el-col :span="14">
                        <div class="grid-content bg-purple-light">
                            <el-menu
                              :default-active="activeIndex"
                              class="el-menu-demo"
                              mode="horizontal"
                              @select="handleSelect"
                              background-color="#222"
                              text-color="#fff"
                              active-text-color="#ffd04b">
                                <el-menu-item index="1">首页</el-menu-item>
                                <el-submenu index="2">
                                    <template slot="title">关于</template>
                                    <el-menu-item index="2-1">关于我</el-menu-item>
                                    <el-menu-item index="2-2">友情链接</el-menu-item>
                                </el-submenu>
                                <el-menu-item index="3">成长</el-menu-item>
                                <el-menu-item index="4">学习</el-menu-item>
                                <el-menu-item index="5">娱乐</el-menu-item>
                                <el-menu-item index="6">留言</el-menu-item>
                            </el-menu>
                        </div>
                    </el-col>
                    <el-col :span="5">
                        <div class="grid-content bg-purple">
                            <el-input class='inpSearch'
                            placeholder="请输入内容"
                            v-model="inpSearch">
                                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                            </el-input>
                        </div>
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data () {
            return {
                activeIndex: '1',
                inpSearch: ''
            }
        },
        methods: {
            toPage (path) {
                this.$router.push(path)
            },
            handleSelect(key, keyPath) {
                if (key === '1') {
                    this.$router.push('/')
                } else if (key === '2-1') {
                    this.$router.push('/about')
                }
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
    html, body
        margin 0
        padding 0
        list-style none
        min-width 600px
        width 100%
        height 100%
        box-sizing border-box
        #app
            width 100%
            height 100%
            .el-header
                background-color #222
                position fixed
                top 0
                width 100%
                line-height 30px
                z-index 999
                margin-bottom 20px
                opacity 0.95
                overflow hidden
                .author
                    display inline-block
                .inpSearch
                    height 40px
                    line-height 40px
                    top 10px
                    width 200px
                    border-radius 30px
            .el-menu
                display flex
                justify-content space-between
                align-items center
            .el-main
                position absolute
                top 30px
                bottom 0
                left 0
                right 0
</style>
