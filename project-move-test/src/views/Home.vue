<template>
  <div class="home">
    <div class="item-wrapper">
      <div class="item" v-for="item in taskList" :key="item.id">
        <h4>{{item.title}}</h4>
        <div class="titles">
          <div class="title" v-for="it in item.titles" :key="it.id">
            <h4>{{it.name}}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { getList } from '../assets/js/api'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'home',
  created () {
    this._getList()
  },
  computed: {
    ...mapGetters(['taskList'])
  },
  data () {
    return {
      // taskList: []
    }
  },
  methods: {
    ...mapMutations({
      setTaskList: 'SET_TASKLIST'
    }),
    _getList () {
      getList().then(res => {
        // this.taskList = res
        console.log(res)
        this.setTaskList(res)
      })
    }
  }
}
</script>

<style scoped lang='scss'>
    .home {
        width: 375px;
        border: 1px solid #333;
        height: 60px;
        // width: px2rem(375);
        // border: 1px solid #333;
        // height: px2rem(60);
    }
</style>
