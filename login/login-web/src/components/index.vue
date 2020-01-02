<template>
    <div class="main">
        <el-radio-group style='margin-top: 20px' v-model="radioGroupStatus" size="small"  @change="changeShowEditor" type="button">
            <el-radio label='schemas'>Schemas</el-radio>
            <el-radio label='raw'>RAW</el-radio>
        </el-radio-group>
        <JsonSchemaEditor ref='schema' class='json-schema' :data="schemaEditorData" :showEditor="showEditor"/>
    </div>
</template>

<script>
    import 'antd/dist/antd.css'
    import 'json-schema-editor-visual/dist/main.css'
    const schemaEditor = require('json-schema-editor-visual/dist/main.js');
    const option = {'lang': 'zh_CN'}
    const JsonSchemaEditor = schemaEditor(option);
    const defaultSchema = {
        'type': 'object',
        'title': 'empty object',
        'properties': {}
    };
    const defaultSchemaStr = JSON.stringify(defaultSchema);
    export default {
        data () {
            return {
                message: 'hello world',
                showEditor: true,
                radioGroupStatus: 'schemas',
                schemaEditorData: ''
            }
        },
        methods: {
            changeShowEditor (status) {
                if (status === 'schemas') {
                    this.showEditor = false;
                } else {
                    this.showEditor = true;
                }
            }
        },
        created () {
        },
        components: {'JsonSchemaEditor': JsonSchemaEditor}
    }
</script>

<style lang="stylus" scoped>
</style>
