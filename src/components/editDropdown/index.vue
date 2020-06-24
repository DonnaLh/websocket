 <template slot-scope="scope">
  <el-dropdown  trigger="click" @command='editLevel' placement='bottom'>
  <span>
    {{ this.mapLevelList[defaultLevel] || '--' }}<i class="level-edit el-icon-caret-bottom"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item :command="composeValue(item)" v-for='item in levelList' :key='item.value'>{{item.text}}</el-dropdown-item>
  </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  export default {
    name: 'editDropdown',
    props: {
      levelList: {
        type: Array,
        default: ()=>[]
      },
      currentId: {
        type: Number,
        default: null
      },
      defaultLevel: {
        type: Number,
        default: null
      }
    },
    data () {
      return {
        mapLevel: {}
      }
    },
    computed: {
      mapLevelList () {
        this.levelList.forEach((val) => {
          this.mapLevel[val.value] = val.text
        })
        return this.mapLevel
      }
    },
    methods: {
      composeValue (item) {
        return {
          value: item.value,
          text: item.text,
          id: this.currentId
        }
      },
      editLevel (command) {
        let levelParams = {
          id: command.id,
          level: command.value
        }
        this.$emit('editLevel', levelParams)
      }
    }
  }
</script>

<style scoped lang="scss">
.level-edit:hover{
  cursor: pointer;
  color: #ed6c00;
}
</style>
